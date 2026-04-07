import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Layers, Maximize2, ShieldAlert, ChevronDown, Wrench, CircleDashed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CheckCircle(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}

function RuleLibrary() {
  const [expandedId, setExpandedId] = useState(null);

  const rules = [
    { id: "R-01", domain: "Mechanical", name: "Wall Thickness Check", shortDesc: "Ensures the part can withstand manufacturing pressures without warping.", detail: "If walls are too thin, they are brittle and may snap under stress. In injection molding, thin walls cause short shots (the liquid plastic freezes before filling the mold). If they are too thick, you'll see internal voids and sink marks due to uneven cooling.", icon: <Layers className="text-primary w-5 h-5" />, color: 'indigo' },
    { id: "R-02", domain: "Automotive", name: "Hole-to-Edge Distance", shortDesc: "Distance between a hole center and material edge must be safe.", detail: "If a hole is drilled too close to an edge, the remaining thin material strip cannot hold the stress of a fastener. Minimum rule: Distance > 1.5x hole diameter.", icon: <Maximize2 className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "R-03", domain: "Manufacturing (CNC)", name: "Sharp Internal Corner Detection", shortDesc: "Detects internal sharp corners that cylindrical milling tools cannot cut.", detail: "CNC drills and endmills are spinning cylinders. It is physically impossible to cut a sharp 90-degree internal angle. Always use a fillet radius larger than the tool radius.", icon: <AlertTriangle className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "R-04", domain: "Manufacturing (3D Print)", name: "Overhang Angle Detection", shortDesc: "Identifies unsupported angles greater than 45°.", detail: "3D printers (FDM/SLA) print layer by layer. If an overhang angle exceeds 45 degrees, the printer attempts to print in mid-air, causing sag or collapse.", icon: <ShieldAlert className="text-danger w-5 h-5" />, color: 'red' },
    { id: "R-05", domain: "Mechanical", name: "Draft Angle Verification", shortDesc: "Ensures vertical walls have a taper for mold ejection.", detail: "In casting and injection molding, parts shrink as they cool and clamp onto the mold core. Without a 1°–3° draft angle, the part will drag across the mold during ejection.", icon: <CheckCircle className="text-primary w-5 h-5" />, color: 'indigo' },
    { id: "R-06", domain: "Automotive", name: "Stress Concentration Check", shortDesc: "Highlights areas where structural loads magnify dangerously.", detail: "Sudden changes in cross-section (like an L-bracket without a fillet) create infinite theoretical stress. DesignIQ suggests adding a smooth transition radius.", icon: <Layers className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "R-07", domain: "Manufacturing", name: "Small Feature Tolerance", shortDesc: "Detects features too small for the selected manufacturing method.", detail: "For instance, requesting a 0.1mm hole on standard CNC. Standard drill bits break at that size. DesignIQ identifies out-of-spec micro features before they cause stoppage.", icon: <Maximize2 className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "R-08", domain: "Mechanical", name: "Blind Hole Depth Ratio", shortDesc: "Calculates the depth-to-diameter ratio of holes.", detail: "If a hole is too deep compared to its width (e.g., > 6:1), the drill bit struggles to evacuate chips, causing it to overheat and shatter.", icon: <CircleDashed className="text-danger w-5 h-5" />, color: 'red' },
    { id: "R-09", domain: "Automotive", name: "Symmetry & Balance Check", shortDesc: "Ensures rotating parts are mass-balanced to prevent vibration.", detail: "For parts mounted on axles or drivetrains, uneven mass distribution causes catastrophic vibration at high RPM. DesignIQ calculates the center of mass variance.", icon: <Wrench className="text-primary w-5 h-5" />, color: 'indigo' },
    { id: "R-10", domain: "Manufacturing (Injection)", name: "Uniform Wall Thickness", shortDesc: "Prevents warping by enforcing consistent thickness.", detail: "A part with changing thicknesses will cool at different rates. The thicker areas stay hot longer and shrink inward, causing warping. DesignIQ flags areas with > 10% thickness deviance.", icon: <Layers className="text-accent w-5 h-5" />, color: 'amber' },
  ];

  const colorMap = {
    indigo: { bg: 'bg-primary/10', border: 'border-primary/20', icon: 'bg-indigo-900/40 text-primary' },
    amber: { bg: 'bg-accent/10', border: 'border-accent/20', icon: 'bg-amber-900/40 text-accent' },
    red: { bg: 'bg-danger/10', border: 'border-danger/20', icon: 'bg-red-900/40 text-danger' },
  };

  const handleToggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl shadow-sm">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Engineering Rule Library</h2>
          <p className="text-gray-400">Deep-dive into the complex DFM parameters the DesignIQ engine evaluates.</p>
        </div>
      </motion.div>
      
      <div className="space-y-3">
        {rules.map((rule, idx) => {
          const isExpanded = expandedId === rule.id;
          const c = colorMap[rule.color];
          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`glass-panel overflow-hidden transition-all duration-300 ${isExpanded ? `${c.border} ${c.bg}` : 'hover:border-primary/20 cursor-pointer'}`}
              onClick={() => handleToggle(rule.id)}
            >
              <div className="p-5 flex items-start gap-4 cursor-pointer">
                <div className={`p-2 ${c.icon} rounded-lg border ${c.border} mt-0.5 shrink-0`}>
                  {rule.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                    <h3 className="text-lg font-bold text-white">{rule.name}</h3>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-400 w-fit border border-white/10">
                      {rule.domain} • {rule.id}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{rule.shortDesc}</p>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-1 shrink-0 ${isExpanded ? 'text-primary' : 'text-gray-400'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-5 pt-0 border-t ${c.border}`}>
                      <div className={`${c.bg} rounded-xl p-4 mt-4 border ${c.border}`}>
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4" /> Why does this rule matter?
                        </h4>
                        <p className="text-gray-200 text-sm leading-relaxed">{rule.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default RuleLibrary;
