import SearchForm from "./search-form";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Book Your Perfect
            <span className="text-primary"> Ride</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience comfort and reliability with our premium cab booking service. 
            Safe, affordable, and always on time.
          </p>
          
          <SearchForm />
        </div>
      </div>
    </section>
  );
}
