import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our services? Need help with a booking? We're here to help you 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We're available 24/7 to assist you with your transportation needs. 
                  Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-sm text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@rideeasy.com</p>
                      <p className="text-sm text-gray-500">Response within 2 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Office</h3>
                      <p className="text-gray-600">123 Business District</p>
                      <p className="text-gray-600">New Delhi, India</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <Clock className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">24/7 Customer Support</p>
                      <p className="text-sm text-gray-500">Office: Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-semibold text-red-900 mb-2">Emergency Support</h3>
                <p className="text-red-700 mb-3">
                  For urgent assistance during your trip, call our emergency helpline:
                </p>
                <div className="flex items-center space-x-2">
                  <Phone className="text-red-600 h-5 w-5" />
                  <span className="font-bold text-red-900 text-lg">+91 98765 99999</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Subject</Label>
                    <Input
                      type="text"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Message</Label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    disabled={isSubmitting}
                    className="mt-1 resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full primary-gradient text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Quick Response:</strong> For faster assistance with bookings or existing trips, 
                  you can also call us directly at +91 98765 43210.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">How do I cancel my booking?</h3>
                <p className="text-gray-600">
                  You can cancel your booking by calling our support number. Cancellations made 
                  2+ hours before pickup time are free of charge.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Are your drivers verified?</h3>
                <p className="text-gray-600">
                  Yes, all our drivers undergo thorough background checks and training. 
                  We prioritize your safety above everything else.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept cash, credit/debit cards, UPI, and digital wallets. 
                  Payment can be made after your trip completion.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Do you provide airport transfers?</h3>
                <p className="text-gray-600">
                  Yes, we provide 24/7 airport transfer services. Book in advance 
                  for guaranteed availability and special rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}