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
    <aside className="w-64 h-full bg-bg-canvas border-r border-white/5 p-5 flex flex-col relative z-50 shadow-premium overflow-y-auto">
      {/* Mobile Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/20 hover:text-white lg:hidden transition-colors"
        >
          <X size={20} />
        </button>
      )}

      {/* Brand */}
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-3xl shadow-primary/20 transform -rotate-6">
          <LayoutDashboard size={18} />
        </div>
        <div>
          <div className="text-base font-black text-white italic uppercase tracking-tighter leading-none">Shailesh.</div>
          <div className="flex items-center gap-2 mt-1 opacity-50">
            <ShieldCheck size={8} className="text-secondary" />
            <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] leading-none italic">ADMIN V2.4</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] italic transition-all group ${active
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
      <div className="mt-8 pt-8 border-t border-white/5 px-2 text-left">
        <div className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 italic leading-none">Security Status: Active</div>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] italic text-red-500/60 hover:text-red-600 hover:bg-red-500/5 transition-all w-full border border-transparent hover:border-red-500/10">
          <LogOut size={16} />
          EJECT SESSION
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;