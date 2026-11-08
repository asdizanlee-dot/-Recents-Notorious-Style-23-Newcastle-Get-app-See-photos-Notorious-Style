import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Download,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { SERVICES_DATA, TEAM_MEMBERS, BUSINESS_INFO } from '../data/salonData';
import { BookingAppointment, ServiceItem, TeamMember } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedTeamMemberId?: string;
  onBookingConfirmed: (booking: BookingAppointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedTeamMemberId,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || '');
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState<string>(preselectedTeamMemberId || 'any');
  
  // Date & Time state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Form details
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);

  // Completed booking
  const [confirmedBooking, setConfirmedBooking] = useState<BookingAppointment | null>(null);
  const [phoneError, setPhoneError] = useState<string>('');

  // Generate the next 14 calendar days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-AU', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-AU', { month: 'short' });
      const fullDateStr = d.toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const isoStr = d.toISOString().split('T')[0];
      dates.push({
        iso: isoStr,
        dayName,
        dayNum,
        monthName,
        fullDateStr,
        isSunday: d.getDay() === 0,
      });
    }
    return dates;
  }, []);

  // Sync pre-selected props when modal opens
  useEffect(() => {
    if (isOpen) {
      if (preselectedServiceId) {
        setSelectedServiceId(preselectedServiceId);
        setStep(2); // If service is passed, jump straight to specialist
      } else {
        setStep(1);
      }
      if (preselectedTeamMemberId) {
        setSelectedTeamMemberId(preselectedTeamMemberId);
      }
      if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0].iso);
      }
    }
  }, [isOpen, preselectedServiceId, preselectedTeamMemberId, availableDates]);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId);
  const currentMember = TEAM_MEMBERS.find((m) => m.id === selectedTeamMemberId);
  const specialistDisplayName = currentMember
    ? `${currentMember.name} (${currentMember.role})`
    : 'Any Available Specialist (Fastest)';

  // Slots based on day of week
  const morningSlots = ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'];
  const afternoonSlots = ['12:00 PM', '12:45 PM', '01:30 PM', '02:15 PM', '03:15 PM', '04:00 PM'];
  const eveningSlots = ['05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM'];

  const validatePhone = (val: string) => {
    // Australian phone validation: 04XX XXX XXX or (0X) XXXX XXXX or +61...
    const clean = val.replace(/[\s-]/g, '');
    if (clean.length < 8) {
      setPhoneError('Please enter a valid mobile or phone number (e.g. 0412 345 678 or +91 63834 38429).');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(clientPhone)) return;
    if (!currentService || !selectedDate || !selectedTimeSlot) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `KC-MEL-${randomSuffix}`;

    const dateObj = availableDates.find((d) => d.iso === selectedDate);
    const dateFormatted = dateObj ? dateObj.fullDateStr : selectedDate;

    const newBooking: BookingAppointment = {
      id: `booking-${Date.now()}`,
      referenceCode: refCode,
      serviceId: currentService.id,
      serviceName: currentService.name,
      serviceCategory: currentService.category,
      servicePriceAUD: currentService.priceAUD,
      durationMinutes: currentService.durationMinutes,
      teamMemberId: selectedTeamMemberId,
      teamMemberName: specialistDisplayName,
      date: dateFormatted,
      timeSlot: selectedTimeSlot,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      notes: notes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setStep(5);
  };

  // Generate .ics calendar download
  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Notorious Style//Appointment Booking//EN
BEGIN:VEVENT
SUMMARY:Notorious Style Appointment - ${confirmedBooking.serviceName}
DESCRIPTION:Appointment with ${confirmedBooking.teamMemberName}. Total: $${confirmedBooking.servicePriceAUD} AUD (GST Incl). Ref: ${confirmedBooking.referenceCode}
LOCATION:625 Albany Hwy, Victoria Park WA 6100
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedBooking.referenceCode}-appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
      onClick={resetAndClose}
    >
      <div
        className="relative max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden my-3 sm:my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-neutral-950 border-b border-neutral-800">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-serif font-bold text-base sm:text-lg text-white">Notorious Style</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              {step === 5 ? 'Confirmed' : `Step ${step}/4`}
            </span>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-3 sm:px-6 py-2 sm:py-3 bg-neutral-950/50 border-b border-neutral-800/80 flex items-center justify-between text-[11px] sm:text-xs">
            <div className={`flex items-center gap-1 sm:gap-1.5 ${step >= 1 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span>Service</span>
            </div>
            <span className="text-neutral-700">→</span>
            <div className={`flex items-center gap-1 sm:gap-1.5 ${step >= 2 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span>Artisan</span>
            </div>
            <span className="text-neutral-700">→</span>
            <div className={`flex items-center gap-1 sm:gap-1.5 ${step >= 3 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
              <span>Date</span>
            </div>
            <span className="text-neutral-700">→</span>
            <div className={`flex items-center gap-1 sm:gap-1.5 ${step >= 4 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-current flex items-center justify-center text-[10px]">4</span>
              <span>Details</span>
            </div>
          </div>
        )}

        {/* Step Body */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">Choose Your Service</h3>
                <p className="text-xs text-neutral-400">All prices listed in Australian Dollars (AUD), GST inclusive.</p>
              </div>

              {/* Category tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'mens_haircuts', label: "Men's Cuts" },
                  { id: 'beard_grooming', label: 'Beard' },
                  { id: 'womens_hair', label: "Women's" },
                  { id: 'beauty_services', label: 'Beauty' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-amber-400 text-neutral-950 font-semibold'
                        : 'bg-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Service list */}
              <div className="space-y-3">
                {SERVICES_DATA.filter((s) => selectedCategory === 'all' || s.category === selectedCategory).map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-md border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-neutral-800/90 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{service.name}</h4>
                          {service.popular && (
                            <span className="text-[10px] font-mono text-amber-400">Popular</span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-1">{service.description}</p>
                        <div className="text-xs text-neutral-400 flex items-center gap-2 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {service.durationMinutes} mins
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono text-lg font-bold text-amber-300 tabular-nums">
                          ${service.priceAUD} AUD
                        </div>
                        <div className="text-[10px] text-neutral-400">GST Incl.</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  disabled={!selectedServiceId}
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Continue to Specialist</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SPECIALIST SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">Select Your Artisan</h3>
                <p className="text-xs text-neutral-400">
                  Choose a preferred stylist/barber, or select "Any Available" for earlier availability.
                </p>
              </div>

              <div className="space-y-3">
                {/* Any specialist option */}
                <div
                  onClick={() => setSelectedTeamMemberId('any')}
                  className={`p-4 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                    selectedTeamMemberId === 'any'
                      ? 'bg-neutral-800/90 border-amber-400 ring-1 ring-amber-400'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Any Available Specialist</h4>
                      <p className="text-xs text-neutral-400">Fastest booking confirmation · Handled by our experienced senior team</p>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-mono">Recommended</span>
                </div>

                {/* Team members */}
                {TEAM_MEMBERS.map((member) => {
                  const isSelected = selectedTeamMemberId === member.id;
                  return (
                    <div
                      key={member.id}
                      onClick={() => setSelectedTeamMemberId(member.id)}
                      className={`p-4 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-neutral-800/90 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">{member.name}</h4>
                            <span className="text-xs font-mono text-amber-400">· {member.title}</span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">{member.specialties.slice(0, 3).join(' · ')}</p>
                        </div>
                      </div>

                      <div className="text-xs font-mono text-neutral-400">
                        {member.experienceYears}y exp
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Services</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 cursor-pointer"
                >
                  <span>Select Date & Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SELECTION */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">Select Appointment Date & Time</h3>
                <p className="text-xs text-neutral-400">
                  Perth Local Time (AWST) · 625 Albany Highway, Victoria Park WA
                </p>
              </div>

              {/* Date Scroll Strip */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  1. Choose Date (Next 14 Days)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 overflow-x-auto pb-2">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setSelectedDate(d.iso)}
                        className={`p-2.5 rounded-md border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-wider">{d.dayName}</div>
                        <div className="text-base font-mono font-bold my-0.5">{d.dayNum}</div>
                        <div className="text-[10px] text-neutral-400">{d.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <label className="block text-xs font-medium text-neutral-300">
                  2. Choose Starting Time Slot
                </label>

                {/* Morning */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                    Morning Sessions
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {morningSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-3 text-xs font-mono rounded-md border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                    Afternoon Sessions
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {afternoonSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-3 text-xs font-mono rounded-md border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                    Evening Sessions (Late Nights)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {eveningSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-3 text-xs font-mono rounded-md border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Specialist</span>
                </button>
                <button
                  disabled={!selectedDate || !selectedTimeSlot}
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Continue to Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT DETAILS & SUMMARY */}
          {step === 4 && (
            <div>
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">Client Details & Booking Summary</h3>
                  <p className="text-xs text-neutral-400">
                    We will send an immediate SMS confirmation and booking reminder to your Australian mobile.
                  </p>
                </div>

                {/* Summary Banner */}
                <div className="p-4 rounded-md bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                  <div className="flex justify-between text-neutral-300">
                    <span>Selected Service:</span>
                    <span className="font-semibold text-white">{currentService?.name}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Artisan:</span>
                    <span className="text-amber-400">{specialistDisplayName}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Date & Time:</span>
                    <span className="font-mono text-white">
                      {availableDates.find((d) => d.iso === selectedDate)?.fullDateStr} at {selectedTimeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-300 pt-2 border-t border-neutral-800/80">
                    <span>Total Investment:</span>
                    <span className="font-mono text-base font-bold text-amber-300">
                      ${currentService?.priceAUD} AUD (GST Incl.)
                    </span>
                  </div>
                </div>

                {/* Client Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Liam Walker"
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Mobile / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(e.target.value);
                        if (phoneError) validatePhone(e.target.value);
                      }}
                      placeholder="e.g. 0412 345 678 or +91 63834 38429"
                      className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                    {phoneError && <p className="text-[11px] text-red-400 mt-1">{phoneError}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. liam.walker@domain.com.au"
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Special Requests or Hair History (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Hair length history, skin sensitivity, beverage preference, wedding prep..."
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {/* Australian Consumer Law 24h Policy Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms-check"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="terms-check" className="text-xs text-neutral-400 leading-relaxed">
                    I understand and agree to the Notorious Style 24-hour cancellation policy. If you need to reschedule or cancel, please provide at least 24 hours notice to allow other clients to book.
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs text-neutral-400 hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Date & Time</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Confirm & Reserve Appointment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 5: CONFIRMATION RECEIPT */}
          {step === 5 && confirmedBooking && (
            <div className="py-4 space-y-6">
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Appointment Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                  Thank you, {confirmedBooking.clientName}! Your chair has been reserved at Notorious Style in Victoria Park.
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Booking Reference
                    </span>
                    <div className="font-mono text-xl font-bold text-amber-400 tracking-wider">
                      {confirmedBooking.referenceCode}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Service:</span>
                    <span className="font-semibold text-white">{confirmedBooking.serviceName}</span>
                    <div className="text-neutral-400 font-mono text-[11px]">
                      Duration: {confirmedBooking.durationMinutes} minutes
                    </div>
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-0.5">Specialist:</span>
                    <span className="font-semibold text-white">{confirmedBooking.teamMemberName}</span>
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-0.5">Date & Time:</span>
                    <span className="font-mono text-amber-300 font-medium">
                      {confirmedBooking.date} at {confirmedBooking.timeSlot}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-0.5">Location:</span>
                    <span className="font-semibold text-white">625 Albany Hwy, Victoria Park WA 6100</span>
                    <div className="text-[11px] text-neutral-400">On the Albany Hwy dining & retail strip</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Total Price (GST Incl.):</span>
                  <span className="font-mono text-lg font-bold text-amber-300 tabular-nums">
                    ${confirmedBooking.servicePriceAUD} AUD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-md hover:bg-neutral-800 hover:text-white"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300"
                >
                  <span>Done</span>
                </button>
              </div>

              <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                An SMS confirmation has been scheduled for <span className="font-mono text-neutral-300">{confirmedBooking.clientPhone}</span>. If you need any assistance prior to your visit, call us on <span className="font-mono text-neutral-300">{BUSINESS_INFO.phone}</span>.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
