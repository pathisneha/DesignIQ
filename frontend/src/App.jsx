import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layers, Activity, BookOpen, Info, Zap, Menu, X, Home as HomeIcon, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RuleLibrary from './pages/RuleLibrary';
import Competitors from './pages/Competitors';
import About from './pages/About';
import Contact from './pages/Contact';

function Sidebar({ isOpen, toggle }) {
  const location = useLocation();
  
  const links = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'AI Dashboard', path: '/dashboard', icon: <Activity className="w-5 h-5" /> },
    { name: 'Rule Library', path: '/rules', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Competition', path: '/competitors', icon: <Zap className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ 
        x: isOpen ? 0 : -280,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-72 bg-[#0F1225]/95 backdrop-blur-2xl border-r border-white/10 h-screen flex flex-col pt-24 pb-8 shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-40 print:hidden"
    >
      <div className="flex items-center gap-3 px-8 mb-12">
        <div className="p-2.5 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          <Layers className="text-white w-7 h-7 flex-shrink-0" />
        </div>
        <div>
          <h1 className="text-2xl font-black neon-text leading-tight tracking-tighter uppercase italic">DesignIQ</h1>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">AI Design Validation</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-3 font-outfit">
        {links.map((link, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={link.path}
              onClick={() => toggle(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                location.pathname === link.path 
                  ? 'bg-primary/10 text-white border border-primary/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`${location.pathname === link.path ? 'text-primary' : 'text-gray-600 group-hover:text-primary transition-colors'}`}>
                {link.icon}
              </div>
              <span className={`text-[11px] uppercase tracking-[0.2em] font-black ${location.pathname === link.path ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                {link.name}
              </span>
              {location.pathname === link.path && (
                <motion.div layoutId="nav-glow" className="absolute right-0 w-1 h-8 bg-primary rounded-full blur-[2px]" />
              )}
            </Link>
          </motion.div>
        ))}
      </nav>
      
      <div className="px-8 mt-auto pt-8 border-t border-white/5">
        <Link to="/" onClick={() => toggle(false)} className="text-[10px] text-gray-500 hover:text-white font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return To Home
        </Link>
      </div>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rules" element={<RuleLibrary />} />
          <Route path="/competitors" element={<Competitors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen relative bg-[#111827] text-gray-100 overflow-x-hidden">
        
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-6 left-6 z-50 p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl hover:bg-primary/20 hover:border-primary/40 transition-all text-white print:hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        {/* Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 cursor-pointer"
            />
          )}
        </AnimatePresence>

        <Sidebar isOpen={isOpen} toggle={setIsOpen} />

        <main className={`transition-all duration-500 ease-[0.16,1,0.3,1] ${isOpen ? 'blur-[5px] scale-[0.98]' : ''}`}>
          <AnimatedRoutes />
        </main>

        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />
      </div>
    </Router>
  );
}

export default App;
