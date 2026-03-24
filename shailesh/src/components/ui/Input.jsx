const Input = ({
  label,
  type = "text",
  className = "",
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-3 w-full group">
      {label && (
        <label className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] italic leading-none ml-4 transition-colors group-focus-within:text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          className={`w-full bg-bg-canvas border border-white/5 rounded-2xl px-6 py-4 text-white font-black uppercase tracking-widest italic outline-none focus:border-primary/40 focus:bg-bg-white transition-all shadow-inner-light placeholder:text-white/10 text-[10px] ${error ? 'border-red-500 bg-red-500/10' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="absolute -bottom-5 left-4 text-[8px] font-black uppercase text-red-500 italic tracking-widest">{error}</span>
        )}
      </div>
    </div>
  );
};

export default Input;