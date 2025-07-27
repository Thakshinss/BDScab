import { Users, Luggage } from "lucide-react";
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
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <img 
        src={car.image} 
        alt={car.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
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
