import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LetterToMaggie from "@/components/activities/LetterToMaggie";
import ActivityCard from "@/components/activities/ActivityCard";
import { getActivities } from "@/data/activitiesData";
import { printImage } from "@/utils/printUtils";
import { Upload, Plus, Check, Maximize2, Printer } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Activities = () => {
  const [viewedActivities, setViewedActivities] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    category: "",
    file: null as File | null
  });
  
  // Get activities and provide a default empty array if undefined
  const activities = getActivities() || [];

  // Function to handle viewing an activity
  const handleViewActivity = (activityId: string) => {
    if (!viewedActivities.includes(activityId)) {
      setViewedActivities(prev => [...prev, activityId]);
    }
  };
  
  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewActivity({
        ...newActivity,
        file: e.target.files[0]
      });
    }
  };
  
  // Function to handle form submission
  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would upload the file and add it to the activities
    // For now, we'll just show a success message
    alert(`Activity "${newActivity.title}" would be uploaded in a real implementation`);
    setShowUploadDialog(false);
    setNewActivity({
      title: "",
      description: "",
      category: "",
      file: null
    });
  };

  return (
    <section id="activities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800 font-['Comic_Neue']">Activities for All</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Explore our collection of fun printable activities designed to make learning about Bible stories interactive for everyone. 
          You can also upload your own activities!
        </p>

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Activities</TabsTrigger>
                {activities.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Upload size={16} />
                    Upload Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Activity</DialogTitle>
                    <DialogDescription>
                      Share your own activity with others. Upload a PDF or image file.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitActivity} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Activity Title</Label>
                      <Input 
                        id="title" 
                        value={newActivity.title}
                        onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                        placeholder="Enter a title for your activity"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                        placeholder="Briefly describe your activity"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        id="category"
                        value={newActivity.category}
                        onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select a category</option>
                        {activities.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file">Activity File (PDF or Image)</Label>
                      <Input 
                        id="file" 
                        type="file" 
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Upload Activity</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activities.map((category) => (
                  <ActivityCard 
                    key={category.id}
                    category={category}
                    viewedActivities={viewedActivities}
                    onView={handleViewActivity}
                    onPrint={printImage}
                  />
                ))}
              </div>
            </TabsContent>
            
            {activities.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map(activity => (
                    <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                        <p className="text-gray-600 mb-4">{activity.description}</p>
                        
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
                                onClick={() => printImage(activity.imagePath)}
                              >
                                <Printer size={16} />
                                Print Page
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <div className="flex flex-col gap-3">
                          <Button 
                            className={`w-full flex items-center justify-center gap-2 ${viewedActivities.includes(activity.id) ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            onClick={() => handleViewActivity(activity.id)}
                          >
                            {viewedActivities.includes(activity.id) ? (
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
                            onClick={() => printImage(activity.imagePath)}
                          >
                            <Printer size={16} />
                            Print Activity
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full">
                    <Plus size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-gray-600">Add New Activity</h3>
                    <p className="text-gray-500 text-center mb-4">Upload your own {category.title.toLowerCase()}</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewActivity({...newActivity, category: category.id});
                        setShowUploadDialog(true);
                      }}
                    >
                      Upload Activity
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-16">
          <div className="max-w-md mx-auto">
            <LetterToMaggie />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            New activities are added regularly. You can also upload your own activities to share with others!
            Join our newsletter to be notified when we publish new content.
          </p>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Newsletter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Activities;