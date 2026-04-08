import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Layers, Cpu, Database, Activity, Brain, ChevronRight, Settings, BarChart3, Terminal, Upload, Play, BookOpen, Globe, Sparkles, Target } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const features = [
  { icon: <Brain className="w-7 h-7" />, title: 'AI Design Validation', desc: 'PointNet++ powered analysis validates designs against industry DFM standards in seconds.' },
  { icon: <Layers className="w-7 h-7" />, title: 'Domain-Specific Analysis', desc: 'Specialized rules for Mechanical, Aerospace, and 3D Additive domains with unique process parameters.' },
  { icon: <Cpu className="w-7 h-7" />, title: 'Neural Learning', desc: 'The model learns from user feedback through online, incremental, and feedback-driven learning loops.' },
  { icon: <ShieldCheck className="w-7 h-7" />, title: 'Manufacturability Check', desc: 'Validates wall thickness, fillet radii, overhang angles, stress tolerances, and 40+ DFM constraints.' },
  { icon: <Sparkles className="w-7 h-7" />, title: 'Optimization Suggestions', desc: 'AI generates actionable fixes for every issue — geometry changes, process settings, material alternatives.' },
  { icon: <Activity className="w-7 h-7" />, title: 'Real-time Feedback', desc: 'Instant confidence scoring, heatmap visualization, and detailed analysis reports you can download.' },
];

function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0F1225] text-gray-100 font-outfit select-none lg:pt-0">
      <BlueprintGrid />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 pt-32 lg:pt-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 text-left"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl group hover:border-primary/40 transition-all">
              <Zap className="w-5 h-5 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,1)]" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-400 group-hover:text-white transition-colors">
                 DesignIQ // AI Engineering Platform
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight uppercase italic text-white">
                AI Engineering{' '}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]">Design Validation</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-xl font-medium leading-relaxed italic mt-6 border-l-8 border-primary/20 pl-8 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                Upload CAD designs and get AI-powered manufacturability, performance, and optimization insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              <Link to="/dashboard" className="group glass-button w-full sm:w-auto px-12 py-6 rounded-[3rem] text-lg flex items-center justify-center gap-4 relative overflow-hidden transition-all shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                <div className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                <Upload className="w-6 h-6 relative z-10" />
                <span className="relative z-10 uppercase tracking-[0.2em] font-black">Upload Design</span>
              </Link>
              <Link to="/dashboard" className="group w-full sm:w-auto px-10 py-6 rounded-[3rem] border-2 border-white/10 hover:border-accent/40 text-lg flex items-center justify-center gap-4 transition-all hover:bg-white/5">
                <Play className="w-5 h-5 text-accent" />
                <span className="uppercase tracking-[0.2em] font-black text-gray-400 group-hover:text-white transition-colors">Try Demo</span>
              </Link>
              <Link to="/about" className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 hover:text-primary transition-all flex items-center gap-3 group">
                 Learn More <ChevronRight className="group-hover:translate-x-2 transition-transform w-5 h-5 text-primary" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
             <div className="absolute -top-10 -right-10 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
             <div className="relative z-10 p-2 bg-[#0F1225] border-4 border-white/5 rounded-[4rem] shadow-2xl overflow-hidden group max-w-2xl mx-auto">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                <img src={HomeHero} alt="AI Design Validation" className="w-full h-auto rounded-[3.5rem] group-hover:scale-105 transition-transform duration-1000 grayscale-[60%] group-hover:grayscale-0 shadow-2xl" />
                
                <div className="absolute top-12 right-12 flex flex-col items-end gap-3">
                   <div className="px-4 py-2 bg-black/60 border border-white/10 backdrop-blur-xl rounded-full text-[9px] font-black text-primary uppercase tracking-widest">AI_ANALYSIS</div>
                   <div className="px-4 py-2 bg-black/60 border border-white/10 backdrop-blur-xl rounded-full text-[9px] font-black text-accent uppercase tracking-widest">DFM_VALIDATED</div>
                </div>

                <div className="absolute bottom-10 left-10 p-6 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] max-w-xs group-hover:border-primary/50 transition-colors">
                   <div className="flex items-center gap-3 mb-3">
                      <Terminal className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">AI Engine Log</span>
                   </div>
                   <p className="text-[9px] text-gray-500 font-bold uppercase leading-loose tracking-[0.1em]">PointNet++ v4.2 | 3 Domains | 12 Processes | 1.17M Training Samples | 94.9% Accuracy</p>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 relative bg-black/40">
        <BlueprintGrid />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-4 text-primary font-black text-[12px] uppercase tracking-[0.4em]">
               <Settings className="w-6 h-6" /> Platform Capabilities
            </div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Intelligent Design Analysis</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium italic">
              Six core capabilities that make DesignIQ the most comprehensive AI-driven validation platform for engineers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                {...fadeUp(i * 0.1)}
                className="glass-panel p-8 group hover:border-primary/30 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tight mb-3">{feat.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Showcase */}
      <section className="py-24 px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          
          <motion.div {...fadeUp()} className="space-y-10">
            <div className="flex items-center gap-4 text-accent font-black text-[12px] uppercase tracking-[0.4em]">
               <Globe className="w-6 h-6" /> Three Engineering Domains
            </div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Domain-Specific Intelligence</h2>
            <p className="text-lg text-gray-400 font-medium leading-relaxed italic border-l-4 border-accent/20 pl-8">
              Each domain operates with its own process matrix, material library, and rule engine — delivering validation that matches real-world manufacturing constraints.
            </p>
            <div className="space-y-6">
               {[
                 { title: 'Mechanical Engineering', desc: 'CNC, Injection Molding, Sheet Metal, Casting • 4 materials • Wall thickness, fillets, draft angles', color: 'primary' },
                 { title: 'Aerospace Engineering', desc: 'CNC Precision, Composites, Metal AM • 4 materials • Weight, stress, fatigue, safety factor', color: 'accent' },
                 { title: '3D Design / Additive', desc: 'FDM, SLA, SLS, Metal 3D Printing • 4 materials • Overhangs, supports, orientation, layers', color: 'emerald-500' },
               ].map((d, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                    <div className={`w-2 h-2 rounded-full bg-${d.color} mt-2 group-hover:scale-150 transition-transform`} />
                    <div>
                       <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1 italic">{d.title}</h4>
                       <p className="text-xs text-gray-500 font-bold leading-relaxed">{d.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-8">
             <div className="relative rounded-[3rem] overflow-hidden border border-white/5 group shadow-2xl">
                <img src={HomeManufacturing} alt="Engineering Analysis" className="w-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1225] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-8 left-8 text-left">
                   <h4 className="text-2xl font-black text-white italic uppercase tracking-widest">Manufacturing Validation</h4>
                </div>
             </div>
          </motion.div>

        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-8 relative bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
           
           <motion.div {...fadeUp()} className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all" />
              <img src={HomeAutomotive} alt="Design Analysis" className="relative z-10 w-full max-w-2xl mx-auto rounded-[4rem] border-4 border-white/5 grayscale-[50%] hover:grayscale-0 transition-colors shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 p-8 bg-[#0F1225]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] items-start hidden md:flex flex-col gap-3">
                 <Activity className="w-8 h-8 text-primary" />
                 <h4 className="text-lg font-black text-white uppercase tracking-tighter italic">AI Engine</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[160px]">PointNet++ Trained on 1.17M CAD samples.</p>
              </div>
           </motion.div>

           <motion.div {...fadeUp(0.1)} className="lg:w-1/2 space-y-10 text-left">
             <div className="flex items-center gap-4 text-primary font-black text-[12px] uppercase tracking-[0.4em]">
                <BarChart3 className="w-6 h-6" /> Performance Metrics
             </div>
             <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Validated Performance</h2>
             <p className="text-lg text-gray-400 font-medium leading-relaxed italic border-l-4 border-primary/20 pl-8">
                Trained on over 1.17 million CAD models from ShapeNet, ModelNet40, Thingi10K, Fusion 360 Gallery, NASA datasets, and more.
             </p>
             <div className="grid grid-cols-2 gap-8">
               {[
                 { val: '94.9%', label: 'MODEL ACCURACY' },
                 { val: '1.17M', label: 'TRAINING SAMPLES' },
                 { val: '340ms', label: 'INFERENCE TIME' },
                 { val: '12', label: 'PROCESSES COVERED' },
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

      {/* CTA Footer */}
      <section className="py-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
         <motion.div {...fadeUp()} className="max-w-4xl mx-auto px-8 space-y-10 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
               Start Validating <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Designs Today</span>
            </h2>
            <p className="text-lg text-gray-500 italic font-medium max-w-xl mx-auto">
              Upload a CAD model and get AI-powered manufacturability insights in seconds.
            </p>
            <Link to="/dashboard" className="glass-button px-20 py-8 rounded-[3rem] text-xl uppercase tracking-[0.3em] font-black inline-flex items-center gap-6 shadow-[0_0_80px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform">
               Upload Design <ArrowRight className="w-8 h-8" />
            </Link>
         </motion.div>
      </section>
      
    </div>
  );
}

export default Home;
