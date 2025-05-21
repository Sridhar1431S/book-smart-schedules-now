
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import MainLayout from "../components/MainLayout";
import StudentDashboard from "../components/student/StudentDashboard";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import ScheduleManager from "../components/teacher/ScheduleManager";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: "student" | "teacher";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<"dashboard" | "schedule" | "appointments" | "profile">("dashboard");

  const handleLogin = (userData: { name: string; role: "student" | "teacher" }) => {
    setUserData(userData);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-primary">EduSchedule</h1>
            <p className="text-muted-foreground">Simple appointment booking for students and teachers</p>
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <MainLayout
          userName={userData?.name || ""}
          userRole={userData?.role || "student"}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        >
          {userData?.role === "student" && currentPage === "dashboard" && <StudentDashboard />}
          {userData?.role === "teacher" && currentPage === "dashboard" && <TeacherDashboard />}
          {userData?.role === "teacher" && currentPage === "schedule" && <ScheduleManager />}
          
          {currentPage === "appointments" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">My Appointments</h1>
              <p className="text-muted-foreground">
                {userData?.role === "student" 
                  ? "View and manage your booked appointments with teachers."
                  : "View and manage upcoming sessions with students."}
              </p>
            </div>
          )}
          
          {currentPage === "profile" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
          )}
        </MainLayout>
      )}
    </div>
  );
};

export default Index;
