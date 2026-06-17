import {
  ProductModel,
  VetServiceModel,
  HotelRoomModel,
} from "./models/pawhub.models";
import { createLogger } from "~/lib/logger";

const logger = createLogger("PawHubSeed");

export async function seedPawHub(): Promise<void> {
  // Products
  const productCount = await ProductModel.countDocuments();
  if (productCount === 0) {
    logger.info("Seeding demo products...");
    await ProductModel.insertMany([
      {
        name: "Premium Dog Food — Salmon & Rice",
        description: "High-protein grain-free formula for adult dogs. Rich in omega-3s for a shiny coat.",
        price: 45.99,
        stock: 120,
        category: "Food & Treats",
        brand: "NutriPaw",
        petTypes: ["Dog"],
        imageUrl: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400",
        isActive: true,
      },
      {
        name: "Cat Hairball Control Treats",
        description: "Delicious chicken-flavored treats that help reduce hairball formation.",
        price: 12.99,
        stock: 250,
        category: "Food & Treats",
        brand: "PurrFect",
        petTypes: ["Cat"],
        imageUrl: "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400",
        isActive: true,
      },
      {
        name: "Interactive Feather Wand Toy",
        description: "Stimulate your cat's hunting instincts with this colorful feather wand.",
        price: 8.99,
        stock: 80,
        category: "Toys",
        brand: "PlayPaws",
        petTypes: ["Cat"],
        imageUrl: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?w=400",
        isActive: true,
      },
      {
        name: "Squeaky Rubber Ball Set",
        description: "Set of 3 durable rubber balls in assorted sizes. Perfect for fetch.",
        price: 14.99,
        stock: 60,
        category: "Toys",
        brand: "BounceUp",
        petTypes: ["Dog"],
        imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400",
        isActive: true,
      },
      {
        name: "Adjustable Nylon Dog Collar",
        description: "Comfortable and durable collar available in 5 vibrant colors.",
        price: 19.99,
        stock: 150,
        category: "Accessories",
        brand: "PawStyle",
        petTypes: ["Dog"],
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
        isActive: true,
      },
      {
        name: "Cat Cozy Bed — Donut Shape",
        description: "Ultra-soft plush donut bed for cats and small dogs. Machine washable.",
        price: 34.99,
        stock: 45,
        category: "Accessories",
        brand: "SnugPet",
        petTypes: ["Cat", "Small Animal"],
        imageUrl: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=400",
        isActive: true,
      },
      {
        name: "Multi-Vitamin Supplement for Dogs",
        description: "Daily chewable vitamins supporting joint, skin, and immune health.",
        price: 28.50,
        stock: 200,
        category: "Health & Wellness",
        brand: "VitaPaw",
        petTypes: ["Dog"],
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
        isActive: true,
      },
      {
        name: "Pet Grooming Brush — Deshedding",
        description: "Professional-grade deshedding tool reduces shedding by up to 90%.",
        price: 22.00,
        stock: 75,
        category: "Grooming",
        brand: "GloomGroom",
        petTypes: ["Dog", "Cat"],
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
        isActive: true,
      },
      {
        name: "Bird Seed Mix — Tropical Blend",
        description: "Premium seed blend with fruits and nuts for parrots and cockatiels.",
        price: 16.99,
        stock: 90,
        category: "Food & Treats",
        brand: "TweetTreats",
        petTypes: ["Bird"],
        imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
        isActive: true,
      },
      {
        name: "Aquarium Starter Kit — 10 Gallon",
        description: "Complete setup with filter, LED lighting, and water conditioner.",
        price: 89.99,
        stock: 20,
        category: "Housing & Habitat",
        brand: "AquaHome",
        petTypes: ["Fish"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        isActive: true,
      },
      {
        name: "Rabbit Pellet Food — Timothy Based",
        description: "Complete nutrition formula for rabbits. High in fiber for digestive health.",
        price: 18.50,
        stock: 110,
        category: "Food & Treats",
        brand: "BunnyBest",
        petTypes: ["Rabbit"],
        imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400",
        isActive: true,
      },
      {
        name: "Retractable Leash — 16 ft",
        description: "Tangle-free retractable leash with ergonomic grip and quick-lock button.",
        price: 24.99,
        stock: 85,
        category: "Accessories",
        brand: "WalkMate",
        petTypes: ["Dog"],
        imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
        isActive: true,
      },
    ]);
    logger.info("Demo products seeded.");
  }

  // Vet Services
  const vetCount = await VetServiceModel.countDocuments();
  if (vetCount === 0) {
    logger.info("Seeding vet services...");
    await VetServiceModel.insertMany([
      {
        name: "General Health Checkup",
        description: "Comprehensive physical examination including weight, temperature, and vital signs assessment.",
        price: 60.00,
        durationMinutes: 30,
        vetName: "Dr. Sarah Collins",
        vetPhotoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        startTime: "09:00",
        endTime: "17:00",
        isActive: true,
      },
      {
        name: "Vaccination Package",
        description: "Core and non-core vaccinations tailored for your pet's lifestyle and age.",
        price: 85.00,
        durationMinutes: 45,
        vetName: "Dr. Mark Torres",
        vetPhotoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300",
        availableDays: ["Monday", "Wednesday", "Friday"],
        startTime: "08:00",
        endTime: "16:00",
        isActive: true,
      },
      {
        name: "Dental Cleaning",
        description: "Professional teeth cleaning under anesthesia to prevent dental disease.",
        price: 150.00,
        durationMinutes: 90,
        vetName: "Dr. Emily Nguyen",
        vetPhotoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300",
        availableDays: ["Tuesday", "Thursday"],
        startTime: "10:00",
        endTime: "15:00",
        isActive: true,
      },
      {
        name: "Spay / Neuter Surgery",
        description: "Routine surgical procedure with pre-op bloodwork and post-op care included.",
        price: 280.00,
        durationMinutes: 120,
        vetName: "Dr. James Park",
        vetPhotoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300",
        availableDays: ["Monday", "Thursday"],
        startTime: "08:00",
        endTime: "12:00",
        isActive: true,
      },
      {
        name: "Grooming & Bath",
        description: "Full grooming session including bath, blow-dry, nail trim, ear cleaning, and styling.",
        price: 55.00,
        durationMinutes: 60,
        vetName: "Maria Santos (Groomer)",
        vetPhotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        startTime: "09:00",
        endTime: "18:00",
        isActive: true,
      },
    ]);
    logger.info("Vet services seeded.");
  }

  // Hotel Rooms
  const hotelCount = await HotelRoomModel.countDocuments();
  if (hotelCount === 0) {
    logger.info("Seeding hotel rooms...");
    await HotelRoomModel.insertMany([
      {
        name: "Cozy Kennel Suite",
        description: "Spacious indoor kennel with soft bedding and daily outdoor playtime for dogs.",
        pricePerNight: 35.00,
        type: "Standard",
        petTypes: ["Dog"],
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400",
        amenities: ["Soft Bedding", "Daily Walks", "Play Area", "24/7 Staff"],
        capacity: 1,
      },
      {
        name: "Luxury Cat Villa",
        description: "Multi-level cat condo with climbing structures, window views, and cozy nap spots.",
        pricePerNight: 28.00,
        type: "Deluxe",
        petTypes: ["Cat"],
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
        amenities: ["Climbing Wall", "Window View", "Premium Food", "Grooming"],
        capacity: 2,
      },
      {
        name: "Deluxe Dog Suite",
        description: "Premium suite with TV, private bathroom, and personalized care. Best for anxious dogs.",
        pricePerNight: 65.00,
        type: "Suite",
        petTypes: ["Dog"],
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
        amenities: ["Private Room", "TV", "Premium Meals", "3x Daily Walks", "Snuggle Time"],
        capacity: 1,
      },
      {
        name: "Small Pet Habitat",
        description: "Safe and comfortable enclosure for rabbits, guinea pigs, and small animals.",
        pricePerNight: 20.00,
        type: "Standard",
        petTypes: ["Rabbit", "Small Animal"],
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400",
        amenities: ["Safe Enclosure", "Fresh Vegetables", "Enrichment Toys"],
        capacity: 2,
      },
      {
        name: "Bird Aviary Stay",
        description: "Spacious aviary environment for birds with social interaction and enrichment activities.",
        pricePerNight: 25.00,
        type: "Standard",
        petTypes: ["Bird"],
        isAvailable: true,
        imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
        amenities: ["Large Aviary", "Fresh Fruits", "Social Play", "Natural Light"],
        capacity: 3,
      },
    ]);
    logger.info("Hotel rooms seeded.");
  }
}
