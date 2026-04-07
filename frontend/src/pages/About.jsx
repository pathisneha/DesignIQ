import React from 'react';
import { Users, Calendar, Award, Shield, Target, Zap, Rocket, ChevronRight, HelpCircle, Settings, BarChart3, Info, Globe, Cpu, Network, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Assets
import DfmProblem from '../assets/dfm_problem.png';
import NeuralLogic from '../assets/neural_logic.png';
import Optimization from '../assets/optimization.png';

function About() {
  const roadmap = [
    { label: 'Round 1 Submission', date: 'March 25 - April 8', status: 'In Evolution', desc: 'Deploy the Neuro-Symbolic 27-way Engine and core dashboard.' },
    { label: 'Model Refinement', date: 'April 10 - April 15', status: 'Upcoming', desc: 'Expand the Neural Persistence memory to handle complex assemblies.' },
    { label: 'The Finale', date: 'April 25 - 26', status: 'Endgame', desc: 'Final pitch & 1:1 demo with industry mentors.' },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-32 pb-40 font-outfit">
      
      {/* High-Fidelity Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-4">
           <Globe className="w-4 h-4 text-primary animate-spin-slow" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-light">Strategic Documentation // v3.0</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight italic">DesignIQ <br /><span className="neon-text">Mission Protocol</span></h2>
        <p className="text-gray-500 max-w-3xl font-medium mt-6 mx-auto leading-relaxed border-y border-white/5 py-8 italic text-md">
          "DesignIQ bridges the intuition gap between design and manufacturing. Our mission is to democratize high-fidelity DFM expertise through neural orchestration."
        </p>
      </motion.div>

      {/* WH-Question 1: WHAT */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative"
      >
        <div className="absolute -left-20 top-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="order-2 lg:order-1 relative group">
           <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
           <div className="relative p-2 bg-[#0F1225] border-4 border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
              <img src={DfmProblem} alt="Design Gap" className="relative z-10 w-full rounded-[2.5rem] grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000" />
           </div>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
           <div className="flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.4em]">
              <Target className="w-6 h-6" /> The Design Gap
           </div>
           <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">What is the Vision?</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
             Modern CAD allows for perfect geometry, but lacks <span className="text-white font-bold">Physical Awareness</span>. DesignIQ acts as a digital twin of the factory floor, detecting flaws in milliseconds that would otherwise take hours of manual review.
           </p>
           <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl group hover:border-primary/40 transition-colors">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">Central Constraint</span>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">Automating the heuristic knowledge of Teir-1 Manufacturing Specialists into a scalable Design Orchestrator.</p>
           </div>
        </div>
      </motion.section>

      {/* WH-Question 2: HOW */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        <div className="space-y-8 text-left lg:text-right flex flex-col items-start lg:items-end">
           <div className="flex items-center gap-4 text-accent font-black text-xs uppercase tracking-[0.4em] flex-row lg:flex-row-reverse">
              <Settings className="w-6 h-6" /> Technical Core
           </div>
           <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">How is it built?</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic border-r-4 border-accent/20 pr-10 text-right">
             We utilize a <span className="text-white font-bold italic">Neuro-Symbolic Architecture</span>. While our neural persistence memory identifies design patterns, our Symbolic Rule Engine enforces 27 primary industrial constraints with 100% mathematical precision.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4">
              <div className="p-6 bg-black/40 border border-white/5 rounded-[2rem] hover:border-accent/40 transition-all group">
                 <Cpu className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black text-white uppercase tracking-tight text-sm mb-1 italic">Rule Synthesis</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">27-way cross-domain matrix enforcement.</p>
              </div>
              <div className="p-6 bg-black/40 border border-white/5 rounded-[2rem] hover:border-accent/40 transition-all group">
                 <Network className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black text-white uppercase tracking-tight text-sm mb-1 italic">Neural State</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Persistent design-wave recognition layers.</p>
              </div>
           </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
           <div className="relative p-2 bg-[#0F1225] border-4 border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
              <img src={NeuralLogic} alt="Stack Implementation" className="relative z-10 w-full rounded-[2.5rem] shadow-2xl" />
           </div>
        </div>
      </motion.section>

      {/* WH-Question 3: WHY & USES */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative"
      >
        <div className="absolute -right-20 top-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="order-2 lg:order-1 relative group">
           <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
           <div className="relative p-2 bg-[#0F1225] border-4 border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
              <img src={Optimization} alt="Strategic Impact" className="relative z-10 w-full rounded-[2.5rem] shadow-2xl grayscale-[30%] hover:grayscale-0 transition-all duration-1000" />
           </div>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
           <div className="flex items-center gap-4 text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">
              <Rocket className="w-6 h-6" /> The Impact Delta
           </div>
           <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">Why DesignIQ?</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
             DesignIQ isn't just about finding errors; it's about <span className="text-white font-black italic underline decoration-primary">Design Assurance</span>. By bridging the gap between student innovation and industrial reality, we empower designers to build with confidence.
           </p>
           <div className="space-y-6">
              {[
                { title: 'Student Competitions', desc: 'Secure an edge in hackathons and formula-student events with validated engineering precision.' },
                { title: 'Rapid Prototyping', desc: 'Accelerate the design-to-build ratio by eliminating iteration-cycles through automated DFM.' }
              ].map((use, i) => (
                <div key={i} className="flex gap-4 items-start border-l-2 border-white/5 pl-6 hover:border-primary/40 transition-colors">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                   <div>
                      <h4 className="text-white font-black uppercase text-sm italic">{use.title}</h4>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{use.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </motion.section>

      {/* Strategic Hub (Roadmap & Team) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-20">
         
         {/* Team Technical Node */}
         <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 space-y-10">
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic border-b border-white/5 pb-6">Technical Operators</h4>
            <div className="space-y-4">
               {[
                 { name: 'MAYAKUNTLA LAKSHMI VIJAYA', role: 'Team Lead', id: 'NODE_01' },
                 { name: 'SNEHA PATHI', role: 'Team Member', id: 'NODE_02' },
                 { name: 'BANALA MANASA', role: 'Team Member', id: 'NODE_03' }
               ].map((member, i) => (
                 <div key={i} className="glass-panel p-6 border border-white/5 group hover:border-primary/40 transition-all relative overflow-hidden backdrop-blur-3xl">
                    <div className="absolute top-0 right-0 p-3 text-[9px] font-black text-gray-700 tracking-widest">{member.id}</div>
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black animate-pulse shadow-inner">
                          {member.name[0]}
                       </div>
                       <div>
                          <h5 className="font-black text-white uppercase italic tracking-tighter text-lg">{member.name}</h5>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{member.role}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/20 relative overflow-hidden group">
               <ShieldCheck className="absolute top-4 right-4 w-12 h-12 text-primary opacity-10 group-hover:opacity-20 transition-opacity" />
               <h5 className="font-black text-white uppercase italic tracking-widest text-sm mb-4">Integrity Guarantee</h5>
               <p className="text-[11px] text-gray-400 leading-relaxed font-bold uppercase tracking-widest">
                  "Every design processed through the DesignIQ pipeline is audited against Tier-1 industrial safety and manufacturing standards."
               </p>
            </div>
         </motion.div>

         {/* Strategic Roadmap */}
         <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7">
            <div className="glass-panel p-10 border border-white/5 h-full relative overflow-hidden backdrop-blur-3xl">
               <div className="flex items-center justify-between mb-12">
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">Strategic Roadmap</h4>
               </div>

               <div className="space-y-12 relative">
                  <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-primary via-accent to-transparent opacity-20" />
                  {roadmap.map((item, i) => (
                    <div key={i} className="relative pl-20 group">
                       <div className="absolute left-4 top-2 w-4 h-4 bg-black border-2 border-primary rounded-full z-10 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                       <div className="space-y-2">
                          <div className="flex items-center gap-4">
                             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item.date}</span>
                             <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] px-3 py-1 bg-primary/10 rounded-full border border-primary/20">{item.status}</span>
                          </div>
                          <h5 className="text-2xl font-black text-white uppercase italic tracking-tight">{item.label}</h5>
                          <p className="text-gray-500 font-medium italic text-sm max-w-md">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </motion.div>

      </div>
      
    </div>
  );
}

export default About;
