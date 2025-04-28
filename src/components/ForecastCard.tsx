
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ForecastCardProps {
  date: string;
  temperature: number;
  icon: string;
  description: string;
}

const ForecastCard = ({ date, temperature, icon, description }: ForecastCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card 
        className="p-4 backdrop-blur-md bg-white hover:bg-white/95 border-none shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex flex-col items-center space-y-3">
          <p className="text-sm font-medium text-gray-600">{date}</p>
          <div className="relative w-16 h-16">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{Math.round(temperature)}°C</p>
            <p className="text-sm text-gray-600 capitalize mt-1">{description}</p>
          </div>
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{date}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="w-24 h-24"
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-gray-800">{Math.round(temperature)}°C</p>
              <p className="text-lg text-gray-600 capitalize">{description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForecastCard;
