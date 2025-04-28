
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Example city list – expand as needed
const CITY_SUGGESTIONS = [
  'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
  'San Francisco', 'Mumbai', 'Moscow', 'Beijing', 'Seoul',
];

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const WeatherSearch = ({ onSearch, isLoading, error }: WeatherSearchProps) => {
  const [city, setCity] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCities =
    city.trim().length > 0
      ? CITY_SUGGESTIONS.filter((c) =>
          c.toLowerCase().startsWith(city.trim().toLowerCase())
        )
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowDropdown(false);
      // Fun shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setCity(suggestion);
    setShowDropdown(false);
    onSearch(suggestion);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // For ripple effect
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | null>(null);
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleStyle({
      top: e.clientY - rect.top - 15 + 'px',
      left: e.clientX - rect.left - 15 + 'px',
    });
    setTimeout(() => setRippleStyle(null), 400);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className={`
          relative w-full max-w-2xl mt-0 mb-10 flex items-center
          bg-gradient-to-br from-[#8B5CF6] via-[#1EAEDB] to-[#9b87f5]
          border-4 border-white shadow-[0_8px_32px_0_rgba(30,174,219,0.25)]
          rounded-2xl
          ${shake ? 'animate-shake' : ''}
          ${mounted ? 'animate-pop-in' : 'opacity-0'}
          transition-all duration-300
        `}
        style={{ minHeight: 68, zIndex: 40, boxShadow: '0 0 32px 0 #1EAEDB33' }}
        autoComplete="off"
      >
        <Input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="🌦️ Search any city worldwide..."
          className="flex-1 px-8 py-6 text-2xl bg-transparent border-none placeholder-white/80 text-white font-bold focus:ring-0 focus:outline-none drop-shadow-md"
          disabled={isLoading}
          spellCheck={false}
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={isLoading}
          onClick={handleButtonClick}
          className="bg-white/90 hover:bg-white text-purple-700 font-bold shadow-xl px-11 py-3 rounded-full text-2xl transition-all duration-300 border-l-0 border-none hover:scale-105 focus:ring-2 focus:ring-[#1EAEDB] relative overflow-hidden"
          aria-label="Search"
        >
          <Search className="h-8 w-8" />
          {rippleStyle && (
            <span
              className="absolute bg-blue-300/60 rounded-full pointer-events-none animate-ripple"
              style={{
                width: 40, height: 40,
                ...rippleStyle
              }}
            />
          )}
        </Button>
        {/* Autocomplete Dropdown */}
        {showDropdown && filteredCities.length > 0 && (
          <div className="
              absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl text-purple-800 w-full z-50 py-2
              animate-fade-in
            ">
            {filteredCities.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full text-left px-5 py-3 hover:bg-blue-100/80 hover:text-purple-900 text-lg transition-colors"
                onClick={() => handleSelectSuggestion(suggestion)}
                tabIndex={-1}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>

      {error && (
        <Alert variant="destructive" className="mt-1 text-base bg-red-600/20 text-red-100 border border-red-500/30 max-w-2xl">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <p className="text-sm text-white/90 mt-5 text-center max-w-2xl">
        Try a major city like <span className="font-semibold text-sky-200">London</span>, <span className="font-semibold text-sky-200">New York</span>, or <span className="font-semibold text-sky-200">Tokyo</span>.
        <br />
        <span className="block mt-2 font-semibold text-violet-100">Tips: Use autocomplete or press the ripple button for a surprise!</span>
      </p>

      {/* Animations */}
      <style>
        {`
        @keyframes shake {
          0% { transform: translateX(0); }
          15% { transform: translateX(-4px); }
          30% { transform: translateX(4px); }
          45% { transform: translateX(-3px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
          85% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.45s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes pop-in {
          0% { transform: scale(0.95) translateY(24px); opacity: 0; }
          90% { opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(.24,1.28,.58,1.05) 0s both;
        }
        @keyframes ripple {
          to { transform: scale(2.6); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.4s linear;
        }
        `}
      </style>
    </div>
  );
};

export default WeatherSearch;

