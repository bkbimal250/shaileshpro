import { useState, useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, Zap } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex bg-bg-canvas min-h-screen text-text-primary font-sans selection:bg-primary/10">
      {/* Sidebar - Hidden on mobile, drawer on mobile */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 lg:relative lg:inset-auto lg:z-0 lg:flex ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />
         <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 lg:h-24 border-b border-white/5 bg-bg-white px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40 shadow-premium">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center bg-bg-canvas border border-white/10 rounded-2xl hover:bg-bg-white transition-all shadow-sm"
              >
                 <Menu size={22} className="text-primary" />
              </button>
              <div>
                 <div className="flex items-center gap-2 mb-1 hidden md:flex">
                    <Zap size={10} className="text-secondary animate-pulse" />
                    <h2 className="text-[9px] font-black uppercase text-white/20 tracking-[0.4em] leading-none">STRATEGIC NODE: LIVE</h2>
                 </div>
                 <h1 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter leading-none">Operations Hub</h1>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button className="hidden md:flex w-11 h-11 items-center justify-center bg-bg-canvas border border-white/10 rounded-2xl text-white/20 hover:text-primary transition-all hover:bg-bg-white shadow-sm">
                 <Bell size={18} />
              </button>
              <div className="flex items-center gap-4 pl-4 md:border-l border-white/5 ml-2">
                 <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-black text-white uppercase italic tracking-widest leading-none">SHAILESH</div>
                    <div className="text-[8px] font-black text-secondary uppercase tracking-[0.3em] mt-1 italic">Growth Lead</div>
                 </div>
                 <div className="w-11 h-11 bg-bg-canvas border border-white/10 rounded-2xl flex items-center justify-center text-primary shadow-sm group hover:border-primary transition-colors cursor-pointer overflow-hidden">
                    <User size={22} className="group-hover:scale-110 transition-transform" />
                 </div>
              </div>
           </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
           <div className="max-w-7xl mx-auto">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;