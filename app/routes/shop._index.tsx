import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { AppLayout } from "~/components/layout/AppLayout";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication/use-authentication";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  brand?: string;
  petTypes: string[];
  imageUrl?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PET_EMOJI: Record<string, string> = { Dog: "🐶", Cat: "🐱", Bird: "🐦", Fish: "🐠", Rabbit: "🐰", Reptile: "🦎", "Small Animal": "🐹" };

export default function ShopPage() {
  const { config, loading: configLoading } = useConfigurables();
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const primary = config?.brandColor?.primary ?? "#FF6B35";
  const secondary = config?.brandColor?.secondary ?? "#2EC4B6";
  const categories = config?.productCategories ?? ["Food & Treats", "Toys", "Accessories", "Health & Wellness", "Grooming", "Housing & Habitat"];
  const petTypes = config?.petCategories ?? ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Reptile", "Small Animal"];
  const itemsPerPage = config?.itemsPerPage ?? 12;

  const category = searchParams.get("category") ?? "";
  const petType = searchParams.get("petType") ?? "";
  const search = searchParams.get("search") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (petType) params.set("petType", petType);
    if (search) params.set("search", search);
    params.set("page", String(page));
    params.set("limit", String(itemsPerPage));

    setIsLoading(true);
    fetch(`/api/pawhub/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products ?? []);
        setTotal(data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [category, petType, search, page, itemsPerPage]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product._id === product._id);
      if (existing) return prev.map((i) => i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
    setShowCart(true);
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((i) => i.product._id !== id));
  }

  function cartTotal() {
    return cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  async function placeOrder() {
    if (!isAuthenticated) {
      window.location.href = "/auth/login";
      return;
    }
    try {
      const items = cart.map((i) => ({
        productId: i.product._id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        imageUrl: i.product.imageUrl,
      }));
      await fetch("/api/pawhub/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: cartTotal() }),
      });
      setCart([]);
      setShowCart(false);
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 4000);
    } catch (e) { alert("Order failed. Please try again."); }
  }

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  }

  const totalPages = Math.ceil(total / itemsPerPage);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppLayout>
      {orderSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-white font-medium shadow-lg" style={{ background: "#8BC34A" }}>
          Order placed successfully! 🎉
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pet Shop</h1>
            <p className="text-gray-500 mt-1">{total} products found</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium"
            style={{ background: primary }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            defaultValue={search}
            onChange={(e) => {
              const v = e.target.value;
              clearTimeout((window as any)._searchTimer);
              (window as any)._searchTimer = setTimeout(() => setFilter("search", v), 400);
            }}
            className="w-full max-w-md px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
            style={{ borderColor: "#e8e8e8", background: "white" }}
          />
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="hidden md:block w-52 shrink-0">
            <div className="bg-white rounded-2xl border p-4 sticky top-24" style={{ borderColor: "#f0f0f0" }}>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Pet Type</h3>
              <div className="space-y-1 mb-5">
                <button
                  onClick={() => setFilter("petType", "")}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg ${!petType ? "font-semibold" : "text-gray-600"}`}
                  style={!petType ? { background: primary + "18", color: primary } : {}}
                >
                  All Pets
                </button>
                {petTypes.map((p: string) => (
                  <button
                    key={p}
                    onClick={() => setFilter("petType", p)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 ${petType === p ? "font-semibold" : "text-gray-600"}`}
                    style={petType === p ? { background: primary + "18", color: primary } : {}}
                  >
                    <span>{PET_EMOJI[p] ?? "🐾"}</span>
                    <span>{p}</span>
                  </button>
                ))}
              </div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setFilter("category", "")}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg ${!category ? "font-semibold" : "text-gray-600"}`}
                  style={!category ? { background: primary + "18", color: primary } : {}}
                >
                  All Categories
                </button>
                {categories.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setFilter("category", c)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg ${category === c ? "font-semibold" : "text-gray-600"}`}
                    style={category === c ? { background: primary + "18", color: primary } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border h-72 animate-pulse" style={{ borderColor: "#f0f0f0" }}></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all group" style={{ borderColor: "#f0f0f0" }}>
                    <div className="aspect-square bg-gray-50 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🐾</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-400 mb-1">{product.brand ?? product.category}</div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-base" style={{ color: primary }}>
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg text-white"
                          style={{ background: primary }}
                          disabled={product.stock === 0}
                        >
                          {product.stock === 0 ? "Out" : "+ Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFilter("page", String(i + 1))}
                    className="w-9 h-9 rounded-lg text-sm font-medium"
                    style={page === i + 1
                      ? { background: primary, color: "white" }
                      : { background: "white", color: "#666", border: "1px solid #e8e8e8" }
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setShowCart(false)} />
          <div className="w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-lg">Shopping Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    {item.product.imageUrl && (
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.product.name}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: primary }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setCart((prev) => prev.map((i) => i.product._id === item.product._id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))}
                        className="w-6 h-6 rounded-full border flex items-center justify-center text-sm"
                      >-</button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setCart((prev) => prev.map((i) => i.product._id === item.product._id ? { ...i, quantity: i.quantity + 1 } : i))}
                        className="w-6 h-6 rounded-full border flex items-center justify-center text-sm"
                      >+</button>
                      <button onClick={() => removeFromCart(item.product._id)} className="text-red-400 ml-1 text-sm">✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span style={{ color: primary }}>${cartTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full py-3.5 rounded-xl text-white font-semibold"
                  style={{ background: primary }}
                >
                  {isAuthenticated ? "Place Order" : "Sign In to Order"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
