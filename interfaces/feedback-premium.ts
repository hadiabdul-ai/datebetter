export interface FeedbackPremium {
    feedback: string;
    ratings: {
        photography: number;
        style: number;
        fitness: number;
        charm: number;
        social_status: number;
    }
    suggested_improvements: {  
        photos: string[]
        new_photo_ideas: string[];
        bio: string;
        sample_bios: string[];
    }
}