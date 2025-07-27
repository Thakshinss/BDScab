import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carsPerView, setCarsPerView] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  // Update cars per view based on screen size
  const updateCarsPerView = () => {
    if (window.innerWidth >= 1024) {
      setCarsPerView(4); // Desktop: show all cars in grid
    } else if (window.innerWidth >= 768) {
      setCarsPerView(2); // Tablet: show 2 cars per slide
    } else {
      setCarsPerView(1); // Mobile: show 1 car per slide
    }
  };

  useEffect(() => {
    updateCarsPerView();
    window.addEventListener('resize', updateCarsPerView);
    return () => window.removeEventListener('resize', updateCarsPerView);
  }, []);
  
  const totalSlides = Math.ceil(cars.length / carsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || window.innerWidth >= 1024 || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="cars" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of vehicles, from compact cars for city trips to spacious SUVs for group travel
          </p>
        </div>
        
        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Mobile/Tablet Slider View */}
        <div 
          className="lg:hidden relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 flex gap-4 px-4">
                  {cars.slice(slideIndex * carsPerView, (slideIndex + 1) * carsPerView).map((car) => (
                    <div key={car.id} className={`${carsPerView === 2 ? 'w-1/2' : 'w-full'} flex-shrink-0`}>
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white/80 hover:bg-white shadow-lg z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white/80 hover:bg-white shadow-lg z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-primary scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              {currentSlide + 1} of {totalSlides}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { cars };
