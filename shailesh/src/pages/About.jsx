import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import useAbout from "@/features/about/useAbout";
import useExperience from "@/features/experience/useExperience";
import { Loader2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
   const { about, loading: aboutLoading } = useAbout();
   const { experiences, loading: expLoading } = useExperience();

   const isLoading = aboutLoading || expLoading;

   if (isLoading && !about) {
      return (
         <div className="flex h-screen items-center justify-center bg-bg-canvas text-white/60">
            <Loader2 className="animate-spin mr-2" />
            Loading...
         </div>
      );
   }

   const waveText = (text) =>
      text.split("").map((char, i) => (
         <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
               duration: 1.2,
               repeat: Infinity,
               delay: i * 0.05,
            }}
            className="inline-block"
         >
            {char === " " ? "\u00A0" : char}
         </motion.span>
      ));

   return (
      <div className="bg-bg-canvas min-h-screen text-white">
         <Navbar />

         {/* HERO */}
         <Section className="pt-24 pb-16">
            <Container>
               <div className="grid md:grid-cols-2 gap-12 items-center">

                  {/* LEFT CONTENT */}
                  <div>
                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap">
                        {waveText( (about?.name)?.toUpperCase() || "Shailesh Patel")}
                     </h1>

                     <p className="text-lg md:text-xl text-white/60 mt-4">
                        {about?.title || "Your Title"}
                     </p>

                     <p className="text-white/50 mt-6 leading-relaxed max-w-xl">
                        {about?.bio ||
                           "I help businesses grow using modern digital strategies and data-driven marketing."}
                     </p>

                     <div className="flex gap-4 mt-8">
                        <a
                           href={about?.resumeUrl || "/contact"}
                           className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
                        >
                           Download CV
                        </a>

                        <a
                           href="/contact"
                           className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition"
                        >
                           Contact
                        </a>
                     </div>
                  </div>

                  {/* RIGHT IMAGE */}
                  <div>
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
                        <img
                           src={about?.profileImage}
                           alt="profile"
                           className="rounded-2xl w-full h-[400px] object-cover"
                        />
                     </div>
                  </div>

               </div>
            </Container>
         </Section>

         {/* ABOUT DETAILS */}
         <Section className="py-16 border-t border-white/10">
            <Container>
               <div className="grid md:grid-cols-2 gap-12">

                  {/* LONG BIO */}
                  <div>
                     <h2 className="text-2xl font-semibold mb-4">
                        About Me
                     </h2>

                     <p className="text-white/60 leading-relaxed">
                        {about?.longBio ||
                           "Detailed description about your experience, work, and approach."}
                     </p>
                  </div>

                  {/* INFO */}
                  <div className="space-y-4">
                     <div>
                        <p className="text-white/40 text-sm">Location</p>
                        <p>{about?.location || "India"}</p>
                     </div>

                     <div>
                        <p className="text-white/40 text-sm">Experience</p>
                        <p>{about?.experienceYears || 0}+ Years</p>
                     </div>

                     <div>
                        <p className="text-white/40 text-sm">Email</p>
                        <p>{about?.email || "example@email.com"}</p>
                     </div>
                  </div>

               </div>
            </Container>
         </Section>

         {/* SKILLS */}
         <Section className="py-16 border-t border-white/10">
            <Container>
               <h2 className="text-2xl font-semibold mb-6">
                  Skills
               </h2>

               <div className="flex flex-wrap gap-3">
                  {about?.skills?.map((skill, i) => (
                     <span
                        key={i}
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-primary/10 hover:text-white transition"
                     >
                        {skill}
                     </span>
                  ))}
               </div>
            </Container>
         </Section>

         {/* TOOLS */}
         <Section className="py-16 border-t border-white/10">
            <Container>
               <h2 className="text-2xl font-semibold mb-6">
                  Tools
               </h2>

               <div className="flex flex-wrap gap-3">
                  {about?.tools?.map((tool, i) => (
                     <span
                        key={i}
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-secondary/10 hover:text-white transition"
                     >
                        {tool}
                     </span>
                  ))}
               </div>
            </Container>
         </Section>

         {/* EXPERIENCE TIMELINE */}
         <Section className="py-24 border-t border-white/10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <Container>
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                  <div>
                     <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Professional Experience</h2>
                     <p className="text-white/50 mt-2 text-lg font-light">My career journey and key milestones.</p>
                  </div>
                  <div className="h-0.5 flex-1 mx-8 bg-gradient-to-r from-primary/20 to-transparent hidden md:block" />
               </div>

               <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 space-y-20">
                  {experiences?.filter(e => e.isActive !== false)
                     .sort((a, b) => (b.order || 0) - (a.order || 0) || new Date(b.startDate) - new Date(a.startDate))
                     .length > 0 ? (
                     experiences.filter(e => e.isActive !== false).map((exp, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.6, delay: i * 0.1 }}
                           viewport={{ once: true }}
                           className="relative"
                        >
                           {/* Timeline Dot */}
                           <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-bg-canvas border-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] z-10" />

                           <div className="grid md:grid-cols-4 gap-8">
                              {/* Date & Type */}
                              <div className="md:col-span-1">
                                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3">
                                    {exp.employmentType || "Full-time"}
                                 </div>
                                 <p className="text-lg font-bold tracking-tight text-primary">
                                    {new Date(exp.startDate).toLocaleString("default", { month: "short", year: "numeric" })} -{" "}
                                    {exp.isCurrent
                                       ? "Present"
                                       : new Date(exp.endDate).toLocaleString("default", { month: "short", year: "numeric" })}
                                 </p>
                              </div>

                              {/* Details */}
                              <div className="md:col-span-3 space-y-6">
                                 <div className="flex items-start justify-between gap-4">
                                    <div>
                                       <h3 className="text-2xl md:text-3xl font-bold leading-tight flex items-center gap-3">
                                          {exp.role}
                                          {exp.isCurrent && (
                                             <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                                          )}
                                       </h3>
                                       <p className="text-lg text-white/80 mt-1 flex items-center gap-2">
                                          {exp.companyLogo && (
                                             <img src={exp.companyLogo} alt={exp.company} className="w-6 h-6 object-contain rounded" />
                                          )}
                                          <span className="font-semibold">{exp.company}</span>
                                          <span className="text-white/20">/</span>
                                          <span className="text-white/40 italic">{exp.location}</span>
                                       </p>
                                    </div>
                                 </div>

                                 <p className="text-white/60 leading-relaxed max-w-2xl text-lg">
                                    {exp.description}
                                 </p>

                                 {/* Metrics Grid */}
                                 {exp.metrics?.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                                       {exp.metrics.map((m, idx) => (
                                          <div key={idx} className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                                             <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">{m.label}</p>
                                             <p className="text-xl font-bold text-primary">{m.value}</p>
                                          </div>
                                       ))}
                                    </div>
                                 )}

                                 {/* Achievements */}
                                 {exp.achievements?.length > 0 && (
                                    <div className="space-y-3 pt-4">
                                       <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em]">Key Contributions</h4>
                                       <ul className="space-y-3">
                                          {exp.achievements.map((a, idx) => (
                                             <li key={idx} className="flex gap-3 text-white/60 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                                {a}
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 )}

                                 {/* Tools */}
                                 {exp.tools?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-4">
                                       {exp.tools.map((t, idx) => (
                                          <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                             {t}
                                          </span>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           </div>
                        </motion.div>
                     ))
                  ) : (
                     <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-white/40 italic">No experience record available yet.</p>
                     </div>
                  )}
               </div>
            </Container>
         </Section>

         {/* CTA */}
         <Section className="py-20 border-t border-white/10">
            <Container>
               <div className="bg-primary rounded-3xl p-12 text-center">

                  <h2 className="text-3xl md:text-4xl font-semibold text-white">
                     Let’s grow your business 🚀
                  </h2>

                  <p className="text-white/80 mt-4">
                     Ready to scale your brand with modern strategies.
                  </p>

                  <a
                     href="/contact"
                     className="inline-flex items-center gap-2 mt-6 bg-white text-primary px-6 py-3 rounded-xl font-medium hover:scale-105 transition"
                  >
                     Contact Me
                     <ArrowUpRight size={18} />
                  </a>

               </div>
            </Container>
         </Section>

         <Footer />
      </div>
   );
};

export default About;