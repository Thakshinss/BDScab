import CarCard from "./car-card";
import type { Car } from "@/lib/types";

const cars: Car[] = [
  {
    id: "1",
    name: "Economy Sedan",
    type: "sedan",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    capacity: 4,
    bags: 2,
    pricePerKm: 12,
    features: ["AC", "GPS", "Music System"]
  },
  {
    id: "2", 
    name: "Premium SUV",
    type: "suv",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    capacity: 7,
    bags: 4,
    pricePerKm: 18,
    features: ["AC", "GPS", "Premium Interior", "WiFi"]
  },
  {
    id: "3",
    name: "Mini Car", 
    type: "mini",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    capacity: 4,
    bags: 1,
    pricePerKm: 10,
    features: ["AC", "GPS"]
  },
  {
    id: "4",
    name: "Tempo Traveler",
    type: "tempo", 
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    capacity: 12,
    bags: 8,
    pricePerKm: 25,
    features: ["AC", "GPS", "Entertainment System", "Spacious"]
  }
];

export default function CarShowcase() {
  return (
    <section id="cars" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of vehicles, from compact cars for city trips to spacious SUVs for group travel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { cars };
