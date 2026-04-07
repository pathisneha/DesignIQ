import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileBox, RefreshCw, Layers, Wrench, ShieldAlert, CheckCircle2, TrendingUp, Grid, Image as ImageIcon, Box, ArrowRight, Download, Zap, BrainCircuit, History, Printer, FileText, Terminal, Activity, Search, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/validate";

const NeuralTerminal = ({ logs }) => (
  <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 h-[200px] overflow-hidden font-mono text-[10px] space-y-2 relative group hover:border-primary/30 transition-colors">
    <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
       <Terminal className="w-3 h-3 text-primary" />
       <span className="text-gray-500 uppercase tracking-widest font-black">Neural Thinking Stream</span>
       <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
    </div>
    <div className="space-y-1 opacity-60">
       {logs.map((log, i) => (
         <div key={i} className="flex gap-2">
            <span className="text-primary/50">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
            <span className="text-gray-300">{log}</span>
         </div>
       ))}
       <motion.div 
         animate={{ opacity: [0.2, 1, 0.2] }}
         transition={{ repeat: Infinity, duration: 1 }}
         className="text-primary"
       >
         _AWAITING_INPUT...
       </motion.div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
  </div>
);

const HologramEmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center py-20 relative group">
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Dynamic Pulsing Rings */}
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute inset-0 border border-primary/40 rounded-full"
      />
      <motion.div 
        animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.05, 0.2, 0.05] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-4 border border-accent/30 rounded-full"
      />
      
      {/* 3D Wireframe Simulation (SVG) */}
      <svg width="200" height="200" viewBox="0 0 100 100" className="relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
        <motion.path
          d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.5"
          animate={{ strokeDashoffset: [100, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          strokeDasharray="100"
        />
        <motion.path
          d="M50 10 L50 90 M10 30 L90 30 M10 70 L90 70 M10 30 L50 50 L90 30 M10 70 L50 50 L90 70"
          fill="none"
          stroke="rgba(99,102,241,0.2)"
          strokeWidth="0.3"
        />
         <circle cx="50" cy="50" r="1.5" fill="#f59e0b" className="animate-pulse" />
      </svg>
      
      {/* Scanning Line */}
      <motion.div 
        animate={{ top: ['20%', '80%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-x-10 h-[1px] bg-primary/80 blur-[2px] shadow-[0_0_15px_rgba(99,102,241,1)] z-20"
      />
    </div>
    
    <div className="mt-8 text-center">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Initialize DFM Stream</h3>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed">
        Upload your CAD assembly or design captures to initiate the Neuro-Symbolic validation sequence.
      </p>
    </div>
  </div>
);

function Dashboard() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [process, setProcess] = useState('Injection Molding');
  const [material, setMaterial] = useState('Aluminum');
  const [domain, setDomain] = useState('Mechanical');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [reportImage, setReportImage] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState(["BOOTLOADER_READY", "ORCHESTRATOR_IDLE"]);

  const canvasRef = useRef(null);

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setReportImage(null);
    setTerminalLogs(["UPLINK_ESTABLISHED", `PAYLOAD: ${selectedFile.name.toUpperCase()}`, "INITIATING_SCAN..."]);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);
    setTerminalLogs(prev => [...prev, "SYNCING_PROCESS_MATRIX", "LOAD_27_WAY_CONSTRAINTS", "EXECUTING_NEURAL_AUDIT..."]);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('process', process);
      formData.append('material', material);
      formData.append('domain', domain);
      
      const response = await fetch(API_URL, { method: 'POST', body: formData });
      const data = await response.json();
      
      if (data.filetype.startsWith('image/')) {
        generateFixedImage(data);
      }

      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
        const finalLogs = [
          `ACCURACY_THRESHOLD: ${data.score}%`,
          data.ai_insight ? `INSIGHT: ${data.ai_insight}` : "GENERAL_OPTIMIZATION_COMPLETE",
          "AUDIT_SUCCESSFUL",
          "REPORT_GENERATED"
        ];
        setTerminalLogs(prev => [...prev, ...finalLogs]);
      }, 2000);
    } catch (err) {
      console.error("DesignIQ Analysis Error:", err);
      setIsAnalyzing(false);
      setTerminalLogs(prev => [...prev, "!!_ERROR_DETECTED_!!", "CONNECTION_FAILED_OR_TIMEOUT"]);
      alert("Neural Audit Failed: Ensure the backend engine is active at http://localhost:8000");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const generateFixedImage = (data) => {
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 0.2; ctx.fillStyle = '#6366f1'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
      data.errors.forEach((error, idx) => {
        const severityColor = error.severity === 'Critical' ? '#ff4d4d' : '#f59e0b';
        ctx.strokeStyle = severityColor; ctx.lineWidth = canvas.width * 0.008;
        const seedX = (idx * 0.3) % 0.8 + 0.1; const seedY = (idx * 0.25) % 0.8 + 0.1;
        const x = canvas.width * seedX; const y = canvas.height * seedY;
        const radius = canvas.width * (error.severity === 'Critical' ? 0.06 : 0.04);
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 0.25; ctx.fillStyle = severityColor; ctx.fill(); ctx.globalAlpha = 1.0;
      });
      setReportImage(canvas.toDataURL('image/png'));
    };
  };

  return (
    <div className="p-8 max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:p-0 font-outfit">
      
      <canvas ref={canvasRef} className="hidden" />

      {/* Professional PDF Report (Print Only) */}
      <div className="hidden print:block relative bg-white text-black p-12 h-auto font-serif">
         {/* ... (Existing Report Header) ... */}
         <div className="border-b-4 border-indigo-900 pb-6 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-indigo-900 uppercase tracking-tighter">DesignIQ Design Report</h1>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Neuro-Symbolic DFM Validation Intelligence</p>
            </div>
            <div className="text-right">
               <p className="text-xs font-bold uppercase text-gray-400">Node ID: NF-INTERNAL-6300</p>
            </div>
         </div>
         {/* ... (Rest of Print Content) ... */}
         <div className="space-y-6">
            <h3 className="text-lg font-black uppercase underline">Neural Scan Score: {result?.score}/100</h3>
            {reportImage && <img src={reportImage} className="w-full max-h-[500px] object-contain rounded-xl border" />}
            <div className="page-break-after" />
            <h3 className="text-lg font-black uppercase mt-12">Audit Findings</h3>
            {result?.errors.map((e, idx) => (
              <div key={idx} className="mb-8 border-l-4 border-black pl-4">
                 <p className="font-bold text-xl uppercase">{e.rule}</p>
                 <p className="italic text-gray-600 mb-2">{e.message}</p>
              </div>
            ))}
         </div>
      </div>

      {/* Dashboard UI */}
      <div className="lg:col-span-4 space-y-6 print:hidden h-full">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Search className="w-32 h-32 text-primary" />
           </div>
          <h2 className="text-sm font-black mb-6 flex items-center gap-3 text-white uppercase tracking-[0.4em]">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Secure Node Terminal
          </h2>
          
          <label onDragOver={handleDragOver} onDrop={handleDrop} className={`border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${file ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-primary/40 hover:bg-white/[0.02]'}`}>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div key="selected" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    <FileBox className="text-primary w-8 h-8" />
                  </div>
                  <span className="font-black text-white mb-1 truncate max-w-[200px] text-[12px] uppercase italic tracking-widest">{file.name}</span>
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Payload Ready</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-12 h-12 text-gray-700 mb-4 group-hover:text-primary transition-colors" />
                  <span className="font-black text-gray-500 uppercase tracking-widest text-[10px]">Initialize Design Feed</span>
                </div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </label>

          <div className="mt-8 space-y-4">
             <NeuralTerminal logs={terminalLogs} />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8">
          <h2 className="text-sm font-black mb-6 flex items-center gap-3 text-white uppercase tracking-[0.4em]">
            <Zap className="w-5 h-5 text-accent" />
            Parameter Synthesis
          </h2>
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-3 block">Domain Context</span>
              <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-[#1a1f35] border border-white/10 rounded-2xl p-4 text-xs font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer">
                <option value="Mechanical">Mechanical Optimization</option>
                <option value="Automotive">Automotive Synthesis</option>
                <option value="Manufacturing">Manufacturing Audit</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block">Process</span>
                <select value={process} onChange={(e) => setProcess(e.target.value)} className="w-full bg-[#1a1f35] border border-white/10 rounded-2xl p-4 text-[9px] font-black text-white uppercase tracking-widest appearance-none cursor-pointer">
                  <option value="Injection Molding">Injection Molding</option>
                  <option value="CNC">CNC Machining</option>
                  <option value="3D Printing">Additive (3D)</option>
                </select>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block">Material</span>
                <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-[#1a1f35] border border-white/10 rounded-2xl p-4 text-[9px] font-black text-white uppercase tracking-widest appearance-none cursor-pointer">
                   <option value="Aluminum">Aluminum T6</option>
                   <option value="Steel">High-Carbon Steel</option>
                   <option value="ABS">ABS Polymer</option>
                </select>
              </div>
            </div>
          </div>
          <motion.button 
             onClick={handleAnalyze} disabled={!file || isAnalyzing}
             whileHover={file && !isAnalyzing ? { scale: 1.02 } : {}}
             className={`w-full mt-10 py-5 rounded-[2rem] font-black text-[12px] flex items-center justify-center gap-3 transition-all uppercase tracking-[0.3em] ${(!file || isAnalyzing) ? 'bg-white/5 text-gray-700 cursor-not-allowed border-white/5' : 'glass-button shadow-[0_0_30px_rgba(99,102,241,0.4)]'}`}
          >
            {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
            {isAnalyzing ? 'Processing Design...' : 'Execute Neural Audit'}
          </motion.button>
        </motion.div>
      </div>
      
      {/* Massive Visual Output */}
      <div className="lg:col-span-8 flex flex-col h-full print:hidden">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-10 flex flex-col flex-1 relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -mr-60 -mt-60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -ml-60 -mb-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-xl font-black mb-10 flex items-center justify-between text-white border-b border-white/5 pb-8 uppercase tracking-tighter italic">
              <span className="flex items-center gap-4">
                 <BrainCircuit className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,1)]" />
                 Generative Engineering Hub
              </span>
              {result && (
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Validation Integrity:</span>
                    <span className="px-8 py-3 bg-primary/20 text-white border border-primary/40 rounded-full text-xl font-black shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                      {result.score}%
                    </span>
                 </div>
              )}
            </h2>
            
            <AnimatePresence mode="wait">
               {!result && !isAnalyzing ? (
                 <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                    <HologramEmptyState />
                 </motion.div>
               ) : isAnalyzing ? (
                 <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48 mb-12">
                       <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute inset-0 border-2 border-primary/20 rounded-full border-t-primary shadow-[0_0_40px_rgba(99,102,241,0.5)]" />
                       <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-8 border border-accent/20 rounded-full border-t-accent" />
                       <Layers className="absolute inset-0 m-auto w-16 h-16 text-white animate-pulse" />
                    </div>
                    <p className="text-3xl font-black neon-text uppercase tracking-widest italic animate-pulse">Synchronizing Nodes...</p>
                 </motion.div>
               ) : (
                 <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {[
                         { title: 'Source Input', asset: previewUrl, filter: 'grayscale(1)', label: 'RAW_GEOMETRY' },
                         { title: 'Stress Heatmap', asset: previewUrl, filter: 'sepia(1) hue-rotate(240deg) saturate(8)', label: 'LAMINAR_FLOW_SCAN', scan: true },
                         { title: 'AI Optimized Internal', asset: reportImage, filter: 'none', label: 'NEURAL_FORGE_OUTPUT', download: true }
                       ].map((card, i) => (
                         <div key={i} className="flex flex-col gap-4 group">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{card.title}</span>
                            <div className="relative h-48 bg-black/40 border border-white/5 rounded-3xl overflow-hidden group-hover:border-primary/40 transition-all shadow-inner">
                               {card.scan && <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 h-[2px] bg-primary z-10 shadow-[0_0_20px_rgba(99,102,241,1)]" />}
                               {card.asset ? (
                                  <img src={card.asset} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" style={{ filter: card.filter }} />
                               ) : (
                                  <div className="w-full h-full flex items-center justify-center opacity-10"><Box className="w-16 h-16 text-white" /></div>
                               )}
                               <div className="absolute bottom-4 left-4 text-[9px] font-black text-white/40 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
                                  {card.label}
                               </div>
                               {card.download && (
                                 <motion.button onClick={handleDownload} whileHover={{ scale: 1.1 }} className="absolute top-4 right-4 p-3 bg-primary text-white rounded-2xl shadow-xl border border-white/10">
                                    <Download className="w-4 h-4" />
                                 </motion.button>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                       {result.errors.map((error, idx) => {
                          const fix = result.fixes.find(f => f.id === error.id);
                          return (
                            <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.05] transition-all group/find overflow-hidden relative">
                               <div className={`absolute top-0 left-0 w-2 h-full ${error.severity === 'Critical' ? 'bg-primary' : 'bg-accent'} opacity-40`} />
                               <div className="flex justify-between items-center mb-6">
                                  <div className="flex items-center gap-4">
                                     <div className={`w-3 h-3 rounded-full ${error.severity === 'Critical' ? 'bg-primary shadow-[0_0_10px_rgba(99,102,241,1)]' : 'bg-accent'}`} />
                                     <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{error.rule}</h4>
                                  </div>
                                  <span className="text-[10px] font-black uppercase bg-white/5 border border-white/10 px-6 py-2 rounded-full text-gray-500">Constraint Violation: L{idx+1}</span>
                               </div>
                               <p className="text-gray-400 text-sm mb-8 font-medium leading-relaxed italic pr-12">{error.message}</p>
                               <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4">
                                  <Wrench className="w-6 h-6 text-primary shrink-0 mt-1" />
                                  <div>
                                     <p className="text-md font-black text-white uppercase italic tracking-tight mb-2">{fix?.action}</p>
                                     <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-widest">{fix?.reason}</p>
                                  </div>
                               </div>
                            </div>
                          );
                       })}
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

export default Dashboard;
