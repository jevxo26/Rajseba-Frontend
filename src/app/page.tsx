import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
    

      {/* Hero Section */}
      <div className="pt-24 relative h-[640px] flex items-center bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm shadow">
              <span className="text-emerald-500">●</span>
              <span className="font-medium">Trusted by 50,000+ customers</span>
            </div>
            
            <h1 className="text-6xl leading-[1.1] font-semibold tracking-tighter">
              Home services,<br />
              <span className="text-[#FF5A5F]">done right.</span>
            </h1>
            
            <p className="text-xl text-zinc-600 max-w-md">
              Book trusted professionals for cleaning, repairs, painting, and more. Fast, reliable, and affordable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 sm:flex-none bg-[#FF5A5F] hover:bg-[#FF4449] text-white font-semibold py-4 px-10 rounded-2xl text-lg transition-all active:scale-[0.985]">
                Get Started
              </button>
              <button className="flex-1 sm:flex-none border border-zinc-300 hover:bg-zinc-50 font-medium py-4 px-10 rounded-2xl text-lg transition-all">
                Watch Video
              </button>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-300 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-rose-300 border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-medium">4.9/5</div>
                  <div className="text-zinc-500 text-xs">from 12k reviews</div>
                </div>
              </div>
              <div className="h-8 w-px bg-zinc-200"></div>
              <div>✓ Verified Professionals</div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden md:block">
            <div className="absolute -right-6 -top-8 w-80 h-80 bg-[#FF5A5F]/10 rounded-[3rem] -rotate-6"></div>
            <Image 
              src="/hero-image.jpg" 
              alt="Happy professionals" 
              width={620} 
              height={580}
              className="rounded-3xl shadow-2xl relative z-10"
              priority
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">✅</div>
              <div>
                <div className="font-semibold">Service Completed</div>
                <div className="text-sm text-zinc-500">Just now • Mirpur, Dhaka</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Categories */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">Explore Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: "🔧", label: "AC Repair" },
            { icon: "🔨", label: "Plumbing" },
            { icon: "🧹", label: "Cleaning" },
            { icon: "💡", label: "Electrical" },
            { icon: "🛠️", label: "Handyman" },
            { icon: "📺", label: "CCTV" },
            { icon: "🛋️", label: "Appliance Repair" },
            { icon: "🎨", label: "Painting" },
          ].map((cat, i) => (
            <div key={i} className="group bg-white border border-zinc-100 hover:border-[#FF5A5F]/30 hover:shadow-lg rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <div className="font-semibold text-center">{cat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated Services */}
      <div className="bg-zinc-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-semibold">Top Rated Services</h2>
            <a href="#" className="text-[#FF5A5F] font-medium flex items-center gap-1 hover:underline">
              View all <span>→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-xl transition-all group">
              <div className="h-56 bg-zinc-200 relative">
                <Image 
                  src="/ac-repair.jpg" 
                  alt="AC Repair" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
                  ⭐ 4.9
                </div>
              </div>
              <div className="p-6">
                <div className="font-semibold mb-1">Expert AC Repair</div>
                <div className="text-sm text-zinc-500 mb-4">Fast cooling restoration by certified technicians</div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-semibold">৳700</span>
                    <span className="text-xs text-zinc-400">/service</span>
                  </div>
                  <button className="bg-[#FF5A5F] text-white text-sm px-6 py-2.5 rounded-2xl hover:bg-[#FF4449] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-xl transition-all group">
              <div className="h-56 bg-zinc-200 relative">
                <Image 
                  src="/painting.jpg" 
                  alt="Painting" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
                  ⭐ 4.8
                </div>
              </div>
              <div className="p-6">
                <div className="font-semibold mb-1">Premium Painting</div>
                <div className="text-sm text-zinc-500 mb-4">Interior &amp; exterior painting with premium materials</div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-semibold">৳3500</span>
                    <span className="text-xs text-zinc-400">/room</span>
                  </div>
                  <button className="bg-[#FF5A5F] text-white text-sm px-6 py-2.5 rounded-2xl hover:bg-[#FF4449] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-xl transition-all group">
              <div className="h-56 bg-zinc-200 relative">
                <Image 
                  src="/home-clean.jpg" 
                  alt="Home Cleaning" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
                  ⭐ 4.9
                </div>
              </div>
              <div className="p-6">
                <div className="font-semibold mb-1">Sparkle Home Clean</div>
                <div className="text-sm text-zinc-500 mb-4">Deep cleaning by professional teams</div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-semibold">৳1800</span>
                    <span className="text-xs text-zinc-400">/session</span>
                  </div>
                  <button className="bg-[#FF5A5F] text-white text-sm px-6 py-2.5 rounded-2xl hover:bg-[#FF4449] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-xl transition-all group">
              <div className="h-56 bg-zinc-200 relative">
                <Image 
                  src="/washing-machine.jpg" 
                  alt="Washing Machine Repair" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
                  ⭐ 4.7
                </div>
              </div>
              <div className="p-6">
                <div className="font-semibold mb-1">Washing Machine Repair</div>
                <div className="text-sm text-zinc-500 mb-4">Quick fix for all major brands</div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-semibold">৳650</span>
                    <span className="text-xs text-zinc-400">/service</span>
                  </div>
                  <button className="bg-[#FF5A5F] text-white text-sm px-6 py-2.5 rounded-2xl hover:bg-[#FF4449] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-4">Why Choose Us</h2>
        <p className="text-center text-zinc-600 max-w-md mx-auto mb-16">We connect you with the best local service professionals</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl mb-6">✅</div>
            <div className="font-semibold text-xl mb-3">Verified Professionals</div>
            <p className="text-zinc-600">Every service provider is background checked and highly rated</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center text-4xl mb-6">🔒</div>
            <div className="font-semibold text-xl mb-3">Safe Payments</div>
            <p className="text-zinc-600">Pay only when you&apos;re 100% satisfied with the work</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center text-4xl mb-6">⭐</div>
            <div className="font-semibold text-xl mb-3">Quality Guarantee</div>
            <p className="text-zinc-600">Not happy? We&apos;ll send another professional at no extra cost</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-zinc-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-16">How it works</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#FF5A5F] text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">1</div>
              <div className="font-semibold text-xl mb-3">Select Service</div>
              <p className="text-zinc-400">Choose from our wide range of home services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#FF5A5F] text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">2</div>
              <div className="font-semibold text-xl mb-3">Schedule</div>
              <p className="text-zinc-400">Pick a date and time that works for you</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#FF5A5F] text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">3</div>
              <div className="font-semibold text-xl mb-3">Get Service</div>
              <p className="text-zinc-400">Relax while our expert takes care of everything</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-4">Real Happy Customers, Real Stories</h2>
        <p className="text-center text-zinc-600 mb-16">Don&apos;t just take our word for it</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border rounded-3xl p-8">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
            </div>
            <p className="italic text-zinc-600 mb-8">"The AC technician was professional and fixed my unit in under an hour. Very happy with the service!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 rounded-full"></div>
              <div>
                <div className="font-medium">Rahim Ahmed</div>
                <div className="text-xs text-zinc-500">Gulshan, Dhaka</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-3xl p-8">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
            </div>
            <p className="italic text-zinc-600 mb-8">"Painting my apartment was seamless. The team was punctual and did an amazing job."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 rounded-full"></div>
              <div>
                <div className="font-medium">Sharmin R.</div>
                <div className="text-xs text-zinc-500">Banani, Dhaka</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-3xl p-8">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
            </div>
            <p className="italic text-zinc-600 mb-8">"Best cleaning service I&apos;ve ever used. My home has never looked better. Highly recommended!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 rounded-full"></div>
              <div>
                <div className="font-medium">Kazi Farhan</div>
                <div className="text-xs text-zinc-500">Uttara, Dhaka</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}