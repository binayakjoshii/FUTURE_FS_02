
import React, { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cities } from '@/utils/cities';

interface CitySearchProps {
  onSearch: (city: string) => void;
}

const CitySearch = ({ onSearch }: CitySearchProps) => {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <Command className="rounded-lg border shadow-md bg-white/80 backdrop-blur-sm">
        <CommandInput placeholder="Search for a city... (Press ⌘K)" />
        <CommandList>
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup heading="Popular Cities">
            {cities
              .filter((city) => city)
              .map((city) => (
                <CommandItem
                  key={city}
                  onSelect={() => {
                    onSearch(city);
                  }}
                  className="cursor-pointer"
                >
                  {city}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a city..." />
        <CommandList>
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup heading="Popular Cities">
            {cities.map((city) => (
              <CommandItem
                key={city}
                onSelect={() => {
                  onSearch(city);
                  setOpen(false);
                }}
              >
                {city}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default CitySearch;
