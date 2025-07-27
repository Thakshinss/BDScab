export interface SearchParams {
  pickup: string;
  destination: string;
  datetime: string;
  passengers: string;
}

export interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  images?: string[];
  capacity: number;
  bags: number;
  pricePerKm: number;
  features: string[];
}

export interface BookingDetails extends SearchParams {
  selectedCar: Car;
  estimatedDistance: number;
  totalFare: number;
  eta: string;
}

export interface CustomerDetails {
  fullName: string;
  mobile: string;
  email?: string;
  instructions?: string;
}

export interface EmailData extends BookingDetails, CustomerDetails {
  bookingId: string;
  timestamp: string;
}
