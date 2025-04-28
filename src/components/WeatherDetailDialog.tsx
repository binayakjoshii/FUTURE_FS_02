
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import {
  Thermometer,
  Wind,
  Droplets,
  Compass,
  Sun,
  Clock,
  Gauge,
  Cloud,
  Eye,
} from 'lucide-react';

interface WeatherDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  weatherData: any;
  city: string;
}

const WeatherDetailDialog = ({
  isOpen,
  onClose,
  weatherData,
  city,
}: WeatherDetailDialogProps) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const windDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Weather Details for {city}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Thermometer className="text-red-500 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-lg font-bold">
                  {Math.round(weatherData.main.temp)}°C
                </p>
                <p className="text-sm text-muted-foreground">
                  Feels like: {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Wind className="text-blue-400 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">Wind</p>
                <p className="text-lg font-bold">{weatherData.wind.speed} m/s</p>
                <p className="text-sm text-muted-foreground">
                  Direction: {windDirection(weatherData.wind.deg)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-300 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-lg font-bold">{weatherData.main.humidity}%</p>
                <p className="text-sm text-muted-foreground">
                  Pressure: {weatherData.main.pressure} hPa
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Eye className="text-gray-400 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="text-lg font-bold">
                  {(weatherData.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Cloud className="text-gray-500 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">Clouds</p>
                <p className="text-lg font-bold">{weatherData.clouds.all}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <Sun className="text-yellow-400 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">Sun Times</p>
                <p className="text-sm">
                  Rise: {formatTime(weatherData.sys.sunrise)}
                </p>
                <p className="text-sm">
                  Set: {formatTime(weatherData.sys.sunset)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeatherDetailDialog;
