import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import ProjectCard from "@/features/projects/ProjectCard";
import useProjects from "@/features/projects/useProjects";
import { Loader2, Rocket, ArrowUpRight, Target } from "lucide-react";

const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading && projects.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-text-muted">
        <Loader2 className="animate-spin mr-2 text-primary" /> Indexing Operational Portfolio...
      </div>
    );
  }

  return (
    <div className="bg-bg-canvas min-h-screen">
      <Navbar />

      {/* 🚀 HERO SECTION */}
      <Section className="pt-48 pb-20 relative overflow-hidden bg-bg-canvas">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] -z-10 rounded-full animate-pulse" />
        <Container>
          <FadeIn>
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.6em] mb-10 block italic">The Results Center</span>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black text-text-primary leading-[1] lg:leading-[0.8] tracking-tighter mb-16 uppercase italic shadow-sm">
               SELECTED<br /> WORK<span className="text-secondary">.</span>
            </h1>
            <p className="text-text-secondary text-2xl sm:text-3xl md:text-4xl max-w-4xl font-black tracking-tight italic border-l-[10px] border-primary pl-8 md:pl-16 py-4 uppercase leading-none">
               A collection of growth experiments <br className="hidden md:block" /> and data-driven execution.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* 📂 PROJECTS GRID */}
      <Section className="py-32 md:py-48 bg-bg-canvas">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {projects.length > 0 ? (
              projects.map((p, i) => (
                <SlideUp key={p._id} delay={i * 0.1}>
                  <ProjectCard project={p} />
                </SlideUp>
              ))
            ) : (
              <div className="col-span-full py-48 border-2 border-dashed border-white/5 rounded-[5rem] flex flex-col items-center justify-center text-center bg-bg-white shadow-inner-light">
                 <Target size={60} className="text-white/10 mb-8 animate-pulse" />
                 <p className="text-text-muted uppercase tracking-[0.5em] font-black text-xs italic">De-indexing Strategy Records...</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 📈 METRICS CTA */}
      <Section className="pb-56 pt-24 bg-bg-canvas">
        <Container>
           <FadeIn>
              <div className="bg-primary group p-20 md:p-32 rounded-[4rem] md:rounded-[5rem] overflow-hidden relative shadow-3xl shadow-primary/20 text-center border-4 border-white/5">
                 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[200px] -z-10 rounded-full animate-pulse" />
                 <div className="flex flex-col items-center justify-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-12 uppercase italic">READY FOR <br /><span className="text-accent underline decoration-white/20">EXTREME</span> GROWTH?</h2>
                    <p className="text-white/60 text-lg md:text-2xl font-black uppercase tracking-tight italic mb-16 max-w-4xl border-b border-white/10 pb-12">Let's build your next high-impact case study together.</p>
                    <a href="/contact" className="bg-white text-primary px-16 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] md:text-sm hover:scale-105 active:scale-95 transition-all shadow-3xl group flex items-center gap-5 italic">
                       Scale Now <ArrowUpRight size={28} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
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

export default Projects;
