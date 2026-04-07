import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Send, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, Phone, Lock, Globe, Zap, Terminal, Activity, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
  const [form, setForm] = useState({ name: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-inner placeholder:text-gray-700 font-medium text-sm";

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    
    setIsSending(true);
    
    // Internal Processing Simulation
    setTimeout(() => {
      const waNumber = "916300881046";
      const text = encodeURIComponent(`*DesignIQ Neural Inquiry*\n\n*Operator:* ${form.name}\n\n*Message:* ${form.message}\n\n_Sent via DesignIQ Internal Gateway_`);
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;
      
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.click();

      setIsSending(false);
      setIsSent(true);
      setForm({ name: '', message: '' });
    }, 2500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full pt-20 pb-40 font-outfit">
      
      {/* Secure Uplink Status Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-12 flex items-center justify-between px-8 py-3 bg-black/40 border border-white/5 rounded-full backdrop-blur-xl"
      >
         <div className="flex items-center gap-4">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Secure Uplink Status: <span className="text-emerald-500">OPTIMAL</span></span>
         </div>
         <div className="hidden md:flex items-center gap-4">
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Encrypted Node: NF-GATEWAY-01</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
         </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 text-left lg:text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black neon-text mb-4 uppercase tracking-tight italic drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          Contact Protocol
        </h2>
        <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black italic">Bypassing Traditional Communication Layers...</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        
        {/* Encrypted Form Shell */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-7"
        >
          <div className="glass-panel p-12 relative overflow-hidden group border-white/5 hover:border-primary/20 transition-colors shadow-2xl min-h-[550px] flex flex-col justify-center backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-5 mb-12">
                    <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:rotate-6 transition-transform">
                      <Lock className="text-emerald-500 w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Initialize Payload</h3>
                      <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black italic">Security Standard: AES-GCM-256-BIT</p>
                    </div>
                  </div>

                  <form className="space-y-10" onSubmit={handleWhatsAppSend}>
                    <div className="group/field">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 group-focus-within/field:text-primary transition-colors">Operator Identification</label>
                      <input 
                        required
                        type="text" 
                        className={inputClass} 
                        placeholder="DESIGN_LEAD_ALPHA" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>
                    <div className="group/field">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 group-focus-within/field:text-primary transition-colors">Technical Query Stream</label>
                      <textarea 
                        required
                        rows="6" 
                        className={inputClass} 
                        placeholder="Detail the 27-way matrix constraint or engineering bottleneck..." 
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`glass-button w-full shadow-[0_0_40px_rgba(99,102,241,0.3)] flex items-center justify-center gap-6 py-6 uppercase tracking-[0.4em] font-black text-[12px] relative overflow-hidden group ${
                        isSending ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-6 h-6 animate-spin text-white" />
                          CRYPTOGRAPHIC_BONDING...
                        </>
                      ) : (
                        <>
                          Send Encrypted Packet
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
                    className="w-40 h-40 bg-emerald-500/10 rounded-full flex items-center justify-center mb-10 border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.2)] relative"
                  >
                     <motion.div 
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} 
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-0 bg-emerald-500/5 rounded-full" 
                     />
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 relative z-10" />
                  </motion.div>
                  
                  <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-6">Uplink Success</h3>
                  <div className="h-1 w-32 bg-primary/20 mx-auto mb-10 rounded-full" />
                  
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-8 mb-12 w-full max-w-sm">
                     <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mb-6 text-center italic">Transmission Acknowledgement</p>
                     <div className="space-y-4 text-left">
                        <div className="flex justify-between text-[11px] font-bold">
                           <span className="text-gray-500 uppercase tracking-widest">Confirmation:</span>
                           <span className="text-primary italic tracking-widest">NF-SEC-{Math.floor(Math.random()*90000)+10000}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold">
                           <span className="text-gray-500 uppercase tracking-widest">Priority:</span>
                           <span className="text-accent italic tracking-widest uppercase italic font-black">Level 1</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold border-t border-white/5 pt-4 mt-4">
                           <span className="text-gray-500 uppercase tracking-widest">Node Status:</span>
                           <span className="text-emerald-500 italic tracking-widest uppercase italic font-black">Relayed</span>
                        </div>
                     </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSent(false)}
                    className="px-16 py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.6em] text-gray-500 hover:text-white transition-all"
                  >
                    Close Secure Bridge
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Technical Support Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-5 space-y-12"
        >
          <div className="glass-panel p-10 group border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
             <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-50" />
             
            <div className="flex items-center gap-6 mb-12 relative z-10">
              <div className="p-5 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Technical Command</h4>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest italic">L1 Support Architecture</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium italic relative z-10 border-l-4 border-primary/20 pl-8">
              "We utilize an asynchronous neural gateway to bridge mission-critical design inquiries directly to our specialist orchestration nodes."
            </p>
            
            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl relative z-10 overflow-hidden group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4 text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-6 animate-pulse">
                <Terminal className="w-4 h-4" /> Network Pulse
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Latent Logic</span>
                   <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest animate-pulse">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                   <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Gateway Latency</span>
                   <span className="text-[10px] text-white font-black uppercase tracking-widest">0.02ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Node */}
          <div className="glass-panel p-12 text-center flex flex-col items-center border-accent/20 hover:border-accent/50 transition-all duration-700 group relative overflow-hidden backdrop-blur-3xl">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Globe className="w-32 h-32 text-accent" />
            </div>
            <motion.div 
               animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="mb-10 p-8 bg-accent/5 rounded-full border border-accent/10 shadow-inner"
            >
              <Zap className="w-16 h-16 text-accent drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">Knowledge Matrix</h3>
            <p className="text-xs text-gray-500 mb-12 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xs mx-auto">Access the decentralized documentation hub for AetherForm architecture.</p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(245,158,11,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-6 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[11px] flex items-center justify-center gap-4 group"
            >
              Enter Hub Protocol <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
