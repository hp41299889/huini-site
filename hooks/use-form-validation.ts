import { useState, useCallback } from 'react';
import { z, ZodSchema, ZodError } from 'zod';
import to from 'await-to-js';

// Generic type for form values based on a Zod schema
type FormValues<T extends ZodSchema> = z.infer<T>;

// Generic type for form errors
type FormErrors<T extends ZodSchema> = {
  [K in keyof FormValues<T>]?: string;
};

interface UseFormValidationProps<T extends ZodSchema> {
  schema: T;
  defaultValues: FormValues<T>;
  onSubmit: (values: FormValues<T>) => Promise<void> | void;
}

interface UseFormValidationReturn<T extends ZodSchema> {
  values: FormValues<T>;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  validateField: (fieldName: keyof FormValues<T>) => void;
  resetForm: () => void;
}

export function useFormValidation<T extends ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> {
  const [values, setValues] = useState<FormValues<T>>(defaultValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = useCallback(
    (formValues: FormValues<T>) => {
      try {
        schema.parse(formValues);
        setErrors({});
        return true;
      } catch (err) {
        if (err instanceof ZodError) {
          const newErrors: FormErrors<T> = {};
          err.errors.forEach((error) => {
            if (error.path.length > 0) {
              newErrors[error.path[0] as keyof FormValues<T>] = error.message;
            }
          });
          setErrors(newErrors);
        }
        return false;
      }
    },
    [schema]
  );

  const validateField = useCallback(
    (fieldName: keyof FormValues<T>) => {
      try {
        // Validate only the specific field
        // This is a simplified approach, a more robust solution might parse a subset of the schema
        schema.pick({ [fieldName]: true } as any).parse({ [fieldName]: values[fieldName] });
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      } catch (err) {
        if (err instanceof ZodError) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: err.errors[0]?.message,
          }));
        }
      }
    },
    [schema, values]
  );


  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      validateField(name as keyof FormValues<T>); // Validate on change
      return newValues;
    });
  }, [validateField]);


  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      const isValid = validate(values);

      if (isValid) {
        const [err] = await to(onSubmit(values));
        if (err) {
          // Handle submission error, potentially setting global form error
          console.error("Form submission error:", err);
          // Optionally set a general error message
        }
      }
      setIsSubmitting(false);
    },
    [values, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsSubmitting(false);
  }, [defaultValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validateField,
    resetForm,
  };
}
