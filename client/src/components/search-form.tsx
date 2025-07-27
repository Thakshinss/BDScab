import { useState } from "react";
import { useLocation } from "wouter";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { useToast } from "@/hooks/use-toast";
import type { SearchParams } from "@/lib/types";

interface SearchFormProps {
  onSearch?: (params: SearchParams) => void;
  initialData?: Partial<SearchParams>;
}

export default function SearchForm({ onSearch, initialData }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SearchParams>({
    pickup: initialData?.pickup || "",
    destination: initialData?.destination || "",
    datetime: initialData?.datetime || "",
    passengers: initialData?.passengers || "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickup.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a pickup location",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.destination.trim()) {
      toast({
        title: "Validation Error", 
        description: "Please enter a destination",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.datetime) {
      toast({
        title: "Validation Error",
        description: "Please select date and time",
        variant: "destructive",
      });
      return;
    }

    const searchParams = new URLSearchParams(formData as unknown as Record<string, string>);
    
    if (onSearch) {
      onSearch(formData);
    } else {
      setLocation(`/results?${searchParams.toString()}`);
    }
  };

  const updateField = (field: keyof SearchParams, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Pickup Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Enter pickup location"
              value={formData.pickup}
              onChange={(e) => updateField("pickup", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Drop Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Enter destination"
              value={formData.destination}
              onChange={(e) => updateField("destination", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Date & Time</Label>
          <DateTimePicker
            value={formData.datetime}
            onChange={(value) => updateField("datetime", value)}
            placeholder="Select date and time"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Passengers</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
            <Select value={formData.passengers} onValueChange={(value) => updateField("passengers", value)}>
              <SelectTrigger className="pl-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Passenger</SelectItem>
                <SelectItem value="2">2 Passengers</SelectItem>
                <SelectItem value="3">3 Passengers</SelectItem>
                <SelectItem value="4">4 Passengers</SelectItem>
                <SelectItem value="5+">5+ Passengers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="primary-gradient text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Search className="mr-2 h-4 w-4" />
          Search Rides
        </Button>
      </form>
    </div>
  );
}
