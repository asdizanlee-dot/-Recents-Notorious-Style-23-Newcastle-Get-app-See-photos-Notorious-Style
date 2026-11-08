import React from 'react';
import { Calendar, Award, Instagram, CheckCircle } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/salonData';

interface TeamSectionProps {
  onBookWithMember: (memberId: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onBookWithMember }) => {
  return (
    <section id="team" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>Masters of the Craft</span>
              <span aria-hidden="true">·</span>
              <span>Barber Artisans</span>
              <span aria-hidden="true">·</span>
              <span>Victoria Park, WA</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Meet Our Artisans
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Meet the artisans behind Notorious Style on Albany Highway: Andy (Owner) and Syed (Barber at Notorious Style). Dedicated to precision haircuts, skin fades, taper fades, beard grooming, and salon care.
            </p>
          </div>
        </div>

        {/* Team Grid (2-column layout for Andy & Syed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-between bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden group hover:border-neutral-700 transition-all"
            >
              <div>
                {/* Visual Asset Container */}
                <div className="relative h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={member.avatarUrl}
                    alt={`${member.name} - ${member.role}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Floating Experience Marker */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-medium text-amber-300">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono tabular-nums">{member.experienceYears} Years</span>
                    <span className="text-neutral-400">Professional Experience</span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-semibold text-white">
                        {member.name}
                      </h3>
                      <span className="text-xs text-neutral-400 font-mono">
                        {member.instagram}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-amber-400 mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                    {member.bio}
                  </p>

                  {/* Specialties as clean unboxed text with separators */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Specialties:
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-200">
                      {member.specialties.map((spec, idx) => (
                        <React.Fragment key={spec}>
                          <span>{spec}</span>
                          {idx < member.specialties.length - 1 && (
                            <span className="text-neutral-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onBookWithMember(member.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-neutral-900 border border-neutral-800 rounded-md hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Chair with {member.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
