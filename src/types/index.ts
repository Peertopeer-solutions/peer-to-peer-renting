import { Timestamp } from 'firebase/firestore';

export type RatingDetails = {
  totalReviews: number;
  stars: number[];
};

export type FeedbackDocumentData = {
  affordabilityRating: number;
  easOfUseRating: number;
  rentingExperienceRating: number;
  overallRating: number;
  text: string;
  authorId: string;
  productId: string;
  likeCount: number;
  timestamp: Timestamp;
};

export type Feedback = FeedbackDocumentData & {
  id: string;
};

export type RentalRequestDocument = {
  ownerId: string;
  endDate: Timestamp;
  productId: string;
  rentalPeriod: number;
  startDate: Timestamp;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: Timestamp;
  userId: string;
};

export type RentalRequest = RentalRequestDocument & {
  id: string;
};

export type UserDocumentData = {
  name: string;
  imageUrl?: string;
  likedReviews: string[];
  reviewsPosted: number;
};

export type User = UserDocumentData & {
  id: string;
};

export type ProductDocument = {
  category: string;
  description: string;
  imgUrls: string[];
  listingEnabled: boolean;
  pincode: string;
  regularPrice: string;
  rentPeriod: string;
  timestamp: Timestamp;
  title: string;
  userRef: string;
};

export type Product = ProductDocument & {
  id: string;
};
