
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import TeacherList from "./TeacherList";
import BookingCalendar from "./BookingCalendar";
import { Calendar, Clock } from "lucide-react";

// Sample teachers data
const teachersData = [
  { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics", rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" },
  { id: 2, name: "Prof. Michael Chen", subject: "Physics", rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop" },
  { id: 3, name: "Dr. Emily Davis", subject: "Literature", rating: 4.9, imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop" },
  { id: 4, name: "Prof. Robert Wilson", subject: "Computer Science", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop" },
];

// Sample upcoming appointments
const upcomingAppointments = [
  { id: 101, teacher: "Dr. Sarah Johnson", subject: "Mathematics Help", date: "2025-05-22T14:00:00", duration: 30 },
  { id: 102, teacher: "Prof. Robert Wilson", subject: "Programming Assignment Review", date: "2025-05-24T10:30:00", duration: 45 },
];

const StudentDashboard = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState<"select-teacher" | "select-time" | "confirm">("select-teacher");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTeacherSelect = (teacherId: number) => {
    setSelectedTeacher(teacherId);
    setBookingStep("select-time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedSlot(time);
    setBookingStep("confirm");
  };

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked!",
      description: "Your appointment has been successfully scheduled.",
    });
    setSelectedTeacher(null);
    setSelectedSlot(null);
    setBookingStep("select-teacher");
  };

  const handleBackClick = () => {
    if (bookingStep === "select-time") {
      setBookingStep("select-teacher");
    } else if (bookingStep === "confirm") {
      setBookingStep("select-time");
    }
  };

  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get selected teacher data
  const getSelectedTeacher = () => {
    return teachersData.find(t => t.id === selectedTeacher);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      
      {/* Upcoming Appointments */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{appointment.subject}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.teacher}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{appointment.duration} minutes</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Reschedule</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">You don't have any upcoming appointments</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Book New Appointment */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Book a New Appointment</h2>
        <Card>
          <CardHeader>
            <CardTitle>Schedule with a Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bookAppointment">
              <TabsList className="grid w-full grid-cols-1 mb-6">
                <TabsTrigger value="bookAppointment">Book Appointment</TabsTrigger>
              </TabsList>
              <TabsContent value="bookAppointment" className="space-y-4">
                {bookingStep === "select-teacher" && (
                  <TeacherList teachers={teachersData} onSelectTeacher={handleTeacherSelect} />
                )}
                
                {bookingStep === "select-time" && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <Button variant="ghost" onClick={handleBackClick}>← Back to teachers</Button>
                      <h3 className="text-lg font-medium">{getSelectedTeacher()?.name}</h3>
                    </div>
                    <BookingCalendar onSelectTime={handleTimeSelect} />
                  </>
                )}
                
                {bookingStep === "confirm" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <Button variant="ghost" onClick={handleBackClick}>← Back to time slots</Button>
                      <h3 className="text-lg font-medium">Confirm Appointment</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary/30 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm font-medium">Teacher:</p>
                          <p className="text-sm">{getSelectedTeacher()?.name}</p>
                          
                          <p className="text-sm font-medium">Subject:</p>
                          <p className="text-sm">{getSelectedTeacher()?.subject}</p>
                          
                          <p className="text-sm font-medium">Date & Time:</p>
                          <p className="text-sm">{selectedSlot}</p>
                          
                          <p className="text-sm font-medium">Duration:</p>
                          <p className="text-sm">30 minutes</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setBookingStep("select-teacher")}>Cancel</Button>
                        <Button onClick={handleBookAppointment}>Confirm Booking</Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default StudentDashboard;
