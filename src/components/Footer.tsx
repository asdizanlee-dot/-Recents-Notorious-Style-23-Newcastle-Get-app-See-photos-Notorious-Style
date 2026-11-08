import React from 'react';
import { Scissors, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <img
                src="/assets/brand/notorious_logo.png"
                alt="Notorious Style Barbershop Logo"
                className="w-10 h-10 rounded-full object-cover border border-amber-500/40 bg-black"
              />
              <span className="font-serif text-xl font-bold tracking-wider uppercase text-neutral-100">
                NOTORIOUS STYLE
              </span>
            </div>
            
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Victoria Park’s premier barbershop and hair salon studio on Albany Highway. Delivering precision fades, beard sculpting, hot towel shaves, and authentic Western Australian hospitality.
            </p>

            <div className="text-xs text-neutral-400 space-y-1 pt-1 font-mono">
              <div>ABN: {BUSINESS_INFO.abn}</div>
              <div>Est. 2024 · Victoria Park WA</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Studio Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services & Pricing (AUD)</a></li>
              <li><a href="#team" className="hover:text-amber-400 transition-colors">Meet the Artisans</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Portfolio & Lookbook</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Google Reviews (4.6★ · 97)</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Our Atelier</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Location & Transit</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Direct Contact
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>625 Albany Hwy, Victoria Park WA 6100</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours & Booking */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Trading Summary
            </h4>
            <div className="space-y-1 text-neutral-300 font-mono text-[11px]">
              <div>Mon – Wed: 9:00 AM – 6:00 PM</div>
              <div className="text-amber-300">Thu – Fri: 8:30 AM – 8:30 PM (Late)</div>
              <div>Saturday: 8:00 AM – 5:30 PM</div>
              <div>Sunday: 10:00 AM – 4:00 PM</div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-3 w-full py-2 px-3 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Book Appointment Online
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Notorious Style Barbershop & Salon. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#about" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="hover:text-neutral-400 transition-colors">Victoria Park Studio</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
