import emailjs from '@emailjs/browser';
import type { EmailData } from './types';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

export const sendBookingEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      to_name: 'RideEasy Admin',
      customer_name: emailData.fullName,
      customer_mobile: emailData.mobile,
      customer_email: emailData.email || 'Not provided',
      booking_id: emailData.bookingId,
      pickup_location: emailData.pickup,
      drop_location: emailData.destination,
      travel_datetime: emailData.datetime,
      passengers: emailData.passengers,
      selected_car: emailData.selectedCar.name,
      car_type: emailData.selectedCar.type,
      total_fare: `₹${emailData.totalFare}`,
      estimated_distance: `${emailData.estimatedDistance} km`,
      eta: emailData.eta,
      special_instructions: emailData.instructions || 'None',
      booking_timestamp: emailData.timestamp,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return response.status === 200;
  } catch (error) {
    console.error('EmailJS Error:', error);
    return false;
  }
};

export const initializeEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};
