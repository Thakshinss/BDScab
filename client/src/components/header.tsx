import { useState } from "react";
import { Link } from "wouter";
import { Car, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="text-primary text-2xl" />
            <span className="text-xl font-bold text-gray-900">RideEasy</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <a href="#cars" className="text-gray-700 hover:text-primary transition-colors">
              Our Cars
            </a>
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
              About
            </a>
            <a href="#footer" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <a href="#cars" className="text-gray-700 hover:text-primary transition-colors">
                Our Cars
              </a>
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
                About
              </a>
              <a href="#footer" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
