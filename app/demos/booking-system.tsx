import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar"; // Assuming shadcn/ui Calendar is available
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2Icon } from "lucide-react";
import { cn } from "~/lib/utils"; // Assuming cn helper is available

// Hardcoded time slots
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function BookingSystemDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && name && email) {
      console.log("Booking submitted:", {
        selectedDate,
        selectedTime,
        name,
        email,
      });
      // Simulate API call
      setTimeout(() => {
        setIsBooked(true);
        // Reset form after a short delay
        setTimeout(() => {
          setSelectedDate(undefined);
          setSelectedTime(undefined);
          setName("");
          setEmail("");
          setIsBooked(false);
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        預訂/預約系統 Demo
      </h1>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">預約您的時間</CardTitle>
          <CardDescription>選擇日期、時段並填寫您的資訊</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isBooked ? (
            <div className="flex flex-col items-center justify-center py-10">
              <CheckCircle2Icon className="h-20 w-20 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                預約成功！
              </h2>
              <p className="text-muted-foreground">
                我們已收到您的預約。期待與您見面！
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Date Picker */}
              <div>
                <Label htmlFor="date">選擇日期</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "yyyy年MM月dd日")
                        : "選擇日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slots */}
              <div>
                <Label htmlFor="time">選擇時段</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      onClick={() => setSelectedTime(slot)}
                      type="button" // Important to prevent form submission
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <Label htmlFor="name">您的姓名</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="請輸入姓名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">電子郵件</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="請輸入電子郵件"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!selectedDate || !selectedTime || !name || !email}
              >
                確認預約
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
