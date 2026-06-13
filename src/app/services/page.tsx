"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";

const serviceCategories = [
  { id: "cleaning", label: "Cleaning", icon: "🧹" },
  { id: "ac-repair", label: "AC Repair", icon: "❄️" },
  { id: "plumbing", label: "Plumbing", icon: "🔧" },
  { id: "electrical", label: "Electrical", icon: "⚡" },
  { id: "painting", label: "Painting", icon: "🎨" },
];

const RATING_OPTIONS = [
  { value: "4.9", label: "4.9 & up", stars: 5 },
  { value: "4.7", label: "4.7 & up", stars: 5 },
  { value: "4.5", label: "4.5 & up", stars: 4 },
  { value: "4.0", label: "4.0 & up", stars: 4 },
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

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("cleaning");
  const [searchQuery, setSearchQuery] = useState("");

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
                id="service-search"
                type="text"
                placeholder="What service do you need?"
                className="services-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <button
              id="filter-button"
              className="services-filter-btn"
              aria-label="Filter services"
            >
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
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                id={`category-${cat.id}`}
                className={`services-category-pill ${activeCategory === cat.id
                    ? "services-category-pill--active"
                    : ""
                  }`}
                onClick={() => setActiveCategory(cat.id)}
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
          {/* Section Header */}
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

          {/* Service Cards */}
          <div className="trending-grid">
            {/* Featured Large Card */}
            {trendingServices
              .filter((s) => s.featured)
              .map((service) => (
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
                        <span className="trending-price-label">
                          STARTING FROM
                        </span>
                        <span className="trending-price-value">
                          ৳{service.price.toLocaleString()}
                        </span>
                      </div>
                      <button className="trending-book-btn">Book Now</button>
                    </div>
                  </div>
                </div>
              ))}

            {/* Smaller Cards */}
            {trendingServices
              .filter((s) => !s.featured)
              .map((service) => (
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
                      <h3 className="trending-card-small-title">
                        {service.title}
                      </h3>
                      <span className="trending-rating-badge">
                        ★ {service.rating}
                      </span>
                    </div>
                    <p className="trending-card-small-desc">
                      {service.description}
                    </p>
                    <div className="trending-card-small-footer">
                      <span className="trending-price-value-small">
                        ৳{service.price.toLocaleString()}
                      </span>
                      <button
                        className="trending-arrow-btn"
                        aria-label={`View ${service.title}`}
                      >
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
      <ServiceListings />
    </>
  );
}

/* ============================
   SERVICE LISTINGS DATA
   ============================ */
const serviceListings = [
  {
    id: "luxury-wall-painting",
    title: "Luxury Wall Painting",
    description: "Italian finish textures and moisture-proof...",
    image: "/images/service/service-3.png",
    category: "Painting & Renovation",
    price: "৳15/sq.ft",
    done: "3k+ done",
  },
  {
    id: "emergency-leak-repair",
    title: "Emergency Leak Repair",
    description: "60-minute response time for all plumbing...",
    image: "/images/service/service-4.png",
    category: "Plumbing",
    price: "৳600",
    done: "1.2k+ done",
  },
  {
    id: "smart-home-setup",
    title: "Smart Home Setup",
    description: "Installation of smart switches, hubs, and...",
    image: "/images/service/service-5.png",
    category: "Electrical",
    price: "৳2,500",
    done: "800+ done",
  },
  {
    id: "refrigerator-servicing",
    title: "Refrigerator Servicing",
    description: "Gas charge, compressor checks, and...",
    image: "/images/service/service-6.png",
    category: "Appliance",
    price: "৳1,500",
    done: "2.1k+ done",
  },
  {
    id: "sofa-carpet-shampoo",
    title: "Sofa & Carpet Shampoo",
    description: "Deep vacuuming and shampooing for all...",
    image: "/images/service/service-7.png",
    category: "Cleaning",
    price: "৳800/seat",
    done: "4k+ done",
  },
  {
    id: "cabinet-wood-polishing",
    title: "Cabinet Wood Polishing",
    description: "Restore the natural shine of your premium",
    image: "/images/service/service-8.png",
    category: "Renovation",
    price: "৳3,500",
    done: "500+ done",
  },
];

/* ============================
   SERVICE LISTINGS COMPONENT
   ============================ */
function ServiceListings() {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceMax, setPriceMax] = useState(10000);

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

    // Read initial state from URL
    const [activeCategory, setActiveCategory] = useState(
      searchParams.get("category") || "all"
    );
    const [searchQuery, setSearchQuery] = useState(
      searchParams.get("q") || ""
    );
    const [selectedRating, setSelectedRating] = useState<string>(
      searchParams.get("min_rating") || ""
    );
    const [sortBy, setSortBy] = useState(
      searchParams.get("sort") || "popularity"
    );
    const [priceRange, setPriceRange] = useState<number>(
      Number(searchParams.get("price_max")) || PRICE_CEIL
    );
    const [currentPage, setCurrentPage] = useState(
      Number(searchParams.get("page")) || 1
    );
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

    // Sync state → URL whenever any filter changes
    const syncURL = useCallback(
      (overrides: Partial<Record<string, string>> = {}) => {
        const params: Record<string, string> = {
          category: activeCategory !== "all" ? activeCategory : "",
          q: searchQuery,
          min_rating: selectedRating,
          sort: sortBy !== "popularity" ? sortBy : "",
          price_max: priceRange < PRICE_CEIL ? String(priceRange) : "",
          page: currentPage > 1 ? String(currentPage) : "",
          ...overrides,
        };
        router.replace(pathname + buildURL(params), { scroll: false });
      },
      [activeCategory, searchQuery, selectedRating, sortBy, priceRange, currentPage, router, pathname]
    );

    useEffect(() => {
      syncURL();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory, searchQuery, selectedRating, sortBy, priceRange, currentPage]);

    const handleClearFilters = () => {
      setSelectedRating("");
      setPriceRange(PRICE_CEIL);
      setSortBy("popularity");
      setSearchQuery("");
      setActiveCategory("all");
      setCurrentPage(1);
    };

    const fillRight = ((priceMax - PRICE_FLOOR) / (PRICE_CEIL - PRICE_FLOOR)) * 100;

    return (
      <section className="listings-section">
        <div className="listings-container">
          {/* Filters Sidebar */}
          <aside className="listings-filters">
            <div className="filters-header">
              <h3 className="filters-title">Filters</h3>
              <button className="filters-clear" onClick={handleClear}>Clear</button>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-label">PRICE RANGE</h4>
              <div className="filter-range-slider">
                <div className="filter-range-track">
                  <div
                    className="filter-range-fill"
                    style={{ left: `0%`, width: `${fillRight}%` }}
                  />
                </div>
                <input
                  type="range"
                  className="filter-range-input single-range"
                  min={PRICE_FLOOR}
                  max={PRICE_CEIL}
                  step={100}
                  value={priceMax}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  aria-label="Maximum price"
                />
              </div>
              <div className="filter-price-range">
                <span>৳{PRICE_FLOOR.toLocaleString()}</span>
                <span>৳{priceMax.toLocaleString()}</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="filter-group">
              <h4 className="filter-label">MINIMUM RATING</h4>
              <div className="filter-radio-group">
                <label className="filter-radio">
                  <input
                    type="radio"
                    name="rating"
                    value="4.5"
                    checked={selectedRating === "4.5"}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  />
                  <span className="filter-radio-circle" />
                  <span>4.5 &amp; up</span>
                </label>
                <label className="filter-radio">
                  <input
                    type="radio"
                    name="rating"
                    value="4.0"
                    checked={selectedRating === "4.0"}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  />
                  <span className="filter-radio-circle" />
                  <span>4.0 &amp; up</span>
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div className="filter-group">
              <h4 className="filter-label">SORT BY</h4>
              <select
                id="sort-by"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Service Cards Grid */}
            <div className="listings-content">
              <div className="listings-grid">
                {serviceListings.map((service) => (
                  <div key={service.id} className="listing-card">
                    <div className="listing-card-image">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <span className="listing-card-category">
                        {service.category}
                      </span>
                    </div>
                    <div className="listing-card-info">
                      <h3 className="listing-card-title">{service.title}</h3>
                      <p className="listing-card-desc">{service.description}</p>
                      <div className="listing-card-footer">
                        <span className="listing-card-price">{service.price}</span>
                        <span className="listing-card-done">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          {service.done}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4">{service.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                      <span className="text-base font-bold text-slate-900">৳{service.price.toLocaleString()}</span>
                      <button className="w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-700 transition-colors cursor-pointer">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. FILTER + LISTINGS ── */}
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Desktop Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm sticky top-24">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                    <h3 className="text-base font-bold text-slate-900">Filters</h3>
                    {activeTags.length > 0 && (
                      <button onClick={handleClearFilters} className="text-xs font-bold text-[#FF5A5F] hover:underline">
                        Clear all
                      </button>
                    )}
                  </div>
                  <FilterPanel />
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
                          <button onClick={tag.onRemove} className="hover:opacity-70" aria-label="Remove filter">
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
                              <p className="text-slate-500 text-xs leading-relaxed mb-2">{service.description}</p>
                              <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                                <Star className="w-3 h-3 fill-current" />
                                {service.rating}
                              </div>
                            </div>
                          </div>
                          <div className="p-5 pt-0 flex justify-between items-center border-t border-slate-50">
                            <span className="text-sm font-bold text-slate-900">{service.priceDisplay}</span>
                            <span className="text-[10px] font-bold text-slate-400">{service.done}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-slate-500 text-sm font-medium mb-4">No services match your filters.</p>
                      <button
                        onClick={handleClearFilters}
                        className="bg-[#FF5A5F] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#FF4449]"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}

                  {/* Pagination */}
                  <div className="listings-pagination">
                    <button
                      className="pagination-arrow"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        className={`pagination-num ${currentPage === page ? "pagination-num--active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-arrow"
                      disabled={currentPage === 3}
                      onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
          </section>
          );
}

          export default function ServicesPage() {
  return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-slate-500 font-semibold">Loading services...</div>}>
            <ServicesContent />
          </Suspense>
          );
}