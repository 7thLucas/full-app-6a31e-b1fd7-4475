// Import global routes
import routes from "./routes";
import { initializeModels } from "./models";

// Initialize models (modules auto-discovered)
await initializeModels();

// Explicitly initialize PawHub domain models
await import("./models/pawhub.models");

// Run PawHub seed
import { seedPawHub } from "./pawhub.seed";
await seedPawHub().catch((e) => console.warn("PawHub seed warning:", e));

export default routes;
