import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Layers, Maximize2, ShieldAlert, ChevronDown, Wrench, CircleDashed, Cpu, Globe, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CheckCircle(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}

const DOMAIN_TABS = [
  { id: 'all', label: 'All Domains', icon: <Globe className="w-4 h-4" /> },
  { id: 'mechanical', label: 'Mechanical', icon: <Wrench className="w-4 h-4" /> },
  { id: 'aerospace', label: 'Aerospace', icon: <Cpu className="w-4 h-4" /> },
  { id: '3d', label: '3D / Additive', icon: <Box className="w-4 h-4" /> },
];

function RuleLibrary() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const rules = [
    // Mechanical Rules
    { id: "M-01", domain: "mechanical", domainLabel: "Mechanical Engineering", name: "Wall Thickness Check", shortDesc: "Ensures walls can withstand manufacturing pressures without warping or breaking.", detail: "Thin walls are brittle and may snap under stress. In injection molding, thin walls cause short shots — the liquid plastic freezes before filling the mold cavity. Thick walls create internal voids and sink marks from uneven cooling. DesignIQ checks for minimum 0.8mm (CNC), 1.5mm (casting), and uniform ±15% variance.", icon: <Layers className="text-primary w-5 h-5" />, color: 'indigo' },
    { id: "M-02", domain: "mechanical", domainLabel: "Mechanical Engineering", name: "Fillet Radius Optimization", shortDesc: "Detects sharp internal corners that cutting tools cannot machine.", detail: "CNC endmills are cylindrical — they physically cannot cut sharp 90° internal corners. Sharp corners also create stress concentration factors of 3-5x, causing fatigue failure. DesignIQ recommends radii ≥ tool radius (R1.5mm minimum for standard tooling).", icon: <CheckCircle className="text-primary w-5 h-5" />, color: 'indigo' },
    { id: "M-03", domain: "mechanical", domainLabel: "Mechanical Engineering", name: "Hole Depth Ratio", shortDesc: "Validates blind hole depth-to-diameter ratio to prevent tool breakage.", detail: "Deep narrow holes prevent proper chip evacuation — chips pack against the drill, causing overheating, breaking, or hole drift. Steel: max 4:1 ratio. Aluminum: max 6:1. Nylon: max 3:1 (due to flexibility). DesignIQ flags all violations and suggests pilot drilling strategies.", icon: <CircleDashed className="text-primary w-5 h-5" />, color: 'indigo' },
    { id: "M-04", domain: "mechanical", domainLabel: "Mechanical Engineering", name: "Draft Angle Verification", shortDesc: "Ensures vertical walls have taper for mold ejection or tool clearance.", detail: "In casting and injection molding, parts shrink and grip the mold core. Without 1-3° draft, the part tears on ejection. In CNC, zero-draft pockets cause the tool to rub on retract strokes, damaging surface finish. DesignIQ validates all surfaces and suggests appropriate angles per process.", icon: <Maximize2 className="text-primary w-5 h-5" />, color: 'indigo' },

    // Aerospace Rules
    { id: "A-01", domain: "aerospace", domainLabel: "Aerospace Engineering", name: "Weight Optimization", shortDesc: "Identifies excess material in non-structural regions for mass reduction.", detail: "In aerospace, every gram impacts fuel efficiency and performance. DesignIQ uses topology-guided analysis to identify regions where material can be removed without compromising structural integrity. Typical savings: 15-35% mass reduction while maintaining FOS > 2.0.", icon: <ShieldAlert className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "A-02", domain: "aerospace", domainLabel: "Aerospace Engineering", name: "Stress Tolerance Analysis", shortDesc: "Identifies stress concentrations that exceed material yield strength.", detail: "Von Mises stress analysis identifies hotspots where loading exceeds material capability. For titanium Ti-6Al-4V: yield = 880 MPa. For Al 7075-T6: yield = 503 MPa. DesignIQ flags concentrations and suggests fillet transitions, reinforcement bosses, and load redistribution geometry.", icon: <AlertTriangle className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "A-03", domain: "aerospace", domainLabel: "Aerospace Engineering", name: "Fatigue Resistance Check", shortDesc: "Evaluates design lifetime under cyclic loading conditions.", detail: "Aerospace components undergo millions of load cycles. Sharp notches and abrupt section changes create fatigue crack initiation sites. DesignIQ evaluates notch sensitivity factors, recommends shot-peening specs, and validates against DO-160 and FAR 25.571 damage tolerance requirements.", icon: <Layers className="text-accent w-5 h-5" />, color: 'amber' },
    { id: "A-04", domain: "aerospace", domainLabel: "Aerospace Engineering", name: "Safety Factor Verification", shortDesc: "Validates structural margins against aerospace certification standards.", detail: "Aerospace requires FOS ≥ 1.5 for metallic primary structure (FAR 25.303). DesignIQ validates limit load (1.5x) and ultimate load (1.0x) margins, checks for fail-safe redundancy, and flags any cross-section below minimum required by aircraft certification standards.", icon: <ShieldAlert className="text-accent w-5 h-5" />, color: 'amber' },

    // 3D / Additive Rules
    { id: "3D-01", domain: "3d", domainLabel: "3D Design / Additive", name: "Overhang Angle Detection", shortDesc: "Identifies unsupported geometry exceeding printable angles.", detail: "FDM/SLA printers build layer by layer. Overhangs beyond 45° (FDM) or 30° (SLA) attempt to print in mid-air, causing sag, collapse, or failed prints. SLS is support-free but enclosed volumes need drain holes. DesignIQ analyzes all surfaces and suggests redesign or support strategies.", icon: <ShieldAlert className="text-danger w-5 h-5" />, color: 'red' },
    { id: "3D-02", domain: "3d", domainLabel: "3D Design / Additive", name: "Support Structure Analysis", shortDesc: "Evaluates support requirements and post-processing difficulty.", detail: "Supports are necessary evil in 3D printing. They leave surface marks, waste material, and can damage thin features during removal. DesignIQ minimizes support volume by suggesting optimal orientation, self-supporting angles, and tree-support strategies for complex geometry.", icon: <Wrench className="text-danger w-5 h-5" />, color: 'red' },
    { id: "3D-03", domain: "3d", domainLabel: "3D Design / Additive", name: "Print Orientation Optimization", shortDesc: "Determines best build orientation for strength and quality.", detail: "FDM/SLA parts have anisotropic properties — Z-direction strength is only 40-60% of X-Y. DesignIQ aligns primary load paths with the strongest print direction, minimizes support contact on visible surfaces, and reduces warpage risk for large flat parts.", icon: <Layers className="text-danger w-5 h-5" />, color: 'red' },
    { id: "3D-04", domain: "3d", domainLabel: "3D Design / Additive", name: "Layer Thickness Optimization", shortDesc: "Recommends optimal layer height for strength and surface quality.", detail: "Thinner layers (25-50µm) give better surface finish and detail but increase print time 4-8x. Thicker layers (200-300µm) are faster but rough. DesignIQ suggests adaptive layer heights — fine layers for detailed regions, coarse for structural bulk — balancing quality and speed.", icon: <Maximize2 className="text-danger w-5 h-5" />, color: 'red' },
  ];

  const colorMap = {
    indigo: { bg: 'bg-primary/10', border: 'border-primary/20', icon: 'bg-indigo-900/40 text-primary' },
    amber: { bg: 'bg-accent/10', border: 'border-accent/20', icon: 'bg-amber-900/40 text-accent' },
    red: { bg: 'bg-danger/10', border: 'border-danger/20', icon: 'bg-red-900/40 text-danger' },
  };

  const filteredRules = activeTab === 'all' ? rules : rules.filter(r => r.domain === activeTab);

  const handleToggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full font-outfit">
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
          <p className="text-gray-400">Explore the DFM validation rules powering DesignIQ's AI analysis engine.</p>
        </div>
      </motion.div>

      {/* Domain Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {DOMAIN_TABS.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
              activeTab === tab.id
                ? 'bg-primary/20 border-primary/40 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">
        Showing {filteredRules.length} rules {activeTab !== 'all' ? `in ${DOMAIN_TABS.find(t => t.id === activeTab)?.label}` : ''}
      </div>
      
      <div className="space-y-3">
        {filteredRules.map((rule, idx) => {
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
                    <span className="text-xs font-bold px-3 py-1 bg-white/5 rounded-full text-gray-400 w-fit border border-white/10">
                      {rule.domainLabel} • {rule.id}
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
                          <AlertTriangle className="w-4 h-4" /> Engineering Detail
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
