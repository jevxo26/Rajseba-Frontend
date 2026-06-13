import React from 'react';
import { Smartphone, Download } from 'lucide-react';

export default function AppDownload() {
  return (
    <div className="py-16 md:py-24 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-[#FF5A5F] rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between shadow-[0_20px_50px_rgba(255,90,95,0.2)] relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          
          <div className="md:w-1/2 text-white z-10 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Book Services On The Go With Rajseba App
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-lg font-medium leading-relaxed">
              Get exclusive offers, real-time tracking, and a faster booking experience. Download the Rajseba app today!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-6 py-3.5 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Smartphone className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-slate-300 font-normal">Download on the</div>
                  <div className="text-sm">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white text-[#FF5A5F] hover:bg-slate-50 px-6 py-3.5 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Download className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-slate-500 font-normal">GET IT ON</div>
                  <div className="text-sm text-slate-900">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="md:w-5/12 z-10 hidden md:block">
            {/* Abstract phone mockup representation */}
            <div className="relative w-[280px] h-[520px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-800 shadow-2xl mx-auto transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 overflow-hidden flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
              <div className="flex-1 bg-white p-6 pt-12 flex flex-col relative">
                <div className="absolute top-0 left-0 w-full h-32 bg-[#FF5A5F] rounded-b-[2rem]" />
                <div className="relative z-10">
                  <h3 className="font-extrabold text-2xl mb-1 text-white">Rajseba</h3>
                  <p className="text-white/80 text-xs font-medium mb-8">Your Home, Our Service</p>
                  
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-4 w-20 bg-slate-200 rounded-full"></div>
                      <div className="h-4 w-12 bg-[#FF5A5F]/20 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-[#FF5A5F]/20"></div></div>
                       <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-cyan-500/20"></div></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
                    <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
                    <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
