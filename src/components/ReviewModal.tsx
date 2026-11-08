import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitReview }) => {
  const [name, setName] = useState('');
  const [suburb, setSuburb] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceReceived, setServiceReceived] = useState('Skin Fades');
  const [stylistName, setStylistName] = useState('Andy');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      authorName: name.trim(),
      suburb: suburb.trim() ? `${suburb.trim()}, WA` : 'Victoria Park, WA',
      rating,
      date: 'Just now',
      serviceReceived,
      stylistName,
      comment: comment.trim(),
      verified: true,
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800"
          aria-label="Close review modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-serif text-2xl font-semibold text-white">
              Thank You for Your Review!
            </h3>
            <p className="text-sm text-neutral-300">
              Your feedback helps our team maintain the highest standards of barber craft in Victoria Park.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Google Business Profile
              </span>
              <h3 className="font-serif text-2xl font-semibold text-white mt-1">
                Share Your Notorious Style Experience
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Tell the Perth community about your haircut, fade, or beard grooming session.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-amber-400 ml-2">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Liam Walker"
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Suburb (Perth, WA)
                  </label>
                  <input
                    type="text"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="e.g. Victoria Park, South Perth"
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Service Received
                  </label>
                  <select
                    value={serviceReceived}
                    onChange={(e) => setServiceReceived(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                  >
                    <optgroup label="Men's Haircuts">
                      <option value="Classic Haircuts">Classic Haircuts</option>
                      <option value="Modern Haircuts">Modern Haircuts</option>
                      <option value="Skin Fades">Skin Fades</option>
                      <option value="Taper Fades">Taper Fades</option>
                      <option value="Hair Styling">Hair Styling</option>
                    </optgroup>
                    <optgroup label="Beard Grooming">
                      <option value="Beard Trimming">Beard Trimming</option>
                      <option value="Beard Shaping">Beard Shaping</option>
                      <option value="Beard Line-ups">Beard Line-ups</option>
                      <option value="Beard Styling">Beard Styling</option>
                    </optgroup>
                    <optgroup label="Women's Hair Services">
                      <option value="Women's Haircuts">Women's Haircuts</option>
                      <option value="Hair Colouring">Hair Colouring</option>
                      <option value="Full-head Foils / Highlights">Full-head Foils / Highlights</option>
                    </optgroup>
                    <optgroup label="Beauty Services">
                      <option value="Nail Services">Nail Services</option>
                      <option value="Hair Removal">Hair Removal</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Barber or Stylist
                  </label>
                  <select
                    value={stylistName}
                    onChange={(e) => setStylistName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Andy">Andy (Owner)</option>
                    <option value="Syed">Syed (Barber at Notorious Style)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Your Review / Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your consultation, haircut, styling, or studio service..."
                  className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors"
                >
                  Submit Google Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
