import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative z-10 bg-white border border-slate-100 rounded-[3rem] md:rounded-[4rem] shadow-premium w-full ${sizes[size]} overflow-hidden`}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-10 md:p-14 border-b border-slate-50 bg-bg-canvas/50">
               <div>
                  <h3 className="text-2xl md:text-3xl font-black text-text-primary uppercase italic tracking-tighter leading-none mb-2">{title || "Strategic Node"}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.4em] italic leading-none">Intelligence Access Layer</p>
               </div>
               <button 
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-300 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90"
               >
                  <X size={24} />
               </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-10 md:p-14 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;