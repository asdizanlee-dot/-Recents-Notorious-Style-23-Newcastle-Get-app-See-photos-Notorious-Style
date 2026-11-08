import React, { useState } from 'react';
import { Star, StarHalf, CheckCircle, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { ReviewItem } from '../types';
import { ReviewModal } from './ReviewModal';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === filterRating);

  return (
    <section id="reviews" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Google Business Profile Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>Verified Client Feedback</span>
              <span aria-hidden="true">·</span>
              <span>Google Business Profile</span>
              <span aria-hidden="true">·</span>
              <span>Victoria Park, WA</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Client Reviews & Reputation
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We take pride in building lasting relationships across Victoria Park, Burswood, South Perth, and greater Perth. Read unvarnished reviews from regular clients.
            </p>
          </div>

          {/* Google Rating Hero Card */}
          <div className="flex items-center gap-6 p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 shrink-0">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white tabular-nums">4.6</span>
                <span className="text-neutral-400 text-sm">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 my-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-mono text-neutral-300 ml-1.5">(97)</span>
              </div>
              <p className="text-xs text-neutral-400">
                Based on <span className="font-mono font-medium text-neutral-200 tabular-nums">97</span> Google reviews
              </p>
            </div>

            <div className="border-l border-neutral-800 pl-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
              filterRating === 'all'
                ? 'bg-amber-400 text-neutral-950 font-semibold'
                : 'bg-neutral-900 text-neutral-300 hover:text-white'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
              filterRating === 5
                ? 'bg-amber-400 text-neutral-950 font-semibold'
                : 'bg-neutral-900 text-neutral-300 hover:text-white'
            }`}
          >
            5 Stars Only
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 rounded-lg bg-neutral-900/50 border border-neutral-800/90 hover:border-neutral-700 transition-all"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-medium text-white text-base">
                      {rev.authorName}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {rev.suburb}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {rev.date}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 ml-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Visit</span>
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                  "{rev.comment}"
                </p>
              </div>

              {/* Service & Stylist Tagging */}
              <div className="pt-3 border-t border-neutral-800/70 text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="truncate max-w-[180px]">{rev.serviceReceived}</span>
                <span className="text-neutral-300">Stylist: {rev.stylistName.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitReview={onAddReview}
      />
    </section>
  );
};
