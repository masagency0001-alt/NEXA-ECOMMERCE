import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

function NavItem({ link }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={link.path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={({ isActive }) => cn(
        "relative text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 py-2",
        isActive ? "text-gold" : "text-white/60 hover:text-white"
      )}
    >
      {({ isActive }) => (
        <>
          <span className="relative z-10">{link.name}</span>
          {isActive && (
            <motion.div 
              layoutId="activeNav"
              className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <AnimatePresence>
            {isHovered && !isActive && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                className="absolute -bottom-1 left-0 h-[1px] bg-white/20 origin-left"
              />
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}

export default function Header({ cartCount }: { cartCount: number }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Perfumes', path: '/perfumes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "glass py-4" : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-widest text-white group"
        >
          NEX<span className="text-gold group-hover:animate-pulse transition-all">A</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button className="hidden sm:block text-white/70 hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden sm:block text-white/70 hover:text-gold transition-colors">
            <Heart size={20} />
          </button>
          <Link 
            to="/cart" 
            className="text-white hover:text-gold transition-colors relative"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-2 bg-gold text-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-dark flex flex-col p-10 lg:hidden"
          >
            <button 
              className="self-end text-white pb-10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-4xl font-serif text-white hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-white/10 flex flex-col space-y-4">
              <p className="text-white/50 text-xs uppercase tracking-widest">Connect</p>
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="text-white hover:text-gold transition-colors">Pinterest</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
