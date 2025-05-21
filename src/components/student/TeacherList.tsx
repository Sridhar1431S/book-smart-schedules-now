
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  rating: number;
  imageUrl: string;
}

interface TeacherListProps {
  teachers: Teacher[];
  onSelectTeacher: (teacherId: number) => void;
}

const TeacherList = ({ teachers, onSelectTeacher }: TeacherListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Select a Teacher</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((teacher) => (
          <Card 
            key={teacher.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectTeacher(teacher.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.imageUrl} />
                  <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                  <div className="flex items-center mt-1">
                    <div className="text-yellow-500">★</div>
                    <span className="text-sm">{teacher.rating}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  onSelectTeacher(teacher.id);
                }}>
                  Select
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
