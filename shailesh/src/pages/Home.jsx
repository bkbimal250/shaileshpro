import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import ProjectCard from "@/features/projects/ProjectCard";
import useAbout from "@/features/about/useAbout";
import useProjects from "@/features/projects/useProjects";
import useSocial from "@/features/socials/useSocial";
import { Loader2, ArrowUpRight, Instagram, Linkedin, Facebook, Youtube, Twitter, Globe } from "lucide-react";
import { motion } from "framer-motion";

const platformIcons = {
  Instagram: <Instagram className="text-pink-500" />,
  LinkedIn: <Linkedin className="text-blue-500" />,
  Facebook: <Facebook className="text-blue-500" />,
  YouTube: <Youtube className="text-red-500" />,
  Twitter: <Twitter className="text-gray-400" />,
  Globe: <Globe className="text-blue-400" />,
};

const AnimatedGlowText = ({ text }) => {
  return (
    <motion.span
      className="inline-block"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            repeat: Infinity,
            repeatDelay: 1,
          },
        },
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0.3, y: 10 },
            visible: {
              opacity: [0.3, 1, 0.3],
              y: [10, 0, 10],
              textShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 0px 14px rgba(255,255,255,0.9)",
                "0px 0px 0px rgba(0,0,0,0)",
              ],
              transition: {
                duration: 1.2,
                ease: "easeInOut",
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Home = () => {
  const { about, loading: aboutLoading } = useAbout();
  const { projects } = useProjects();
  const { socials } = useSocial();

  if (aboutLoading && !about) {
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

      {/* HERO */}
      <Section className="pt-24 pb-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <AnimatedGlowText
                  text={
                    about?.tagline ||
                    "Grow your brand with data-driven strategies"
                  }
                />
              </h1>

              <p className="text-white/60 mt-4 max-w-xl">
                {about?.bio ||
                  "I help businesses scale through performance marketing, social growth, and analytics."}
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="/contact"
                  className="bg-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Get Started
                </a>

                <a
                  href="/projects"
                  className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5 transition"
                >
                  View Work
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div>
              {about?.profileImage && (
                <img
                  src={about.profileImage}
                  className="rounded-2xl w-full h-[400px] object-cover border border-white/10"
                />
              )}
            </div>

          </div>
        </Container>
      </Section>

      {/* SERVICES */}
      <Section className="py-16 border-t border-white/10">
        <Container>
          <h2 className="text-2xl font-semibold mb-8">Services</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Organic Growth",
                desc: "Build strong communities and brand presence.",
              },
              {
                title: "Performance Marketing",
                desc: "Run targeted ads for maximum ROI.",
              },
              {
                title: "Analytics",
                desc: "Use data to improve conversions.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-white/60 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SOCIAL PROOF - PERFORMANCE DECK */}
      <Section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Social Proof</h2>
              <p className="text-white/50 text-lg">Measurable impact across global digital ecosystems.</p>
            </div>
            <a href="/social-portfolio" className="group flex items-center gap-2 text-primary text-sm font-semibold">
              View Analytics <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socials.slice(0, 4).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-primary/40 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 bg-bg-canvas rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                    {platformIcons[s.platform] || <Globe size={24} className="text-white/20" />}
                  </div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                    Live Data
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-1">
                      {s.followers?.toLocaleString() || "0"}
                      <span className="text-primary text-xl ml-1">+</span>
                    </div>
                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em] italic">
                      Verified Reach
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-medium text-white/60">
                      {s.handle || s.platform}
                    </span>
                    <div className="flex items-center gap-1.5 py-1 px-3 bg-primary/10 rounded-full border border-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-bold text-primary uppercase">{s.growth || "Active"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROJECTS */}
      <Section className="py-16 border-t border-white/10">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Projects</h2>

            <a
              href="/projects"
              className="text-primary text-sm flex items-center gap-1"
            >
              View all <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-20 border-t border-white/10">
        <Container>
          <div className="bg-primary rounded-2xl p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Let’s grow your business 🚀
            </h2>

            <p className="text-white/80 mt-3">
              Ready to scale your brand with proven strategies.
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

export default Home;