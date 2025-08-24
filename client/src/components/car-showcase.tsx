import CarCard from "./car-card";
import type { Car } from "@/lib/types";
import van from "../assest/coach_van.jpeg"
import dezire from "../assest/dezire.jpeg"
import traveller from "../assest/tempo.jpeg"
import innova from "../assest/innova.jpeg"
// import van from "../assest/coach_van.jpeg"


const cars: Car[] = [
  {
    id: "1",
    name: "Economy Sedan",
    type: "sedan",
    image: dezire,
    capacity: 4,
    bags: 2,
    pricePerKm: 12,
    features: ["AC", "GPS", "Music System"]
  },
  {
    id: "2", 
    name: "Premium SUV",
    type: "suv",
    image: innova,
    capacity: 7,
    bags: 4,
    pricePerKm: 18,
    features: ["AC", "GPS", "Premium Interior", "WiFi"]
  },
  {
    id: "3",
    name: "Tempo Traveler", 
    type: "Tempo",
    image: traveller,
    capacity: 4,
    bags: 1,
    pricePerKm: 10,
    features: ["AC", "GPS"]
  },
  {
    id: "4",
    name: "Tempo Traveler",
    type: "tempo", 
    image: van,
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Cars</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of vehicles
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
