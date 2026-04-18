import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Shirt, Wind, Sparkles, Droplets, Scissors, Ruler, Moon, Star } from 'lucide-react';

export default function FloatingElements() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const elements = [
    { icon: <Shirt size={100} strokeWidth={0.3} />, initialX: '10%', initialY: '15%', delay: 0, speed: 1.5, rotate: 15 },
    { icon: <Droplets size={80} strokeWidth={0.3} />, initialX: '85%', initialY: '25%', delay: 1, speed: 2, rotate: -10 },
    { icon: <Wind size={150} strokeWidth={0.2} />, initialX: '75%', initialY: '60%', delay: 0.5, speed: 1.2, rotate: 0 },
    { icon: <Sparkles size={60} strokeWidth={0.5} />, initialX: '20%', initialY: '80%', delay: 2, speed: 2.5, rotate: 45 },
    { icon: <Droplets size={120} strokeWidth={0.2} />, initialX: '5%', initialY: '50%', delay: 1.5, speed: 1.8, rotate: -20 },
    { icon: <Shirt size={140} strokeWidth={0.1} />, initialX: '90%', initialY: '10%', delay: 0.8, speed: 2.2, rotate: -30 },
    { icon: <Droplets size={40} strokeWidth={0.5} />, initialX: '40%', initialY: '90%', delay: 2.5, speed: 1.6, rotate: 10 },
    { icon: <Scissors size={50} strokeWidth={0.3} />, initialX: '60%', initialY: '5%', delay: 1.2, speed: 1.4, rotate: -15 },
    { icon: <Ruler size={60} strokeWidth={0.3} />, initialX: '15%', initialY: '40%', delay: 1.8, speed: 2.1, rotate: 90 },
    { icon: <Moon size={70} strokeWidth={0.2} />, initialX: '80%', initialY: '75%', delay: 0.3, speed: 1.3, rotate: 12 },
    { icon: <Star size={40} strokeWidth={0.4} />, initialX: '35%', initialY: '2%', delay: 2.2, speed: 2.8, rotate: 0 },
    { icon: <Sparkles size={100} strokeWidth={0.1} />, initialX: '50%', initialY: '50%', delay: 3, speed: 1.1, rotate: 0 },
    { icon: <Wind size={200} strokeWidth={0.05} />, initialX: '25%', initialY: '30%', delay: 4, speed: 0.8, rotate: -45 },
    { icon: <Droplets size={60} strokeWidth={0.2} />, initialX: '10%', initialY: '70%', delay: 1.5, speed: 1.5, rotate: 30 },
    { icon: <Shirt size={120} strokeWidth={0.2} />, initialX: '65%', initialY: '45%', delay: 2, speed: 1.9, rotate: -10 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10 select-none">
      {elements.map((el, index) => {
        // Individualized scroll behavior
        // Vertical shift based on scroll
        const yOffset = useTransform(
          scrollYProgress, 
          [0, 1], 
          [0, (index % 2 === 0 ? -1200 : -1800) * (el.speed * 0.5)]
        );
        
        // Slight horizontal drift
        const xOffset = useTransform(
          scrollYProgress,
          [0, 1],
          [0, (index % 3 === 0 ? 200 : -200) * 0.2]
        );

        const rotationScroll = useTransform(
          scrollYProgress,
          [0, 1],
          [el.rotate, el.rotate + (index % 2 === 0 ? 90 : -90)]
        );

        return (
          <motion.div
            key={index}
            initial={{ 
              left: el.initialX, 
              top: el.initialY, 
            }}
            animate={{ 
              y: ["-30px", "30px", "-30px"],
              x: ["-20px", "20px", "-20px"],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 7 + index, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              position: 'absolute',
              translateX: xOffset,
              translateY: yOffset,
              rotate: rotationScroll,
              color: index % 2 === 0 ? 'white' : '#c5a059',
              filter: `blur(${1 + (index % 3)}px)`
            }}
            className="flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
          >
            {el.icon}
          </motion.div>
        );
      })}

      {/* Ambient Atmospheric Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[30%] w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[180px]"
      />
    </div>
  );
}
