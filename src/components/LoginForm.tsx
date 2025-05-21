
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";

const LoginForm = ({ onLogin }: { onLogin: (userData: { name: string; role: "student" | "teacher" }) => void }) => {
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would validate credentials here
    toast({
      title: "Login Successful",
      description: `Welcome back, ${name}!`,
    });
    
    onLogin({
      name,
      role: userType
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to book or manage appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" onValueChange={(v) => setUserType(v as "student" | "teacher")}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@school.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-muted-foreground text-center">
          <span className="hover:text-primary cursor-pointer">Forgot password?</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
