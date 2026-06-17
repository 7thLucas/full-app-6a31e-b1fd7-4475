import { Link } from "react-router";
import { AppLayout } from "~/components/layout/AppLayout";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication/use-authentication";

const SERVICES = [
  {
    icon: "🛍️",
    title: "Pet Shop",
    description: "Browse thousands of premium pet products — food, toys, accessories, and health supplies for every pet type.",
    href: "/shop",
    ctaKey: "shopCtaLabel",
    defaultCta: "Shop Now",
    color: "#FF6B35",
    bg: "#FF6B3510",
  },
  {
    icon: "🩺",
    title: "Vet Appointments",
    description: "Schedule checkups, vaccinations, dental care, and surgery with our certified veterinarians.",
    href: "/vet",
    ctaKey: "vetCtaLabel",
    defaultCta: "Book a Vet",
    color: "#2EC4B6",
    bg: "#2EC4B610",
  },
  {
    icon: "🏨",
    title: "Pet Hotel",
    description: "Safe, comfortable boarding and daycare for your pets while you're away. Peace of mind guaranteed.",
    href: "/hotel",
    ctaKey: "hotelCtaLabel",
    defaultCta: "Book Hotel",
    color: "#8BC34A",
    bg: "#8BC34A10",
  },
  {
    icon: "🤖",
    title: "AI Pet Assistant",
    description: "24/7 intelligent assistant to help with product questions, booking, pet care tips, and more.",
    href: "/ai-assistant",
    ctaKey: "chatCtaLabel",
    defaultCta: "Chat with AI",
    color: "#FF6B35",
    bg: "#FF6B3510",
  },
];

const STATS = [
  { value: "10,000+", label: "Happy Pets" },
  { value: "500+", label: "Products" },
  { value: "50+", label: "Vet Services" },
  { value: "24/7", label: "AI Support" },
];

export default function HomePage() {
  const { config, loading } = useConfigurables();
  const { isAuthenticated } = useAuth();

  const primary = config?.brandColor?.primary ?? "#FF6B35";
  const secondary = config?.brandColor?.secondary ?? "#2EC4B6";
  const heroTitle = loading ? "Everything Your Pet Needs" : (config?.heroTitle ?? "Everything Your Pet Needs, All in One Place");
  const heroSubtitle = loading ? "" : (config?.heroSubtitle ?? "Shop premium pet products, book vet appointments, and reserve hotel stays — all with a single paw tap.");
  const appName = config?.appName ?? "PawHub";

  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${primary}12 0%, ${secondary}10 50%, #8BC34A08 100%)`,
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: primary + "18", color: primary }}>
            <span>🐾</span>
            <span>Welcome to {appName}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3.5 rounded-xl text-white font-semibold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: primary }}
            >
              {loading ? "Shop Now" : (config?.shopCtaLabel ?? "Shop Now")} →
            </Link>
            {!isAuthenticated && (
              <Link
                to="/auth/register"
                className="px-8 py-3.5 rounded-xl font-semibold text-base border-2 transition-all hover:-translate-y-0.5 bg-white"
                style={{ borderColor: primary, color: primary }}
              >
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white rounded-2xl shadow-sm border" style={{ borderColor: "#f0f0f0" }}>
                <div className="text-3xl font-bold mb-1" style={{ color: primary }}>{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything Under One Roof</h2>
            <p className="text-gray-500 max-w-xl mx-auto">One platform for all your pet care needs. No more juggling multiple apps or websites.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const ctaLabel = loading ? service.defaultCta : ((config as any)?.[service.ctaKey] ?? service.defaultCta);
              return (
                <Link
                  key={service.href}
                  to={service.href}
                  className="group p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1"
                  style={{ borderColor: "#f0f0f0" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: service.bg }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
                  <span className="text-sm font-semibold" style={{ color: service.color }}>
                    {ctaLabel} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pet Types */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">For Every Kind of Pet</h2>
            <p className="text-gray-500">We love all pets equally.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {(loading ? ["Dog", "Cat", "Bird", "Fish", "Rabbit"] : (config?.petCategories ?? ["Dog", "Cat", "Bird", "Fish", "Rabbit"])).map((pet: string) => {
              const emoji: Record<string, string> = { Dog: "🐶", Cat: "🐱", Bird: "🐦", Fish: "🐠", Rabbit: "🐰", Reptile: "🦎", "Small Animal": "🐹" };
              return (
                <Link
                  key={pet}
                  to={`/shop?petType=${pet}`}
                  className="flex items-center gap-2 px-5 py-3 bg-white border rounded-full font-medium text-gray-700 hover:shadow-md transition-all hover:-translate-y-0.5"
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <span className="text-xl">{emoji[pet] ?? "🐾"}</span>
                  <span>{pet}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 sm:p-14 text-center text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
          >
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Give Your Pet the Best?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of pet owners who trust {appName} for all their pet care needs.
            </p>
            {!isAuthenticated ? (
              <Link
                to="/auth/register"
                className="inline-block px-8 py-3.5 bg-white font-semibold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
                style={{ color: primary }}
              >
                Create Free Account
              </Link>
            ) : (
              <Link
                to="/shop"
                className="inline-block px-8 py-3.5 bg-white font-semibold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
                style={{ color: primary }}
              >
                Start Shopping
              </Link>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
