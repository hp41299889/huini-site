import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  CheckCircle2Icon, 
  User, 
  Scissors, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Star
} from "lucide-react";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

// Types
type Service = { id: string; name: string; duration: string; price: string; icon: any };
type Staff = { id: string; name: string; role: string; rating: number; image: string };

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

export default function BookingSystemDemo() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Mock Data inside component to use t()
  const services: Service[] = [
    { id: "s1", name: t("booking.services.s1"), duration: "45 min", price: "NT$ 800", icon: Scissors },
    { id: "s2", name: t("booking.services.s2"), duration: "60 min", price: "NT$ 1,200", icon: Star },
    { id: "s3", name: t("booking.services.s3"), duration: "120 min", price: "NT$ 2,500", icon: Scissors },
  ];

  const staffMembers: Staff[] = [
    { id: "st1", name: "Alex Chen", role: t("booking.staff.roles.r1"), rating: 4.9, image: "A" },
    { id: "st2", name: "Jessica Wang", role: t("booking.staff.roles.r2"), rating: 4.8, image: "J" },
    { id: "st3", name: "David Lee", role: t("booking.staff.roles.r3"), rating: 4.7, image: "D" },
  ];

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("booking.steps.service")}</h3>
            <div className="grid gap-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedService?.id === s.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.duration}</p>
                    </div>
                  </div>
                  <p className="font-mono font-bold text-primary">{s.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("booking.steps.staff")}</h3>
            <div className="grid gap-3">
              {staffMembers.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStaff(st)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedStaff?.id === st.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {st.image}
                    </div>
                    <div>
                      <p className="font-bold">{st.name}</p>
                      <p className="text-xs text-muted-foreground">{st.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-bold">{st.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">{t("booking.steps.time")}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal text-lg",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {selectedDate ? format(selectedDate, "yyyy-MM-dd") : t("common.search")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">{t("booking.steps.time")}</Label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    onClick={() => setSelectedTime(slot)}
                    className="h-10"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">{t("booking.steps.confirm")}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("booking.form.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("booking.form.placeholder_name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("booking.form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("booking.form.placeholder_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Card className="bg-muted/30 border-dashed mt-6">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-bold flex justify-between">
                  <span>{t("booking.details.service")}:</span> <span>{selectedService?.name}</span>
                </p>
                <p className="text-sm font-bold flex justify-between">
                  <span>{t("booking.details.staff")}:</span> <span>{selectedStaff?.name}</span>
                </p>
                <p className="text-sm font-bold flex justify-between">
                  <span>{t("booking.details.time")}:</span> <span>{selectedDate && format(selectedDate, "MM/dd")} {selectedTime}</span>
                </p>
                <div className="border-t pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold">{t("common.total")}:</span>
                  <span className="text-xl font-black text-primary">{selectedService?.price}</span>
                </div>
              </CardContent>
            </Card>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-xl">
      {/* Hero Image */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg aspect-[16/9] md:aspect-[21/9] bg-muted relative group">
        <img 
          src="/images/booking-hero.jpg" 
          alt="Modern Salon Interior" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) parent.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      </div>

      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("booking.title")}</h1>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 w-8 rounded-full transition-colors",
                step >= i ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isBooked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 text-green-600">
              <CheckCircle2Icon className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{t("booking.success_title")}</h2>
              <p className="text-muted-foreground">{t("booking.success_desc")}</p>
            </div>
            <Button onClick={() => {
              setStep(1);
              setIsBooked(false);
              setSelectedService(null);
              setSelectedStaff(null);
              setSelectedDate(undefined);
              setSelectedTime(null);
            }} variant="outline" className="w-full">
              {t("common.back")}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {step === 1 && t("booking.steps.service")}
                  {step === 2 && t("booking.steps.staff")}
                  {step === 3 && t("booking.steps.time")}
                  {step === 4 && t("booking.steps.confirm")}
                </CardTitle>
                <CardDescription>
                  {step === 1 && t("booking.steps.service")}
                  {step === 2 && t("booking.steps.staff")}
                  {step === 3 && t("booking.steps.time")}
                  {step === 4 && t("booking.steps.confirm")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStep()}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button 
                  variant="ghost" 
                  onClick={prevStep} 
                  disabled={step === 1}
                  className={cn(step === 1 && "invisible")}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> {t("common.prev")}
                </Button>
                {step < 4 ? (
                  <Button 
                    onClick={nextStep} 
                    disabled={
                      (step === 1 && !selectedService) || 
                      (step === 2 && !selectedStaff) || 
                      (step === 3 && (!selectedDate || !selectedTime))
                    }
                  >
                    {t("common.next")} <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleFinalSubmit} 
                    disabled={isSubmitting || !name || !email}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? t("common.loading") : t("common.confirm")}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AiAssistant context="booking" />
    </div>
  );
}