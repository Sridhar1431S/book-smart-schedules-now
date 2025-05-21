
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

// Sample upcoming appointments for the teacher
const upcomingAppointments = [
  { id: 101, student: "Alex Johnson", topic: "Mathematics Help", date: "2025-05-22T14:00:00", duration: 30 },
  { id: 102, student: "Emily Parker", topic: "Advanced Calculus Discussion", date: "2025-05-22T15:00:00", duration: 45 },
  { id: 103, student: "Michael Brown", topic: "Physics Problem Set Review", date: "2025-05-23T10:30:00", duration: 30 },
  { id: 104, student: "Sophia Wilson", topic: "Midterm Exam Preparation", date: "2025-05-24T09:00:00", duration: 60 },
];

const TeacherDashboard = () => {
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
  
  // Group appointments by date
  const groupedAppointments = upcomingAppointments.reduce<Record<string, typeof upcomingAppointments>>((acc, appointment) => {
    const date = new Date(appointment.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      
      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-muted-foreground">Total Appointments This Week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">8.5 hrs</h3>
              <p className="text-muted-foreground">Teaching Time This Week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">8</h3>
              <p className="text-muted-foreground">Different Students</p>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Today's Schedule */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
          <Button variant="outline">Week View</Button>
        </div>
        
        {Object.entries(groupedAppointments).map(([date, appointments]) => (
          <div key={date} className="mb-6">
            <h3 className="font-medium mb-3">
              {new Date(appointments[0].date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start">
                        <div className="p-2 bg-secondary/30 rounded-full mr-3">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{formatDate(appointment.date)}</p>
                          <p className="text-sm text-muted-foreground">{appointment.duration} minutes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start mt-3 md:mt-0">
                        <div className="p-2 bg-secondary/30 rounded-full mr-3">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.student}</p>
                          <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3 md:mt-0">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TeacherDashboard;
