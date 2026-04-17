import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Globe, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export default function AboutContact() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        {/* About Section */}
        <section className="mb-60">
           <div className="max-w-4xl mb-40">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-10 block">The Genesis of NEXA</span>
              <h1 className="text-6xl md:text-[10vw] font-bold text-white tracking-tighter leading-[0.9] mb-20 italic font-serif font-light">
                 Crafted for <br /> persistent <br /> <span className="text-gold">elegance.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-white/70 font-light leading-relaxed font-serif italic max-w-2xl">
                "We didn't set out to build another fashion house. We sought to construct a sanctuary for those who appreciate the poetry of detail."
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-40 items-start">
              <motion.div {...fadeInUp} className="group overflow-hidden rounded-3xl relative aspect-[3/4]">
                 <img src="https://picsum.photos/seed/about/1200/1800" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Atelier" />
                 <div className="absolute inset-0 bg-dark/20 z-10" />
                 <div className="absolute bottom-10 left-10 z-20">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gold mb-2">Our Sanctuary</p>
                    <p className="text-2xl font-serif text-white italic">The NEXA Atelier, Milan</p>
                 </div>
              </motion.div>
              
              <div className="space-y-24">
                 {[
                   { title: "Pure Philosophy", desc: "Our approach is dictated by the material. We listen to the weight of the wool, the grain of the silk, and the resonance of the fragrance. Only then do we begin to create." },
                   { title: "Architectural Precision", desc: "Every seam is a structural decision. We borrow from the language of modern architecture to create silhouettes that are both rigid and fluid, stable and dynamic." },
                   { title: "Ethical Legacy", desc: "Luxury should not cost the future. 100% of our supply chain is audited to ensure the highest standards of human dignity and ecological preservation." }
                 ].map((item, i) => (
                   <motion.div 
                     key={i} 
                     {...fadeInUp} 
                     transition={{ delay: i * 0.2 }}
                     className="space-y-6"
                   >
                     <h4 className="text-xs uppercase tracking-widest font-bold text-white flex items-center space-x-4">
                        <span className="text-gold">0{i+1}.</span>
                        <span>{item.title}</span>
                     </h4>
                     <p className="text-lg text-white/50 leading-relaxed font-light">{item.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Timeline Scroll Experience */}
        <section className="mb-60 border-y border-white/5 py-32">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { year: "2018", event: "The Inner Circle founded as a private atelier in London." },
                { year: "2020", event: "Launch of the Noir Collection, redefining menswear silhouettes." },
                { year: "2022", event: "Boutique expansion into Milan & Tokyo's Ginza district." },
                { year: "2024", event: "The NEXA Digital Sanctuary launched globally." }
              ].map((point, i) => (
                <div key={i} className="space-y-6 group">
                   <p className="text-6xl font-bold text-white/10 group-hover:text-gold transition-colors font-serif italic">{point.year}</p>
                   <p className="text-sm text-white/50 font-light leading-relaxed">{point.event}</p>
                   <div className="h-[1px] bg-white/10 w-0 group-hover:w-full transition-all duration-700" />
                </div>
              ))}
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-40">
           <div className="space-y-16">
              <div>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-10 block">Direct Inquiry</span>
                <h2 className="text-6xl font-bold text-white tracking-tighter leading-none mb-10">Connect with <br /> <span className="text-gold italic font-serif font-light">the Nexus.</span></h2>
              </div>
              
              <div className="space-y-10">
                 <div className="flex items-center space-x-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold group-hover:text-dark transition-all duration-500">
                       <Mail size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Electronic Correspondence</p>
                       <p className="text-xl font-light text-white tracking-widest group-hover:text-gold transition-colors">concierge@ecom-nexa.luxury</p>
                    </div>
                 </div>

                 <div className="flex items-center space-x-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold group-hover:text-dark transition-all duration-500">
                       <Phone size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Direct Communication</p>
                       <p className="text-xl font-light text-white tracking-widest group-hover:text-gold transition-colors">+44 (0) 20 8821 0090</p>
                    </div>
                 </div>

                 <div className="flex items-center space-x-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold group-hover:text-dark transition-all duration-500">
                       <MapPin size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Global HQ</p>
                       <p className="text-xl font-light text-white tracking-widest group-hover:text-gold transition-colors">Savile Row, Mayfair, London</p>
                    </div>
                 </div>
              </div>

              <div className="pt-20 border-t border-white/5 flex items-center space-x-12">
                 <a href="#" className="flex items-center space-x-3 text-white/50 hover:text-white transition-colors">
                    <Instagram size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">@nexa_luxury</span>
                 </a>
                 <a href="#" className="flex items-center space-x-3 text-white/50 hover:text-white transition-colors">
                    <Globe size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Official Registry</span>
                 </a>
              </div>
           </div>

           <div className="bg-ink p-12 lg:p-20 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
              
              <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-white mb-16 italic font-serif">Submission Protocol</h3>
              
              <form className="space-y-12">
                 <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="relative group">
                          <input type="text" placeholder="GIVEN NAME" className="bg-transparent border-b border-white/10 w-full py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-[10px] tracking-widest uppercase font-bold" required />
                          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                       </div>
                       <div className="relative group">
                          <input type="text" placeholder="SURNAME" className="bg-transparent border-b border-white/10 w-full py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-[10px] tracking-widest uppercase font-bold" required />
                          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                       </div>
                    </div>
                    <div className="relative group">
                       <input type="email" placeholder="SECURE EMAIL" className="bg-transparent border-b border-white/10 w-full py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-[10px] tracking-widest uppercase font-bold" required />
                       <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>
                    <div className="relative group">
                       <textarea rows={4} placeholder="YOUR INQUIRY OR MESSAGE" className="bg-transparent border-b border-white/10 w-full py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-[10px] tracking-widest uppercase font-bold resize-none" required />
                       <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full h-16 bg-white text-dark font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-white transition-all duration-500 flex items-center justify-center space-x-6 group"
                  >
                    <span>Transmit Message</span>
                    <ArrowRight size={16} className="group-hover:translate-x-4 transition-transform" />
                 </button>
              </form>
           </div>
        </section>
      </div>
    </div>
  );
}
