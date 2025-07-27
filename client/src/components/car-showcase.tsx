import CarCard from "./car-card";
import type { Car } from "@/lib/types";

const cars: Car[] = [
  {
    id: "1",
    name: "Economy Sedan",
    type: "sedan",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
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
