import { Link } from "react-router";
import { useConfigurables } from "~/modules/configurables";

export function Footer() {
  const { config, loading } = useConfigurables();
  const footerText = loading ? "© 2026 PawHub. Made with love for pets." : (config?.footerText ?? "© 2026 PawHub. Made with love for pets everywhere.");
  const primary = config?.brandColor?.primary ?? "#FF6B35";
  const appName = config?.appName ?? "PawHub";

  return (
    <footer className="border-t mt-auto" style={{ background: "#fff", borderColor: "#f0f0f0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3" style={{ color: primary }}>
              <span className="text-xl">🐾</span>
              <span>{appName}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {loading ? "" : (config?.tagline ?? "Your all-in-one pet care platform.")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Pet Shop</Link></li>
              <li><Link to="/vet" className="hover:text-orange-500 transition-colors">Vet Appointments</Link></li>
              <li><Link to="/hotel" className="hover:text-orange-500 transition-colors">Pet Hotel</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-orange-500 transition-colors">AI Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/auth/login" className="hover:text-orange-500 transition-colors">Sign In</Link></li>
              <li><Link to="/auth/register" className="hover:text-orange-500 transition-colors">Register</Link></li>
              <li><Link to="/my-pets" className="hover:text-orange-500 transition-colors">My Pets</Link></li>
              <li><Link to="/profile" className="hover:text-orange-500 transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {!loading && config?.contactEmail && (
                <li>📧 {config.contactEmail}</li>
              )}
              {!loading && config?.contactPhone && (
                <li>📞 {config.contactPhone}</li>
              )}
              {!loading && config?.businessHours && (
                <li>🕐 {config.businessHours}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-sm text-gray-400" style={{ borderColor: "#f0f0f0" }}>
          {footerText}
        </div>
      </div>
    </footer>
  );
}
