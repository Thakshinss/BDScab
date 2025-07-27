import { Clock, Shield, DollarSign } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose RideEasy?</h2>
          <p className="text-lg text-gray-600">Experience the best in cab booking with our premium services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary text-2xl h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Service</h3>
            <p className="text-gray-600">Book rides anytime, anywhere. Our fleet is available round the clock for your convenience.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary text-2xl h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600">All our drivers are verified and trained. Your safety is our top priority.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-primary text-2xl h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing with no hidden charges. Get the best value for your money.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
