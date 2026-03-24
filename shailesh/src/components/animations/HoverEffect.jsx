import { motion } from "framer-motion";

const HoverEffect = ({
  children,
  scale = 1.05,
  rotate = 0,
}) => {
  return (
    <motion.div
      whileHover={{ scale, rotate }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverEffect;