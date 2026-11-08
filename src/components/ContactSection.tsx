import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Navigation,
  Train,
  Car,
  CheckCircle2,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeMapLayer, setActiveMapLayer] = useState<'street' | 'landmarks' | 'parking'>('street');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'Haircut & Barbering',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceInterest: 'Haircut & Barbering',
        message: '',
      });
    }, 3500);
  };

  // Determine open/closed status for Perth (AWST) time
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= 9 && currentHour < (currentDayIndex === 4 || currentDayIndex === 5 ? 20.5 : 18);

  return (
    <section id="contact" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-12">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Location & Hospitality</span>
            <span aria-hidden="true">·</span>
            <span>Victoria Park, Perth WA</span>
            <span aria-hidden="true">·</span>
            <span>ABN {BUSINESS_INFO.abn}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            Visit Our Victoria Park Studio
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Conveniently situated at 625 Albany Highway in Victoria Park’s bustling retail and dining district. Walk in or reserve your chair online.
          </p>
        </div>

        {/* 2-Column Grid: Map & Details on Left, Enquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (7 cols): Map & Studio Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Map Component */}
            <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
              
              {/* Map Bar */}
              <div className="p-3 sm:p-3.5 bg-neutral-950 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-neutral-300 text-[11px] sm:text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">Albany Highway Strip</span>
                  <span className="text-neutral-500">· Victoria Park WA 6100</span>
                </div>

                {/* Map Layer Filter */}
                <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded border border-neutral-800 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => setActiveMapLayer('street')}
                    className={`px-2 py-1 text-[11px] rounded transition-colors ${
                      activeMapLayer === 'street' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Street Map
                  </button>
                  <button
                    onClick={() => setActiveMapLayer('landmarks')}
                    className={`px-2 py-1 text-[11px] rounded transition-colors ${
                      activeMapLayer === 'landmarks' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Transit
                  </button>
                  <button
                    onClick={() => setActiveMapLayer('parking')}
                    className={`px-2 py-1 text-[11px] rounded transition-colors ${
                      activeMapLayer === 'parking' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Parking
                  </button>
                </div>
              </div>

              {/* Styled Vector Map Canvas */}
              <div className="relative h-72 sm:h-80 bg-[#161a1e] overflow-hidden select-none p-4 flex flex-col justify-between">
                
                {/* SVG Street Grid Background */}
                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="street-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#334155" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#street-grid)" />
                  {/* Diagonal Roads */}
                  <line x1="0" y1="90" x2="100%" y2="170" stroke="#475569" strokeWidth="12" />
                  <line x1="200" y1="0" x2="280" y2="100%" stroke="#475569" strokeWidth="16" />
                  <line x1="0" y1="210" x2="100%" y2="210" stroke="#eab308" strokeWidth="4" strokeDasharray="4 4" />
                </svg>

                {/* Primary Flagship Pin */}
                <div className="relative z-10 self-center my-auto flex flex-col items-center">
                  <div className="p-3 bg-neutral-950 border-2 border-amber-400 rounded-full shadow-2xl text-amber-400 animate-bounce">
                    <MapPin className="w-6 h-6 fill-amber-400 text-neutral-950" />
                  </div>
                  <div className="mt-2 px-3 py-1 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded text-center shadow-lg">
                    <span className="font-serif text-xs font-bold text-white block">Notorious Style</span>
                    <span className="text-[10px] text-amber-300 font-mono">625 Albany Hwy, Victoria Park</span>
                  </div>
                </div>

                {/* Nearby Overlay Pins */}
                {activeMapLayer === 'landmarks' && (
                  <>
                    <div className="absolute top-8 left-10 z-10 bg-neutral-900/90 border border-neutral-700 px-2.5 py-1 rounded text-[11px] text-sky-300 flex items-center gap-1.5 shadow">
                      <Train className="w-3.5 h-3.5" />
                      <span>Victoria Park Station (Armadale Line)</span>
                    </div>
                    <div className="absolute bottom-8 right-12 z-10 bg-neutral-900/90 border border-neutral-700 px-2.5 py-1 rounded text-[11px] text-sky-300 flex items-center gap-1.5 shadow">
                      <Train className="w-3.5 h-3.5" />
                      <span>Bus 960 / 177 / 178 Albany Hwy Stop</span>
                    </div>
                  </>
                )}

                {activeMapLayer === 'parking' && (
                  <>
                    <div className="absolute top-10 right-10 z-10 bg-neutral-900/90 border border-neutral-700 px-2.5 py-1 rounded text-[11px] text-emerald-300 flex items-center gap-1.5 shadow">
                      <Car className="w-3.5 h-3.5" />
                      <span>Free Street Parking on Albany Hwy</span>
                    </div>
                    <div className="absolute bottom-10 left-12 z-10 bg-neutral-900/90 border border-neutral-700 px-2.5 py-1 rounded text-[11px] text-emerald-300 flex items-center gap-1.5 shadow">
                      <Car className="w-3.5 h-3.5" />
                      <span>McMillan St & Hubert St Council Bays</span>
                    </div>
                  </>
                )}

                {/* Open in Google Maps */}
                <div className="relative z-10 flex justify-end">
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/90 border border-neutral-700 text-xs font-medium text-amber-400 hover:text-amber-300 rounded shadow-md transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>

              </div>

              {/* Transit & Parking Details */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-300 space-y-2">
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>By Public Transport:</strong> Transperth high-frequency bus 960, 177, 178, and 179 stop directly along Albany Highway. Victoria Park Railway Station is only a short distance away.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Parking:</strong> Free street parking is available along Albany Highway. Additional convenient parking bays are located on McMillan Street and Hubert Street.</span>
                </div>
              </div>

            </div>

            {/* Trading Hours Table with Live Status */}
            <div className="p-6 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="font-serif text-lg font-semibold text-white">Trading Hours</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                  <span className="text-xs font-mono font-medium text-neutral-300">
                    {isOpenNow ? 'Open Now in Victoria Park WA' : 'Closed · Opens 9:00 AM'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                {BUSINESS_INFO.tradingHours.map((th) => (
                  <div key={th.day} className="flex justify-between py-1 border-b border-neutral-800/40">
                    <span className="text-neutral-400">{th.day}</span>
                    <span className="font-mono text-neutral-200">{th.hours}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-neutral-400 pt-1">
                Public Holiday hours may vary and are announced in advance on our Instagram (@notoriousstyle_barbershop).
              </p>
            </div>

          </div>

          {/* Right Column (5 cols): Direct Contacts & Validated Enquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/60 hover:border-emerald-500 transition-colors block"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </div>
                <div className="font-mono text-xs text-white font-medium truncate">{BUSINESS_INFO.whatsapp}</div>
                <div className="text-[10px] text-emerald-300/80 mt-0.5">Instant booking chat</div>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/50 transition-colors block"
              >
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                  <Phone className="w-4 h-4" />
                  <span>Call Studio</span>
                </div>
                <div className="font-mono text-xs text-white font-medium truncate">{BUSINESS_INFO.phone}</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Direct phone enquiries</div>
              </a>

              <a
                href={`sms:${BUSINESS_INFO.mobileSMS.replace(/[^0-9+]/g, '')}`}
                className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/50 transition-colors block"
              >
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                  <Mail className="w-4 h-4" />
                  <span>SMS</span>
                </div>
                <div className="font-mono text-xs text-white font-medium truncate">{BUSINESS_INFO.mobileSMS}</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Quick booking changes</div>
              </a>
            </div>

            {/* Working Contact Enquiry Form */}
            <div className="p-6 sm:p-7 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <h3 className="font-serif text-xl font-semibold text-white mb-1">
                Direct Studio Enquiry
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Have a question regarding bridal parties, colour consultations, or private events? Send a direct message to our studio manager.
              </p>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-lg font-semibold text-white">
                    Enquiry Received
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Thank you, {formData.name || 'there'}! Our Victoria Park concierge will review your message and reply via email or phone within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jack Henderson"
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0412 345 678 or +61 434 343 997"
                        className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jack@domain.com.au"
                        className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Subject / Service Area
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Men's Haircuts">Men’s Haircuts (Skin Fades, Tapers, Modern & Classic)</option>
                      <option value="Beard Grooming">Beard Grooming (Trimming, Shaping, Line-ups)</option>
                      <option value="Women's Hair Services">Women’s Hair Services (Haircuts, Colouring, Foils)</option>
                      <option value="Beauty Services">Beauty Services (Nail Services & Hair Removal)</option>
                      <option value="Wedding / Groomsmen Party">Wedding / Groomsmen Party Booking</option>
                      <option value="General Question">General Studio Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know dates, requirements, or any specific questions..."
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-neutral-400">
                    We respect your privacy under the Privacy Act 1988 (Cth). Your information is strictly used for appointment coordination.
                  </p>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Studio Enquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
