
import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Bell } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  userName: string;
  userRole: "student" | "teacher";
  currentPage: "dashboard" | "schedule" | "appointments" | "profile";
  onPageChange: (page: "dashboard" | "schedule" | "appointments" | "profile") => void;
  onLogout: () => void;
}

const MainLayout = ({
  children,
  userName,
  userRole,
  currentPage,
  onPageChange,
  onLogout
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const showNotification = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <h1 className="text-xl font-bold">EduSchedule</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={showNotification}>
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`w-64 bg-sidebar border-r transition-all ${
            isMobile ? (sidebarOpen ? "fixed inset-y-0 left-0 z-50" : "hidden") : "flex"
          }`}
        >
          <div className="p-4 space-y-8 w-full">
            <div className="pt-6">
              <div className="px-3 py-2">
                <h2 className="text-lg font-semibold mb-1">{userName}</h2>
                <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
            <nav className="space-y-1">
              <Button 
                variant={currentPage === "dashboard" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => {
                  onPageChange("dashboard");
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                Dashboard
              </Button>
              {userRole === "teacher" && (
                <Button 
                  variant={currentPage === "schedule" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => {
                    onPageChange("schedule");
                    if (isMobile) setSidebarOpen(false);
                  }}
                >
                  My Schedule
                </Button>
              )}
              <Button 
                variant={currentPage === "appointments" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => {
                  onPageChange("appointments");
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                Appointments
              </Button>
              <Button 
                variant={currentPage === "profile" ? "default" : "ghost"} 
                className="w-full justify-start"
                onClick={() => {
                  onPageChange("profile");
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                Profile
              </Button>
            </nav>
            <div className="pt-6">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onLogout}
              >
                Log out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
