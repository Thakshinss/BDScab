import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { ArrowLeft, Send, Car as CarIcon, Users, Luggage } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendBookingEmail } from "@/lib/emailjs";
import { cars } from "@/components/car-showcase";
import type { SearchParams, Car, BookingDetails, CustomerDetails, EmailData } from "@/lib/types";

export default function Booking() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: "",
    mobile: "",
    email: "",
    instructions: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const pickup = params.get("pickup") || "";
    const destination = params.get("destination") || "";
    const datetime = params.get("datetime") || "";
    const passengers = params.get("passengers") || "1";
    const carId = params.get("carId") || "";

    if (pickup && destination && datetime && carId) {
      const car = cars.find(c => c.id === carId);
      if (car) {
        setSearchParams({ pickup, destination, datetime, passengers });
        setSelectedCar(car);
      } else {
        setLocation("/");
      }
    } else {
      setLocation("/");
    }
  }, [searchString, setLocation]);

  const calculateFare = (car: Car): number => {
    const baseDistance = 25; // km
    return Math.round(car.pricePerKm * baseDistance);
  };

  const getETA = (): string => {
    const etas = ["5 mins", "8 mins", "12 mins", "15 mins"];
    return etas[Math.floor(Math.random() * etas.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }
    
    if (!customerDetails.mobile.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your mobile number",
        variant: "destructive",
      });
      return;
    }
    
    if (customerDetails.mobile.length < 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid mobile number",
        variant: "destructive",
      });
      return;
    }

    if (!searchParams || !selectedCar) return;

    setIsSubmitting(true);
    
    try {
      const bookingDetails: BookingDetails = {
        ...searchParams,
        selectedCar,
        estimatedDistance: 25,
        totalFare: calculateFare(selectedCar),
        eta: getETA(),
      };

      const emailData: EmailData = {
        ...bookingDetails,
        ...customerDetails,
        bookingId: `BE${Date.now()}`,
        timestamp: new Date().toLocaleString(),
      };
      
      const success = await sendBookingEmail(emailData);
      
      if (success) {
        toast({
          title: "Booking Confirmed!",
          description: "Your booking has been submitted successfully. You will receive a confirmation email shortly.",
        });
        
        // Redirect to home after successful booking
        setTimeout(() => {
          setLocation("/");
        }, 2000);
      } else {
        toast({
          title: "Booking Failed",
          description: "There was an error submitting your booking. Please try again or contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  if (!searchParams || !selectedCar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setLocation(`/results?${new URLSearchParams(searchParams as unknown as Record<string, string>).toString()}`)}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Results
              </Button>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
              <p className="text-gray-600">
                Review your trip details and provide your information to confirm the booking.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trip Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Trip Summary</h2>
                
                {/* Selected Car */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedCar.image} 
                      alt={selectedCar.name}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{selectedCar.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {selectedCar.capacity} Seats
                        </span>
                        <span className="flex items-center">
                          <Luggage className="mr-1 h-3 w-3" />
                          {selectedCar.bags} Bags
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{calculateFare(selectedCar)}</div>
                      <div className="text-sm text-gray-500">Total Fare</div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium text-right max-w-48 truncate">{searchParams.pickup}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium text-right max-w-48 truncate">{searchParams.destination}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">{new Date(searchParams.datetime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">{searchParams.passengers}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Estimated Distance:</span>
                    <span className="font-medium">25 km</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">ETA:</span>
                    <span className="font-medium">{getETA()}</span>
                  </div>
                </div>

                {/* Fare Breakdown */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Fare Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Fare (25 km × ₹{selectedCar.pricePerKm}/km)</span>
                      <span>₹{calculateFare(selectedCar)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes & Fees</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{calculateFare(selectedCar)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Full Name *</Label>
                    <Input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={customerDetails.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Mobile Number *</Label>
                    <Input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={customerDetails.mobile}
                      onChange={(e) => updateField("mobile", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Address (Optional)</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={customerDetails.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Special Instructions (Optional)</Label>
                    <Textarea
                      placeholder="Any special requests or instructions"
                      rows={4}
                      value={customerDetails.instructions}
                      onChange={(e) => updateField("instructions", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1 resize-none"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before pickup time.
                    </p>
                    <p className="mb-2">
                      <strong>Payment:</strong> Cash or card payment accepted. Pay after your trip.
                    </p>
                    <p>
                      By proceeding, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full primary-gradient text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Confirming Booking..." : "Confirm Booking"}
                  </Button>
                </form>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Need Help?</strong> Call us at +91 98765 43210 for immediate assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}