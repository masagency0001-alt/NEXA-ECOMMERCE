import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PRODUCTS } from '@/src/constants';
import Perfume3D from '@/src/components/Perfume3D';
import ClothSimulation3D from '@/src/components/ClothSimulation3D';

function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.p
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.p>
    </div>
  );
}

function FeaturedCollection({ title, description, image, path, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[70vh] md:h-[80vh] overflow-hidden cursor-pointer"
    >
      <motion.img
        src={image}
        alt={title}
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent group-hover:via-dark/20 transition-all duration-700" />
      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-10 text-white translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="text-3xl md:text-5xl font-serif mb-4 italic"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="text-white/60 mb-6 md:mb-10 max-w-sm text-sm md:text-base font-light leading-relaxed tracking-wide"
        >
          {description}
        </motion.p>
        <Link 
          to={path}
          className="inline-flex items-center space-x-6 py-3 px-8 md:py-4 md:px-10 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:bg-gold hover:border-gold hover:text-dark transition-all duration-500 font-bold group/btn"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Explore Heritage</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-3 transition-transform duration-500" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Magnetic button logic (simulated with motion)
  const [btnHover, setBtnHover] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const handleMouseMove = (e: any) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setBtnHover({ x, y });
  };

  const featuredCollections = [
    {
      title: "The Noir Collection",
      description: "A symphony of shadow and structure, designed for the nocturnal avant-garde.",
      image: "https://picsum.photos/seed/men-collection/1200/1800",
      path: "/men"
    },
    {
      title: "Ethereal Essence",
      description: "Timeless silhouettes that dance between the organic and the architectural.",
      image: "https://picsum.photos/seed/women-collection/1200/1800",
      path: "/women"
    },
    {
      title: "Olfactory Art",
      description: "Fragrances that don't just linger, they tell a story of forgotten empires.",
      image: "https://picsum.photos/seed/perfume-collection/1200/1800",
      path: "/perfumes"
    }
  ];

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-dark relative">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-dark/20 z-10" />
          <img
            src="https://picsum.photos/seed/luxury-hero/1920/1080?blur=1"
            alt="Hero background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-dark/0 via-dark/10 to-dark" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-30 text-center py-20">
          <div className="overflow-hidden mb-6 md:mb-8">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-gold font-bold"
            >
              The 2026 Archive
            </motion.p>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[14vw] font-bold tracking-tighter text-white mb-12 leading-[1] md:leading-[0.85] px-4"
          >
            Sculpting <br className="hidden md:block" />
            <span className="text-gold italic font-serif font-light lowercase">Light & Shadow</span>
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 md:gap-10 mt-10 md:mt-20 px-4">
            {[
              { label: 'Men', path: '/men' },
              { label: 'Women', path: '/women' },
              { label: 'Perfumes', path: '/perfumes' }
            ].map((link, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + (i * 0.1) }}
                className="w-full sm:w-auto"
              >
                <Link 
                  to={link.path}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setBtnHover({ x: 0, y: 0 })}
                  className={cn(
                    "block sm:inline-block px-10 md:px-14 py-5 md:py-6 text-[10px] uppercase tracking-[0.4em] font-bold rounded-full transition-all duration-700 relative group overflow-hidden",
                    i === 0 ? "bg-white text-dark shadow-2xl" : "border border-white/20 text-white"
                  )}
                >
                  <motion.span 
                    animate={{ x: btnHover.x, y: btnHover.y }} 
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="relative z-10 block"
                  >
                    Shop {link.label}
                  </motion.span>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="absolute inset-0 bg-gold/10 z-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 rotate-90 mb-10 translate-y-10">Scroll</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* 3D Immersive Showcase Section */}
      <section className="py-20 md:py-40 relative overflow-hidden bg-[#050505]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1">
             <span className="text-gold uppercase tracking-[0.5em] font-bold text-[10px] block mb-6">Aura Identification</span>
             <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight italic font-serif mb-10">
               Interact with <br /> <span className="text-gold">The Essence.</span>
             </h2>
             <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed font-serif max-w-lg mb-12 italic">
               Behold the alchemy of liquid architecture. A scent that doesn't just exist, it commands the space around it.
             </p>
             <div className="flex items-center gap-10">
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Base Note</p>
                   <p className="text-lg text-white font-serif italic">Smoked Oud</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Top Note</p>
                   <p className="text-lg text-white font-serif italic">Black Violet</p>
                </div>
             </div>
           </div>
           
           <div className="order-1 lg:order-2 relative aspect-square lg:aspect-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full min-h-[400px]"
              >
                <Perfume3D />
              </motion.div>
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
           </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 md:py-60 relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
               className="aspect-[4/5] overflow-hidden"
             >
                <ClothSimulation3D />
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8 }}
               className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-48 md:w-64 h-64 md:h-80 bg-ink p-6 md:p-10 border border-white/5 shadow-2xl z-20 hidden sm:block"
             >
                <p className="text-gold font-serif italic text-lg md:text-xl mb-4 md:mb-6">"True luxury is silence."</p>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest line-clamp-4">
                  In a world of noise, we choose the quiet language of quality. We believe the silent threads tell the loudest stories.
                </p>
             </motion.div>
          </div>

          <div className="space-y-10 md:space-y-12">
            <RevealText 
              text="Our Intent" 
              className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold shrink-0 border-l-2 border-gold pl-6" 
            />
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[1] md:leading-[0.9] italic font-serif">
               Architecture <br /> <span className="text-gold">of Sensation.</span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-white/50 font-light leading-relaxed font-serif"
            >
              Every NEXA creation is a dialogue between the tactile and the visual. We don't just provide fashion; we provide a vessel for identity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="origin-left h-[1px] bg-white/10 w-full"
            />
            <Link to="/about" className="group inline-flex items-center space-x-6 text-[10px] uppercase tracking-[0.4em] font-bold text-white hover:text-gold transition-colors duration-500">
              <span>Our Full Creed</span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-all duration-500">
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections Reveal */}
      <section className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {featuredCollections.map((col, i) => (
            <FeaturedCollection key={i} {...col} index={i} />
          ))}
        </div>
      </section>

      {/* Smooth Showcase */}
      <section className="py-32 md:py-60 bg-ink/50 relative">
        <div className="container mx-auto px-6 mb-20 md:mb-32">
           <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 border-b border-white/5 pb-16 md:pb-20">
             <div className="max-w-2xl">
               <span className="text-gold uppercase tracking-[0.5em] font-bold text-[10px] block mb-8 md:mb-10">Essential Inventory</span>
               <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none italic font-serif">
                 The Current <br /> <span className="text-gold">Peak.</span>
               </h2>
             </div>
             <Link to="/shop" className="group inline-flex items-center space-x-6 md:space-x-10 p-1 bg-white/5 rounded-full pr-8 hover:bg-gold transition-all duration-700 w-fit">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-dark group-hover:bg-dark group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-dark transition-colors">Enter The Catalog</span>
             </Link>
           </div>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 md:gap-y-32">
          {featuredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/6] overflow-hidden mb-8 md:mb-10 bg-dark/80 group shadow-2xl">
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    whileHover={{ scale: 1.1, opacity: 0.6 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-dark to-transparent">
                     <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Quick View</span>
                        <ChevronRight className="text-white" size={16} />
                     </div>
                  </div>
                </div>
                <p className="text-[9px] text-gold uppercase tracking-[0.4em] font-black mb-4 flex items-center gap-2">
                   <span className="w-4 h-[1px] bg-gold/50" />
                   {product.category}
                </p>
                <h4 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold transition-all duration-500 italic leading-tight">{product.name}</h4>
                <div className="h-[1px] bg-white/5 w-full mt-6 group-hover:bg-gold/30 transition-colors" />
                <p className="text-base font-medium text-white/40 mt-6 tracking-tighter">${product.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ultra Pro Stats */}
      <section className="py-40 md:py-60 relative">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {[
            { label: "Founded Protocol", value: "2018", detail: "Rooted in timeless London atelier philosophy." },
            { label: "Validated Craftsmen", value: "120+", detail: "Artisans across the Milan and Tokyo archives." },
            { label: "Purity Rating", value: "100%", detail: "Ethically audited globally certified sources." }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center group p-8 md:p-12 hover:bg-white/5 transition-all duration-700 border border-transparent hover:border-white/5"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 block mb-8">{stat.label}</span>
              <p className="text-7xl md:text-8xl font-bold text-white mb-6 group-hover:text-gold transition-all duration-1000 italic font-serif leading-none tracking-tighter">{stat.value}</p>
              <p className="text-[10px] md:text-xs font-light text-white/40 tracking-widest leading-relaxed uppercase max-w-[200px] mx-auto">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Call to Action */}
      <section className="py-40 md:py-60 relative overflow-hidden bg-white">
        <motion.div 
           initial={{ x: "-100%" }}
           whileInView={{ x: 0 }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="flex whitespace-nowrap overflow-hidden absolute top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none"
        >
           <p className="text-[25vw] font-bold text-dark uppercase tracking-tighter leading-none pr-20">NEXA ARCHIVE 2026 NEXA ARCHIVE 2026 NEXA ARCHIVE 2026</p>
        </motion.div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold text-dark tracking-tighter mb-10 md:mb-20 leading-[0.9]">Elevate Your <span className="text-gold italic font-serif">Reality.</span></h2>
            <Link 
              to="/shop"
              className="inline-flex items-center space-x-8 md:space-x-12 bg-dark text-white px-10 py-6 md:px-20 md:py-10 rounded-full hover:bg-gold hover:text-white transition-all duration-500 shadow-2xl group"
            >
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold">Begin Transformation</span>
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

