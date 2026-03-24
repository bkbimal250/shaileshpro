import { useState, useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell, User } from "lucide-react";

const DashboardLayout = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const location = useLocation();

   useEffect(() => {
      setIsSidebarOpen(false);
   }, [location.pathname]);

   return (
      <div className="flex min-h-screen bg-bg-canvas text-white">

         {/* SIDEBAR */}
         <div
            className={`fixed inset-0 z-50 lg:relative lg:inset-auto transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
               }`}
         >
            {/* Overlay */}
            <div
               className="absolute inset-0 bg-black/40 lg:hidden"
               onClick={() => setIsSidebarOpen(false)}
            />
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
         </div>

         {/* MAIN */}
         <div className="flex-1 flex flex-col min-w-0">

            {/* HEADER */}
            <header className="h-16 border-b border-white/10 bg-bg-canvas/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">

               {/* LEFT */}
               <div className="flex items-center gap-4">
                  <button
                     onClick={() => setIsSidebarOpen(true)}
                     className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg"
                  >
                     <Menu size={18} />
                  </button>

                  <h1 className="text-base font-semibold">
                     Dashboard
                  </h1>
               </div>

               {/* RIGHT */}
               <div className="flex items-center gap-3">

                  <button className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition">
                     <Bell size={16} />
                  </button>

                  <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                     <div className="hidden sm:block text-right">
                        <p className="text-sm font-medium">
                           {"Shailesh"}
                        </p>
                        <p className="text-xs text-white/50">
                           Admin
                        </p>
                     </div>

                     <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <User size={18} />
                     </div>
                  </div>

               </div>
            </header>

            {/* CONTENT */}
            <main className="flex-1 p-4 md:p-6">
               <div className="max-w-7xl mx-auto">
                  <Outlet />
               </div>
            </main>

         </div>
      </div>
   );
};

export default DashboardLayout;