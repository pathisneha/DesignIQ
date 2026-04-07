import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Layers, Cpu, Database, Activity, Sparkles, Brain, Network, MousePointer2, ChevronRight, Settings, BarChart3, HelpCircle, HardDrive, Cpu as CpuIcon, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Assets
import HomeHero from '../assets/home_hero.png';
import HomeAutomotive from '../assets/home_automotive.png';
import HomeManufacturing from '../assets/home_manufacturing.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] }
});

const BlueprintGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden mix-blend-overlay">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="blueprint-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.1" fill="white" />
          <path d="M10 0L0 0 0 10" fill="none" stroke="white" strokeWidth="0.05" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#blueprint-pattern)" />
    </svg>
  </div>
);

const LogicTree = () => (
  <div className="relative py-12 px-6 bg-black/20 rounded-[3rem] border border-white/5 overflow-hidden group">
     <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
     <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="p-4 bg-primary/20 rounded-2xl border border-primary/40 shadow-xl animate-pulse">
           <Brain className="w-8 h-8 text-primary" />
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent opacity-40" />
        <div className="grid grid-cols-2 gap-12 w-full max-w-lg">
           <div className="flex flex-col items-center gap-4">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center w-full">
                 <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Neural Kernel</span>
              </div>
           </div>
           <div className="flex flex-col items-center gap-4">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center w-full">
                 <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Symbolic Logic</span>
              </div>
           </div>
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary opacity-40 mt-6" />
        <div className="p-4 border-2 border-emerald-500/20 bg-emerald-500/5 rounded-[2rem] text-center px-10">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] italic animate-pulse">Optimized Assembly</span>
        </div>
     </div>
     {/* Decorative Tech Borders */}
     <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-primary/20" />
     <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-primary/20" />
  </div>
);

function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0F1225] text-gray-100 font-outfit select-none lg:pt-0">
      <BlueprintGrid />

      {/* Hero Section - Industrial Blueprint Edition */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 pt-32 lg:pt-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 text-left"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl group hover:border-primary/40 transition-all">
              <Zap className="w-5 h-5 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,1)]" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-400 group-hover:text-white transition-colors">
                 DesignIQ // PROTOCOL ACTIVE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight uppercase italic text-white flex flex-col">
              FORGE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]">INTELLIGENTLY</span>
            </h1>

            <p className="text-2xl text-gray-500 max-w-xl font-medium leading-relaxed italic border-l-8 border-primary/20 pl-10 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
               The first decentralized Neuro-Symbolic platform for automated DFM validation. We eliminate the guesswork from high-precision engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10 pt-6">
              <Link to="/dashboard" className="group glass-button w-full sm:w-auto px-16 py-7 rounded-[3rem] text-xl flex items-center justify-center gap-6 relative overflow-hidden transition-all shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                <div className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                <span className="relative z-10 uppercase tracking-[0.3em] font-black italic">Initialize Core</span>
                <ArrowRight className="group-hover:translate-x-4 transition-transform w-8 h-8 relative z-10" />
              </Link>
              <Link to="/about" className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 hover:text-primary transition-all flex items-center gap-4 group">
                 Technical Spec <ChevronRight className="group-hover:translate-x-2 transition-transform w-5 h-5 text-primary" />
              </Link>
            </div>
          </motion.div>

          {/* Luxury Technical Asset Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
             <div className="absolute -top-10 -right-10 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
             <div className="relative z-10 p-2 bg-[#0F1225] border-4 border-white/5 rounded-[4rem] shadow-2xl overflow-hidden group max-w-2xl mx-auto">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                <img src={HomeHero} alt="Industrial AI Meta Core" className="w-full h-auto rounded-[3.5rem] group-hover:scale-105 transition-transform duration-1000 grayscale-[60%] group-hover:grayscale-0 shadow-2xl" />
                
                {/* Tech Overlays */}
                <div className="absolute top-12 right-12 flex flex-col items-end gap-3">
                   <div className="px-4 py-2 bg-black/60 border border-white/10 backdrop-blur-xl rounded-full text-[9px] font-black text-primary uppercase tracking-widest">GEN_COORD_08</div>
                   <div className="px-4 py-2 bg-black/60 border border-white/10 backdrop-blur-xl rounded-full text-[9px] font-black text-accent uppercase tracking-widest">SCAN_COMPLETE</div>
                </div>

                <div className="absolute bottom-10 left-10 p-8 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] max-w-xs group-hover:border-primary/50 transition-colors">
                   <div className="flex items-center gap-3 mb-4">
                      <Terminal className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Neural Log</span>
                   </div>
                   <p className="text-[9px] text-gray-500 font-bold uppercase leading-loose tracking-[0.1em]">[SCAN_ID_6300]: DETECTING_LAMINAR_GEOMETRY... OPTIMIZATION_SUGGESTED_FOR_INJECTION_PROCESS.</p>
                </div>
             </div>
          </motion.div>
        </div>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-700 animate-bounce"><chevron-down className="w-8 h-8" /></div>
      </section>

      {/* CORE PHILOSOPHY SECTION (TECHNICAL HUBS) */}
      <section className="py-24 px-8 relative bg-black/40">
        <BlueprintGrid />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          
          <motion.div {...fadeUp()} className="space-y-12">
            <div className="flex items-center gap-4 text-accent font-black text-[12px] uppercase tracking-[0.4em]">
               <Settings className="w-6 h-6" /> Structural realization
            </div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Machine intuition. <br /> Human control.</h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed italic border-l-4 border-accent/20 pl-10">
              "We provide the 'Missing Link' in the engineering ecosystem. By explaining the principle behind every flaw, we turn design validation into a high-fidelity mentoring experience."
            </p>
            <div className="space-y-6">
               {[
                 { icon: <Database />, title: 'Persistent Neural History', desc: 'Learning from every scan to optimize design velocity.' },
                 { icon: <ShieldCheck />, title: 'Heuristic 27-Way Matrix', desc: 'Comprehensive domain cross-referencing for total certainty.' }
               ].map((feat, i) => (
                 <div key={i} className="flex gap-6 items-start">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-primary">{feat.icon}</div>
                    <div>
                       <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1 italic">{feat.title}</h4>
                       <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{feat.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-12">
             <LogicTree />
             <div className="relative rounded-[3rem] overflow-hidden border border-white/5 group shadow-2xl">
                <img src={HomeManufacturing} alt="Technical Matrix" className="w-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1225] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-8 left-8 text-left">
                   <h4 className="text-2xl font-black text-white italic uppercase tracking-widest">Factory Scale Audit</h4>
                </div>
             </div>
          </motion.div>

        </div>
      </section>

      {/* STRATEGIC IMPACT SECTION */}
      <section className="py-24 px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 relative z-10">
           
           <motion.div {...fadeUp()} className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all" />
              <img src={HomeAutomotive} alt="Automotive Scale" className="relative z-10 w-full max-w-2xl mx-auto rounded-[4rem] border-4 border-white/5 grayscale-[50%] hover:grayscale-0 transition-colors shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 p-10 bg-[#0F1225]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] items-start hidden md:flex flex-col gap-3">
                 <Activity className="w-10 h-10 text-primary" />
                 <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Strategic Moat</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[160px]">Tier 1 Manufacturing Validation Protocol Activated.</p>
              </div>
           </motion.div>

           <motion.div {...fadeUp(0.1)} className="lg:w-1/2 space-y-12 text-left">
             <div className="flex items-center gap-4 text-primary font-black text-[12px] uppercase tracking-[0.4em]">
                <BarChart3 className="w-6 h-6" /> Engineering ROI
             </div>
             <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Industrial Supremacy</h2>
             <p className="text-xl text-gray-400 font-medium leading-relaxed italic border-l-4 border-primary/20 pl-10">
                "DesignIQ doesn't just build designs. We engineer 100% manufacturing certainty. From aerospace linkages to automotive engine frames."
             </p>
             <div className="grid grid-cols-2 gap-8">
               {[
                 { val: '88%', label: 'FAILURE REDUCTION' },
                 { val: '3X', label: 'DESIGN VELOCITY' },
                 { val: '27', label: 'CROSS-DOMAINS' },
                 { val: '99%', label: 'SCAN INTEGRITY' }
               ].map((stat, i) => (
                 <div key={i} className="space-y-2 group">
                    <span className="text-4xl font-black text-white italic tracking-tighter group-hover:text-primary transition-colors">{stat.val}</span>
                    <div className="h-[2px] w-12 bg-white/10 group-hover:w-full transition-all" />
                    <span className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase">{stat.label}</span>
                 </div>
               ))}
             </div>
           </motion.div>

        </div>
      </section>

      {/* FOOTER CALL */}
      <section className="py-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
         <motion.div {...fadeUp()} className="max-w-4xl mx-auto px-8 space-y-12 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
               The future is <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse">Neuro-Symbolic</span>
            </h2>
            <Link to="/dashboard" className="glass-button px-24 py-10 rounded-[3rem] text-2xl uppercase tracking-[0.4em] font-black inline-flex items-center gap-8 shadow-[0_0_80px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform">
               Access Network <ArrowRight className="w-10 h-10" />
            </Link>
         </motion.div>
      </section>
      
    </div>
  );
}

export default Home;
