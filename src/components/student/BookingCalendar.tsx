
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

interface BookingCalendarProps {
  onSelectTime: (time: string) => void;
}

const BookingCalendar = ({ onSelectTime }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate available time slots for the selected date
  const generateTimeSlots = () => {
    // In a real app, we would fetch actual availability from the backend
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const time = new Date();
        time.setHours(hour, minutes);
        
        const formattedTime = time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        // Randomly mark some slots as unavailable for demo purposes
        const isAvailable = Math.random() > 0.3;
        
        slots.push({
          time: formattedTime,
          available: isAvailable
        });
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleConfirm = () => {
    if (date && selectedTime) {
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      
      onSelectTime(`${formattedDate} at ${selectedTime}`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => {
              // Disable past dates and weekends
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const day = date.getDay();
              return date < today || day === 0 || day === 6;
            }}
            className="rounded-md border"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">Select Time</h3>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`
                      time-slot text-center
                      ${!slot.available ? 'time-slot-unavailable' : ''}
                      ${selectedTime === slot.time && slot.available ? 'time-slot-selected' : ''}
                    `}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedTime || !date}
        >
          Proceed to Confirmation
        </Button>
      </div>
    </div>
  );
};

export default BookingCalendar;
