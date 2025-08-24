import { useState } from "react";
import { Link } from "wouter";
import { Car, Menu, X } from "lucide-react";
import cablogo from "../assest/bds_logo.png"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-50 shadow-md sticky top-0 z-50 py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2"> 
          <img
                src={cablogo}
                alt="Cab booking illustration"
                className="w-24 h-24"
              />
            <span className="text-xl font-bold text-gray-900">BDS Cab</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <a href="#cars" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Our Cars
            </a>
            <a href="#features" className="text-gray-700 hover:text-primary font-medium transition-colors">
              About
            </a>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Contact
            </Link>
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
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
