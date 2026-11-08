import React, { useState } from 'react';
import { Clock, Check, Calendar, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'mens_haircuts', label: "Men's Haircuts" },
    { id: 'beard_grooming', label: 'Beard Grooming' },
    { id: 'womens_hair', label: "Women's Hair Services" },
    { id: 'beauty_services', label: 'Beauty Services' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>Transparent AUD Pricing</span>
              <span aria-hidden="true">·</span>
              <span>10% GST Included</span>
              <span aria-hidden="true">·</span>
              <span>No Surcharges</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Services & Menu
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Every service includes a dedicated consultation, complimentary beverage from our bar, scalp wash, and bespoke finish. We use low-tox, cruelty-free Australian botanical hair care.
            </p>
          </div>

          <div className="text-right text-xs text-neutral-400 hidden md:block">
            <span className="font-mono text-neutral-300">Complimentary consultation</span> with every appointment.
          </div>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between p-6 rounded-lg bg-neutral-950 border transition-all relative ${
                service.popular
                  ? 'border-amber-500/40 shadow-lg shadow-amber-950/10'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Client Favourite</span>
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2 pr-16">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {service.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
                    ${service.priceAUD}
                  </span>
                  <span className="text-xs text-neutral-400 uppercase">AUD · Incl. GST</span>
                  <span className="text-neutral-600">·</span>
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{service.durationMinutes} min</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-neutral-900">
                  <p className="text-[11px] font-medium tracking-wide uppercase text-neutral-400">
                    Service Includes:
                  </p>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {service.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-900">
                <button
                  onClick={() => onBookService(service.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-neutral-900 border border-neutral-800 rounded-md hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Group & Bridal Notice */}
        <div className="mt-12 p-6 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-1">
              Groomsmen Parties, Bridal Packages & Private Studio Hire
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl">
              Planning a wedding, event, or private editorial session? We offer exclusive full-studio buyouts with private barista, whisky tasting flight, and tailored group grooming in Victoria Park.
            </p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/50 rounded-md hover:bg-amber-950/30 transition-colors whitespace-nowrap shrink-0"
          >
            Enquire For Events
          </a>
        </div>

      </div>
    </section>
  );
};
