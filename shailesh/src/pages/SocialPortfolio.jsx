import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import useSocial from "@/features/socials/useSocial";
import { Loader2, Instagram, Linkedin, Facebook, Youtube, Twitter, Globe, TrendingUp, BarChart3, Users, ExternalLink, MessageSquare, Heart, Share2, Target, ArrowUpRight } from "lucide-react";

const platformIcons = {
  Instagram: <Instagram className="text-pink-500" />,
  LinkedIn: <Linkedin className="text-blue-600" />,
  Facebook: <Facebook className="text-blue-500" />,
  YouTube: <Youtube className="text-red-500" />,
  Twitter: <Twitter className="text-slate-400" />,
};

const SocialPortfolio = () => {
  const { socials, loading } = useSocial();

  if (loading && socials.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-gray-500">
        <Loader2 className="animate-spin mr-2 text-primary" /> Synchronizing Portfolio...
      </div>
    );
  }

  return (
    <div className="bg-bg-canvas min-h-screen text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <Section className="pt-32 pb-16 md:pt-48 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] -z-10 rounded-full animate-pulse" />
        <Container>
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block italic">Growth Analytics</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-10 uppercase italic tracking-tighter shadow-sm">
               SOCIAL <br /> PERFORMANCE<span className="text-secondary">.</span>
            </h1>
            <p className="text-text-secondary text-xl md:text-2xl lg:text-3xl max-w-3xl font-black tracking-tight italic border-l-4 border-primary pl-6 py-2 uppercase leading-snug">
               Building high-intent communities through data-driven viral optimization.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Stats Summary Layer */}
      <Section className="py-16 relative z-10 -mt-12 bg-bg-white border-y border-white/5 shadow-premium mx-4 md:mx-16 rounded-[3rem]">
         <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-center">
               {[
                 { label: "Community Managed", value: "2.5M+", icon: <Users size={24} className="text-secondary mx-auto mb-6" /> },
                 { label: "Viral Impressions", value: "100M+", icon: <TrendingUp size={24} className="text-primary mx-auto mb-6" /> },
                 { label: "Retention Rate", value: "85%", icon: <BarChart3 size={24} className="text-blue-500 mx-auto mb-6" /> },
                 { label: "Revenue Generated", value: "$4.8M+", icon: <Globe size={24} className="text-accent mx-auto mb-6" /> },
               ].map((stat, i) => (
                 <FadeIn key={i} delay={i * 0.1}>
                    <div className="group hover:-translate-y-1 transition-transform">
                       {stat.icon}
                       <div className="text-3xl md:text-5xl font-black text-white mb-3 italic tracking-tighter uppercase leading-none">{stat.value}</div>
                       <div className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.4em] text-white/20 italic leading-none">{stat.label}</div>
                    </div>
                 </FadeIn>
               ))}
            </div>
         </Container>
      </Section>

      {/* Main Portfolio Registry */}
      <Section className="py-32 bg-bg-canvas">
        <Container>
          <div className="space-y-40">
            {socials.length > 0 ? (
              socials.map((s, i) => (
                <SlideUp key={s._id} delay={i * 0.1}>
                   <div className="grid lg:grid-cols-12 gap-12 md:gap-24 items-start">
                      {/* Brand Info Sidebar */}
                      <div className="lg:col-span-12 xl:col-span-5 bg-bg-white border border-white/5 p-8 md:p-10 rounded-[3rem] sticky top-32 lg:static xl:sticky shadow-premium group">
                         <div className="flex items-center justify-between mb-12">
                            <div className="w-14 h-14 bg-bg-canvas border border-white/5 rounded-2xl flex items-center justify-center shadow-inner-light group-hover:scale-105 transition-transform">
                               {platformIcons[s.platform] || <Globe size={24} className="text-white/20" />}
                            </div>
                            <span className="px-4 py-2 bg-bg-canvas text-[8px] font-black uppercase tracking-[0.4em] text-white/30 border border-white/5 rounded-full italic">{s.platform}</span>
                         </div>
                         
                         <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter leading-none italic group-hover:text-primary transition-colors">{s.handle || s.platform}</h3>
                         <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-10 italic">{s.niche || "Strategic Growth Hub"}</p>
                         
                         <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-10">
                            <div>
                               <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 italic leading-none">Reach</div>
                               <div className="text-xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{s.followers?.toLocaleString() || "N/A"}</div>
                            </div>
                            <div>
                               <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 italic leading-none">Engagement</div>
                               <div className="text-xl md:text-3xl font-black text-secondary italic tracking-tighter uppercase leading-none">{s.engagementRate || "8.5%"}</div>
                            </div>
                         </div>

                         {s.highlights?.length > 0 && (
                            <div className="mt-10 space-y-5 pt-10 border-t border-white/5">
                               {s.highlights.map((h, idx) => (
                                  <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-3 group/h">
                                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic group-hover/h:text-white transition-colors">{h.label}</span>
                                     <span className="text-lg font-black text-white italic tracking-tighter uppercase">{h.value}</span>
                                  </div>
                               ))}
                            </div>
                         )}
                         
                         <div className="mt-10">
                            <a href={s.profileUrl} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center justify-between bg-bg-canvas p-6 rounded-2xl text-white hover:bg-primary transition-all italic border border-white/5">
                               <span className="text-[9px] font-black uppercase tracking-[0.4em]">Audit Presence</span>
                               <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform text-primary group-hover/btn:text-white" />
                            </a>
                         </div>
                      </div>

                      {/* Tactical Execution & Proofs */}
                      <div className="lg:col-span-12 xl:col-span-7 space-y-12">
                         <div className="mb-10">
                            <h4 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">TACTICAL PROOF<span className="text-secondary">.</span></h4>
                            <div className="w-12 h-1 bg-secondary rounded-full" />
                         </div>
                         
                         <div className="grid md:grid-cols-2 gap-8">
                            {s.topPosts?.length > 0 ? s.topPosts.map((post, idx) => (
                               <FadeIn key={idx} delay={idx * 0.1}>
                                  <div className="group/post bg-bg-white rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-premium">
                                     <div className="relative aspect-video overflow-hidden bg-bg-canvas">
                                        <img src={post.image || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop"} className="w-full h-full object-cover grayscale active:grayscale-0 sm:group-hover/post:grayscale-0 transition-all duration-1000 transform group-hover/post:scale-105" alt="Post" />
                                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/post:opacity-100 transition-opacity bg-bg-white/10 backdrop-blur-sm z-30">
                                           <div className="w-10 h-10 bg-bg-canvas text-primary rounded-xl flex items-center justify-center transform hover:scale-110 border border-white/10">
                                              <ExternalLink size={18} />
                                           </div>
                                        </a>
                                     </div>
                                     <div className="p-6 md:p-8">
                                        <div className="flex gap-4 text-white/5 mb-4 items-center">
                                           <Heart size={12} /> <MessageSquare size={12} /> <Share2 size={12} />
                                           <div className="h-[1px] bg-white/5 flex-1" />
                                        </div>
                                        <p className="text-text-secondary text-sm md:text-base font-bold leading-relaxed italic tracking-tight uppercase line-clamp-2">{post.description || "Optimized content architecture calibrated for maximum reach."}</p>
                                     </div>
                                  </div>
                                </FadeIn>
                            )) : <p className="text-white/10 italic font-black uppercase tracking-widest text-[9px]">Awaiting records...</p>}
                         </div>
                         
                         <div className="bg-bg-white p-8 md:p-12 rounded-[3.5rem] border border-white/5 mt-12 relative overflow-hidden group border-l-4 border-l-primary">
                             <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-6 block italic leading-none">Execution Stack</span>
                             <p className="text-text-primary text-xl md:text-3xl font-black uppercase italic leading-tight tracking-tighter relative z-10">
                                DEPLOYED VIA <span className="text-primary">{s.toolsUsed?.slice(0, 1).join("") || "META ADS"}</span>. <br className="hidden md:block" /> PRIMARY FOCUS: <span className="text-secondary">{s.campaignTypes?.slice(0, 1).join("") || "ROI GROWTH"}</span>.
                             </p>
                         </div>
                      </div>
                   </div>
                </SlideUp>
              ))
            ) : (
              <div className="py-24 border border-dashed border-white/5 rounded-[4rem] bg-bg-white text-white/10 uppercase tracking-[0.5em] font-black text-[9px] italic">
                 RE-INDEXING OPERATIONAL ARCHIVES...
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default SocialPortfolio;
