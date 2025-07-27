import { useState } from "react";
import { Users, Luggage, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Car } from "@/lib/types";

interface CarCardProps {
  car: Car;
  onBookNow?: (car: Car) => void;
  showBookButton?: boolean;
  totalFare?: number;
  eta?: string;
}

export default function CarCard({ car, onBookNow, showBookButton = false, totalFare, eta }: CarCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = car.images || [car.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt={`${car.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center text-gray-600">
            <Users className="mr-1 h-4 w-4" />
            {car.capacity} Seats
          </span>
          <span className="flex items-center text-gray-600">
            <Luggage className="mr-1 h-4 w-4" />
            {car.bags} Bags
          </span>
          {eta && (
            <span className="flex items-center text-gray-600 text-sm">
              🕒 {eta}
            </span>
          )}
        </div>
        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {totalFare ? `₹${totalFare}` : `₹${car.pricePerKm}/km`}
            </span>
            <span className="text-sm text-gray-500">
              {totalFare ? "Total Fare" : "Base Fare"}
            </span>
          </div>
          {showBookButton && onBookNow && (
            <Button 
              onClick={() => onBookNow(car)}
              className="w-full mt-4 primary-gradient text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
