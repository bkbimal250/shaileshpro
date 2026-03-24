import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UserCircle, Briefcase, History, Share2, MessageSquare, PieChart, Settings, X, LogOut, ShieldCheck } from "lucide-react";

const links = [
  { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={16} /> },
  { name: "About Profile", path: "/dashboard/about", icon: <UserCircle size={16} /> },
  { name: "Projects", path: "/dashboard/projects", icon: <Briefcase size={16} /> },
  { name: "Experience", path: "/dashboard/experience", icon: <History size={16} /> },
  { name: "Socials", path: "/dashboard/socials", icon: <Share2 size={16} /> },
  { name: "Messages", path: "/dashboard/messages", icon: <MessageSquare size={16} /> },
  { name: "Analytics", path: "/dashboard/analytics", icon: <PieChart size={16} /> },
  { name: "Settings", path: "/dashboard/settings", icon: <Settings size={16} /> },
];

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  return (
    <aside className="w-80 h-full bg-bg-canvas border-r border-white/5 p-8 flex flex-col relative z-50 shadow-premium overflow-y-auto">
      {/* Mobile Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/20 hover:text-white lg:hidden transition-colors"
        >
          <X size={24} />
        </button>
      )}

      {/* Brand */}
      <div className="flex items-center gap-4 mb-16 px-4">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-3xl shadow-primary/20 transform -rotate-6">
           <LayoutDashboard size={20} />
        </div>
        <div>
           <div className="text-lg font-black text-white italic uppercase tracking-tighter leading-none">Shailesh.</div>
           <div className="flex items-center gap-2 mt-1 opacity-50">
              <ShieldCheck size={10} className="text-secondary" />
              <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] leading-none italic">ADMIN V2.4</div>
           </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic transition-all group ${active
                ? "bg-primary text-white shadow-3xl shadow-primary/20 scale-[1.02]"
                : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className={`transition-transform duration-500 ${active ? "scale-110" : "group-hover:translate-x-1"}`}>
                {link.icon}
              </span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-10 pt-10 border-t border-white/5 px-4 text-left">
         <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic leading-none">Security Status: Active</div>
         <button className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic text-red-500/60 hover:text-red-600 hover:bg-red-500/5 transition-all w-full border border-transparent hover:border-red-500/10">
            <LogOut size={16} />
            EJECT SESSION
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;