import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import { getProjectById } from "@/features/projects/projectService";
import { Loader2, ArrowLeft, ExternalLink, Github, TrendingUp, Target, Zap, Globe, Package, CheckCircle2 } from "lucide-react";

const CaseStudy = () => {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(slug);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-gray-400">
        <Loader2 className="animate-spin mr-2 text-primary" /> Synchronizing Project Data...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-canvas text-white flex-col gap-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">Case Study Not Found.</h2>
        <button onClick={() => navigate("/projects")} className="text-primary underline font-black uppercase tracking-[0.4em] text-[10px] italic">Return to Library</button>
      </div>
    );
  }

  const renderResults = () => {
    if (!project.results) return "Growth Delivered.";
    return project.results;
  };

  return (
    <div className="bg-bg-canvas min-h-screen text-text-primary">
      <Navbar />

      {/* Header Section */}
      <Section className="pt-32 pb-16 md:pt-48 md:pb-32 relative overflow-hidden bg-bg-canvas">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10 rounded-full animate-pulse" />
        <Container>
          <SlideUp>
            <button 
              onClick={() => navigate("/projects")}
              className="flex items-center gap-3 text-text-muted hover:text-primary mb-16 transition-all uppercase tracking-[0.4em] text-[9px] font-black group italic"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Project Archive
            </button>
            
            <div className="grid lg:grid-cols-12 gap-16 items-end">
              <div className="lg:col-span-8 flex flex-col items-start leading-none">
                <span className="px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-10 inline-block italic shadow-premium">
                  {project.category || "Growth Strategy"}
                </span>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-12 uppercase italic tracking-tighter">
                  {project.title}<span className="text-primary">.</span>
                </h1>
                
                <div className="max-w-3xl border-l-[6px] border-primary pl-10 py-3">
                   <p className="text-lg md:text-2xl text-text-secondary leading-relaxed font-bold italic tracking-tight uppercase">
                      {project.description}
                   </p>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-10 w-full">
                <div className="bg-bg-white border border-white/5 p-10 md:p-12 rounded-[3.5rem] shadow-premium hover:border-primary/20 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                    <div className="flex items-center gap-4 mb-8">
                       <TrendingUp size={18} className="text-primary" />
                       <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">Impact Metrics</div>
                    </div>
                    <div className={`font-black text-white italic tracking-tighter leading-none mb-8 break-words ${project.results?.length > 25 ? 'text-3xl lg:text-4xl leading-tight' : 'text-4xl lg:text-6xl'}`}>
                       {renderResults()}
                    </div>
                    <div className="w-16 h-1 bg-primary/20 rounded-full mb-8" />
                    <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] italic leading-relaxed">Verified across multi-channel campaign deployments.</p>
                </div>
              </div>
            </div>
          </SlideUp>
        </Container>
      </Section>

      {/* Main Image */}
      <Section className="py-0 relative -mt-12 z-10 md:-mt-20">
        <Container>
          <FadeIn>
             <div className="relative group overflow-hidden rounded-[3.5rem] md:rounded-[5rem] border-[6px] border-bg-white bg-bg-white shadow-premium">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-[400px] md:h-[750px] object-cover transition-all duration-1000 sm:group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="h-[400px] md:h-[750px] flex items-center justify-center italic text-text-muted text-[10px] uppercase tracking-[0.6em] font-black animate-pulse">Asset Loading...</div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
             </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Analysis Content */}
      <Section className="py-32 md:py-48 bg-bg-canvas">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 md:gap-32 items-start">
            <div className="lg:col-span-8 space-y-24 md:space-y-40">
                <SlideUp>
                    <div className="flex flex-col sm:flex-row gap-10 items-start group">
                       <div className="w-16 h-16 bg-bg-white rounded-2xl flex items-center justify-center text-primary text-2xl font-black italic border border-white/5 group-hover:bg-primary group-hover:text-white transition-all shadow-premium shrink-0">01</div>
                       <div className="flex-1">
                          <h3 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter italic leading-none">THE CHALLENGE<span className="text-primary">.</span></h3>
                          <div className="bg-bg-white border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-premium">
                             <p className="text-lg md:text-2xl text-text-secondary leading-relaxed font-bold italic tracking-tighter uppercase">
                                For {project.title}, we identified significant bottlenecks in audience retention and diagnosed ROI leaks across current performance channels. The objective was to recalibrate the user journey for maximum growth.
                             </p>
                          </div>
                       </div>
                    </div>
                </SlideUp>

                <SlideUp>
                    <div className="flex flex-col sm:flex-row gap-10 items-start group">
                       <div className="w-16 h-16 bg-bg-white rounded-2xl flex items-center justify-center text-secondary text-2xl font-black italic border border-white/5 group-hover:bg-secondary group-hover:text-white transition-all shadow-premium shrink-0">02</div>
                       <div className="flex-1">
                          <h3 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter italic leading-none">THE SOLUTION<span className="text-secondary">.</span></h3>
                          <div className="bg-bg-white border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-premium">
                             <p className="text-lg md:text-2xl text-text-secondary leading-relaxed font-bold italic tracking-tighter uppercase">
                                We deployed a multi-layered ecosystem: automating organic viral loops while optimizing precision-targeted Meta funnels. This dual approach ensured high-intent traffic while driving down acquisition costs.
                             </p>
                          </div>
                       </div>
                    </div>
                </SlideUp>

                {/* Evidence Gallery */}
                {project.gallery?.length > 0 && (
                   <div className="pt-24 border-t border-white/5">
                      <div className="mb-16">
                         <h4 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">VISUAL EVIDENCE<span className="text-accent">.</span></h4>
                         <div className="w-24 h-1 bg-accent rounded-full" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
                         {project.gallery.map((img, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                               <div className="aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/5 group shadow-premium hover:border-primary/40 transition-all duration-700">
                                  <img src={img} loading="lazy" className="w-full h-full object-cover transition-all duration-1000 transform sm:group-hover:scale-105" alt="Evidence" />
                               </div>
                            </FadeIn>
                         ))}
                      </div>
                   </div>
                )}
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 sticky top-32 space-y-8">
                <div className="bg-bg-white border border-white/5 p-10 md:p-12 rounded-[3.5rem] shadow-premium">
                    <div className="mb-16">
                       <div className="flex items-center gap-4 mb-10">
                          <Zap size={18} className="text-primary" />
                          <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Engine Stack</div>
                       </div>
                       <div className="flex flex-wrap gap-2.5">
                          {project.tools?.map((tool, i) => (
                             <span key={i} className="px-5 py-3 bg-bg-canvas border border-white/5 rounded-2xl text-[9px] text-white font-black tracking-widest uppercase italic hover:border-primary transition-all shadow-inner-light">{tool}</span>
                          ))}
                       </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 space-y-5">
                        <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-10 italic leading-none">Project Links</div>
                        {project.liveUrl && (
                           <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-primary text-white py-6 px-10 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-3xl shadow-primary/30 group italic">
                             Live Preview <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </a>
                        )}
                        {project.githubUrl && (
                           <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-bg-canvas text-white py-6 px-10 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] border border-white/10 hover:bg-bg-white transition-all shadow-premium group italic">
                             Source Code <Github size={18} className="group-hover:scale-110 transition-transform" />
                           </a>
                        )}
                    </div>

                    <div className="mt-16 pt-12 border-t border-white/5 flex items-center justify-between">
                       <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Deployment Status</div>
                       <div className="flex items-center gap-3 text-primary font-black italic text-xl uppercase leading-none">
                          <CheckCircle2 size={18} /> SUCCESS
                       </div>
                    </div>
                </div>

                {/* Micro CTA */}
                <div className="bg-primary group p-12 lg:p-14 rounded-[4rem] text-center shadow-3xl shadow-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full" />
                    <Package size={48} className="text-white mx-auto mb-8" />
                    <h5 className="text-white text-4xl font-black uppercase italic tracking-tighter leading-none mb-4">SCALE<br />TOGETHER?</h5>
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.3em] mb-10 leading-relaxed italic">Implement this performance architecture for your brand.</p>
                    <a href="/contact" className="block w-full bg-white text-primary py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all italic">Start Interaction</a>
                </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default CaseStudy;