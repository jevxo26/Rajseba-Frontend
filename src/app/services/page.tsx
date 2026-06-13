"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, X, Star } from "lucide-react";

const serviceCategories = [
  { id: "cleaning", label: "Cleaning", icon: "🧹" },
  { id: "ac-repair", label: "AC Repair", icon: "❄️" },
  { id: "plumbing", label: "Plumbing", icon: "🔧" },
  { id: "electrical", label: "Electrical", icon: "⚡" },
  { id: "painting", label: "Painting", icon: "🎨" },
];

const TRENDING_SERVICES = [
  {
    id: "premium-deep-cleaning",
    title: "Premium Deep Cleaning",
    description:
      "Full home sanitization using our friendly, industrial equipment. Perfect for move-ins or seasonal refreshes.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: "2.4k",
    price: 4500,
    badge: "MOST BOOKED",
    featured: true,
  },
  {
    id: "master-ac-service",
    title: "Master AC Service",
    description: "Comprehensive cleaning and gas top-up for all split brands.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: "1.8k",
    price: 1200,
    badge: "5.0 ★",
    featured: false,
  },
];

const serviceListings = [
  {
    id: "luxury-wall-painting",
    title: "Luxury Wall Painting",
    description: "Italian finish textures and moisture-proof...",
    image: "/images/service/service-3.png",
    category: "painting",
    categoryLabel: "Painting & Renovation",
    price: 15,
    priceDisplay: "৳15/sq.ft",
    done: "3k+ done",
    rating: 4.8,
  },
  {
    id: "emergency-leak-repair",
    title: "Emergency Leak Repair",
    description: "60-minute response time for all plumbing...",
    image: "/images/service/service-4.png",
    category: "plumbing",
    categoryLabel: "Plumbing",
    price: 600,
    priceDisplay: "৳600",
    done: "1.2k+ done",
    rating: 4.6,
  },
  {
    id: "smart-home-setup",
    title: "Smart Home Setup",
    description: "Installation of smart switches, hubs, and...",
    image: "/images/service/service-5.png",
    category: "electrical",
    categoryLabel: "Electrical",
    price: 2500,
    priceDisplay: "৳2,500",
    done: "800+ done",
    rating: 4.7,
  },
  {
    id: "refrigerator-servicing",
    title: "Refrigerator Servicing",
    description: "Gas charge, compressor checks, and...",
    image: "/images/service/service-6.png",
    category: "cleaning",
    categoryLabel: "Appliance",
    price: 1500,
    priceDisplay: "৳1,500",
    done: "2.1k+ done",
    rating: 4.5,
  },
  {
    id: "sofa-carpet-shampoo",
    title: "Sofa & Carpet Shampoo",
    description: "Deep vacuuming and shampooing for all...",
    image: "/images/service/service-7.png",
    category: "cleaning",
    categoryLabel: "Cleaning",
    price: 800,
    priceDisplay: "৳800/seat",
    done: "4k+ done",
    rating: 4.9,
  },
  {
    id: "cabinet-wood-polishing",
    title: "Cabinet Wood Polishing",
    description: "Restore the natural shine of your premium",
    image: "/images/service/service-8.png",
    category: "painting",
    categoryLabel: "Renovation",
    price: 3500,
    priceDisplay: "৳3,500",
    done: "500+ done",
    rating: 4.4,
  },
];

const PRICE_FLOOR = 500;
const PRICE_CEIL = 5000;
const PER_PAGE = 6;

function buildURL(params: Record<string, string>) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v && v !== "")
  );
  const qs = new URLSearchParams(filtered).toString();
  return qs ? `?${qs}` : "";
}

function ServicesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedRating, setSelectedRating] = useState(
    searchParams.get("min_rating") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popularity");
  const [priceMax, setPriceMax] = useState(
    Number(searchParams.get("price_max")) || PRICE_CEIL
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const syncURL = useCallback(() => {
    const params: Record<string, string> = {
      category: activeCategory !== "all" ? activeCategory : "",
      q: searchQuery,
      min_rating: selectedRating,
      sort: sortBy !== "popularity" ? sortBy : "",
      price_max: priceMax < PRICE_CEIL ? String(priceMax) : "",
      page: currentPage > 1 ? String(currentPage) : "",
    };
    router.replace(pathname + buildURL(params), { scroll: false });
  }, [activeCategory, searchQuery, selectedRating, sortBy, priceMax, currentPage, router, pathname]);

  useEffect(() => {
    syncURL();
  }, [syncURL]);

  const handleClearFilters = () => {
    setSelectedRating("");
    setPriceMax(PRICE_CEIL);
    setSortBy("popularity");
    setSearchQuery("");
    setActiveCategory("all");
    setCurrentPage(1);
  };

  const handleMaxChange = (value: number) => {
    setPriceMax(value);
    setCurrentPage(1);
  };

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let filtered = [...serviceListings];

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === activeCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query)
      );
    }

    // Filter by rating
    if (selectedRating) {
      filtered = filtered.filter(
        (service) => service.rating >= parseFloat(selectedRating)
      );
    }

    // Filter by price
    filtered = filtered.filter((service) => {
      if (typeof service.price === "number") {
        return service.price <= priceMax;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // popularity - keep original order
        break;
    }

    return filtered;
  }, [activeCategory, searchQuery, selectedRating, priceMax, sortBy]);

  // Paginate
  const pagedListings = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredListings.slice(start, start + PER_PAGE);
  }, [filteredListings, currentPage]);

  const totalPages = Math.ceil(filteredListings.length / PER_PAGE);

  // Active filter tags
  const activeTags = [
    ...(activeCategory !== "all"
      ? [
        {
          label: `Category: ${serviceCategories.find((c) => c.id === activeCategory)?.label
            }`,
          onRemove: () => setActiveCategory("all"),
        },
      ]
      : []),
    ...(searchQuery
      ? [
        {
          label: `Search: ${searchQuery}`,
          onRemove: () => setSearchQuery(""),
        },
      ]
      : []),
    ...(selectedRating
      ? [
        {
          label: `Rating: ${selectedRating}+`,
          onRemove: () => setSelectedRating(""),
        },
      ]
      : []),
    ...(priceMax < PRICE_CEIL
      ? [
        {
          label: `Max Price: ৳${priceMax.toLocaleString()}`,
          onRemove: () => setPriceMax(PRICE_CEIL),
        },
      ]
      : []),
  ];

  const fillRight = ((priceMax - PRICE_FLOOR) / (PRICE_CEIL - PRICE_FLOOR)) * 100;

  return (
    <>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-title">Find the best home services</h1>
          <p className="services-subtitle">
            Premium, reliable, and effortless solutions for your urban lifestyle
            in Bangladesh.
          </p>

          {/* Search Bar */}
          <div className="services-search-bar">
            <div className="services-search-input-wrapper">
              <svg
                className="services-search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="What service do you need?"
                className="services-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="services-search-location">
              <svg
                className="services-location-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="services-location-text">Dhaka, BD</span>
            </div>
            <button className="services-filter-btn" aria-label="Filter services">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
            </button>
          </div>

          {/* Category Pills */}
          <div className="services-categories">
            <button
              className={`services-category-pill ${activeCategory === "all" ? "services-category-pill--active" : ""
                }`}
              onClick={() => {
                setActiveCategory("all");
                setCurrentPage(1);
              }}
            >
              All
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                className={`services-category-pill ${activeCategory === cat.id ? "services-category-pill--active" : ""
                  }`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(1);
                }}
              >
                <span className="services-category-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Services Section */}
      <section className="trending-section">
        <div className="trending-container">
          <div className="trending-header">
            <div>
              <h2 className="trending-title">Trending Services</h2>
              <p className="trending-subtitle">
                Highly requested by residents in Dhaka this month
              </p>
            </div>
            <a href="#" className="trending-view-all">
              View all →
            </a>
          </div>

          <div className="trending-grid">
            {TRENDING_SERVICES.filter((s) => s.featured).map((service) => (
              <div key={service.id} className="trending-card-featured">
                <div className="trending-card-featured-image">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {service.badge && (
                    <span className="trending-badge">{service.badge}</span>
                  )}
                </div>
                <div className="trending-card-featured-info">
                  <div className="trending-rating">
                    <span className="trending-stars">★★★★★</span>
                    <span className="trending-rating-text">
                      ({service.rating}/5 • {service.reviews} reviews)
                    </span>
                  </div>
                  <h3 className="trending-card-title">{service.title}</h3>
                  <p className="trending-card-desc">{service.description}</p>
                  <div className="trending-card-footer">
                    <div className="trending-price">
                      <span className="trending-price-label">STARTING FROM</span>
                      <span className="trending-price-value">
                        ৳{service.price.toLocaleString()}
                      </span>
                    </div>
                    <button className="trending-book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}

            {TRENDING_SERVICES.filter((s) => !s.featured).map((service) => (
              <div key={service.id} className="trending-card-small">
                <div className="trending-card-small-image">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="trending-card-small-info">
                  <div className="trending-card-small-header">
                    <h3 className="trending-card-small-title">{service.title}</h3>
                    <span className="trending-rating-badge">
                      ★ {service.rating}
                    </span>
                  </div>
                  <p className="trending-card-small-desc">{service.description}</p>
                  <div className="trending-card-small-footer">
                    <span className="trending-price-value-small">
                      ৳{service.price.toLocaleString()}
                    </span>
                    <button className="trending-arrow-btn" aria-label={`View ${service.title}`}>
                      →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Listings Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                <h3 className="text-base font-bold text-slate-900">Filters</h3>
                {activeTags.length > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-[#FF5A5F] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 mb-3 tracking-wide">
                  PRICE RANGE
                </h4>
                <div className="relative pt-2">
                  <div className="relative h-1 bg-slate-100 rounded-full">
                    <div
                      className="absolute h-full bg-[#FF5A5F] rounded-full"
                      style={{ width: `${fillRight}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={PRICE_FLOOR}
                    max={PRICE_CEIL}
                    step={100}
                    value={priceMax}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-semibold text-slate-500">
                  <span>৳{PRICE_FLOOR.toLocaleString()}</span>
                  <span>৳{priceMax.toLocaleString()}</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 mb-3 tracking-wide">
                  MINIMUM RATING
                </h4>
                <div className="space-y-2">
                  {["4.5", "4.0"].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => {
                          setSelectedRating(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-3.5 h-3.5 accent-[#FF5A5F]"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {rating} &amp; up
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 mb-3 tracking-wide">
                  SORT BY
                </h4>
                <select
                  className="w-full px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F]"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </aside>

            {/* Listings */}
            <div className="lg:col-span-9">
              {/* Active filter tags */}
              {activeTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeTags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-[#FF5A5F]/8 border border-[#FF5A5F]/20 text-[#FF5A5F] rounded-full text-xs font-semibold px-3 py-1"
                    >
                      {tag.label}
                      <button
                        onClick={tag.onRemove}
                        className="hover:opacity-70"
                        aria-label="Remove filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Count */}
              <p className="text-xs text-slate-400 font-medium mb-4">
                Showing <span className="text-slate-700 font-bold">{pagedListings.length}</span> of{" "}
                <span className="text-slate-700 font-bold">{filteredListings.length}</span> services
              </p>

              {/* Grid */}
              {pagedListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pagedListings.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-[#FF5A5F]/20 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="relative h-48 bg-slate-50 overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-3 left-3 bg-white/95 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-100">
                            {service.categoryLabel}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-extrabold text-slate-900 text-sm md:text-base mb-1.5 group-hover:text-[#FF5A5F] transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-slate-500 text-xs leading-relaxed mb-2">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                            <Star className="w-3 h-3 fill-current" />
                            {service.rating}
                          </div>
                        </div>
                      </div>
                      <div className="p-5 pt-0 flex justify-between items-center border-t border-slate-50">
                        <span className="text-sm font-bold text-slate-900">
                          {service.priceDisplay}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {service.done}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-500 text-sm font-medium mb-4">
                    No services match your filters.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-[#FF5A5F] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#FF4449]"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#FF5A5F] hover:text-[#FF5A5F] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${currentPage === page
                        ? "bg-[#FF5A5F] text-white"
                        : "border border-slate-200 text-slate-600 hover:border-[#FF5A5F] hover:text-[#FF5A5F]"
                        }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#FF5A5F] hover:text-[#FF5A5F] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-500 font-semibold">
          Loading services...
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}