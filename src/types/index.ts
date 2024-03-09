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

export type UserDocumentData = {
	name: string;
	imageUrl?: string;
	likedReviews: string[];
	reviewsPosted: number;
};

export type User = UserDocumentData & {
	id: string;
};
