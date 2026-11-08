import React, { useState } from 'react';
import { Scissors, Calendar, Clock, Menu, X, BookmarkCheck, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, teamMemberId?: string) => void;
  onOpenMyAppointments: () => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  bookingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services & Pricing', href: '#services' },
    { label: 'Our Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact & Hours', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      {/* Top Bar Contract: Zone 1 (Brand Wordmark) — Zone 2 (4-6 single-line links) — Zone 3 (1 primary action) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        
        {/* Zone 1: Single clean text element wordmark with logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 text-white group whitespace-nowrap shrink-0">
          <img
            src="/assets/brand/notorious_logo.png"
            alt="Notorious Style Barbershop"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-amber-500/40 group-hover:border-amber-400 transition-colors bg-black shadow-sm"
          />
          <span className="font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-wider uppercase text-neutral-100 group-hover:text-amber-400 transition-colors">
            NOTORIOUS STYLE
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ optional subtle appointment badge) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {bookingCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md hover:border-amber-500/50 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              title="View your saved appointments"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
              <span>My Bookings ({bookingCount})</span>
            </button>
          )}

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-md hover:brightness-110 active:scale-[0.98] transition-all shadow-sm shadow-amber-950/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              Book<span className="hidden sm:inline"> Appointment</span>
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-900 focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-5 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-amber-400 text-base font-medium py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2.5">
            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-md"
              >
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>My Appointments ({bookingCount})</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Call Studio: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
