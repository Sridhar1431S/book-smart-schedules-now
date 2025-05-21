
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const weekDays = [
  { name: "Monday", abbr: "Mon" },
  { name: "Tuesday", abbr: "Tue" },
  { name: "Wednesday", abbr: "Wed" },
  { name: "Thursday", abbr: "Thu" },
  { name: "Friday", abbr: "Fri" },
  { name: "Saturday", abbr: "Sat", weekend: true },
  { name: "Sunday", abbr: "Sun", weekend: true },
];

const timeSlots = [];
const startHour = 8; // 8 AM
const endHour = 18; // 6 PM

for (let hour = startHour; hour < endHour; hour++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const time = new Date();
    time.setHours(hour, minutes);
    
    const formattedTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    timeSlots.push(formattedTime);
  }
}

const ScheduleManager = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("recurring");
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});
  const [selectedSlots, setSelectedSlots] = useState<Record<string, Record<string, boolean>>>({});
  const { toast } = useToast();

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const toggleTimeSlot = (day: string, time: string) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !((prev[day] || {})[time] || false)
      }
    }));
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Schedule Saved",
      description: "Your availability has been updated successfully."
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Your Schedule</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Set Your Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="recurring">Recurring Schedule</TabsTrigger>
              <TabsTrigger value="specific">Specific Dates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recurring" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weekDays.map((day) => (
                  <Card key={day.name} className={day.weekend ? "bg-muted/30" : ""}>
                    <CardHeader className="p-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`day-${day.abbr}`} 
                          checked={selectedDays[day.abbr] || false}
                          onCheckedChange={() => toggleDay(day.abbr)}
                        />
                        <Label 
                          htmlFor={`day-${day.abbr}`}
                          className="text-base font-medium"
                        >
                          {day.name}
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 max-h-64 overflow-y-auto">
                      {selectedDays[day.abbr] && (
                        <div className="space-y-2">
                          {timeSlots.map((time) => (
                            <div 
                              key={`${day.abbr}-${time}`}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox 
                                id={`slot-${day.abbr}-${time}`}
                                checked={(selectedSlots[day.abbr] || {})[time] || false}
                                onCheckedChange={() => toggleTimeSlot(day.abbr, time)}
                              />
                              <Label 
                                htmlFor={`slot-${day.abbr}-${time}`}
                                className="text-sm"
                              >
                                {time}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="specific" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
                  {date && (
                    <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-3">
                      {timeSlots.map((time) => (
                        <div 
                          key={`date-${time}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox 
                            id={`date-slot-${time}`}
                            checked={(selectedSlots[date.toDateString()] || {})[time] || false}
                            onCheckedChange={() => toggleTimeSlot(date.toDateString(), time)}
                          />
                          <Label 
                            htmlFor={`date-slot-${time}`}
                            className="text-sm"
                          >
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline">Clear All</Button>
            <Button onClick={handleSaveSchedule}>Save Schedule</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManager;
