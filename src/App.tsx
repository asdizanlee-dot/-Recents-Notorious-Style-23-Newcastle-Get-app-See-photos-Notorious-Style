/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AustralianSeoStrip } from './components/AustralianSeoStrip';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { REVIEWS_DATA, BUSINESS_INFO } from './data/salonData';
import { BookingAppointment, ReviewItem } from './types';
import { Calendar, Phone } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedTeamMemberId, setPreselectedTeamMemberId] = useState<string | undefined>(undefined);

  // Reviews list with ability to submit new ones
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);

  // Appointments in localStorage with a realistic initial booking sample
  const [appointments, setAppointments] = useState<BookingAppointment[]>(() => {
    try {
      const saved = localStorage.getItem('notorious_appointments') || localStorage.getItem('kingsley_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading appointments from localStorage', e);
    }
    // Default initial confirmed appointment so users can test "My Bookings" immediately
    return [
      {
        id: 'booking-sample-1',
        referenceCode: 'NS-PER-3914',
        serviceId: 'srv-skin-fade',
        serviceName: 'Skin Fades',
        serviceCategory: 'mens_haircuts',
        servicePriceAUD: 55,
        durationMinutes: 45,
        teamMemberId: 'team-andy',
        teamMemberName: 'Andy (Owner)',
        date: 'Thursday, 12 November 2026',
        timeSlot: '02:15 PM',
        clientName: 'Alexander Hayes',
        clientEmail: 'a.hayes@wamail.com.au',
        clientPhone: BUSINESS_INFO.phone,
        notes: 'Pre-event grooming. Low drop fade with textured top.',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Sync appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('notorious_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments to localStorage', e);
    }
  }, [appointments]);

  const handleOpenBooking = (serviceId?: string, teamMemberId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedTeamMemberId(teamMemberId);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newBooking: BookingAppointment) => {
    setAppointments((prev) => [newBooking, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsAppointmentsOpen(true)}
        bookingCount={appointments.length}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Services & Pricing (AUD) */}
        <ServicesSection
          onBookService={(serviceId) => handleOpenBooking(serviceId, undefined)}
        />

        {/* 3. Meet the Team / Barbers & Stylists */}
        <TeamSection
          onBookWithMember={(memberId) => handleOpenBooking(undefined, memberId)}
        />

        {/* 4. Portfolio Gallery / Lookbook */}
        <GallerySection onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Customer Reviews (Google Business Profile) */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 6. About Us & Sustainability */}
        <AboutSection />

        {/* 7. Contact Us, Interactive Map & Trading Hours */}
        <ContactSection />

        {/* 8. Australian SEO & Suburbs Hub */}
        <AustralianSeoStrip />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Online Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedTeamMemberId={preselectedTeamMemberId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* My Appointments Modal */}
      <MyAppointmentsModal
        isOpen={isAppointmentsOpen}
        onClose={() => setIsAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onOpenNewBooking={() => {
          setIsAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Mobile Sticky Booking Bar (within 15% viewport height cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 flex items-center gap-3">
        <a
          href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-200 hover:text-white"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call Studio</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-amber-400 text-xs font-semibold text-neutral-950 hover:bg-amber-300 shadow-md cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Chair</span>
        </button>
      </div>

    </div>
  );
}
