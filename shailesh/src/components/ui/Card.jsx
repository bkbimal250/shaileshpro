import { motion } from "framer-motion";

const Card = ({ children, className = "", noHover = false }) => {
  return (
    <motion.div
      whileHover={noHover ? {} : { y: -8, scale: 1.01 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-bg-white border border-white/5 rounded-[3rem] p-10 shadow-premium transition-all duration-700 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;