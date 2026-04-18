import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronDown, Filter, ShoppingCart, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PRODUCTS, Product } from '@/src/constants';

function ProductCard({ product, index }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-6 shadow-2xl">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <motion.img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-1000"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "brightness(0.7)" : "brightness(1)"
            }}
          />
        </Link>
        
        {product.isNew && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-gold text-dark text-[8px] md:text-[10px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-tighter z-10 shadow-lg">
            New Vision
          </div>
        )}

        {/* Mobile View Toggle (Always slightly visible or appearing) */}
        <div className={cn(
          "absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 flex items-center space-x-2 z-20 transition-all duration-700",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
        )}>
          {/* On Mobile, we'll show them with a lower threshold or just let them stay hidden until tap? Actually, for 'fully responsive', they should be easy to hit. Let's make them appear on 'inView' for mobile? No, let's keep it clean but make them more visible on mobile 'always' but subtle. */}
          <button className="flex-1 bg-white text-dark py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-gold transition-colors duration-500 rounded-sm">
            Quick Bag
          </button>
          <Link 
            to={`/product/${product.id}`} 
            className="p-3 md:p-4 bg-black/40 backdrop-blur-xl text-white border border-white/10 hover:bg-gold hover:border-gold transition-all duration-500 rounded-sm"
          >
            <Eye size={18} />
          </Link>
        </div>
        
        {/* Subtle indicator for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-40 lg:hidden pointer-events-none" />
      </div>

      <div className="flex justify-between items-start pt-2 px-1">
        <div className="max-w-[75%]">
          <p className="text-[8px] md:text-[9px] text-gold uppercase tracking-[0.3em] font-black mb-1 md:mb-2 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-gold/30" />
            {product.category}
          </p>
          <h3 className="text-xs md:text-sm font-medium tracking-tight text-white/90 group-hover:text-gold transition-colors duration-500 leading-tight truncate">
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-bold text-white tracking-tighter">${product.price}</p>
      </div>
    </motion.div>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Men', 'Women', 'Perfumes'];
  const sorts = ['Featured', 'Price: Low-High', 'Price: High-Low', 'Newest'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    // Simple sort logic
    if (sortBy === 'Price: Low-High') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High-Low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40 mb-6">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Shop Edition</span>
            </nav>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase italic font-serif">
              Masterpiece <br /> 
              <span className="text-gold">Catalog</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-[10px] text-white/40 mb-4 font-bold shrink-0">
            <span>SHOWING {filteredProducts.length} ARTICLES</span>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-8 border-y border-white/5 mb-16 gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-gold border-gold text-dark" 
                    : "border-white/10 text-white/70 hover:border-white/40 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-10 relative">
            <div className="group relative">
              <button className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
                <span>SORT BY: <span className="text-white">{sortBy}</span></span>
                <ChevronDown size={14} className="text-gold" />
              </button>
              <div className="absolute right-0 top-full mt-4 pt-2 hidden group-hover:block z-30">
                <div className="bg-ink border border-white/10 p-2 min-w-[200px] backdrop-blur-xl">
                  {sorts.map(s => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className="w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              <Filter size={14} className="text-gold" />
              <span>REFINE</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/30 font-serif italic text-2xl">No articles found in this selection.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-8 text-gold uppercase tracking-[0.3em] font-bold text-xs underline underline-offset-8"
            >
              Clear Vision
            </button>
          </div>
        )}

        {/* Pagination Teaser */}
        <div className="mt-32 pt-24 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-10">End of catalog section</p>
            <button className="px-16 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-dark transition-all duration-500">
                Load More Articles
            </button>
        </div>
      </div>
    </div>
  );
}
