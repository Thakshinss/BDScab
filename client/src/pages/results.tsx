import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CarCard from "@/components/car-card";
import BookingModal from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cars } from "@/components/car-showcase";
import type { SearchParams, Car, BookingDetails } from "@/lib/types";

export default function Results() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const pickup = params.get("pickup") || "";
    const destination = params.get("destination") || "";
    const datetime = params.get("datetime") || "";
    const passengers = params.get("passengers") || "1";

    if (pickup && destination && datetime) {
      setSearchParams({ pickup, destination, datetime, passengers });
    } else {
      setLocation("/");
    }
  }, [searchString, setLocation]);

  const calculateFare = (car: Car): number => {
    // Mock calculation based on estimated distance
    const baseDistance = 25; // km
    return Math.round(car.pricePerKm * baseDistance);
  };

  const getETA = (): string => {
    const etas = ["5 mins", "8 mins", "12 mins", "15 mins"];
    return etas[Math.floor(Math.random() * etas.length)];
  };

  const handleBookNow = (car: Car) => {
    if (!searchParams) return;
    
    const bookingDetails: BookingDetails = {
      ...searchParams,
      selectedCar: car,
      estimatedDistance: 25, // Mock distance
      totalFare: calculateFare(car),
      eta: getETA(),
    };
    
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  // Filter cars based on passenger count
  const passengerCount = parseInt(searchParams.passengers.replace("+", ""));
  const availableCars = cars.filter(car => car.capacity >= passengerCount);

  const bookingDetails: BookingDetails | null = selectedCar ? {
    ...searchParams,
    selectedCar,
    estimatedDistance: 25,
    totalFare: calculateFare(selectedCar),
    eta: getETA(),
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Rides</h2>
            <p className="text-gray-600">
              Showing rides from <span className="font-medium">{searchParams.pickup}</span> to{" "}
              <span className="font-medium">{searchParams.destination}</span> on{" "}
              <span className="font-medium">{new Date(searchParams.datetime).toLocaleDateString()}</span>
            </p>
          </div>

          {availableCars.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Available Cars</h3>
              <p className="text-gray-600">
                Sorry, we don't have any cars available for {searchParams.passengers} passengers.
                Please try with fewer passengers or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onBookNow={handleBookNow}
                  showBookButton={true}
                  totalFare={calculateFare(car)}
                  eta={getETA()}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {bookingDetails && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          bookingDetails={bookingDetails}
        />
      )}
    </div>
  );
}
