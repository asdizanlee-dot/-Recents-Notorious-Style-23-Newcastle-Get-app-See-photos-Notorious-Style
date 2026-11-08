import React from 'react';
import { Leaf, Coffee, Scissors, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>Our Story & Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>625 Albany Hwy, Victoria Park WA</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight">
              A Modern Perth Atelier <br />
              <span className="italic text-amber-200">Where Heritage Meets Contemporary Salon Artistry.</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Established in 2024 along the vibrant Albany Highway strip in Victoria Park, Notorious Style was born out of a clear mission: delivering uncompromising barber craft, razor precision, and premium styling in a welcoming, luxury setting.
            </p>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              We designed an inclusive, design-led space where master barbers and editorial hair stylists work shoulder-to-shoulder. Whether you are coming in for a weekly skin fade, a sculpted beard alignment, or a total restyle, you receive unhurried care and bespoke hospitality.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-neutral-950 border border-neutral-800">
                <div className="font-mono text-2xl font-bold text-amber-300">100%</div>
                <div className="text-xs font-medium text-neutral-300 mt-0.5">Australian Owned & Operated</div>
                <div className="text-[11px] text-neutral-400 mt-1">Victoria Park local business</div>
              </div>
              <div className="p-4 rounded-md bg-neutral-950 border border-neutral-800">
                <div className="font-mono text-2xl font-bold text-amber-300">Est. 2024</div>
                <div className="text-xs font-medium text-neutral-300 mt-0.5">Albany Highway Flagship</div>
                <div className="text-[11px] text-neutral-400 mt-1">Perth Western Australia</div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-neutral-800 shadow-xl bg-neutral-900 group">
              <img
                src="/assets/images/lounge_grooming_apothecary.jpg"
                alt="Notorious Style Victoria Park Barbershop Lounge"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-md bg-neutral-950/90 backdrop-blur-md border border-neutral-800/80 text-white text-xs">
                <span className="font-serif font-semibold block text-sm text-neutral-200">The Notorious Bar & Grooming Reserve</span>
                <span className="text-neutral-400">Complimentary artisanal coffee, cold refreshments, and premium grooming botanicals.</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="p-6 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-md bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Sustainable Salons Australia
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              We proudly partner with Sustainable Salons. 100% of our hair clippings are collected to manufacture floating booms that soak up ocean oil spills. All foil, plastics, and chemicals are responsibly re-purposed.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-md bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Low-Tox Native Botanicals
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              We formulate and curate products infused with native Australian Kakadu plum, Tasmanian blue gum, and desert quandong. Zero sulphates, zero parabens, and 100% cruelty-free hair care.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-md bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Western Australian Hospitality
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              A visit to Notorious Style is a pause from the daily grind. Relax in bespoke leather armchairs, enjoy freshly brewed coffee from local Perth roasters, and experience an authentic, high-vibe community studio.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
