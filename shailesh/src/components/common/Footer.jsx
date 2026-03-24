import useAbout from "@/features/about/useAbout";
import { Linkedin, Instagram, Twitter, Youtube, ArrowUpRight, Globe, Mail, Phone } from "lucide-react";

const socialIcons = {
   LinkedIn: <Linkedin size={18} />,
   Instagram: <Instagram size={18} />,
   Twitter: <Twitter size={18} />,
   YouTube: <Youtube size={18} />,
};

const Footer = () => {
   const { about } = useAbout();

   return (
      <footer className="bg-bg-canvas border-t border-slate-200 pt-32 pb-16 overflow-hidden relative">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[150px] -z-0 rounded-full animate-pulse" />

         <div className="max-w-7xl mx-auto px-10 relative z-10">
            <div className="grid md:grid-cols-12 gap-16 mb-32">
               {/* BRAND SIDE */}
               <div className="md:col-span-6">
                  <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-10 italic tracking-tighter uppercase leading-none">
                     {about?.name?.toUpperCase() || "Shailesh Patel"}<span className="text-primary">.</span>
                  </h2>
                  <p className="text-text-secondary text-lg md:text-xl max-w-sm leading-relaxed mb-12 italic font-black uppercase tracking-tight">
                     Building high-growth digital engines <br /> for visionary industry leaders.
                  </p>
                  <div className="flex flex-wrap gap-5">
                     {(about?.socialLinks || []).map((link, i) => (
                        <a
                           key={i}
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-14 h-14 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-primary hover:border-primary transition-all duration-700 shadow-premium group"
                           title={link.platform}
                        >
                           {socialIcons[link.platform] || <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </a>
                     ))}
                  </div>
               </div>

               {/* NAV LINKS */}
               <div className="md:col-span-3">
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-12 italic leading-none">Operational Index</div>
                  <ul className="space-y-6">
                     <li><a href="/" className="text-text-muted hover:text-primary hover:pl-2 transition-all font-black uppercase text-xs tracking-widest italic">Home Intelligence</a></li>
                     <li><a href="/about" className="text-text-muted hover:text-primary hover:pl-2 transition-all font-black uppercase text-xs tracking-widest italic">The Strategist</a></li>
                     <li><a href="/projects" className="text-text-muted hover:text-primary hover:pl-2 transition-all font-black uppercase text-xs tracking-widest italic">Selected Work</a></li>
                     <li><a href="/social-portfolio" className="text-text-muted hover:text-primary hover:pl-2 transition-all font-black uppercase text-xs tracking-widest italic">Viral Benchmarks</a></li>
                  </ul>
               </div>

               {/* CONTACT QUICK */}
               <div className="md:col-span-3">
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-12 italic leading-none">Transmission Hub</div>
                  <ul className="space-y-10">
                     <li className="group">
                        <div className="flex items-center gap-3 text-slate-200 mb-3 italic">
                           <Phone size={14} />
                           <span className="text-[10px] font-black uppercase tracking-widest leading-none">Direct Connection</span>
                        </div>
                        <a href={`tel:${about?.phone}`} className="text-text-primary hover:text-primary font-black tracking-tighter text-2xl transition-colors italic leading-none">{about?.phone || "+91 91100 XXXX"}</a>
                     </li>
                     <li className="group">
                        <div className="flex items-center gap-3 text-slate-200 mb-3 italic">
                           <Mail size={14} />
                           <span className="text-[10px] font-black uppercase tracking-widest leading-none">Strategic Mail</span>
                        </div>
                        <a href={`mailto:${about?.email}`} className="text-text-primary hover:text-primary font-black tracking-tighter text-2xl transition-colors italic break-all leading-none">{about?.email || "hello@shailesh.pro"}</a>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="pt-20 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="text-[10px] font-black text-slate-200 uppercase tracking-[0.6em] italic text-center md:text-left">
                  © {new Date().getFullYear()} STRATEGIC ARCHIVE. FULLY ENCRYPTED SYSTEM.
               </div>
               <div className="flex gap-12">
                  <a href="/contact" className="text-[9px] font-black text-slate-200 hover:text-text-primary transition-colors uppercase tracking-[0.4em] italic">Privacy Policy</a>
                  <a href="/contact" className="text-[9px] font-black text-slate-200 hover:text-text-primary transition-colors uppercase tracking-[0.4em] italic">Operational Terms</a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;