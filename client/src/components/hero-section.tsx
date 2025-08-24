import SearchForm from "./search-form";
import TaxiBookingForm from "./TaxiBookingForm";
import cabimg from "../assest/taxi-app-concept-illustration.png"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-2 right-60 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="relative z-10 container px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex flex-col md:flex-row items-center">
          <div className="md:pb-36">
            <img
              src={cabimg}
              alt="Cab booking illustration"
              className="w-full max-w-md"
            />
            <h1 className="text-4xl mt-10 md:text-6xl font-bold text-gray-900 mb-6">
              Book Your Ride on 
              <span className="text-primary text-yellow-500"> BDS Cab</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Fast. Safe. Affordable. Trusted by thousands in Nagercoil and surrounding areas.
            </p>
          </div>
          <TaxiBookingForm/>
          {/* <SearchForm /> */}
        </div>
      </div>
    </section>
  );
}
