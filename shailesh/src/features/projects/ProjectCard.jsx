import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`} className="group block h-full">
      <div className="bg-bg-white border border-white/5 rounded-[3rem] overflow-hidden h-full flex flex-col transition-all duration-700 hover:border-primary/30 shadow-premium relative hover:-translate-y-2">
        
        {/* Media */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-bg-canvas">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-40 z-10" />
          <img
            src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale active:grayscale-0 sm:group-hover:grayscale-0 transition-all duration-1000 transform sm:group-hover:scale-110"
          />
          <div className="absolute top-6 right-6 z-20">
              <div className="w-10 h-10 bg-bg-canvas text-text-primary rounded-2xl flex items-center justify-center shadow-premium opacity-0 sm:group-hover:opacity-100 transition-all transform sm:group-hover:translate-x-0 translate-x-6 border border-white/10">
                 <ArrowUpRight size={18} className="text-primary" />
              </div>
          </div>
          <div className="absolute bottom-6 left-8 z-20">
              <span className="px-5 py-2 bg-bg-canvas/80 border border-white/10 backdrop-blur-xl text-primary rounded-full text-[9px] font-black uppercase tracking-[0.4em] italic shadow-2xl">
               {project.category || "Execution Strategy"}
             </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-10 md:p-12 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-text-primary mb-5 uppercase tracking-tighter italic leading-none group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-text-secondary text-base leading-relaxed mb-10 font-bold italic line-clamp-3 uppercase tracking-tight">
              {project.description}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <TrendingUp size={14} className="text-secondary" />
                <span className="text-text-primary font-black uppercase tracking-widest text-[9px] truncate max-w-48 italic">{project.results || "Strategic Scaling"}</span>
             </div>
             <div className="flex gap-3">
                {project.tools?.slice(0, 1).map((tool, i) => (
                   <span key={i} className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">{tool}</span>
                ))}
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;