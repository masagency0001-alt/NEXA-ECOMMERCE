import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { ArrowRight, Filter, ChevronDown } from 'lucide-react';

interface Props {
  category: 'Men' | 'Women' | 'Perfumes';
  title: string;
  subtitle: string;
  bannerImage: string;
  accentTitle?: string;
}

export default function CollectionPage({ category, title, subtitle, bannerImage, accentTitle }: Props) {
  const collectionProducts = PRODUCTS.filter(p => p.category === category);

  return (
    <div className="bg-dark">
      {/* Immersive Banner */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={bannerImage} alt={title} className="w-full h-full object-cover grayscale opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <span className="text-xs uppercase tracking-[0.5em] font-bold text-gold mb-10 block">Artisanal Archive</span>
            <h1 className="text-6xl md:text-[12vw] font-bold text-white tracking-tighter leading-[0.85] mb-12 italic font-serif font-light">
              {title} <br /> 
              <span className="text-gold">{accentTitle || "Collection"}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-serif italic max-w-xl leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-white/30">Catalogue Registry</span>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center mb-24 py-12 border-y border-white/5 gap-12">
              <div className="flex items-center space-x-12">
                 <button className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    <Filter size={14} className="text-gold" />
                    <span>REFINE CURATION</span>
                 </button>
                 <div className="h-4 w-[1px] bg-white/10" />
                 <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">{collectionProducts.length} Articles Identified</p>
              </div>

              <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors cursor-pointer group">
                 <span>ORDER BY: <span className="text-white">DEFAULT PROTOCOL</span></span>
                 <ChevronDown size={14} className="text-gold group-hover:translate-y-1 transition-transform" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
              {collectionProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`} className="space-y-10 group">
                     <div className="relative aspect-[3/4] overflow-hidden bg-dark/50 group">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 group-hover:opacity-70 grayscale hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-center justify-center">
                           <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center text-xs text-white uppercase tracking-widest scale-75 group-hover:scale-100 transition-transform duration-700 font-bold backdrop-blur-sm">Detail</div>
                        </div>
                     </div>
                     <div className="flex justify-between items-start border-b border-white/5 pb-10">
                        <div className="space-y-4">
                           <h3 className="text-3xl font-serif text-white italic group-hover:text-gold transition-colors">{product.name}</h3>
                           <p className="text-sm font-light text-white/50 tracking-wide max-w-xs">{product.description}</p>
                           <div className="inline-flex items-center space-x-4 pt-4 group/btn">
                              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Acquire</span>
                              <div className="h-[1px] w-8 bg-gold group-hover/btn:w-16 transition-all duration-500" />
                           </div>
                        </div>
                        <p className="text-xl font-light text-gold">${product.price}</p>
                     </div>
                  </Link>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Parallax Interstitial */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0 scale-110">
            <img src={bannerImage} className="w-full h-full object-cover opacity-20 blur-sm" alt="Parallax" />
         </div>
         <div className="text-center relative z-10 px-6">
            <h2 className="text-4xl md:text-6xl font-serif text-white italic max-w-3xl leading-tight">
               "A silhouette is not just a shape, it is the shadow of an intention."
            </h2>
         </div>
      </section>

      {/* Featured Details (Specific to collection) */}
      <section className="py-32 border-t border-white/5">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
               {[
                 { label: "Fabric Origin", value: "Artisanal Mill, Lyon", desc: "Sourced from historical weaving centers with century-old looms." },
                 { label: "Tailoring", value: "40+ Hours/Article", desc: "Every garment undergoes rigorous structural validation by master craftsmen." },
                 { label: "Limited Protocol", value: "Serial Batching", desc: "To ensure exclusivity, each batch is limited to 100 authenticated pieces." }
               ].map((item, i) => (
                 <div key={i} className="space-y-8">
                    <span className="text-gold uppercase tracking-[0.5em] font-bold text-[10px]">{item.label}</span>
                    <h4 className="text-2xl font-serif text-white italic">{item.value}</h4>
                    <p className="text-sm font-light text-white/40 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
