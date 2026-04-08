import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileBox, RefreshCw, Layers, Wrench, ShieldAlert, CheckCircle2, TrendingUp, Box, ArrowRight, Download, Zap, BrainCircuit, Terminal, Activity, Search, ShieldCheck, AlertTriangle, BarChart3, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_VALIDATE = `${API_BASE}/api/validate`;
const API_DOMAINS = `${API_BASE}/api/domains`;

// Domain configurations (local fallback)
const DOMAIN_CONFIG = {
  "Mechanical Engineering": {
    processes: ["CNC Machining", "Injection Molding", "Sheet Metal", "Casting"],
    materials: ["Aluminum", "Steel", "ABS", "Nylon"],
  },
  "Aerospace Engineering": {
    processes: ["CNC Precision", "Composite Manufacturing", "Metal Additive Manufacturing"],
    materials: ["Titanium", "Aluminum 7075", "Carbon Fiber", "Inconel"],
  },
  "3D Design / Additive": {
    processes: ["FDM", "SLA", "SLS", "Metal 3D Printing"],
    materials: ["PLA", "ABS", "Resin", "Nylon"],
  },
};

const NeuralTerminal = ({ logs }) => (
  <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 h-[180px] overflow-hidden font-mono text-[10px] space-y-2 relative group hover:border-primary/30 transition-colors">
    <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
       <Terminal className="w-3 h-3 text-primary" />
       <span className="text-gray-500 uppercase tracking-widest font-black">Analysis Log</span>
       <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
    </div>
    <div className="space-y-1 opacity-60">
       {logs.slice(-8).map((log, i) => (
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
         _READY...
       </motion.div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
  </div>
);

const HologramEmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center py-20 relative group">
    <div className="relative w-64 h-64 flex items-center justify-center">
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
      <motion.div 
        animate={{ top: ['20%', '80%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-x-10 h-[1px] bg-primary/80 blur-[2px] shadow-[0_0_15px_rgba(99,102,241,1)] z-20"
      />
    </div>
    <div className="mt-8 text-center">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Upload Design</h3>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed">
        Upload your CAD model or design image to start AI-powered DFM validation.
      </p>
    </div>
  </div>
);

const ScoreGauge = ({ score, confidence }) => (
  <div className="flex items-center gap-8">
    <div className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r="42" fill="none"
          stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${score * 2.64} 264`}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{score}</span>
        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Score</span>
      </div>
    </div>
    <div className="space-y-3">
      <div>
        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-1">AI Confidence</span>
        <span className="text-xl font-black text-primary">{(confidence * 100).toFixed(1)}%</span>
      </div>
      <div>
        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-1">Model</span>
        <span className="text-[10px] font-black text-gray-400">PointNet++ v4.2</span>
      </div>
    </div>
  </div>
);

function Dashboard() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [domain, setDomain] = useState('Mechanical Engineering');
  const [process, setProcess] = useState('CNC Machining');
  const [material, setMaterial] = useState('Aluminum');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [reportImage, setReportImage] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState(["ENGINE_READY", "AWAITING_UPLOAD"]);

  const canvasRef = useRef(null);

  // Dynamic domain options
  const currentConfig = DOMAIN_CONFIG[domain] || DOMAIN_CONFIG["Mechanical Engineering"];

  // Reset process/material when domain changes
  useEffect(() => {
    const config = DOMAIN_CONFIG[domain];
    if (config) {
      setProcess(config.processes[0]);
      setMaterial(config.materials[0]);
    }
  }, [domain]);

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
    setTerminalLogs(prev => [...prev, `FILE_LOADED: ${selectedFile.name.toUpperCase()}`, "READY_FOR_ANALYSIS"]);
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
    setTerminalLogs(prev => [...prev, `DOMAIN: ${domain.toUpperCase()}`, `PROCESS: ${process.toUpperCase()}`, "RUNNING_AI_ANALYSIS..."]);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('process', process);
      formData.append('material', material);
      formData.append('domain', domain);
      
      const response = await fetch(API_VALIDATE, { method: 'POST', body: formData });
      const data = await response.json();
      
      if (data.error) {
        setTimeout(() => {
          setResult({ isError: true, message: data.error });
          setIsAnalyzing(false);
          setTerminalLogs(prev => [
            ...prev,
            "ERROR: NON_CAD_DETECTED",
            "ANALYSIS_ABORTED"
          ]);
        }, 1500);
        return;
      }

      if (data.filetype && data.filetype.startsWith('image/')) {
        generateFixedImage(data);
      }

      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
        setTerminalLogs(prev => [
          ...prev,
          `SCORE: ${data.score}/100`,
          `CONFIDENCE: ${(data.confidence * 100).toFixed(1)}%`,
          `ERRORS_FOUND: ${data.errors?.length || 0}`,
          "ANALYSIS_COMPLETE",
        ]);
      }, 2000);
    } catch (err) {
      console.error("DesignIQ Analysis Error:", err);
      setIsAnalyzing(false);
      setTerminalLogs(prev => [...prev, "ERROR: CONNECTION_FAILED", "Ensure backend is running at localhost:8000"]);
      alert("Analysis failed. Please ensure the backend engine is running at http://localhost:8000");
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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
      if (data.errors) {
        data.errors.forEach((error, idx) => {
          const severityColor = error.severity === 'Critical' ? '#ff4d4d' : '#f59e0b';
          ctx.strokeStyle = severityColor;
          ctx.lineWidth = canvas.width * 0.008;
          const seedX = (idx * 0.3) % 0.8 + 0.1;
          const seedY = (idx * 0.25) % 0.8 + 0.1;
          const x = canvas.width * seedX;
          const y = canvas.height * seedY;
          const radius = canvas.width * (error.severity === 'Critical' ? 0.06 : 0.04);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = severityColor;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });
      }
      setReportImage(canvas.toDataURL('image/png'));
    };
  };

  const severityColor = (sev) => {
    if (sev === 'Critical') return 'bg-red-500';
    if (sev === 'High') return 'bg-amber-500';
    return 'bg-blue-500';
  };

  return (
    <div className="p-8 max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:p-0 font-outfit">
      
      <canvas ref={canvasRef} className="hidden" />

      {/* Professional PDF Report (Print Only) */}
      <div className="hidden print:block relative bg-white text-black p-0 h-auto font-sans">
         {/* Title Page / Header */}
         <div className="border-b-4 border-primary pb-8 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">DesignIQ Validation Report</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">AI-Powered DFM Analysis</span>
                <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
               <p className="text-xs font-black uppercase text-gray-800 tracking-widest">Model: PointNet++ v4.2</p>
               <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-1">Domain: {result?.domain}</p>
            </div>
         </div>

         {/* Summary Grid */}
         <div className="grid grid-cols-3 gap-6 mb-10">
           <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl break-inside-avoid">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Optimization Score</p>
             <p className={`text-4xl font-black ${result?.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{result?.score}<span className="text-lg text-gray-400">/100</span></p>
           </div>
           <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl break-inside-avoid">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">AI Confidence</p>
             <p className="text-4xl font-black text-primary">{result?.confidence && (result.confidence * 100).toFixed(1)}<span className="text-lg text-primary/50">%</span></p>
           </div>
           <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl break-inside-avoid">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Target Process</p>
             <p className="text-xl font-black text-gray-800 leading-tight truncate">{result?.process}</p>
             <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase truncate">{result?.material}</p>
           </div>
         </div>

         {/* Visual Analysis */}
         {reportImage && (
           <div className="mb-10 break-inside-avoid">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-200 pb-2">Visual Stress Heatmap</h3>
             <div className="bg-gray-50 p-4 border border-gray-200 rounded-2xl">
               <img src={reportImage} className="w-full max-h-[450px] object-contain rounded-xl" />
             </div>
           </div>
         )}

         {/* Detailed Audit Findings */}
         <div className="break-before-page">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-200 pb-2">Critical Audit Findings ({result?.errors?.length || 0})</h3>
            <div className="space-y-6">
              {result?.errors?.map((e, idx) => {
                const suggestion = result?.suggestions?.find(s => s.id === e.id);
                return (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-6 bg-white break-inside-avoid shadow-sm">
                     <div className="flex justify-between items-start mb-3">
                       <h4 className="font-black text-lg text-gray-900 uppercase tracking-tight w-4/5">{e.rule}</h4>
                       <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shrink-0 ${e.severity === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' : e.severity === 'High' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                         {e.severity}
                       </span>
                     </div>
                     <p className="text-sm font-medium text-gray-600 mb-4 leading-relaxed">{e.message}</p>
                     
                     {suggestion && (
                       <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl break-inside-avoid">
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 
                             Recommended Action
                          </p>
                          <p className="text-sm font-bold text-gray-800 mb-2">{suggestion.action}</p>
                          <p className="text-xs text-gray-600 italic leading-relaxed">"{suggestion.reason}"</p>
                       </div>
                     )}
                  </div>
                );
              })}
            </div>
         </div>
         
         {/* Footer / Meta Info */}
         <div className="mt-12 pt-6 border-t border-gray-200 text-center break-inside-avoid">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Generated by DesignIQ Validation Engine • Automated DFM Audit
            </p>
            <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest">{result?.filename} • {result?.filetype}</p>
         </div>
      </div>

      {/* LEFT PANEL — Upload & Parameters */}
      <div className="lg:col-span-4 space-y-6 print:hidden h-full">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Search className="w-32 h-32 text-primary" />
           </div>
          <h2 className="text-sm font-black mb-6 flex items-center gap-3 text-white uppercase tracking-[0.4em]">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Upload Terminal
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
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Ready for Analysis</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-12 h-12 text-gray-700 mb-4 group-hover:text-primary transition-colors" />
                  <span className="font-black text-gray-500 uppercase tracking-widest text-[10px]">Upload Design</span>
                  <span className="text-[9px] text-gray-700 mt-2 uppercase tracking-widest">CAD, STL, STEP, Images</span>
                </div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </label>

          <div className="mt-6">
             <NeuralTerminal logs={terminalLogs} />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8">
          <h2 className="text-sm font-black mb-6 flex items-center gap-3 text-white uppercase tracking-[0.4em]">
            <Zap className="w-5 h-5 text-accent" />
            Design Parameters
          </h2>
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-3 block">Domain Selection</span>
              <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-[#1a1f35] border border-white/10 rounded-2xl p-4 text-xs font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer">
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Aerospace Engineering">Aerospace Engineering</option>
                <option value="3D Design / Additive">3D Design / Additive Manufacturing</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block">Process</span>
                <select value={process} onChange={(e) => setProcess(e.target.value)} className="w-full bg-[#1a1f35] border border-white/10 rounded-2xl p-4 text-[9px] font-black text-white uppercase tracking-widest appearance-none cursor-pointer">
                  {currentConfig.processes.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block">Material</span>
                <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-[#1a1f35] border border-white/10 rounded-2xl p-4 text-[9px] font-black text-white uppercase tracking-widest appearance-none cursor-pointer">
                  {currentConfig.materials.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <motion.button 
             onClick={handleAnalyze} disabled={!file || isAnalyzing}
             whileHover={file && !isAnalyzing ? { scale: 1.02 } : {}}
             className={`w-full mt-10 py-5 rounded-[2rem] font-black text-[12px] flex items-center justify-center gap-3 transition-all uppercase tracking-[0.3em] ${(!file || isAnalyzing) ? 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/5' : 'glass-button shadow-[0_0_30px_rgba(99,102,241,0.4)]'}`}
          >
            {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
            {isAnalyzing ? 'Analyzing Design...' : 'Start AI Analysis'}
          </motion.button>
        </motion.div>
      </div>
      
      {/* RIGHT PANEL — Results */}
      <div className="lg:col-span-8 flex flex-col h-full print:hidden">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-10 flex flex-col flex-1 relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -mr-60 -mt-60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -ml-60 -mb-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-xl font-black mb-10 flex items-center justify-between text-white border-b border-white/5 pb-8 uppercase tracking-tighter italic">
              <span className="flex items-center gap-4">
                 <BrainCircuit className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,1)]" />
                 Analysis Results
              </span>
              {result && (
                <div className="flex items-center gap-6">
                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:border-primary/40 transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Report
                  </motion.button>
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
                    <p className="text-3xl font-black neon-text uppercase tracking-widest italic animate-pulse">Analyzing Design...</p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-4 font-bold">Running PointNet++ feature extraction • Applying DFM rules</p>
                 </motion.div>
               ) : result.isError ? (
                 <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-red-500/5 border border-red-500/20 rounded-[2rem]">
                    <ShieldAlert className="w-20 h-20 text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                    <h3 className="text-2xl font-black text-red-400 uppercase tracking-widest mb-4">INVALID DESIGN DETECTED</h3>
                    <p className="text-sm font-bold text-gray-300 tracking-widest leading-relaxed max-w-lg mb-8">
                      {result.message}
                    </p>
                    <motion.button
                      onClick={() => setResult(null)}
                      whileHover={{ scale: 1.05 }}
                      className="px-8 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-black uppercase tracking-[0.2em] rounded-full hover:bg-red-500/20 transition-all font-outfit"
                    >
                      Try Again
                    </motion.button>
                 </motion.div>
               ) : (
                 <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col gap-8">
                    
                    {/* Score + Confidence Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                      <ScoreGauge score={result.score} confidence={result.confidence} />
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black text-primary uppercase tracking-widest">{result.domain}</span>
                        <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">{result.process}</span>
                        <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">{result.material}</span>
                      </div>
                    </div>

                    {/* Warnings */}
                    {result.warnings && result.warnings.length > 0 && (
                      <div className="space-y-2">
                        {result.warnings.map((w, i) => (
                          <div key={i} className="flex items-start gap-3 px-5 py-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-amber-200 font-medium">{w}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Image Previews */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {[
                         { title: 'Source Input', asset: previewUrl, filter: 'grayscale(1)', label: 'ORIGINAL' },
                         { title: 'Stress Heatmap', asset: previewUrl, filter: 'sepia(1) hue-rotate(240deg) saturate(8)', label: 'HEATMAP_ANALYSIS', scan: true },
                         { title: 'AI Optimized', asset: reportImage, filter: 'none', label: 'OPTIMIZED_OUTPUT' }
                       ].map((card, i) => (
                         <div key={i} className="flex flex-col gap-3 group">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{card.title}</span>
                            <div className="relative h-40 bg-black/40 border border-white/5 rounded-2xl overflow-hidden group-hover:border-primary/40 transition-all shadow-inner">
                               {card.scan && <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 h-[2px] bg-primary z-10 shadow-[0_0_20px_rgba(99,102,241,1)]" />}
                               {card.asset ? (
                                  <img src={card.asset} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" style={{ filter: card.filter }} />
                               ) : (
                                  <div className="w-full h-full flex items-center justify-center opacity-10"><Box className="w-12 h-12 text-white" /></div>
                               )}
                               <div className="absolute bottom-3 left-3 text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/60 px-2 py-1 rounded-full border border-white/5 backdrop-blur-md">
                                  {card.label}
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* AI Insight */}
                    {result.ai_insight && (
                      <div className="px-6 py-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Cpu className="w-4 h-4 text-primary" />
                          <span className="text-[9px] font-black text-primary uppercase tracking-widest">AI Insight</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{result.ai_insight}</p>
                      </div>
                    )}

                    {/* Errors & Suggestions */}
                    <div className="space-y-5 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                       <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                         <BarChart3 className="w-5 h-5 text-primary" /> Detailed Findings
                       </h3>
                       {result.errors?.map((error, idx) => {
                          const suggestion = result.suggestions?.find(f => f.id === error.id);
                          return (
                            <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.05] transition-all group/find overflow-hidden relative">
                               <div className={`absolute top-0 left-0 w-2 h-full ${error.severity === 'Critical' ? 'bg-red-500' : error.severity === 'High' ? 'bg-amber-500' : 'bg-blue-400'} opacity-40`} />
                               <div className="flex justify-between items-center mb-4">
                                  <div className="flex items-center gap-4">
                                     <div className={`w-3 h-3 rounded-full ${severityColor(error.severity)} ${error.severity === 'Critical' ? 'shadow-[0_0_10px_rgba(239,68,68,0.8)]' : ''}`} />
                                     <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{error.rule}</h4>
                                  </div>
                                  <span className="text-[10px] font-black uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-gray-500">{error.severity}</span>
                               </div>
                               <p className="text-gray-400 text-sm mb-6 font-medium leading-relaxed italic pr-12">{error.message}</p>
                               {suggestion && (
                                 <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                                    <Wrench className="w-5 h-5 text-primary shrink-0 mt-1" />
                                    <div>
                                       <p className="text-sm font-black text-white uppercase italic tracking-tight mb-1">{suggestion.action}</p>
                                       <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-widest">{suggestion.reason}</p>
                                    </div>
                                 </div>
                               )}
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

export default Dashboard;
