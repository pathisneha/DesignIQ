import React from 'react';
import { Target, CheckCircle2, XCircle, Zap, ShieldCheck, Trophy, Cpu, Code2, BarChart3, TrendingUp, ShieldAlert, Globe, Activity, Settings, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

function Competitors() {
  const compData = [
    {
      name: "NexCAD (Legacy Checker)",
      bad: [
        "Detects mistakes but fails to teach engineering principles.",
        "Static 2D reporting with zero generative visualization.",
        "No multi-domain context (Mechanical vs Automotive).",
      ],
      good: ["Fast file uploads.", "Simple interface."],
      marketShare: "High (Legacy)",
      status: "STAGNANT"
    },
    {
      name: "Autodesk AI Design",
      bad: [
        "Prohibitive costs ($5,000+ per seat).",
        "Proprietary black-box logic (cannot inspect the rules).",
        "Slow processing of high-complexity STL geometries."
      ],
      good: ["Strong CAD integration.", "Large resource library."],
      marketShare: "Enterprise",
      status: "CLOSED SOURCE"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-20 pb-40 font-outfit">
      
      {/* Strategic Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left space-y-6"
      >
        <div className="inline-flex items-center gap-4 px-6 py-2 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-xl">
           <TrendingUp className="w-4 h-4 text-accent" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Market Analysis // Strategic Moat</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight italic leading-none">Competitive <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary animate-pulse">Supremacy</span></h2>
        <p className="text-gray-500 max-w-2xl font-medium leading-relaxed italic text-md border-l-4 border-accent/20 pl-10">
          "The gap between legacy CAD checkers and DesignIQ is intelligence. We provide the 'Why' behind every dimension, turning validation into mentorship."
        </p>
      </motion.div>

      {/* Comparison Grid - Industrial Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {compData.map((comp, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="glass-panel p-10 border-white/5 relative overflow-hidden group hover:border-accent/40 transition-all backdrop-blur-3xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
               <Target className="w-32 h-32 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-start mb-12">
               <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{comp.name}</h3>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{comp.marketShare} Tiering</span>
               </div>
               <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  {comp.status}
               </div>
            </div>
            
            <div className="space-y-10 relative z-10">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-rose-500/50 uppercase tracking-[0.3em] flex items-center gap-3">
                   <ShieldAlert className="w-4 h-4" /> Strategic Deficiencies
                </h4>
                <ul className="space-y-6">
                  {comp.bad.map((item, j) => (
                    <li key={j} className="flex gap-4 text-[13px] text-gray-400 items-start italic leading-relaxed group/item">
                      <div className="w-6 h-[1px] bg-rose-500/30 mt-3 group-hover/item:w-10 transition-all" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
               <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic flex items-center gap-2">
                 <Briefcase className="w-3 h-3" /> Competitive Audit Node: L-27
               </span>
               <div className="flex gap-1">
                  {[1,2,3].map(d => <div key={d} className="w-1 h-1 bg-gray-600 rounded-full" />)}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Our Advantage - The Strategic Moat */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-12 lg:p-16 relative overflow-hidden border-primary/20 shadow-[0_0_80px_rgba(99,102,241,0.1)] rounded-[4rem] backdrop-blur-3xl"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -mr-40 -mt-40" />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20 border-b border-white/5 pb-10">
            <div className="flex items-center gap-8">
              <div className="bg-primary/20 p-6 rounded-3xl border border-primary/30 shadow-xl shadow-primary/10">
                <Globe className="w-12 h-12 text-primary animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic">DesignIQ Advantage</h3>
                <p className="text-primary-light font-black text-[9px] uppercase tracking-[0.4em] flex items-center gap-3">
                   <ShieldCheck className="w-4 h-4" /> Market Supremacy Matrix
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
               {[
                 { icon: <Cpu />, label: 'Neuro-Symbolic' },
                 { icon: <Code2 />, label: 'Heuristic Engine' }
               ].map((tag, i) => (
                 <div key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-4 hover:border-primary/40 transition-colors group">
                    <div className="text-primary group-hover:scale-110 transition-transform">{tag.icon}</div>
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{tag.label}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase italic tracking-tight border-l-4 border-primary/20 pl-8 flex items-center gap-4">
                 <Zap className="w-6 h-6 text-primary" /> Logic Layers
              </h4>
              <p className="text-gray-400 text-md leading-relaxed font-medium italic">
                "Legacy platforms operate on static 'If/Then' checks. DesignIQ utilizes a <span className="text-white font-black italic">Neural State Persistence</span> layer that understands the design evolution and predicts manufacturing yield."
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase italic tracking-tight border-l-4 border-accent/20 pl-8 flex items-center gap-4">
                 <Settings className="w-6 h-6 text-accent" /> Educational Insight
              </h4>
              <p className="text-gray-400 text-md leading-relaxed font-medium italic">
                "We don't just find flaws. We provide <span className="text-accent font-black italic">Generative Engineering Guidance</span>. Our platform serves as a mentor, showing the exact coordinate-mapped logic for every optimization."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/5">
            {[
              { icon: <Activity className="w-5 h-5" />, title: 'Real-time Heatmaps', desc: 'Localized 27-way cross-referencing in milliseconds.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Generative Synthesis', desc: 'Neural-cache enabled design-wave recognition.' },
              { icon: <BarChart3 className="w-5 h-5" />, title: 'Feasibility Metrics', desc: 'Industrial-grade audit logs for final compliance.' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="flex items-center gap-4 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
                  {item.icon} <span className="text-gray-700">Audit Protocol 0{idx+1}</span>
                </div>
                <h5 className="font-black text-white uppercase italic tracking-tighter text-lg group-hover:text-primary transition-colors">{item.title}</h5>
                <p className="text-gray-500 text-[10px] leading-relaxed font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Competitors;
