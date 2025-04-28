
const API_KEY = '4d8fb5b93d4af21d66a2948710284366';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city: string) => {
  try {
    console.log(`Fetching weather for ${city}...`);
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    return response.json();
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};

export const fetchForecast = async (city: string) => {
  try {
    console.log(`Fetching forecast for ${city}...`);
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Forecast not found');
    }
    return response.json();
  } catch (error) {
    console.error('Forecast fetch error:', error);
    throw error;
  }
};

// Helper function to determine background based on weather
export const getWeatherBackground = (temp: number, weatherCode: string): string => {
  // Hot weather backgrounds
  if (temp > 25) {
    return 'bg-gradient-to-br from-orange-400 via-pink-400 to-red-400';
  }
  // Cold weather backgrounds
  else if (temp < 10) {
    return 'bg-gradient-to-br from-blue-400 via-cyan-400 to-indigo-400';
  }
  // Rainy weather
  else if (weatherCode.startsWith('5') || weatherCode.startsWith('2')) {
    return 'bg-gradient-to-br from-gray-400 via-slate-400 to-zinc-400';
  }
  // Default mild weather
  return 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400';
};
