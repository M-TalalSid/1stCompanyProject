import { motion } from "framer-motion";

const SpinnerLoader = ({
  size = 96,
  borderWidth = 8,
  primaryColor = "#DC1F54",
  secondaryColor = "#A02FCE",
  glowIntensity = 0.4,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-lg z-[9999] transition-all duration-500">
      <motion.div
        className="relative"
        style={{ width: `${size}px`, height: `${size}px` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${borderWidth}px solid transparent`,
            borderTopColor: secondaryColor,
            borderRightColor: secondaryColor,
            borderBottomColor: primaryColor,
            borderLeftColor: primaryColor,
            boxShadow: `0 0 30px rgba(220, 31, 84, ${glowIntensity}), 0 0 50px rgba(160, 47, 206, ${glowIntensity})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full bg-gradient-to-br from-rose-500/20 to-purple-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-6 rounded-full bg-gradient-to-tr from-rose-600/15 to-purple-600/15"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default SpinnerLoader;
