import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendBookingEmail } from "@/lib/emailjs";
import type { BookingDetails, CustomerDetails, EmailData } from "@/lib/types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

export default function BookingModal({ isOpen, onClose, bookingDetails }: BookingModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: "",
    mobile: "",
    email: "",
    instructions: "",
  });

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

    setIsSubmitting(true);
    
    try {
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
        onClose();
        setCustomerDetails({
          fullName: "",
          mobile: "",
          email: "",
          instructions: "",
        });
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Complete Your Booking</h3>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Trip Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium">{bookingDetails.selectedCar.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="truncate max-w-32">{bookingDetails.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="truncate max-w-32">{bookingDetails.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span>{new Date(bookingDetails.datetime).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Total Fare:</span>
                <span className="font-bold text-primary">₹{bookingDetails.totalFare}</span>
              </div>
            </div>
          </div>
          
          {/* Customer Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                type="text"
                required
                placeholder="Enter your full name"
                value={customerDetails.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">Mobile Number</Label>
              <Input
                type="tel"
                required
                placeholder="Enter your mobile number"
                value={customerDetails.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                disabled={isSubmitting}
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
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">Special Instructions (Optional)</Label>
              <Textarea
                placeholder="Any special requests or instructions"
                rows={3}
                value={customerDetails.instructions}
                onChange={(e) => updateField("instructions", e.target.value)}
                disabled={isSubmitting}
                className="resize-none"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 primary-gradient"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
