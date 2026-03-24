const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-slate-50 border-slate-100 text-slate-400 font-black",
    primary: "bg-primary/10 border-primary/20 text-primary font-black",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary font-black",
    accent: "bg-accent/10 border-accent/20 text-accent font-black",
    success: "bg-emerald-50 border-emerald-100 text-emerald-600 font-bold",
    warning: "bg-amber-50 border-amber-100 text-amber-600 font-bold",
    danger: "bg-rose-50 border-rose-100 text-rose-600 font-bold",
  };

  return (
    <span
      className={`px-4 py-2 text-[10px] uppercase tracking-widest italic rounded-full border shadow-sm inline-flex items-center gap-2 ${variants[variant] || variants.default} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${variant === 'default' ? 'bg-slate-300' : 'bg-current opacity-60'}`} />
      {children}
    </span>
  );
};

export default Badge;