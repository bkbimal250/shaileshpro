const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-black uppercase tracking-widest italic transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:grayscale";

  const variants = {
    primary: "bg-primary text-white shadow-3xl shadow-primary/20 hover:scale-[1.02] hover:bg-white hover:text-primary border border-transparent",
    secondary: "bg-secondary text-white shadow-3xl shadow-secondary/20 hover:scale-[1.02] hover:bg-white hover:text-secondary border border-transparent",
    accent: "bg-accent text-white shadow-3xl shadow-accent/20 hover:scale-[1.02] hover:bg-white hover:text-accent border border-transparent",
    outline: "border border-white/10 text-white hover:border-primary hover:text-primary hover:bg-bg-white shadow-premium bg-bg-canvas",
    ghost: "text-white/40 hover:text-primary bg-transparent",
    dark: "bg-bg-white text-white hover:bg-primary shadow-premium border border-white/5",
  };

  const sizes = {
    sm: "px-5 py-3 text-[8px] rounded-xl",
    md: "px-7 py-4 text-[9px] rounded-2xl",
    lg: "px-10 py-5 text-[10px] rounded-[2rem]",
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          PROCESSING...
        </span>
      ) : children}
    </button>
  );
};

export default Button;