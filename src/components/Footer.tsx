import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-white/5 py-24 pb-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
        {/* Brand Info */}
        <div className="space-y-8">
          <Link to="/" className="text-3xl font-bold tracking-widest text-white">NEXA</Link>
          <p className="text-white/50 font-light leading-relaxed">
            Redefining luxury for the modern era. Hand-crafted pieces designed with passion and precision.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/70 hover:text-gold transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-gold transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-gold transition-colors duration-300">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Collections</h4>
          <nav className="flex flex-col space-y-4">
            <Link to="/men" className="text-white/70 hover:text-gold transition-colors duration-300">Men's Portfolio</Link>
            <Link to="/women" className="text-white/70 hover:text-gold transition-colors duration-300">Women's Gallery</Link>
            <Link to="/perfumes" className="text-white/70 hover:text-gold transition-colors duration-300">Artisan Perfumes</Link>
            <Link to="/shop" className="text-white/70 hover:text-gold transition-colors duration-300">All Collections</Link>
          </nav>
        </div>

        {/* Support */}
        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Company</h4>
          <nav className="flex flex-col space-y-4">
            <Link to="/about" className="text-white/70 hover:text-gold transition-colors duration-300">Our Story</Link>
            <Link to="/contact" className="text-white/70 hover:text-gold transition-colors duration-300">Contact</Link>
            <Link to="#" className="text-white/70 hover:text-gold transition-colors duration-300">Sustainability</Link>
            <Link to="#" className="text-white/70 hover:text-gold transition-colors duration-300">Privacy Policy</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Stay Inspired</h4>
          <p className="text-white/50 font-light">Join the NEXA inner circle for exclusive updates and arrivals.</p>
          <div className="relative group overflow-hidden">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-white/20 w-full py-4 text-white focus:outline-none focus:border-gold transition-colors duration-500 placeholder:text-white/20 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
            />
            <button className="absolute right-0 bottom-4 text-white/50 group-hover:text-gold transition-colors duration-300">
              <ArrowRight size={20} />
            </button>
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <p className="text-white/30 text-[10px] uppercase tracking-widest">
          © {currentYear} ECOMMERCE NEXA. HAND-CRAFTED LUXURY.
        </p>
        <div className="flex space-x-12">
          <Link to="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-gold transition-colors">Shipment</Link>
          <Link to="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-gold transition-colors">Returns</Link>
          <Link to="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-gold transition-colors">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
