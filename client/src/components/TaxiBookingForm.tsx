import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Phone, Mail, Car, MessageSquare,Languages } from 'lucide-react';

const TaxiBookingForm = () => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    taxiType: '',
    members: '',
    tripType: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const translations = {
    en: {
      title: "Book Your Taxi",
      subtitle: "Fill in your details for a comfortable ride",
      name: "Full Name",
      mobile: "Mobile Number",
      taxiType: "Taxi/Car Type",
      members: "Number of Members",
      tripType: "Trip Type",
      oneWay: "One Way",
      oneWayDesc: "Single destination",
      roundTrip: "Round Trip",
      roundTripDesc: "Return journey",
      pickupLocation: "Pickup Location",
      dropLocation: "Drop Location",
      date: "Date",
      time: "Time",
      message: "Additional Message",
      bookNow: "Book Now",
      sending: "Sending...",
      successTitle: "Booking request sent successfully!",
      successDesc: "We'll contact you shortly to confirm your booking.",
      errorTitle: "Failed to send booking request.",
      errorDesc: "Please try again or contact us directly.",
      validationTitle: "Please fill in all required fields.",
      validationDesc: "All fields marked with * are mandatory.",
      helpText: "Need help? Contact us at",
      namePlaceholder: "Enter your full name",
      mobilePlaceholder: "+91 98765 43210",
      pickupPlaceholder: "Enter pickup address",
      dropPlaceholder: "Enter destination address",
      messagePlaceholder: "Any special requirements or additional information...",
      selectVehicle: "Select vehicle type",
      selectMembers: "Select members",
      sedan: "Sedan",
      suv: "SUV",
      hatchback: "Hatchback",
      luxury: "Luxury Car",
      minivan: "Minivan",
      person1: "1 Person",
      people2: "2 People",
      people3: "3 People",
      people4: "4 People",
      people5: "5 People",
      people6: "6+ People"
    },
    ta: {
      title: "உங்கள் டாக்ஸியை முன்பதிவு செய்யுங்கள்",
      subtitle: "வசதியான பயணத்திற்காக உங்கள் விவரங்களை நிரப்பவும்",
      name: "முழு பெயர்",
      mobile: "மொபைல் எண்",
      taxiType: "டாக்ஸி/கார் வகை",
      members: "உறுப்பினர்களின் எண்ணிக்கை",
      tripType: "பயண வகை",
      oneWay: "ஒரு வழி",
      oneWayDesc: "ஒற்றை இலக்கு",
      roundTrip: "ரவுண்ட் டிரிப்",
      roundTripDesc: "திரும்பும் பயணம்",
      pickupLocation: "எடுக்கும் இடம்",
      dropLocation: "விடும் இடம்",
      date: "தேதி",
      time: "நேரம்",
      message: "கூடுதல் செய்தி",
      bookNow: "இப்போது முன்பதிவு செய்யுங்கள்",
      sending: "அனுப்புகிறது...",
      successTitle: "முன்பதிவு கோரிக்கை வெற்றிகரமாக அனுப்பப்பட்டது!",
      successDesc: "உங்கள் முன்பதிவை உறுதிப்படுத்த நாங்கள் விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
      errorTitle: "முன்பதிவு கோரிக்கையை அனுப்ப முடியவில்லை.",
      errorDesc: "தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது நேரடியாக எங்களைத் தொடர்பு கொள்ளவும்.",
      validationTitle: "தயவுசெய்து அனைத்து தேவையான புலங்களையும் நிரப்பவும்.",
      validationDesc: "* குறிக்கப்பட்ட அனைத்து புலங்களும் கட்டாயமானவை.",
      helpText: "உதவி தேவையா? எங்களைத் தொடர்பு கொள்ளுங்கள்",
      namePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
      mobilePlaceholder: "+91 98765 43210",
      pickupPlaceholder: "எடுக்கும் முகவரியை உள்ளிடவும்",
      dropPlaceholder: "இலக்கு முகவரியை உள்ளிடவும்",
      messagePlaceholder: "ஏதேனும் சிறப்பு தேவைகள் அல்லது கூடுதல் தகவல்கள்...",
      selectVehicle: "வாகன வகையைத் தேர்ந்தெடுக்கவும்",
      selectMembers: "உறுப்பினர்களைத் தேர்ந்தெடுக்கவும்",
      sedan: "செடான்",
      suv: "எஸ்யூவி",
      hatchback: "ஹேட்ச்பேக்",
      luxury: "சொகுசு கார்",
      minivan: "மினிவேன்",
      person1: "1 நபர்",
      people2: "2 நபர்கள்",
      people3: "3 நபர்கள்",
      people4: "4 நபர்கள்",
      people5: "5 நபர்கள்",
      people6: "6+ நபர்கள்"
    }
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async () => {
    // Basic validation
    if (!formData.name || !formData.mobile || !formData.taxiType || !formData.members || 
        !formData.tripType || !formData.pickupLocation || !formData.dropLocation || 
        !formData.date || !formData.time) {
      setSubmitStatus('validation');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = 'service_k778iw9';
      const templateId = 'template_kqu4po7';
      const publicKey = 'sZdi8W7DdkDXusuSB';

      // Load EmailJS dynamically
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
        
        window.emailjs.init(publicKey);
      }

      const templateParams = {
        to_name: 'Taxi Service',
        from_name: formData.name,
        customer_name: formData.name,
        mobile_number: formData.mobile,
        taxi_type: formData.taxiType,
        number_of_members: formData.members,
        trip_type: formData.tripType,
        pickup_location: formData.pickupLocation,
        drop_location: formData.dropLocation,
        booking_date: formData.date,
        booking_time: formData.time,
        customer_message: formData.message,
        reply_to: formData.mobile
      };

      await window.emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        mobile: '',
        taxiType: '',
        members: '',
        tripType: '',
        pickupLocation: '',
        dropLocation: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br sm:py-8 px-4 md:w-3/4 ">
      <div className="max-w-2xl mx-auto ">
        <div className="bg-gray-100 rounded-2xl shadow-xl p-4 sm:p-8 ">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'தமிழ்' : 'English'}
              </span>
            </button>
          </div>
          <div className="text-center mb-6 sm:mb-8">
            {/* <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full mb-4">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            </div> */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <Users className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.name} <span className='text-red-600'>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={t.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <Phone className="inline w-4 h-4 mr-2 text-blue-600" />
                  {t.mobile} <span className='text-red-600'>*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={t.mobilePlaceholder}
                />
              </div>
            </div>

            {/* Vehicle and Trip Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <Car className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.taxiType} <span className='text-red-600'>*</span>
                </label>
                <select
                  name="taxiType"
                  value={formData.taxiType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">{t.selectVehicle}</option>
                  <option value="sedan">{t.sedan}</option>
                  <option value="suv">{t.suv}</option>
                  <option value="hatchback">{t.hatchback}</option>
                  <option value="luxury">{t.luxury}</option>
                  <option value="minivan">{t.minivan}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <Users className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.members} <span className='text-red-600'>*</span>
                </label>
                <select
                  name="members"
                  value={formData.members}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">{t.selectMembers}</option>
                  <option value="1">{t.person1}</option>
                  <option value="2">{t.people2}</option>
                  <option value="3">{t.people3}</option>
                  <option value="4">{t.people4}</option>
                  <option value="5">{t.people5}</option>
                  <option value="6+">{t.people6}</option>
                </select>
              </div>
            </div>

            {/* Trip Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                {t.tripType} <span className='text-red-600'>*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="relative">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={formData.tripType === 'one-way'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-2 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.tripType === 'one-way' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <div className="font-medium text-sm sm:text-base">{t.oneWay}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t.oneWayDesc}</div>
                    </div>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={formData.tripType === 'round-trip'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-2 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.tripType === 'round-trip' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <div className="font-medium text-sm sm:text-base">{t.roundTrip}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t.roundTripDesc}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <MapPin className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.pickupLocation} <span className='text-red-600'>*</span>
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={t.pickupPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <MapPin className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.dropLocation} <span className='text-red-600'>*</span>
                </label>
                <input
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={t.dropPlaceholder}
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <Calendar className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.date} <span className='text-red-600'>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-1 md:py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  <Clock className="inline w-4 h-4 mr-1 text-blue-600" />
                  {t.time} <span className='text-red-600'>*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 md:py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                <MessageSquare className="inline w-4 h-4 mr-1 text-blue-600" />
                {t.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder={t.messagePlaceholder}
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'validation' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-yellow-800">
                  <p className="font-medium">{t.validationTitle}</p>
                  <p className="text-sm">{t.validationDesc}</p>
                </div>
              </div>
            )}

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="text-green-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="ml-3 text-green-800">
                    <p className="font-medium">{t.successTitle}</p>
                    <p className="text-sm">{t.successDesc}</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800">
                  <p className="font-medium">{t.errorTitle}</p>
                  <p className="text-sm">{t.errorDesc}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={sendEmail}
              disabled={isSubmitting}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-indigo-400 font-medium py-3 sm:py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t.sending}
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  {t.bookNow}
                </>
              )}
            </button>
          </div>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
            <p>{t.helpText} <span className="font-medium text-indigo-600">support@taxiservice.com</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxiBookingForm;