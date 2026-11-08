import React from 'react';
import { Calendar, Clock, Star, StarHalf, MapPin, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            
            {/* Quiet Location & Heritage Kicker (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide uppercase text-amber-400">
              <span>Victoria Park, Perth WA</span>
              <span aria-hidden="true">·</span>
              <span>625 Albany Hwy</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2024</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] text-balance">
              Refined Craft. <br />
              <span className="italic font-light text-amber-200">Notorious Style.</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Victoria Park’s premier barbershop and hair studio on Albany Highway. Delivering precision skin fades, beard sculpting, traditional straight-razor hot towel shaves, and bespoke styling with authentic Australian hospitality.
            </p>

            {/* Primary Action & Secondary In-Page Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-3 px-7 py-3.5 text-sm sm:text-base font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-md hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Chair Online</span>
              </button>

              <a
                href="#services"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-neutral-200 bg-neutral-900/90 border border-neutral-800 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <span>View Services & AUD Rates</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            {/* Australian Hospitality & Standard Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs sm:text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Single-origin espresso & Tasmanian whisky</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Unhurried 45–60 min bespoke consultations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Sustainable Salons Australia certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>All prices in AUD · 10% GST included</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/assets/images/notorious_style_interior.jpg"
                alt="Notorious Style Victoria Park Barbershop Interior"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Floating studio caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-md bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-neutral-100">The Victoria Park Studio</h3>
                    <p className="text-xs text-neutral-400">625 Albany Highway · Victoria Park WA 6100</p>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-1 rounded">
                    Open 7 Days
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Credibility & Service Strip */}
        <div className="mt-14 pt-10 border-t border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400">
              <div className="flex items-center">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <StarHalf className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-mono font-bold text-base text-white">4.6</span>
              <span className="text-xs text-neutral-400">(97)</span>
            </div>
            <p className="text-sm font-semibold text-neutral-200">Google Verified Rating</p>
            <p className="text-xs text-neutral-400">97 authentic Google reviews</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-bold text-lg text-white">Albany Hwy</span>
            </div>
            <p className="text-sm font-semibold text-neutral-200">Victoria Park WA</p>
            <p className="text-xs text-neutral-400">Heart of the dining & shopping strip</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-bold text-lg text-white">Late Nights</span>
            </div>
            <p className="text-sm font-semibold text-neutral-200">Thu & Fri Till 8:30 PM</p>
            <p className="text-xs text-neutral-400">Post-work grooming & complimentary drinks</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-bold text-lg text-white">Australian Native</span>
            </div>
            <p className="text-sm font-semibold text-neutral-200">Low-Tox Hair Care</p>
            <p className="text-xs text-neutral-400">Kevin Murphy, K18 & Australian botanical oils</p>
          </div>

        </div>

      </div>
    </section>
  );
};
