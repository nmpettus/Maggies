
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LetterToMaggie from "@/components/activities/LetterToMaggie";
import ActivityCard from "@/components/activities/ActivityCard";
import { getActivities } from "@/data/activitiesData";
import { printImage } from "@/utils/printUtils";

const Activities = () => {
  const [viewedActivities, setViewedActivities] = useState<string[]>([]);
  const activities = getActivities();

  const handleView = (activityId: string) => {
    if (!viewedActivities.includes(activityId)) {
      setViewedActivities(prev => [...prev, activityId]);
    }
  };

  return (
    <section id="activities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800 font-['Comic_Neue']">Activities for All</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Explore our collection of fun printable activities designed to make learning about Bible stories interactive for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <ActivityCard 
              key={activity.id}
              activity={activity}
              isViewed={viewedActivities.includes(activity.id)}
              onView={handleView}
              onPrint={printImage}
            />
          ))}
        </div>

        <div className="mt-16">
          <div className="max-w-md mx-auto">
            <LetterToMaggie />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            New activities are added regularly. Join our newsletter to be notified when we publish new content!
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
