import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LocationSuggestion {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  iconColor?: string;
}

export function LocationInput({ 
  value, 
  onChange, 
  placeholder, 
  className,
  iconColor = "text-gray-400"
}: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.length > 2) {
        searchLocations(value);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const searchLocations = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    onChange(suggestion.display_name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const formatDisplayName = (displayName: string) => {
    // Extract city, state from the full address
    const parts = displayName.split(', ');
    if (parts.length > 3) {
      return parts.slice(0, 3).join(', ');
    }
    return displayName;
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4", iconColor)} />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
        )}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className={cn("pl-10", isLoading && "pr-10", className)}
          autoComplete="off"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              className={cn(
                "px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0",
                index === selectedIndex 
                  ? "bg-blue-50 text-blue-700" 
                  : "hover:bg-gray-50"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {formatDisplayName(suggestion.display_name)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}