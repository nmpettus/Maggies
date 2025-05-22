
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Maximize2, Printer } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  viewText: string;
  imagePath: string;
}

interface ActivityCardProps {
  activity: ActivityItem;
  isViewed: boolean;
  onView: (id: string) => void;
  onPrint: (imagePath: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isViewed, onView, onPrint }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex items-center">
        <div className="p-3 rounded-full bg-gray-100 mb-4">
          {activity.icon}
        </div>
        <CardTitle className="text-xl font-['Comic_Neue'] text-center">{activity.title}</CardTitle>
        <CardDescription className="text-center">{activity.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Dialog>
          <DialogTrigger asChild>
            <div className="h-44 bg-gray-200 rounded-md flex items-center justify-center mb-4 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                src={activity.imagePath} 
                alt={`${activity.title} preview`}
                className="w-full h-full object-cover"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-[90vw]">
            <DialogTitle>{activity.title} Preview</DialogTitle>
            <DialogDescription>
              Preview of {activity.title}
            </DialogDescription>
            <AspectRatio ratio={4/3} className="bg-muted">
              <img 
                src={activity.imagePath} 
                alt={activity.title} 
                className="w-full h-full object-contain"
              />
            </AspectRatio>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => onPrint(activity.imagePath)}
              >
                <Printer size={16} />
                Print Page
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pb-6">
        <Button 
          className={`w-full flex items-center justify-center gap-2 ${isViewed ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={() => onView(activity.id)}
        >
          {isViewed ? (
            <>
              <Check size={16} />
              Viewed
            </>
          ) : (
            <>
              <Maximize2 size={16} />
              {activity.viewText}
            </>
          )}
        </Button>
        <Button 
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onPrint(activity.imagePath)}
        >
          <Printer size={16} />
          Print Activity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
