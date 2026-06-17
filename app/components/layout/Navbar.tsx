import { Link, useLocation, useFetcher } from "react-router";
import { useAuth } from "~/modules/authentication/use-authentication";
import { useConfigurables } from "~/modules/configurables";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Shop", href: "/shop", icon: "🛍️" },
  { label: "Vet", href: "/vet", icon: "🩺" },
  { label: "Hotel", href: "/hotel", icon: "🏨" },
  { label: "AI Assistant", href: "/ai-assistant", icon: "🤖" },
];

export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { config, loading } = useConfigurables();
  const [menuOpen, setMenuOpen] = useState(false);
  const fetcher = useFetcher();

  const appName = loading ? "PawHub" : (config?.appName ?? "PawHub");
  const primary = config?.brandColor?.primary ?? "#FF6B35";

  function handleLogout() {
    fetcher.submit({}, { method: "POST", action: "/auth/logout" });
  }

  return (
    <nav className="sticky top-0 z-50 shadow-sm" style={{ background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl" style={{ color: primary }}>
            {config?.logoUrl && config.logoUrl !== "FILL_LOGO_URL_HERE" ? (
              <img src={config.logoUrl} alt={appName} className="h-8 w-8 object-contain" />
            ) : (
              <span className="text-2xl">🐾</span>
            )}
            <span>{appName}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={active
                    ? { background: primary + "18", color: primary }
                    : { color: "#555", background: "transparent" }
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: "#2EC4B618", color: "#2EC4B6" }}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/my-pets"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  My Pets
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {user?.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: "#ddd", color: "#666" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="text-sm font-medium px-4 py-2 rounded-lg text-white"
                  style={{ background: primary }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="border-t pt-2 mt-2">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-teal-600">Admin Dashboard</Link>
                )}
                <Link to="/my-pets" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-700">My Pets</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-700">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/auth/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-700">Sign In</Link>
                <Link to="/auth/register" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium" style={{ color: primary }}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
