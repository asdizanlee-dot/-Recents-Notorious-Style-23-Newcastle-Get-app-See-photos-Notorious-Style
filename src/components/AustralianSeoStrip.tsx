import React from 'react';
import { MapPin, Search, Scissors, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';

export const AustralianSeoStrip: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-950 border-b border-neutral-800/80 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Suburb Hub Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
          <div className="flex items-center gap-2 text-neutral-200">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold">Servicing Victoria Park, Burswood, South Perth & Greater Perth WA:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-neutral-300">
            {BUSINESS_INFO.nearbySuburbs.map((suburb, i) => (
              <span key={suburb} className="flex items-center gap-2">
                <span className="hover:text-amber-400 transition-colors">{suburb}</span>
                {i < BUSINESS_INFO.nearbySuburbs.length - 1 && (
                  <span className="text-neutral-700" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Local Keywords & Australian Legal Accreditations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-[11px] leading-relaxed text-neutral-400">
          <div>
            <span className="font-semibold text-neutral-300 block mb-1">
              Local Victoria Park Barbershop & Hair Salon
            </span>
            <p>
              Looking for a premier barber in Victoria Park or a skilled hair stylist along Albany Highway near South Perth and Burswood? Notorious Style delivers precision scissor cuts, skin fades, beard maintenance, and modern styling tailored for WA lifestyles.
            </p>
          </div>

          <div>
            <span className="font-semibold text-neutral-300 block mb-1">
              Australian Consumer Law & Pricing
            </span>
            <p>
              In accordance with Australian Consumer Law (ACL), all rates displayed are in Australian Dollars (AUD) inclusive of 10% GST. No unexpected chair fees or weekend surcharges.
            </p>
          </div>

          <div>
            <span className="font-semibold text-neutral-300 block mb-1">
              Privacy & Data Protection (Cth)
            </span>
            <p>
              Your contact details and hair history are securely managed under the Australian Privacy Act 1988 (Cth). We never sell your personal information or spam your mobile number.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
