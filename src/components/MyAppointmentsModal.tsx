import React from 'react';
import { X, Calendar, Clock, MapPin, Trash2, Download, AlertCircle } from 'lucide-react';
import { BookingAppointment } from '../types';
import { BUSINESS_INFO } from '../data/salonData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: BookingAppointment[];
  onCancelAppointment: (id: string) => void;
  onOpenNewBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onOpenNewBooking,
}) => {
  if (!isOpen) return null;

  const handleDownload = (apt: BookingAppointment) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Notorious Style//Appointment Booking//EN
BEGIN:VEVENT
SUMMARY:Notorious Style Appointment - ${apt.serviceName}
DESCRIPTION:Artisan: ${apt.teamMemberName}. Total: $${apt.servicePriceAUD} AUD. Ref: ${apt.referenceCode}
LOCATION:625 Albany Hwy, Victoria Park WA 6100
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${apt.referenceCode}-appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-6 overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Client Portal
            </span>
            <h3 className="font-serif text-xl font-semibold text-white mt-0.5">
              My Appointments ({appointments.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 overflow-y-auto space-y-4 flex-1">
          {appointments.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Calendar className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-sm text-neutral-300">You have no upcoming appointments saved.</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-amber-400 text-xs font-bold block">
                      Ref: {apt.referenceCode}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-0.5">
                      {apt.serviceName}
                    </h4>
                  </div>
                  <span className="font-mono text-base font-bold text-amber-300 tabular-nums">
                    ${apt.servicePriceAUD} AUD
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-neutral-300 pt-1">
                  <div>
                    <span className="text-neutral-400 block">Artisan:</span>
                    <span>{apt.teamMemberName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Date & Time:</span>
                    <span className="font-mono text-neutral-200">
                      {apt.date} at {apt.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>625 Albany Hwy, Victoria Park WA 6100</span>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleDownload(apt)}
                    className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .ics</span>
                  </button>

                  <button
                    onClick={() => onCancelAppointment(apt.id)}
                    className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Booking</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {appointments.length > 0 && (
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">
              Need to modify details? Call <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`} className="text-amber-400 hover:underline font-mono">{BUSINESS_INFO.phone}</a>
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenNewBooking();
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300"
            >
              Book Another Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
