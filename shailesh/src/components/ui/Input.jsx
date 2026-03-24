const Input = ({
  label,
  type = "text",
  className = "",
  error,
  icon,
  borderVariant,
  ...props
}) => {
  const borderClasses = borderVariant === 'secondary' 
    ? 'focus:border-secondary/40' 
    : 'focus:border-primary/40';

  return (
    <div className="flex flex-col gap-3 w-full group">
      {label && (
        <label className={`text-[9px] font-black uppercase text-white/20 tracking-[0.3em] italic leading-none ml-4 transition-colors group-focus-within:${borderVariant === 'secondary' ? 'text-secondary' : 'text-primary'}`}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className={`absolute left-6 text-white/20 group-focus-within:${borderVariant === 'secondary' ? 'text-secondary' : 'text-primary'} transition-colors pointer-events-none`}>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full bg-bg-canvas border border-white/5 rounded-2xl ${icon ? 'pl-14' : 'px-6'} py-4 text-white font-black uppercase tracking-widest italic outline-none ${borderClasses} focus:bg-bg-white transition-all shadow-inner-light placeholder:text-white/10 text-[10px] ${error ? 'border-red-500 bg-red-500/10' : ''} ${className}`}
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