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

   if (loading && socials.length === 0) {
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
               {socials.length > 0 ? (
                  <div className="space-y-12">

                     {socials.map((s) => (
                        <div
                           key={s._id}
                           className="grid md:grid-cols-3 gap-8 bg-white/5 border border-white/10 rounded-2xl p-6"
                        >

                           {/* LEFT INFO */}
                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 {platformIcons[s.platform]}
                                 <h3 className="text-lg font-semibold">
                                    {s.handle || s.platform}
                                 </h3>
                              </div>

                              <p className="text-white/50 text-sm">
                                 {s.niche || "Growth Strategy"}
                              </p>

                              <a
                                 href={s.profileUrl}
                                 target="_blank"
                                 className="inline-flex items-center gap-2 text-primary text-sm"
                              >
                                 Visit Profile <ExternalLink size={14} />
                              </a>
                           </div>

                           {/* METRICS */}
                           <div className="grid grid-cols-2 gap-4 text-center">

                              <div className="bg-bg-canvas border border-white/10 rounded-xl p-4">
                                 <p className="text-sm text-white/40">Followers</p>
                                 <p className="text-lg font-semibold">
                                    {s.followers?.toLocaleString() || "0"}
                                 </p>
                              </div>

                              <div className="bg-bg-canvas border border-white/10 rounded-xl p-4">
                                 <p className="text-sm text-white/40">Engagement</p>
                                 <p className="text-lg font-semibold text-primary">
                                    {s.engagementRate || "0%"}
                                 </p>
                              </div>

                           </div>

                           {/* TOP POSTS */}
                           <div className="grid grid-cols-2 gap-4">

                              {s.topPosts?.slice(0, 2).map((post, i) => (
                                 <a
                                    key={i}
                                    href={post.link}
                                    target="_blank"
                                    className="block border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
                                 >
                                    <img
                                       src={post.image}
                                       className="w-full h-32 object-cover"
                                    />
                                 </a>
                              ))}

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