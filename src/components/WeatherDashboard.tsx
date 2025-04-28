import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Wind, Droplets, Compass, Sun, Clock } from 'lucide-react';
import WeatherDetailDialog from './WeatherDetailDialog';

interface WeatherDashboardProps {
  weatherData: any;
}

const WeatherDashboard = ({ weatherData }: WeatherDashboardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const windDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className="relative min-h-[300px] rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 relative z-10 animate-fade-in">
          <Card 
            className="p-4 backdrop-blur-md bg-white/30 border-none cursor-pointer transform transition-all duration-200 hover:scale-105 hover:bg-white/40"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex items-center gap-3">
              <Thermometer className="text-red-500" />
              <div>
                <p className="text-sm text-white/70">Feels Like</p>
                <p className="text-lg font-bold text-white">
                  {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 backdrop-blur-md bg-white/30 border-none">
            <div className="flex items-center gap-3">
              <Wind className="text-blue-400" />
              <div>
                <p className="text-sm text-white/70">Wind</p>
                <p className="text-lg font-bold text-white">
                  {weatherData.wind.speed} m/s
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 backdrop-blur-md bg-white/30 border-none">
            <div className="flex items-center gap-3">
              <Compass className="text-purple-400" />
              <div>
                <p className="text-sm text-white/70">Wind Direction</p>
                <p className="text-lg font-bold text-white">
                  {windDirection(weatherData.wind.deg)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 backdrop-blur-md bg-white/30 border-none">
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-300" />
              <div>
                <p className="text-sm text-white/70">Humidity</p>
                <p className="text-lg font-bold text-white">
                  {weatherData.main.humidity}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 backdrop-blur-md bg-white/30 border-none">
            <div className="flex items-center gap-3">
              <Sun className="text-yellow-400" />
              <div>
                <p className="text-sm text-white/70">Sunrise</p>
                <p className="text-lg font-bold text-white">
                  {formatTime(weatherData.sys.sunrise)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 backdrop-blur-md bg-white/30 border-none">
            <div className="flex items-center gap-3">
              <Clock className="text-orange-400" />
              <div>
                <p className="text-sm text-white/70">Sunset</p>
                <p className="text-lg font-bold text-white">
                  {formatTime(weatherData.sys.sunset)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <WeatherDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        weatherData={weatherData}
        city={weatherData.name}
      />
    </>
  );
};

export default WeatherDashboard;
