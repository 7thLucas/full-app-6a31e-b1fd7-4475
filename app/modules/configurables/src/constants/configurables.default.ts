/*
 * Default Configurable Data — seeded into Mongo on first boot.
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TSocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  shopCtaLabel?: string;
  vetCtaLabel?: string;
  hotelCtaLabel?: string;
  chatCtaLabel?: string;
  footerText?: string;
  contactEmail?: string;
  contactPhone?: string;
  businessHours?: string;
  aiAssistantName?: string;
  aiSystemPrompt?: string;
  enableAiChat?: boolean;
  enableVetBooking?: boolean;
  enableHotelBooking?: boolean;
  enableShop?: boolean;
  petCategories?: string[];
  productCategories?: string[];
  itemsPerPage?: number;
  socialLinks?: TSocialLinks;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "PawHub",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#FF6B35",
    secondary: "#2EC4B6",
    accent: "#8BC34A",
  },
  tagline: "Your All-in-One Pet Care & Shop Hub",
  heroTitle: "Everything Your Pet Needs, All in One Place",
  heroSubtitle: "Shop premium pet products, book vet appointments, and reserve hotel stays — all with a single paw tap.",
  heroImage: "",
  shopCtaLabel: "Shop Now",
  vetCtaLabel: "Book a Vet",
  hotelCtaLabel: "Book Hotel",
  chatCtaLabel: "Chat with AI",
  footerText: "© 2026 PawHub. Made with love for pets everywhere.",
  contactEmail: "hello@pawhub.com",
  contactPhone: "+1 (800) PAW-CARE",
  businessHours: "Mon–Sun, 8am–10pm",
  aiAssistantName: "PawBot",
  aiSystemPrompt: "You are PawBot, a friendly AI assistant for PawHub — a pet care and pet shop platform. Help users with product recommendations, vet appointment booking, pet hotel reservations, and general pet care tips. Be warm, helpful, and concise. Always prioritize pet wellbeing.",
  enableAiChat: true,
  enableVetBooking: true,
  enableHotelBooking: true,
  enableShop: true,
  petCategories: ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Reptile", "Small Animal"],
  productCategories: ["Food & Treats", "Toys", "Accessories", "Health & Wellness", "Grooming", "Housing & Habitat"],
  itemsPerPage: 12,
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};
