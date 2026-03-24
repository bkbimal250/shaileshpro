import { motion } from "framer-motion";

const Section = ({
  children,
  className = "",
  id,
}) => {
  return (
    <motion.section
      id={id}
      className={`py-12 md:py-24 lg:py-32 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
};

export default Section;