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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-dark/50 mb-6">
        <Link to={`/product/${product.id}`}>
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
        </Link>
        
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-gold text-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
            Arrival
          </div>
        )}

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-6 left-6 right-6 flex items-center space-x-2 z-20"
            >
              <button className="flex-1 bg-white text-dark py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-colors duration-300">
                Quick Add
              </button>
              <Link to={`/product/${product.id}`} className="p-4 bg-dark/50 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-dark transition-colors duration-300">
                <Eye size={18} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-start space-x-4">
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 italic font-serif">{product.category}</p>
          <h3 className="text-sm tracking-widest text-white/90 group-hover:text-gold transition-colors">{product.name}</h3>
        </div>
        <p className="text-sm font-bold text-white">${product.price}</p>
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
