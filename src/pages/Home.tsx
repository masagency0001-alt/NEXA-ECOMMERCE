import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PRODUCTS } from '@/src/constants';

function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.p
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="group relative h-[80vh] overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
      <div className="absolute bottom-12 left-12 right-12 z-10 text-white translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-4xl font-serif mb-4">{title}</h3>
        <p className="text-white/70 mb-8 max-w-sm font-light leading-relaxed">{description}</p>
        <Link 
          to={path}
          className="inline-flex items-center space-x-4 border border-white/30 px-8 py-3 rounded-full hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300 group/btn"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Explore Collection</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
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

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredCollections = [
    {
      title: "The Noir Gentlemen",
      description: "Defining modern sophistication with tailored precision.",
      image: "https://picsum.photos/seed/men-collection/1200/1800",
      path: "/men"
    },
    {
      title: "Ethereal Silk",
      description: "Timeless elegance crafted for the contemporary woman.",
      image: "https://picsum.photos/seed/women-collection/1200/1800",
      path: "/women"
    },
    {
      title: "Alchemy of Scents",
      description: "Masterpiece fragrances that linger in memory.",
      image: "https://picsum.photos/seed/perfume-collection/1200/1800",
      path: "/perfumes"
    }
  ];

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-dark/40 z-10" />
          <img
            src="https://picsum.photos/seed/hero/1920/1080?blur=4"
            alt="Hero background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-dark/0 via-dark/20 to-dark" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-30 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-7xl md:text-[10vw] font-bold tracking-tighter text-white mb-8 line-height-tight"
          >
            Redefine Your <br />
            <span className="text-gold italic font-serif font-light">Style with NEXA</span>
          </motion.h1>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <Link to="/men" className="px-10 py-4 bg-white text-dark font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-white transition-colors duration-300">Shop Men</Link>
            <Link to="/women" className="px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-dark transition-colors duration-300">Shop Women</Link>
            <Link to="/perfumes" className="px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:border-gold transition-colors duration-300">Shop Perfumes</Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 mt-4">Scroll Down</span>
        </motion.div>
      </section>

      {/* Featured Collections Section (Vertical List) */}
      <section className="py-24">
        <div className="container mx-auto px-6 mb-20 text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-6 shrink-0">Collection Curations</h2>
          <p className="text-4xl md:text-6xl font-serif text-white max-w-4xl mx-auto leading-tight italic">
            "We believe true luxury is found in the intersection of architectural precision and emotional resonance."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {featuredCollections.map((col, i) => (
            <FeaturedCollection key={i} {...col} index={i} />
          ))}
        </div>
      </section>

      {/* Product Showcase (Bento Grid Style) */}
      <section className="py-32 bg-ink">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-6 shrink-0">Bestsellers</h2>
            <p className="text-5xl md:text-7xl font-bold text-white tracking-tighter line-height-tight">
              Masterpieces of <br /> Engineering.
            </p>
          </div>
          <Link to="/shop" className="group flex items-center space-x-4 border-b border-white/20 pb-2 hover:border-gold transition-colors">
            <span className="text-xs uppercase tracking-widest font-bold text-white">View All Products</span>
            <ArrowRight size={16} className="text-gold group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-dark/50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors" />
                </div>
                <p className="text-xs text-white/50 uppercase tracking-widest mb-2">{product.category}</p>
                <h4 className="text-lg font-serif text-white group-hover:text-gold transition-colors">{product.name}</h4>
                <p className="text-gold font-bold mt-2">${product.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Highlights (Stats) */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-24">
          {[
            { label: "Founded", value: "2018", detail: "Rooted in timeless philosophy." },
            { label: "Craftsman", value: "85+", detail: "Artisans across three continents." },
            { label: "Materials", value: "Pure", detail: "Ethically sourced world-wide." }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 block mb-6">{stat.label}</span>
              <p className="text-7xl font-bold text-white mb-6 group-hover:text-gold transition-colors duration-500">{stat.value}</p>
              <p className="text-sm font-light text-white/50">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-dark/50">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <Quote className="mx-auto text-gold mb-12 opacity-50" size={48} />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <p className="text-3xl md:text-5xl font-serif text-white italic leading-relaxed mb-12">
              "The first time I wore the Noir Heritage Coat, I felt a shift. It’s not just clothing; it’s armor for the modern soul. Pure architectural brilliance."
            </p>
            <p className="text-gold uppercase tracking-[0.3em] font-bold text-xs">— Julian V. (Creative Director)</p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Integrated into Footer naturally, but here we can add a brand story teaser */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/story/1920/1080?grayscale" 
            alt="Story"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-10 shrink-0">Our Philosophy</h2>
            <p className="text-4xl font-serif text-white italic leading-relaxed mb-12">
              Everything we create starts with a question: How can we make the invisible visible?
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center space-x-6 border-b border-gold pb-4 hover:border-white transition-colors group"
            >
              <span className="text-xs uppercase tracking-widest font-bold">Discover the NEXA Story</span>
              <ArrowRight size={16} className="text-gold group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
