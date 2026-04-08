import React from 'react';
import { Target, Zap, ShieldCheck, Cpu, Code2, BarChart3, TrendingUp, ShieldAlert, Globe, Activity, Settings, Briefcase, Brain, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function Competitors() {
  const compData = [
    {
      name: "Legacy CAD Checkers",
      bad: [
        "Detects geometry errors but provides no manufacturing context or actionable fix guidance.",
        "Static 2D reporting — no heatmaps, no confidence scoring, no visual feedback.",
        "Single-domain only — cannot switch between Mechanical, Aerospace, and Additive rules.",
        "No learning capability — same results regardless of usage history.",
      ],
      marketShare: "High (Legacy)",
      status: "STAGNANT"
    },
    {
      name: "Enterprise AI Design Tools",
      bad: [
        "Prohibitive pricing ($5,000–$25,000 per seat annually).",
        "Black-box AI — engineers cannot inspect or understand the reasoning behind flagged issues.",
        "Heavyweight installation — requires powerful workstations and proprietary CAD integration.",
        "Slow processing for complex STL and STEP geometries (minutes, not seconds).",
      ],
      marketShare: "Enterprise Only",
      status: "CLOSED SOURCE"
    }
  ];

  const advantages = [
    { icon: <Brain className="w-6 h-6" />, title: 'PointNet++ AI Engine', desc: 'Deep learning feature extraction from CAD geometry — not just rule matching, but intelligent pattern recognition trained on 1.17M samples.' },
    { icon: <Layers className="w-6 h-6" />, title: '3-Domain Architecture', desc: 'Specialized validation for Mechanical, Aerospace, and 3D Additive — each with dedicated processes, materials, and rule engines.' },
    { icon: <Activity className="w-6 h-6" />, title: 'Neural Learning Loop', desc: 'Online, incremental, and feedback-driven learning. The model improves accuracy with every design analyzed and every correction submitted.' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Transparent Reasoning', desc: 'Every error includes the engineering principle behind it. DesignIQ teaches — not just validates. Full explainability for every suggestion.' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Confidence Scoring', desc: 'AI confidence level on every finding. Engineers know exactly how certain the model is, enabling informed decision-making.' },
    { icon: <Zap className="w-6 h-6" />, title: '340ms Inference', desc: 'Sub-second analysis speed. Upload a design and get results before you finish clicking. Optimized PyTorch inference pipeline.' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-20 pb-40 font-outfit">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left space-y-6"
      >
        <div className="inline-flex items-center gap-4 px-6 py-2 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-xl">
           <TrendingUp className="w-4 h-4 text-accent" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Competitive Analysis</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight italic leading-none">Why Choose <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">DesignIQ</span></h2>
        <p className="text-gray-500 max-w-2xl font-medium leading-relaxed italic text-md border-l-4 border-accent/20 pl-10">
          The gap between legacy checkers and DesignIQ is intelligence. We provide the "Why" behind every finding, turning validation into engineering mentorship.
        </p>
      </motion.div>

      {/* Competitor Cards */}
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
            
            <div className="flex justify-between items-start mb-10">
               <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{comp.name}</h3>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{comp.marketShare}</span>
               </div>
               <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  {comp.status}
               </div>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-5">
                <h4 className="text-[10px] font-black text-rose-500/50 uppercase tracking-[0.3em] flex items-center gap-3">
                   <ShieldAlert className="w-4 h-4" /> Key Limitations
                </h4>
                <ul className="space-y-5">
                  {comp.bad.map((item, j) => (
                    <li key={j} className="flex gap-4 text-[13px] text-gray-400 items-start italic leading-relaxed group/item">
                      <div className="w-6 h-[1px] bg-rose-500/30 mt-3 group-hover/item:w-10 transition-all" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
               <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic flex items-center gap-2">
                 <Briefcase className="w-3 h-3" /> Competitive Audit
               </span>
               <div className="flex gap-1">
                  {[1,2,3].map(d => <div key={d} className="w-1 h-1 bg-gray-600 rounded-full" />)}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DesignIQ Advantage */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-12 lg:p-16 relative overflow-hidden border-primary/20 shadow-[0_0_80px_rgba(99,102,241,0.1)] rounded-[4rem] backdrop-blur-3xl"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -mr-40 -mt-40" />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16 border-b border-white/5 pb-10">
            <div className="flex items-center gap-8">
              <div className="bg-primary/20 p-6 rounded-3xl border border-primary/30 shadow-xl shadow-primary/10">
                <Brain className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic">DesignIQ Advantage</h3>
                <p className="text-gray-500 font-black text-[9px] uppercase tracking-[0.4em] flex items-center gap-3">
                   <ShieldCheck className="w-4 h-4 text-primary" /> AI-Powered Engineering Intelligence
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
               {[
                 { icon: <Cpu className="w-4 h-4" />, label: 'PointNet++ v4.2' },
                 { icon: <Code2 className="w-4 h-4" />, label: 'PyTorch Backend' }
               ].map((tag, i) => (
                 <div key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-4 hover:border-primary/40 transition-colors group">
                    <div className="text-primary group-hover:scale-110 transition-transform">{tag.icon}</div>
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{tag.label}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {advantages.map((item, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-primary w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h5 className="font-black text-white uppercase italic tracking-tighter text-lg group-hover:text-primary transition-colors">{item.title}</h5>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16 mt-16 border-t border-white/5">
            {[
              { val: '94.9%', label: 'MODEL ACCURACY' },
              { val: '3', label: 'DOMAINS COVERED' },
              { val: '340ms', label: 'INFERENCE TIME' },
              { val: 'Free', label: 'FOR STUDENTS' },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2 group">
                <span className="text-3xl font-black text-white italic tracking-tighter group-hover:text-primary transition-colors">{stat.val}</span>
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Competitors;
