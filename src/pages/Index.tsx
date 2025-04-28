
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import WeatherCard from '@/components/WeatherCard';
import WeatherDashboard from '@/components/WeatherDashboard';
import RainAnimation from '@/components/animations/RainAnimation';
import SunAnimation from '@/components/animations/SunAnimation';
import ForecastCard from '@/components/ForecastCard';
import { fetchWeather, fetchForecast, getWeatherBackground } from '@/utils/weatherApi';
import WeatherSearch from '@/components/WeatherSearch';

const Index = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [background, setBackground] = useState('bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteLocations');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`Searching for ${city}...`);
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);

      setWeather(weatherData);

      // Update background based on weather conditions
      setBackground(getWeatherBackground(weatherData.main.temp, weatherData.weather[0].id.toString()));

      // Process 5-day forecast
      const dailyForecast = forecastData.list.filter((item: any, index: number) => index % 8 === 0).slice(0, 5);
      setForecast(dailyForecast);

      toast({
        description: `Weather updated for ${city}`,
      });
    } catch (error: any) {
      console.error("Search error:", error);
      setError(error.message || "City not found. Please try a different city name.");

      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "City not found. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!weather) return;

    const cityName = weather.name;
    if (favorites.includes(cityName)) {
      setFavorites(favorites.filter(city => city !== cityName));
      toast({
        description: `Removed ${cityName} from favorites`,
      });
    } else {
      setFavorites([...favorites, cityName]);
      toast({
        description: `Added ${cityName} to favorites`,
      });
    }
  };

  const isRaining = weather?.weather[0]?.id >= 200 && weather?.weather[0]?.id < 600;
  const isHot = weather?.main?.temp > 25;

  return (
    <div className={`min-h-screen p-6 animate-gradient-xy transition-colors duration-1000 ${background}`}>
      {isRaining && <RainAnimation />}
      {isHot && !isRaining && <SunAnimation />}

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center pt-8 pb-4">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Weather Forecast
          </h1>
          <p className="text-white/90 text-lg">
            Get instant weather updates for any location worldwide
          </p>
        </div>

        {/* Only one search box now, wrapped with distinct styling */}
        <div className="relative z-10 max-w-xl mx-auto">
          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} error={error} />
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {favorites.map((city) => (
              <button
                key={city}
                onClick={() => handleSearch(city)}
                className="px-5 py-2.5 text-sm bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white mt-2">Fetching weather data...</p>
          </div>
        )}

        {!isLoading && weather && (
          <div className="space-y-6 animate-fade-in">
            <WeatherCard
              city={weather.name}
              temperature={weather.main.temp}
              humidity={weather.main.humidity}
              windSpeed={weather.wind.speed}
              description={weather.weather[0].description}
              icon={weather.weather[0].icon}
              onFavorite={toggleFavorite}
              isFavorite={favorites.includes(weather.name)}
            />

            <WeatherDashboard weatherData={weather} />

            {forecast.length > 0 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-white mb-4 drop-shadow">5-Day Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {forecast.map((day: any) => (
                    <ForecastCard
                      key={day.dt}
                      date={new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      temperature={day.main.temp}
                      icon={day.weather[0].icon}
                      description={day.weather[0].description}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && !weather && !error && (
          <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-lg">
            <p className="text-white text-lg">Start by searching for a city</p>
            <p className="text-white/70 text-sm mt-2">Try popular cities like London, New York, or Tokyo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

