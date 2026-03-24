import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import ProjectCard from "@/features/projects/ProjectCard";
import useAbout from "@/features/about/useAbout";
import useProjects from "@/features/projects/useProjects";
import useSocial from "@/features/socials/useSocial";
import { Loader2, TrendingUp, Target, BarChart3, ArrowUpRight, Instagram, Globe, Zap, Users } from "lucide-react";

const services = [
  {
    icon: <TrendingUp className="text-secondary" />,
    title: "Organic Brand Growth",
    desc: "Building sustainable systems to scale communities and customer engagement without heavy ad spend."
  },
  {
    icon: <Target className="text-primary" />,
    title: "Performance Marketing",
    desc: "Precision-targeted campaigns on Meta and Google designed to maximize return on investment."
  },
  {
    icon: <BarChart3 className="text-blue-500" />,
    title: "Data Analytics",
    desc: "Turning user behavior into actionable insights to improve conversion rates and business outcomes."
  }
];

const Home = () => {
  const { about, loading: aboutLoading } = useAbout();
  const { projects, loading: projectsLoading } = useProjects();
  const { socials, loading: socialLoading } = useSocial();

  const isLoading = aboutLoading || projectsLoading || socialLoading;

  if (isLoading && !about) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-text-muted">
        <Loader2 className="animate-spin mr-2 text-primary" /> Calibrating Digital Ecosystem...
      </div>
    );
  }

  const taglineParts = (about?.tagline || "GROW YOUR BRAND.").split(" ");
  const firstWord = taglineParts[0];
  const restOfTagline = taglineParts.slice(1).join(" ");

  return (
    <div className="bg-bg-canvas min-h-screen">
      <Navbar />

      {/* 🏙️ Refined Hero Section */}
      <Section className="relative pt-32 pb-24 lg:pt-48 lg:pb-56 overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] -z-10 rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] -z-10 rounded-full" />

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* LEFT → TEXT */}
            <div className="lg:col-span-7">
              <FadeIn>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black text-text-primary leading-[1] tracking-tight uppercase italic mb-10">
                  {firstWord}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                    {restOfTagline}
                  </span>
                </h1>

                <div className="space-y-8 max-w-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-primary" />
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] italic">
                      The Growth Architect
                    </span>
                  </div>

                  <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-semibold border-l-4 border-primary pl-6">
                    {about?.bio || "Strategies that bridge the gap between human desire and business growth."}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <a
                      href="/contact"
                      className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg hover:scale-105 transition flex items-center gap-2 group"
                    >
                      Initiate
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                    </a>

                    <a
                      href="/projects"
                      className="border border-white/10 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition"
                    >
                      View Work
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT → IMAGE */}
            <div className="lg:col-span-5  flex justify-center lg:justify-end">
              <FadeIn delay={0.2}>
                <div className="relative">
                  {about?.profileImage ? (
                    <div className="relative w-70 h-70 md:w-80 md:h-100 rounded-[10rem] overflow-hidden border border-white/10 shadow-2xl group">
                      <img
                        src={about.profileImage}
                        alt={about.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  ) : (
                    <img
                      src="/"
                      alt="Logo"
                      className="w-40 md:w-56 drop-shadow-2xl"
                    />
                  )}

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full scale-125" />
                </div>
              </FadeIn>
            </div>

          </div>
        </Container>
      </Section>



      {/* 💼 Deployment Specialties */}
      <Section className="py-48 bg-bg-canvas">
        <Container>
          <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black text-text-primary mb-8 uppercase italic tracking-tighter leading-none">CORE<br /><span className="text-primary text-stroke-primary">DEPLOYMENTS<span className="text-text-primary">.</span></span></h2>
              <p className="text-text-secondary text-xl md:text-3xl font-bold uppercase italic tracking-tighter border-l-8 border-primary pl-8 leading-none">High-level strategies for explosive brand expansion.</p>
            </div>
            <div className="w-24 h-1.5 bg-primary rounded-full hidden lg:block" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {services.map((s, idx) => (
              <SlideUp key={idx} delay={idx * 0.1}>
                <div className="bg-bg-canvas p-14 rounded-[3.5rem] border border-slate-100 hover:border-primary/20 transition-all group h-full shadow-premium hover:-translate-y-2">
                  <div className="w-20 h-20 bg-bg-canvas rounded-3xl flex items-center justify-center mb-12 border border-white/10 group-hover:scale-110 transition-transform shadow-inner-light">
                    {s.icon}
                  </div>
                  <h3 className="text-3xl font-black text-text-primary mb-6 uppercase tracking-tighter italic leading-none">{s.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-lg italic font-medium">{s.desc}</p>
                </div>
              </SlideUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* 📱 Managed Growth Deck */}
      <Section className="py-32 bg-bg-canvas border-y border-slate-200">
        <Container>
          <div className="flex justify-between items-end mb-24 px-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-text-primary uppercase italic tracking-tighter leading-none">SOCIAL<br /><span className="text-secondary text-stroke-secondary">METRICS.</span></h2>
              <div className="w-16 h-1 bg-secondary rounded-full mt-8" />
            </div>
            <a href="/social-portfolio" className="text-text-muted hover:text-primary text-[10px] font-black uppercase tracking-[0.4em] hidden sm:flex items-center gap-3 transition-colors italic group">Audit Registry <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {socials.length > 0 ? socials.slice(0, 4).map((s, i) => (
              <FadeIn key={s._id} delay={i * 0.1}>
                <div className="bg-bg-white p-10 rounded-[3rem] border border-white/5 hover:border-secondary/30 transition-all shadow-premium group h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-bg-canvas rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shadow-inner-light">
                      {s.platform === "Instagram" ? <Instagram size={24} className="text-pink-500" /> : <Globe size={24} className="text-secondary" />}
                    </div>
                    <span className="px-4 py-1.5 bg-bg-canvas text-[9px] font-black text-text-muted rounded-full border border-white/5 uppercase tracking-widest italic">{s.platform}</span>
                  </div>
                  <div className="text-lg font-black text-text-primary mb-2 uppercase italic tracking-tighter leading-none">{s.handle || s.platform}</div>
                  <div className="text-5xl font-black text-secondary mb-4 italic tracking-tighter uppercase leading-none">{s.followers?.toLocaleString() || "10K+"}<span className="text-xl ml-1 text-slate-400">+</span></div>
                  <div className="text-[9px] font-black text-accent uppercase tracking-[0.4em] italic leading-none">{s.growth || "Viral Optimized"}</div>
                </div>
              </FadeIn>
            )) : <div className="col-span-full py-20 text-center text-text-muted italic font-black uppercase tracking-widest text-xs">Hydrating Operational Records...</div>}
          </div>
        </Container>
      </Section>

      {/* 🚀 Feature Case Studies */}
      <Section className="py-48 bg-bg-canvas">
        <Container>
          <div className="flex justify-between items-end mb-24 px-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-text-primary uppercase italic tracking-tighter leading-none">PROJECT<br /><span className="text-accent">VAULT.</span></h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-8" />
            </div>
            <a href="/projects" className="text-text-muted hover:text-accent text-[10px] font-black uppercase tracking-[0.4em] hidden sm:flex items-center gap-3 transition-all italic group">
              Open Case Files <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((p, i) => (
                <SlideUp key={p._id} delay={i * 0.1}>
                  <ProjectCard project={p} />
                </SlideUp>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-text-muted italic font-black uppercase tracking-[0.5em] text-[10px]">Retrieving Case Records...</div>
            )}
          </div>
        </Container>
      </Section>

      {/* 🔥 Strategic CTA */}
      <Section className="pb-56 pt-24 bg-bg-white">
        <Container>
          <FadeIn>
            <div className="bg-primary group rounded-[4rem] p-20 md:p-32 text-center relative overflow-hidden shadow-3xl shadow-primary/20 border-4 border-white/5">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[200px] -z-10 rounded-full animate-[pulse_10s_infinite]" />
              <h2 className="text-5xl md:text-8xl font-black text-text-white mb-10 tracking-tighter uppercase italic leading-[0.85]">READY TO<br />SCALE IMPACT.</h2>
              <p className="text-text-white/80 text-xl md:text-3xl mb-16 max-w-4xl mx-auto italic font-bold uppercase tracking-tight leading-loose border-b border-white/10 pb-12">
                Executing elite growth strategies for visionary industry leaders.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
                <a href="/contact" className="inline-flex items-center gap-5 bg-text-white text-primary px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-3xl italic">
                  INITIATE STRATEGY <ArrowUpRight size={24} />
                </a>
                <div className="text-text-white/40 text-[10px] font-black uppercase tracking-[0.4em] italic sm:text-left leading-relaxed">Limited deployment<br />slots for Q2 2024</div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default Home;