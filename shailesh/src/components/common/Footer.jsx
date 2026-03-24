import useAbout from "@/features/about/useAbout";
import {
   Linkedin,
   Instagram,
   Twitter,
   Youtube,
   Mail,
   Phone,
} from "lucide-react";

const socialIcons = {
   LinkedIn: <Linkedin size={18} />,
   Instagram: <Instagram size={18} />,
   Twitter: <Twitter size={18} />,
   YouTube: <Youtube size={18} />,
};

const Footer = () => {
   const { about } = useAbout();

   return (
      <footer className="bg-bg-canvas border-t border-white/10 py-16">
         <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-4 gap-10">

               {/* BRAND */}
               <div>
                  <h2 className="text-xl font-semibold">
                     {about?.name || "Your Name"}
                  </h2>

                  <p className="text-white/60 text-sm mt-3 max-w-xs">
                     Building high-growth digital strategies for modern businesses.
                  </p>

                  {/* SOCIAL */}
                  <div className="flex gap-3 mt-4">
                     {(about?.socialLinks || []).map((link, i) => (
                        <a
                           key={i}
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:bg-primary hover:text-white transition"
                        >
                           {socialIcons[link.platform]}
                        </a>
                     ))}
                  </div>
               </div>

               {/* NAVIGATION */}
               <div>
                  <h3 className="font-semibold mb-4">Navigation</h3>
                  <ul className="space-y-2 text-white/60 text-sm">
                     <li><a href="/" className="hover:text-white">Home</a></li>
                     <li><a href="/about" className="hover:text-white">About</a></li>
                     <li><a href="/projects" className="hover:text-white">Projects</a></li>
                     <li><a href="/social-portfolio" className="hover:text-white">Social</a></li>
                  </ul>
               </div>

               {/* CONTACT */}
               <div>
                  <h3 className="font-semibold mb-4">Contact</h3>

                  <div className="space-y-3 text-sm text-white/60">
                     <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>{about?.phone || "+91 XXXXX XXXXX"}</span>
                     </div>

                     <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>{about?.email || "hello@email.com"}</span>
                     </div>
                  </div>
               </div>

               {/* CTA */}
               <div>
                  <h3 className="font-semibold mb-4">Get Started</h3>

                  <p className="text-white/60 text-sm">
                     Let’s build something impactful together.
                  </p>

                  <a
                     href="/contact"
                     className="inline-block mt-4 bg-primary px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
                  >
                     Contact Me
                  </a>
               </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/40">
               © {new Date().getFullYear()} {about?.name || "Your Name"}. All rights reserved.
            </div>

         </div>
      </footer>
   );
};

export default Footer;