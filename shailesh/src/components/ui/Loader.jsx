import { Loader2 } from "lucide-react";

const Loader = ({ 
  size = 48, 
  text = "SYNCHRONIZING OPERATIONAL DATA...",
  fullHeight = false,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-8 ${fullHeight ? 'min-h-[50vh]' : 'py-12'} ${className}`}>
      <div className="relative">
         <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
         <Loader2 
            size={size} 
            className="text-primary animate-spin relative z-10" 
         />
      </div>
      {text && (
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic animate-pulse">
           {text}
        </span>
      )}
    </div>
  );
};

export default Loader;