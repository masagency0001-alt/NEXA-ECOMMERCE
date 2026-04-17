import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowLeft, Heart, Share2, Plus, Minus, Star, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { PRODUCTS, Product } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export default function ProductDetail({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-dark p-10 text-center">
        <h1 className="text-4xl font-serif text-white mb-8">Article not found.</h1>
        <Link to="/shop" className="text-gold uppercase tracking-widest font-bold underline">Back to Catalog</Link>
      </div>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL'];
  const images = [product.image, product.secondaryImage || product.image, "https://picsum.photos/seed/detail/800/1200"];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-32 pb-32">
      <div className="container mx-auto px-6">
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40 mb-12">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Image Gallery */}
          <div className="space-y-6">
             <div className="aspect-[3/4] overflow-hidden bg-dark/50 relative group cursor-zoom-in">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {product.isNew && (
                  <div className="absolute top-8 left-8 bg-gold text-dark text-[10px] font-bold px-6 py-2 rounded-full uppercase tracking-widest z-10 shadow-lg">
                    Collector's Arrival
                  </div>
                )}
             </div>
             
             <div className="grid grid-cols-3 gap-6">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "aspect-[3/4] overflow-hidden bg-dark/50 border transition-all duration-500",
                      activeImage === i ? "border-gold" : "border-white/5 opacity-50 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`View ${i}`} />
                  </button>
                ))}
             </div>
          </div>

          {/* Product Info */}
          <div className="sticky top-40 space-y-12">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold">{product.category} Collection</span>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">{product.name}</h1>
              <div className="flex items-center space-x-6 pt-4">
                <p className="text-3xl font-light text-white">${product.price}</p>
                <div className="h-4 w-[1px] bg-white/20" />
                <div className="flex items-center space-x-2 text-gold">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i < 5 ? 'currentColor' : 'none'} />)}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-2">12 Private Reviews</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-white/60 font-serif italic leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-10">
              {product.category !== 'Perfumes' && (
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/50">Select Magnitude</h4>
                    <button className="text-[10px] uppercase tracking-widest font-bold text-gold underline underline-offset-4">Dimension Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "w-16 h-16 flex items-center justify-center border text-xs font-bold transition-all duration-300",
                          selectedSize === size 
                            ? "bg-white border-white text-dark shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                            : "border-white/10 text-white/50 hover:border-white/40 hover:text-white"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center border border-white/10 h-16 px-6 space-x-10">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white/40 hover:text-gold transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white/40 hover:text-gold transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gold hover:bg-white text-dark h-16 flex items-center justify-center space-x-4 transition-all duration-500 shadow-xl group"
                >
                  <ShoppingBag size={20} />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">Acquire Article</span>
                </motion.button>

                <button className="w-16 h-16 flex items-center justify-center border border-white/20 hover:border-white transition-colors">
                  <Heart size={20} className="text-white hover:text-gold transition-colors" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/5">
                {[
                  { icon: <Truck size={20} />, label: "Express Protocol", sub: "Global Priority Delivery" },
                  { icon: <RefreshCw size={20} />, label: "30-Day Transition", sub: "Complimentary Returns" },
                  { icon: <ShieldCheck size={20} />, label: "Certified Luxury", sub: "Authenticity Guaranteed" }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="text-gold">{item.icon}</div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white">{item.label}</p>
                    <p className="text-[10px] text-white/40">{item.sub}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-40 pt-40 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-12 shrink-0">Craftsmanship</h2>
            <p className="text-4xl md:text-6xl font-serif text-white italic leading-tight mb-16">
              "This piece represents the zenith of our textile engineering. Every thread selected for its tactile resonance and visual depth."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left">
              <div className="space-y-6">
                <h4 className="text-xs uppercase tracking-widest font-bold text-white">Ethical Origin</h4>
                <p className="text-white/50 leading-relaxed font-light">
                  Sourced from high-altitude pastures where traditional methods still prevail. Our process respects the rhythm of nature, ensuring a product that is both premium and sustainable.
                </p>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs uppercase tracking-widest font-bold text-white">The Artisan's Touch</h4>
                <p className="text-white/50 leading-relaxed font-light">
                  Finished by hand in our Milan atelier. Over 40 hours of focused labor were invested into the structural integrity and aesthetic flow of this specific collection.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-40">
           <div className="flex justify-between items-end mb-16">
              <h3 className="text-4xl font-serif text-white italic">Curated Pairings</h3>
              <Link to="/shop" className="text-xs uppercase tracking-widest font-bold text-gold hover:text-white transition-colors underline underline-offset-8">Explore All</Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group space-y-6">
                  <div className="aspect-[3/4] overflow-hidden bg-dark/50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white group-hover:text-gold transition-colors">{p.name}</h4>
                    <p className="text-gold font-bold mt-2">${p.price}</p>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
