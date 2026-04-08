import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Send, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, Lock, Globe, Zap, Terminal, Activity, ShieldAlert, Mail, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-inner placeholder:text-gray-700 font-medium text-sm";

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    
    setIsSending(true);
    setIsError(false);
    
    // Simulate backend processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const waNumber = "916300881046";
      const text = encodeURIComponent(`*DesignIQ Contact*\n\n*Name:* ${form.name}\n*Email:* ${form.email || 'Not provided'}\n\n*Message:* ${form.message}\n\n_Sent via DesignIQ Platform_`);
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;
      
      // Attempt to open WhatsApp
      const newWin = window.open(waUrl, '_blank');
      
      // If the browser popup blocker catches it (because it was deferred by setTimeout)
      // newWin will be null. We catch this and show the error state.
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        setIsError(true);
      } else {
        setIsSent(true);
        setForm({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full pt-20 pb-40 font-outfit">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16 text-left lg:text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-6">
           <MessageCircle className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Get in Touch</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight italic">
          Contact Us
        </h2>
        <p className="text-gray-500 text-lg font-medium italic max-w-xl mx-auto">
          Have questions about DesignIQ? Want to collaborate or provide feedback? We'd love to hear from you.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-7"
        >
          <div className="glass-panel p-12 relative overflow-hidden group border-white/5 hover:border-primary/20 transition-colors shadow-2xl min-h-[500px] flex flex-col justify-center backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!isSent && !isError ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner group-hover:scale-105 transition-transform">
                      <Send className="text-primary w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Send a Message</h3>
                      <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <form className="space-y-8" onSubmit={handleSendMessage}>
                    <div className="group/field">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-3 group-focus-within/field:text-primary transition-colors flex items-center gap-2">
                        <User className="w-3 h-3" /> Name
                      </label>
                      <input 
                        required
                        type="text" 
                        className={inputClass} 
                        placeholder="Your name" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>
                    <div className="group/field">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-3 group-focus-within/field:text-primary transition-colors flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Email
                      </label>
                      <input 
                        type="email" 
                        className={inputClass} 
                        placeholder="your@email.com" 
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                      />
                    </div>
                    <div className="group/field">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-3 group-focus-within/field:text-primary transition-colors flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" /> Message
                      </label>
                      <textarea 
                        required
                        rows="5" 
                        className={inputClass} 
                        placeholder="Tell us about your project, question, or feedback..." 
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`glass-button w-full shadow-[0_0_40px_rgba(99,102,241,0.3)] flex items-center justify-center gap-4 py-5 uppercase tracking-[0.3em] font-black text-[12px] relative overflow-hidden group ${
                        isSending ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin text-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : isError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center relative z-10"
                >
                  <motion.div
                     initial={{ scale: 0, rotate: -180 }}
                     animate={{ scale: 1, rotate: 0 }}
                     transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                     className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_60px_rgba(239,68,68,0.2)] relative"
                  >
                     <motion.div 
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} 
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-0 bg-red-500/5 rounded-full" 
                     />
                    <ShieldAlert className="w-16 h-16 text-red-500 relative z-10" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-red-500 uppercase tracking-tighter italic mb-4">Message Not Sent</h3>
                  <p className="text-gray-400 text-sm font-medium mb-8 max-w-sm leading-relaxed">
                    We couldn't connect, or your browser blocked the WhatsApp redirect window. Please ensure your pop-up blocker allows redirects for this site.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsError(false)}
                    className="px-12 py-4 bg-red-500/10 border border-red-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-red-400 hover:text-white hover:bg-red-500/30 hover:border-red-500/60 transition-all font-outfit"
                  >
                    Try Again
                  </motion.button>
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
                    className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.2)] relative"
                  >
                     <motion.div 
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} 
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-0 bg-emerald-500/5 rounded-full" 
                     />
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 relative z-10" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Message Sent!</h3>
                  <p className="text-gray-500 text-sm font-medium italic mb-8 max-w-sm">
                    Your message has been forwarded to our team. We'll get back to you as soon as possible.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSent(false)}
                    className="px-12 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white hover:border-primary/40 transition-all"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-5 space-y-8"
        >
          <div className="glass-panel p-10 group border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
             <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-50" />
             
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Platform Support</h4>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">DesignIQ Engineering Team</p>
              </div>
            </div>
            
            <div className="space-y-6 relative z-10">
              <p className="text-gray-400 text-sm leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                We're a team of engineering students building AI-powered design validation tools. Reach out for collaboration, integration inquiries, or technical support.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { label: 'Response Time', value: '< 24 hours' },
                  { label: 'Support', value: 'WhatsApp + Email' },
                  { label: 'Availability', value: 'Mon - Sat' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{item.label}</span>
                    <span className="text-[11px] text-white font-black uppercase tracking-widest">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-accent/20 hover:border-accent/50 transition-all duration-700 group relative overflow-hidden backdrop-blur-3xl">
            <motion.div 
               animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="mb-6 p-6 bg-accent/5 rounded-full border border-accent/10 shadow-inner"
            >
              <Zap className="w-12 h-12 text-accent drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
            </motion.div>
            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter italic">Quick Start</h3>
            <p className="text-xs text-gray-500 mb-8 font-medium max-w-xs mx-auto">
              Try DesignIQ now — upload a design and get AI-powered validation results in seconds.
            </p>
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 group"
            >
              Go to Dashboard <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
