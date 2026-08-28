// src/types/social-post.ts

export type SocialPlatform = 'facebook' | 'instagram' | 'whatsapp';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  user: {
    name: string;
    avatarUrl?: string; // URL to user's profile picture
    profileUrl?: string; // URL to user's profile page
  };
  content: string; // Text content of the post
  imageUrl?: string; // URL for an image in the post
  imageHint?: string; // Hint for AI image generation if imageUrl is a placeholder
  videoUrl?: string; // URL for a video in the post
  postUrl: string; // Direct link to the original post or action (e.g., wa.me link)
  timestamp: Date; // Changed to Date object for easier sorting
  likes?: number;
  comments?: number;
  shares?: number;
}
