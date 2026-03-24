import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import useAbout from "@/features/about/useAbout";
import useExperience from "@/features/experience/useExperience";
import { Loader2, Calendar, MapPin, Briefcase, Award, GraduationCap, ChevronRight, Zap, Target, BarChart3, Users, ArrowUpRight } from "lucide-react";

const About = () => {
   const { about, loading: aboutLoading } = useAbout();
   const { experiences, loading: expLoading } = useExperience();

   const isLoading = aboutLoading || expLoading;

   if (isLoading && !about) {
      return (
         <div className="flex h-screen items-center justify-center bg-bg-canvas text-text-muted">
            <Loader2 className="animate-spin mr-2 text-primary" /> Synchronizing Data...
         </div>
      );
   }

   return (
      <div className="bg-bg-canvas min-h-screen text-text-primary">
         <Navbar />

         {/* Intro Section */}
         <Section className="pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10 rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] -z-10 rounded-full" />

            <Container>
               <div className="grid lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-12 mb-10">
                     <FadeIn>
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-8 block italic">The Analyst Behind The Growth</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-12 uppercase italic tracking-tighter">
                           ABOUT <br /> {about?.name?.split(' ')[0] || "SHAWLESH"}<span className="text-secondary">.</span>
                        </h1>
                     </FadeIn>
                  </div>

                  <div className="lg:col-span-12 xl:col-span-7 whitespace-pre-wrap">
                     <SlideUp delay={0.2}>
                        <div className="max-w-3xl border-l-[6px] border-primary pl-8 md:pl-12 py-6 mb-16  rounded-r-3xl border-y border-white/5">
                           <p className="text-text-primary text-xl md:text-3xl lg:text-4xl font-black leading-tight uppercase italic tracking-tighter">
                              {about?.bio || "Strategies that bridge the gap between human desire and business growth."}
                           </p>
                        </div>
                        <div className="text-text-secondary text-lg md:text-xl leading-relaxed font-bold italic mb-16 max-w-2xl">
                           {about?.longBio || "I am a dedicated digital marketing specialist with a focus on scaling brands through organic content and precision-targeted paid media."}
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-white/10">
                           {(about?.highlights || []).slice(0, 3).map((h, i) => (
                              <div key={i} className="group">
                                 <div className="text-4xl md:text-6xl font-black text-white mb-4 italic tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">{h.value}</div>
                                 <div className="text-[9px] font-black text-white/30 tracking-[0.5em] uppercase italic leading-none">{h.label}</div>
                              </div>
                           ))}
                        </div>
                     </SlideUp>
                  </div>

                  <div className="lg:col-span-12 xl:col-span-5 relative mt-32 xl:mt-0">
                     <SlideUp delay={0.4} className="relative group">
                        <div className="bg-bg-white p-8 md:p-12 rounded-[3.5rem] border border-white/5 relative z-10 overflow-hidden shadow-premium">
                           <div className="space-y-12 relative z-10">
                              {about?.profileImage && (
                                 <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden border-4 border-bg-canvas shadow-2xl bg-bg-canvas group-hover:-translate-y-1 transition-transform duration-700">
                                    <img
                                       src={about.profileImage}
                                       alt={about.name}
                                       className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                    />
                                 </div>
                              )}

                              <div className="space-y-8">
                                 <div className="p-6 bg-bg-canvas rounded-3xl border border-white/5 shadow-inner-light">
                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic leading-none">Primary Deployments</div>
                                    <div className="flex flex-wrap gap-2">
                                       {about?.skills?.map(skill => (
                                          <span key={skill} className="px-4 py-2.5 bg-bg-white border border-white/5 rounded-xl text-[9px] text-text-primary font-black tracking-widest uppercase italic hover:border-primary transition-all">{skill}</span>
                                       ))}
                                    </div>
                                 </div>

                                 <div className="p-6 bg-bg-canvas rounded-3xl border border-white/5 shadow-inner-light">
                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic leading-none">Tactical Gear</div>
                                    <div className="flex flex-wrap gap-2">
                                       {about?.tools?.map(tool => (
                                          <span key={tool} className="px-4 py-2.5 bg-bg-white border border-white/5 rounded-xl text-[9px] text-secondary font-black tracking-widest uppercase italic hover:border-secondary transition-all">{tool}</span>
                                       ))}
                                    </div>
                                 </div>
                              </div>

                              <div className="pt-10 border-t border-white/10">
                                 <a href={about?.resumeUrl || "/contact"} className="group/cv flex items-center justify-between text-white font-black text-[10px] uppercase tracking-[0.3em] italic hover:text-primary transition-all">
                                    GET STRATEGIC DOSSIER <ArrowUpRight size={20} className="group-hover/cv:translate-x-1 group-hover/cv:-translate-y-1 transition-transform" />
                                 </a>
                              </div>
                           </div>
                        </div>
                     </SlideUp>
                  </div>
               </div>
            </Container>
         </Section>

         {/* History Section */}
         <Section className="py-32 md:py-48 bg-bg-canvas border-y border-white/5">
            <Container>
               <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div>
                     <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-tight mb-2">DEPLOYMENT<br /><span className="text-primary">HISTORY.</span></h2>
                     <div className="w-16 h-1 bg-primary rounded-full mt-8" />
                  </div>
                  <p className="max-w-xs text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic text-right leading-relaxed mb-2">Verified operational track record.</p>
               </div>

               <div className="space-y-12 md:space-y-24">
                  {experiences.length > 0 ? (
                     experiences.map((exp, i) => (
                        <SlideUp key={exp._id} delay={i * 0.1}>
                           <div className="group bg-bg-white border border-white/5 p-10 md:p-16 rounded-[4rem] hover:border-primary/20 transition-all duration-700 relative overflow-hidden shadow-premium hover:-translate-y-2">
                              <div className="grid lg:grid-cols-12 gap-12 md:gap-24 relative z-10 text-left items-start">
                                 <div className="lg:col-span-4 flex flex-col justify-between h-full">
                                    <div>
                                       <div className="flex items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10 italic leading-none">
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                          {new Date(exp.startDate).getFullYear()} — {exp.isCurrent ? "ONGOING" : new Date(exp.endDate).getFullYear()}
                                       </div>
                                       <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none group-hover:text-primary transition-colors">{exp.company}</h3>
                                       <p className="text-white/20 font-black uppercase tracking-[0.4em] text-[9px] italic mb-8">{exp.location}</p>
                                    </div>

                                    {exp.companyLogo && (
                                       <div className="w-16 h-16 bg-bg-canvas rounded-2xl border border-white/5 p-4 shadow-inner-light group-hover:scale-110 transition-transform">
                                          <img src={exp.companyLogo} className="w-full h-full object-contain filter grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt="Logo" />
                                       </div>
                                    )}
                                 </div>
                                 <div className="lg:col-span-8 border-l-0 lg:border-l border-white/5 pl-0 lg:pl-20">
                                    <h4 className="text-2xl md:text-3xl font-black text-secondary uppercase tracking-tight mb-12 group-hover:translate-x-2 transition-transform italic leading-none">{exp.role}</h4>
                                    <p className="text-text-secondary text-lg md:text-2xl leading-relaxed mb-16 font-black uppercase italic tracking-tighter max-w-2xl">
                                       {exp.description}
                                    </p>

                                    <div className="space-y-6">
                                       {exp.achievements?.map((ach, idx) => (
                                          <div key={idx} className="flex gap-4 text-text-primary text-base md:text-lg leading-relaxed font-bold uppercase tracking-tight border-b border-white/5 pb-6 italic">
                                             <span className="text-primary italic font-black text-xs shrink-0">//</span>
                                             {ach}
                                          </div>
                                       ))}
                                    </div>

                                    {exp.metrics?.length > 0 && (
                                       <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 mt-16 pt-16 border-t border-white/5">
                                          {exp.metrics.map((m, idx) => (
                                             <div key={idx}>
                                                <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-2 leading-none uppercase group-hover:text-primary transition-colors">{m.value}</div>
                                                <div className="text-[9px] font-black text-secondary tracking-[0.4em] uppercase italic leading-none">{m.label}</div>
                                             </div>
                                          ))}
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </SlideUp>
                     ))
                  ) : (
                     <div className="py-24 border-2 border-dashed border-white/5 rounded-[4rem] text-center text-white/10 uppercase tracking-[0.5em] font-black text-[10px] italic bg-bg-white">
                        DE-INDEXING HISTORIC RECORDS...
                     </div>
                  )}
               </div>
            </Container>
         </Section>

         {/* Final CTA */}
         <Section className="py-48 relative overflow-hidden bg-bg-canvas">
            <Container>
               <FadeIn>
                  <div className="flex flex-col xl:grid xl:grid-cols-2 items-center gap-20 bg-primary/95 border border-white/10 p-16 md:p-24 rounded-[4rem] md:rounded-[5rem] overflow-hidden relative shadow-3xl shadow-primary/20 text-center xl:text-left">
                     <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full animate-pulse" />
                     <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-12 uppercase italic tracking-tighter">INITIATE<br /><span className="text-white/60">GROWTH.</span></h2>
                        <p className="text-white/80 text-lg md:text-2xl font-black uppercase tracking-tighter leading-tight italic border-l-8 border-white/20 pl-8 ml-0 md:ml-0 text-left">High-intensity scale strategies <br className="hidden md:block" /> for elite market brands.</p>
                     </div>
                     <div className="relative z-10 flex justify-center xl:justify-end w-full">
                        <a href="/contact" className="bg-white text-primary px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-sm hover:scale-105 active:scale-95 transition-all shadow-3xl flex items-center gap-4 italic group">
                           <span>START INTERACTION</span>
                           <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                     </div>
                  </div>
               </FadeIn>
            </Container>
         </Section>

         <Footer />
      </div>
   );
};

export default About;