
import React from 'react';
import { Star, Wind, Droplets } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WeatherCardProps {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  onFavorite: () => void;
  isFavorite: boolean;
}

const WeatherCard = ({
  city,
  temperature,
  humidity,
  windSpeed,
  description,
  icon,
  onFavorite,
  isFavorite,
}: WeatherCardProps) => {
  const getTemperatureColor = (temp: number) => {
    if (temp > 25) return 'text-red-500';
    if (temp < 10) return 'text-blue-500';
    return 'text-gray-800';
  };

  return (
    <Card className="p-6 backdrop-blur-md bg-white/30 border-none shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{city}</h2>
          <p className="text-white/90 capitalize">{description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFavorite}
          className={isFavorite ? "text-yellow-400" : "text-white/70"}
        >
          <Star className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center my-6">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-20 h-20"
        />
        <span className={`text-6xl font-bold ${getTemperatureColor(temperature)}`}>
          {Math.round(temperature)}°C
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-2 text-white/90">
          <Wind className="h-5 w-5" />
          <span>{windSpeed} m/s</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Droplets className="h-5 w-5" />
          <span>{humidity}%</span>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
