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
                        {waveText(about?.name || "Your Name")}
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
         <Section className="py-16 border-t border-white/10">
            <Container>
               <h2 className="text-2xl font-semibold mb-10">
                  Experience
               </h2>

               <div className="border-l border-white/10 pl-6 space-y-10">
                  {experiences?.length > 0 ? (
                     experiences.map((exp, i) => (
                        <div key={i} className="relative">

                           <div className="absolute -left-3 top-2 w-2 h-2 bg-primary rounded-full" />

                           <p className="text-sm text-white/40">
                              {new Date(exp.startDate).getFullYear()} -{" "}
                              {exp.isCurrent
                                 ? "Present"
                                 : new Date(exp.endDate).getFullYear()}
                           </p>

                           <h3 className="text-xl font-semibold mt-1">
                              {exp.role}
                           </h3>

                           <p className="text-white/60 text-sm">
                              {exp.company} • {exp.location}
                           </p>

                           <p className="text-white/50 mt-2 text-sm leading-relaxed max-w-xl">
                              {exp.description}
                           </p>

                           {/* Achievements */}
                           {exp.achievements?.length > 0 && (
                              <ul className="mt-3 list-disc list-inside text-white/50 text-sm space-y-1">
                                 {exp.achievements.map((a, idx) => (
                                    <li key={idx}>{a}</li>
                                 ))}
                              </ul>
                           )}

                        </div>
                     ))
                  ) : (
                     <p className="text-white/40">No experience found.</p>
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