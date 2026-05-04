import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import useSocial from "@/features/socials/useSocial";
import {
   Loader2,
   Instagram,
   Linkedin,
   Facebook,
   Youtube,
   Twitter,
   ExternalLink,
} from "lucide-react";

const platformIcons = {
   Instagram: <Instagram className="text-pink-500" />,
   LinkedIn: <Linkedin className="text-blue-500" />,
   Facebook: <Facebook className="text-blue-500" />,
   YouTube: <Youtube className="text-red-500" />,
   Twitter: <Twitter className="text-gray-400" />,
};

const SocialPortfolio = () => {
   const { socials, loading } = useSocial();

   const activeSocials = socials
      .filter((s) => s.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

   if (loading && activeSocials.length === 0) {
      return (
         <div className="flex h-screen items-center justify-center text-white/60">
            <Loader2 className="animate-spin mr-2" />
            Loading...
         </div>
      );
   }

   return (
      <div className="bg-bg-canvas text-white min-h-screen">
         <Navbar />

         {/* HEADER */}
         <Section className="pt-24 pb-12 border-b border-white/10">
            <Container>
               <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-bold">
                     Social Portfolio
                  </h1>
                  <p className="text-white/60 mt-4">
                     Performance-driven social media growth and analytics.
                  </p>
               </div>
            </Container>
         </Section>

         {/* SOCIAL LIST */}
         <Section className="py-16">
            <Container>
               {activeSocials.length > 0 ? (
                  <div className="space-y-12">
                     {activeSocials.map((s) => (
                        <div
                           key={s._id}
                           className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col gap-8"
                        >
                           <div className="grid md:grid-cols-3 gap-8">
                              {/* LEFT INFO */}
                              <div className="space-y-4">
                                 <div className="flex items-center gap-3">
                                    {platformIcons[s.platform]}
                                    <div>
                                       <h3 className="text-lg font-semibold">
                                          {s.handle || s.platform}
                                       </h3>
                                       <div className="flex gap-2 mt-1">
                                          {s.isPersonal && (
                                             <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                                Personal
                                             </span>
                                          )}
                                          {s.managed && (
                                             <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                                Managed
                                             </span>
                                          )}
                                       </div>
                                    </div>
                                 </div>

                                 <p className="text-white/50 text-sm">
                                    {s.niche || "Growth Strategy"}
                                 </p>

                                 <a
                                    href={s.profileUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
                                 >
                                    Visit Profile <ExternalLink size={14} />
                                 </a>

                                 {/* HIGHLIGHTS */}
                                 {s.highlights?.length > 0 && (
                                    <div className="pt-4 grid grid-cols-2 gap-3 border-t border-white/5">
                                       {s.highlights.map((h, i) => (
                                          <div key={i}>
                                             <p className="text-[10px] text-white/40 uppercase font-bold tracking-tight">{h.label}</p>
                                             <p className="text-sm font-medium">{h.value}</p>
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </div>

                              {/* METRICS */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 text-center justify-center">
                                 <div className="bg-bg-canvas border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                                    <p className="text-sm text-white/40">Followers</p>
                                    <p className="text-2xl font-bold">
                                       {s.followers?.toLocaleString() || "0"}
                                    </p>
                                    {s.growth && (
                                       <p className="text-xs text-green-400 mt-1 font-medium">
                                          {s.growth}
                                       </p>
                                    )}
                                 </div>

                                 <div className="bg-bg-canvas border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                                    <p className="text-sm text-white/40">Engagement</p>
                                    <p className="text-2xl font-bold text-primary">
                                       {s.engagementRate || "0%"}
                                    </p>
                                 </div>

                                 {/* ADDITIONAL INFO */}
                                 <div className="bg-bg-canvas border border-white/10 rounded-xl p-4 text-left space-y-2">
                                    {s.campaignTypes?.length > 0 && (
                                       <div>
                                          <p className="text-[10px] text-white/40 uppercase font-bold">Campaigns</p>
                                          <p className="text-xs text-white/70 line-clamp-1">{s.campaignTypes.join(", ")}</p>
                                       </div>
                                    )}
                                    {s.toolsUsed?.length > 0 && (
                                       <div>
                                          <p className="text-[10px] text-white/40 uppercase font-bold">Tools</p>
                                          <p className="text-xs text-white/70 line-clamp-1">{s.toolsUsed.join(", ")}</p>
                                       </div>
                                    )}
                                 </div>
                              </div>

                              {/* TOP POSTS */}
                              <div className="space-y-4">
                                 <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Top Performing Content</h4>
                                 <div className="grid grid-cols-2 gap-4">
                                    {s.topPosts?.slice(0, 4).map((post, i) => (
                                       <a
                                          key={i}
                                          href={post.link}
                                          target="_blank"
                                          className="group relative block border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition"
                                       >
                                          <img
                                             src={post.image}
                                             className="w-full h-24 object-cover group-hover:scale-110 transition duration-500"
                                          />
                                          {post.description && (
                                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition p-2 flex items-end">
                                                <p className="text-[10px] line-clamp-2 text-white/90 leading-tight">{post.description}</p>
                                             </div>
                                          )}
                                       </a>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}

                  </div>
               ) : (
                  <div className="text-center text-white/50 py-20">
                     No social data available.
                  </div>
               )}
            </Container>
         </Section>

         {/* CTA */}
         <Section className="py-20 border-t border-white/10">
            <Container>
               <div className="bg-primary rounded-2xl p-10 text-center">

                  <h2 className="text-2xl md:text-3xl font-semibold">
                     Grow your social presence 🚀
                  </h2>

                  <p className="text-white/80 mt-3">
                     Let’s scale your audience with proven strategies.
                  </p>

                  <a
                     href="/contact"
                     className="inline-block mt-6 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
                  >
                     Contact Me
                  </a>

               </div>
            </Container>
         </Section>

         <Footer />
      </div>
   );
};

export default SocialPortfolio;