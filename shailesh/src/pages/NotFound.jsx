import { Link } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg-canvas text-white p-6 text-center">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-[2] animate-pulse" />
        <Target size={80} className="text-primary relative z-10" />
      </div>
      <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 leading-none">
        404 <br /><span className="text-secondary text-stroke-secondary">LOST.</span>
      </h1>
      <p className="text-text-secondary mt-4 mb-20 text-[10px] font-black uppercase tracking-[0.5em] italic">
        Strategy indexing failed: Route not found.
      </p>

      <Link
        to="/"
        className="flex items-center gap-4 bg-bg-white border border-white/10 px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary transition-all shadow-premium group italic"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> RE-ROUTE HOME
      </Link>
    </div>
  );
};

export default NotFound;