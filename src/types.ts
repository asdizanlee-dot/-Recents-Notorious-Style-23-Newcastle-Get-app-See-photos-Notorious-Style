export type ServiceCategory = 
  | 'mens_haircuts'
  | 'beard_grooming'
  | 'womens_hair'
  | 'beauty_services';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  priceAUD: number;
  description: string;
  popular?: boolean;
  includes: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  workingDays?: string[];
  instagram: string;
  avatarUrl: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  suburb: string;
  rating: number;
  date: string;
  serviceReceived: string;
  stylistName: string;
  comment: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'fades' | 'colour' | 'beard' | 'womens' | 'studio';
  categoryLabel: string;
  stylist: string;
  imageUrl: string;
  description: string;
}

export interface BookingAppointment {
  id: string;
  referenceCode: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  servicePriceAUD: number;
  durationMinutes: number;
  teamMemberId: string;
  teamMemberName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
