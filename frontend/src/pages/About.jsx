import React from 'react';
import { Users, Calendar, Award, Shield, Target, Zap, Rocket, ChevronRight, Settings, BarChart3, Info, Globe, Cpu, Network, ShieldCheck, Brain, Layers, Database, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Assets
import DfmProblem from '../assets/dfm_problem.png';
import NeuralLogic from '../assets/neural_logic.png';
import Optimization from '../assets/optimization.png';

function About() {
  const roadmap = [
    { label: 'Round 1 Submission', date: 'March 25 - April 8', status: 'In Evolution', desc: 'Deploy the 3-domain AI engine with Mechanical, Aerospace, and 3D Additive validation.' },
    { label: 'Model Refinement', date: 'April 10 - April 15', status: 'Upcoming', desc: 'Expand PointNet++ training to handle complex multi-part assemblies and nested geometries.' },
    { label: 'The Finale', date: 'April 25 - 26', status: 'Endgame', desc: 'Final pitch & 1:1 demo with industry mentors and manufacturing engineers.' },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const datasets = [
    { name: 'ShapeNet', samples: '51,300', source: 'Stanford 3D Repository' },
    { name: 'ModelNet40', samples: '12,311', source: 'Princeton Shape Benchmark' },
    { name: 'Thingi10K', samples: '10,000', source: 'Thingiverse Curated Collection' },
    { name: 'Fusion 360 Gallery', samples: '8,600', source: 'Autodesk Public Gallery' },
    { name: 'NASA 3D Models', samples: '480', source: 'NASA 3D Resources' },
    { name: 'ABC Dataset', samples: '1,000,000', source: 'NYU Big CAD Dataset' },
    { name: 'GrabCAD', samples: '15,000', source: 'GrabCAD Engineering Library' },
    { name: 'TraceParts CAD', samples: '22,000', source: 'TraceParts Components' },
    { name: '3D ContentCentral', samples: '18,000', source: 'Dassault Systèmes' },
    { name: 'PartNet', samples: '26,671', source: 'Stanford Part Segmentation' },
    { name: 'FEA Simulation Data', samples: '5,200', source: 'Internal Stress/Strain Maps' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-32 pb-40 font-outfit">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-4">
           <Globe className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">About DesignIQ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight italic">AI Engineering <br /><span className="neon-text">Design Validation</span></h2>
        <p className="text-gray-500 max-w-3xl font-medium mt-6 mx-auto leading-relaxed border-y border-white/5 py-8 italic text-md">
          DesignIQ bridges the gap between CAD design and manufacturing reality. Our AI platform validates designs against real-world DFM constraints, providing actionable optimization insights for Mechanical, Aerospace, and 3D Additive manufacturing.
        </p>
      </motion.div>

      {/* WHAT — The Vision */}
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
              <img src={DfmProblem} alt="Design Validation Gap" className="relative z-10 w-full rounded-[2.5rem] grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000" />
           </div>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
           <div className="flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.4em]">
              <Target className="w-6 h-6" /> The Problem
           </div>
           <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">What is DesignIQ?</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
             Modern CAD tools create perfect geometry but lack <span className="text-white font-bold">manufacturing awareness</span>. Designers create parts that look great on screen but fail in production — costing time, money, and materials.
           </p>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
             DesignIQ is an AI-powered validation engine that acts as a digital manufacturing advisor, detecting DFM violations in seconds that would take experienced engineers hours to find.
           </p>
           <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl group hover:border-primary/40 transition-colors">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">Core Mission</span>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">Democratize expert-level DFM validation through AI — making manufacturing knowledge accessible to every designer, student, and engineer.</p>
           </div>
        </div>
      </motion.section>

      {/* HOW — Architecture */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        <div className="space-y-8 text-left lg:text-right flex flex-col items-start lg:items-end">
           <div className="flex items-center gap-4 text-accent font-black text-xs uppercase tracking-[0.4em] flex-row lg:flex-row-reverse">
              <Settings className="w-6 h-6" /> AI Architecture
           </div>
           <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">How is it Built?</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic border-r-4 border-accent/20 pr-10 text-right">
             DesignIQ uses a <span className="text-white font-bold italic">PointNet++ architecture</span> combined with a domain-specific DFM Rule Engine. The model extracts geometric features from CAD data, then applies manufacturing constraints to identify violations and suggest optimizations.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4">
              <div className="p-6 bg-black/40 border border-white/5 rounded-[2rem] hover:border-accent/40 transition-all group">
                 <Cpu className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black text-white uppercase tracking-tight text-sm mb-1 italic">Feature Extraction</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">CNN / PointNet++ processes CAD geometry into 128-dim feature vectors.</p>
              </div>
              <div className="p-6 bg-black/40 border border-white/5 rounded-[2rem] hover:border-accent/40 transition-all group">
                 <Network className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black text-white uppercase tracking-tight text-sm mb-1 italic">Rule Engine</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Domain-specific DFM rules validated across 3 domains × 12 processes.</p>
              </div>
           </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
           <div className="relative p-2 bg-[#0F1225] border-4 border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
              <img src={NeuralLogic} alt="AI Architecture" className="relative z-10 w-full rounded-[2.5rem] shadow-2xl" />
           </div>
        </div>
      </motion.section>

      {/* AI Model Pipeline */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-4 text-primary font-black text-[12px] uppercase tracking-[0.4em]">
            <Brain className="w-6 h-6" /> AI Pipeline
          </div>
          <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Model Architecture</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {[
            { title: 'Input', desc: 'CAD / STL / Image Upload', icon: <Layers className="w-6 h-6" />, color: 'primary' },
            { title: 'Feature Extraction', desc: 'CNN + PointNet++ (128-dim)', icon: <Cpu className="w-6 h-6" />, color: 'primary' },
            { title: 'Domain Logic', desc: 'Mechanical / Aerospace / 3D', icon: <Globe className="w-6 h-6" />, color: 'accent' },
            { title: 'Rule Engine', desc: 'DFM Constraint Validation', icon: <ShieldCheck className="w-6 h-6" />, color: 'accent' },
            { title: 'Output', desc: 'Score + Suggestions + Report', icon: <BarChart3 className="w-6 h-6" />, color: 'emerald-500' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="glass-panel p-6 flex-1 text-center hover:border-primary/30 transition-all group">
                <div className={`p-3 bg-${step.color}/10 rounded-xl border border-${step.color}/20 text-${step.color} mx-auto w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h4 className="text-sm font-black text-white uppercase italic tracking-tight mb-1">{step.title}</h4>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{step.desc}</p>
              </div>
              {i < 4 && <ArrowRight className="w-5 h-5 text-gray-700 hidden md:block shrink-0" />}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Neural Learning */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative"
      >
        <div className="order-2 lg:order-1 relative group">
           <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
           <div className="relative p-2 bg-[#0F1225] border-4 border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
              <img src={Optimization} alt="Neural Learning" className="relative z-10 w-full rounded-[2.5rem] shadow-2xl grayscale-[30%] hover:grayscale-0 transition-all duration-1000" />
           </div>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
           <div className="flex items-center gap-4 text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">
              <Rocket className="w-6 h-6" /> Neural Learning
           </div>
           <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">How it Learns</h3>
           <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
             DesignIQ implements three learning paradigms to continuously improve accuracy:
           </p>
           <div className="space-y-6">
              {[
                { title: 'Online Learning', desc: 'Model updates weights in real-time as new designs are analyzed. Each scan contributes to the knowledge base.' },
                { title: 'Incremental Learning', desc: 'Periodic batch retraining on accumulated user data. New manufacturing rules are integrated without forgetting old ones.' },
                { title: 'Feedback Learning', desc: 'Users can flag false positives or suggest corrections. Each feedback event adjusts rule confidence weights.' },
              ].map((method, i) => (
                <div key={i} className="flex gap-4 items-start border-l-2 border-white/5 pl-6 hover:border-emerald-500/40 transition-colors">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                   <div>
                      <h4 className="text-white font-black uppercase text-sm italic">{method.title}</h4>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">{method.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </motion.section>

      {/* Training Datasets */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-4 text-accent font-black text-[12px] uppercase tracking-[0.4em]">
            <Database className="w-6 h-6" /> Training Data
          </div>
          <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">1.17M+ CAD Samples</h3>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium italic">Trained on the largest collection of CAD engineering datasets available.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((ds, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-5 flex items-center gap-4 group hover:border-primary/30 transition-all"
            >
              <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-primary">
                <Database className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{ds.name}</h4>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{ds.source}</p>
              </div>
              <span className="text-sm font-black text-primary">{ds.samples}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-20">
         
         {/* Team */}
         <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 space-y-10">
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic border-b border-white/5 pb-6">Team Members</h4>
            <div className="space-y-4">
               {[
                 { name: 'MAYAKUNTLA LAKSHMI VIJAYA', role: 'Team Lead', id: 'NODE_01' },
                 { name: 'SNEHA PATHI', role: 'Team Member', id: 'NODE_02' },
                 { name: 'BANALA MANASA', role: 'Team Member', id: 'NODE_03' }
               ].map((member, i) => (
                 <div key={i} className="glass-panel p-6 border border-white/5 group hover:border-primary/40 transition-all relative overflow-hidden backdrop-blur-3xl">
                    <div className="absolute top-0 right-0 p-3 text-[9px] font-black text-gray-700 tracking-widest">{member.id}</div>
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black shadow-inner">
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
               <h5 className="font-black text-white uppercase italic tracking-widest text-sm mb-4">Model Accuracy</h5>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Mechanical', val: '94.3%' },
                   { label: 'Aerospace', val: '96.7%' },
                   { label: 'Additive', val: '93.8%' },
                   { label: 'Overall', val: '94.9%' },
                 ].map((a, i) => (
                   <div key={i} className="text-center">
                     <span className="text-2xl font-black text-white">{a.val}</span>
                     <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mt-1">{a.label}</p>
                   </div>
                 ))}
               </div>
            </div>
         </motion.div>

         {/* Roadmap */}
         <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7">
            <div className="glass-panel p-10 border border-white/5 h-full relative overflow-hidden backdrop-blur-3xl">
               <div className="flex items-center justify-between mb-12">
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">Development Roadmap</h4>
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
