import { Car, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="text-primary text-2xl" />
              <span className="text-xl font-bold">RideEasy</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for safe, comfortable, and affordable rides. Available 24/7 across the city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#cars" className="text-gray-400 hover:text-white transition-colors">Our Cars</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">City Rides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Airport Transfer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Outstation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wedding</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="text-primary h-5 w-5" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary h-5 w-5" />
                <span className="text-gray-400">info@rideeasy.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary h-5 w-5" />
                <span className="text-gray-400">123 Business District, City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 RideEasy. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors"> Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
