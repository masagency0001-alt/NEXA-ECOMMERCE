import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, ArrowRight, CreditCard, Apple, CheckCircle, Truck, PackageCheck, Zap } from 'lucide-react';
import { Product } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export default function CartCheckout({ 
  cart, 
  onRemoveFromCart, 
  updateQuantity 
}: { 
  cart: Product[]; 
  onRemoveFromCart: (id: string) => void; 
  updateQuantity: (id: string, q: number) => void;
}) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shipping = 25;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen pt-40 pb-32 flex flex-col items-center justify-center container mx-auto px-6 text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-10 text-gold opacity-30">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl font-serif text-white italic mb-6">Your collection is currently empty.</h1>
        <p className="text-white/40 mb-12 max-w-md font-light">Explore our curated galleries to find pieces that resonate with your unique aesthetic.</p>
        <Link 
          to="/shop" 
          className="px-12 py-5 bg-gold text-dark font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 shadow-xl"
        >
          Begin Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          {step === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start"
            >
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">Your <span className="text-gold italic font-serif font-light">Curation</span></h1>
                  <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">Protocol {cart.length} Articles Identified</p>
                </div>

                <div className="space-y-10">
                  {cart.map((item, i) => (
                    <motion.div
                      key={`${item.id}-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col sm:flex-row gap-10 items-center border-b border-white/10 pb-10 group"
                    >
                      <div className="w-40 aspect-[3/4] overflow-hidden bg-dark/50 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="flex-1 space-y-4 text-center sm:text-left">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{item.category}</p>
                        <h3 className="text-2xl font-serif text-white">{item.name}</h3>
                        <p className="text-white/50 text-sm font-light leading-relaxed max-w-md">{item.description}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-8 pt-4">
                           <div className="flex items-center space-x-4 border border-white/10 px-4 py-2">
                              <button className="text-white/40 hover:text-gold transition-colors"><Trash2 size={14} /></button>
                              <span className="text-xs font-bold text-white">01</span>
                              <button className="text-white/40 hover:text-gold transition-colors"><ArrowRight size={14} className="rotate-90" /></button>
                           </div>
                           <button 
                             onClick={() => onRemoveFromCart(item.id)}
                             className="text-[10px] text-white/40 hover:text-red-400 uppercase tracking-widest font-bold transition-colors"
                            >
                              Remove Article
                            </button>
                        </div>
                      </div>
                      <div className="text-2xl font-light text-white">${item.price}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-10 sticky top-40 bg-ink p-10 border border-white/5 rounded-2xl shadow-2xl">
                <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-gold">Summary Protocol</h3>
                <div className="space-y-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping (Global Express)</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">V.A.T Estimate</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-[1px] bg-white/10" />
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-gold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-10">
                  <button 
                    onClick={() => setStep('checkout')}
                    className="w-full bg-gold text-dark h-16 flex items-center justify-center space-x-4 hover:bg-white transition-all duration-500 font-bold uppercase tracking-widest text-xs shadow-lg group"
                  >
                    <span>Proceed to Acquisition</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-white/30 uppercase tracking-widest leading-loose">
                    Complimentary express shipping <br /> on orders above $500.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
               <button 
                 onClick={() => setStep('cart')}
                 className="flex items-center space-x-4 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-gold transition-colors mb-20"
                >
                  <X size={16} />
                  <span>Return to Curation</span>
               </button>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                  <div className="space-y-12">
                     <h2 className="text-5xl font-bold text-white tracking-tighter">Acquisition <span className="text-gold italic font-serif font-light">Protocol</span></h2>
                     
                     <form onSubmit={handleCheckout} className="space-y-10">
                        {/* Delivery Info */}
                        <div className="space-y-6">
                           <h4 className="text-xs uppercase tracking-widest font-bold text-gold opacity-70">Delivery Identity</h4>
                           <div className="grid grid-cols-2 gap-6">
                              <input type="text" placeholder="GIVEN NAME" className="bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors placeholder:text-white/20 text-sm tracking-widest" required />
                              <input type="text" placeholder="SURNAME" className="bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors placeholder:text-white/20 text-sm tracking-widest" required />
                           </div>
                           <input type="email" placeholder="SECURE EMAIL" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors placeholder:text-white/20 text-sm tracking-widest" required />
                           <input type="text" placeholder="GLOBAL RESIDENCE ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-colors placeholder:text-white/20 text-sm tracking-widest" required />
                        </div>

                        {/* Payment Selection */}
                        <div className="space-y-6">
                           <h4 className="text-xs uppercase tracking-widest font-bold text-gold opacity-70">Monetary Exchange</h4>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="p-6 border border-gold bg-gold/5 flex items-center justify-between cursor-pointer">
                                 <div className="flex items-center space-x-6">
                                    <CreditCard className="text-gold" />
                                    <span className="text-xs uppercase tracking-widest font-bold text-white">Quantum Credit / Debit</span>
                                 </div>
                                 <div className="w-4 h-4 rounded-full border-2 border-gold flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-gold" />
                                 </div>
                              </div>
                              <div className="p-6 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between cursor-pointer opacity-50 grayscale">
                                 <div className="flex items-center space-x-6">
                                    <Apple className="text-white" />
                                    <span className="text-xs uppercase tracking-widest font-bold text-white">Legacy Pay</span>
                                 </div>
                                 <div className="w-4 h-4 rounded-full border border-white/20" />
                              </div>
                           </div>
                        </div>

                        <button 
                          className="w-full h-16 bg-white text-dark font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-all duration-500 shadow-2xl"
                        >
                          Complete Transaction — ${total.toFixed(2)}
                        </button>
                     </form>
                  </div>

                  {/* Summary Small */}
                  <div className="lg:border-l lg:border-white/5 lg:pl-16 space-y-10">
                     <h4 className="text-xs uppercase tracking-widest font-bold text-white/50">Secured Itemization</h4>
                     <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                        {cart.map((item, i) => (
                          <div key={i} className="flex space-x-6 items-center">
                             <div className="w-16 h-20 bg-dark shrink-0 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1">
                                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 italic font-serif">{item.category}</p>
                                <h5 className="text-xs font-bold text-white tracking-widest">{item.name}</h5>
                             </div>
                             <p className="text-xs font-bold text-white">${item.price}</p>
                          </div>
                        ))}
                     </div>
                     <div className="pt-8 border-t border-white/10 space-y-4">
                        <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
                           <span>Subtotal Protocol</span>
                           <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gold uppercase tracking-widest">
                           <span>Final Allocation</span>
                           <span>${total.toFixed(2)}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto py-20 bg-ink border border-white/5 p-16 text-center space-y-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
               <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold">
                  <CheckCircle size={48} />
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-bold text-white tracking-tighter">Transaction <span className="text-gold italic font-serif font-light">Finalized.</span></h2>
                  <p className="text-white/50 font-light max-w-sm mx-auto">Your acquisition has been entered into our priority fulfillment system. Notification inbound.</p>
               </div>

               <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-6 bg-dark/50 border border-white/5 space-y-2">
                     <PackageCheck size={20} className="text-gold mb-4" />
                     <p className="text-[10px] text-white/50 uppercase tracking-widest">Confirmation Protocol</p>
                     <p className="text-sm font-bold text-white">#NX-88210-ZP</p>
                  </div>
                  <div className="p-6 bg-dark/50 border border-white/5 space-y-2">
                     <Zap size={20} className="text-gold mb-4" />
                     <p className="text-[10px] text-white/50 uppercase tracking-widest">Estimated Activation</p>
                     <p className="text-sm font-bold text-white">24-48 HOURS</p>
                  </div>
               </div>

               <button 
                 onClick={() => navigate('/')}
                 className="inline-flex items-center space-x-6 border-b border-gold pb-4 hover:border-white transition-colors group"
                >
                  <span className="text-xs uppercase tracking-widest font-bold text-white">Return to Essence</span>
                  <ArrowRight size={16} className="text-gold group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
