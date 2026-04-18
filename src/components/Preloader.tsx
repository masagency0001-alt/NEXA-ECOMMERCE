import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto';
      }}
      className="fixed inset-0 z-[100] bg-dark flex items-center justify-center pointer-events-none"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <motion.h1
            className="text-6xl md:text-9xl font-bold tracking-[0.6em] text-white italic font-serif"
          >
            NEX<span className="text-gold">A</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="absolute -bottom-4 left-0 h-[2px] bg-gold shadow-[0_0_20px_rgba(197,160,89,0.5)]"
          />
        </motion.div>
        
        <div className="overflow-hidden mt-12">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold"
          >
            The Zenith of Modern Luxury
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
