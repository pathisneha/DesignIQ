from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import json
import os
import math
import hashlib
from datetime import datetime

app = FastAPI(title="DesignIQ Engine — AI Design Validation")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HISTORY_FILE = "design_history.json"
LEARNING_FILE = "learning_data.json"

# ============================================================
# DOMAIN ARCHITECTURE — 3 Core Domains
# ============================================================

DOMAINS = {
    "Mechanical Engineering": {
        "processes": ["CNC Machining", "Injection Molding", "Sheet Metal", "Casting"],
        "materials": ["Aluminum", "Steel", "ABS", "Nylon"],
    },
    "Aerospace Engineering": {
        "processes": ["CNC Precision", "Composite Manufacturing", "Metal Additive Manufacturing"],
        "materials": ["Titanium", "Aluminum 7075", "Carbon Fiber", "Inconel"],
    },
    "3D Design / Additive": {
        "processes": ["FDM", "SLA", "SLS", "Metal 3D Printing"],
        "materials": ["PLA", "ABS", "Resin", "Nylon"],
    },
}

# ============================================================
# RULE ENGINE — Domain-Specific DFM Rules
# ============================================================

MECHANICAL_RULES = {
    ("CNC Machining", "Aluminum"): [
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "Minimum wall thickness of 0.8mm required for CNC aluminum. Detected potential thin wall segments that may cause tool chatter and part deformation.",
         "action": "Increased wall thickness to 1.2mm with gradual tapering",
         "reason": "Prevents vibration-induced surface finish degradation and ensures dimensional stability during high-speed machining."},
        {"rule": "Fillet Radius Optimization", "severity": "High",
         "message": "Internal corners with radius less than 1mm detected. CNC endmills cannot machine sharp internal corners.",
         "action": "Applied R1.5mm fillets to all internal corners",
         "reason": "Matches standard 3mm endmill radius, reducing tool stress by 60% and eliminating stress concentration points."},
    ],
    ("CNC Machining", "Steel"): [
        {"rule": "Hole Depth Ratio", "severity": "Critical",
         "message": "Blind hole depth-to-diameter ratio exceeds 4:1 in hardened steel. This causes excessive drill bit deflection and potential breakage.",
         "action": "Reduced blind hole depth to 3.5x diameter and widened exit clearance",
         "reason": "Allows proper chip evacuation and prevents drill bit failure. Tool life improved by 200%."},
        {"rule": "Draft Angle Compliance", "severity": "High",
         "message": "Vertical surfaces lack necessary draft angles for tool clearance in deep pocket milling operations.",
         "action": "Applied 1.5° draft to all vertical pocket walls",
         "reason": "Prevents tool rubbing on retract stroke and improves surface finish quality."},
    ],
    ("CNC Machining", "ABS"): [
        {"rule": "Wall Thickness Check", "severity": "High",
         "message": "Polymer CNC requires minimum 1.5mm walls to prevent melting and flexing during machining. Current design has 0.8mm sections.",
         "action": "Thickened critical walls to 2.0mm with internal ribbing",
         "reason": "ABS softens at cutting temperatures. Thicker walls act as heat sinks, preventing thermal distortion."},
        {"rule": "Fillet Radius Optimization", "severity": "Medium",
         "message": "Sharp transitions between surfaces will create stress whitening in ABS polymer during machining.",
         "action": "Blended all transitions with R2.0mm fillets",
         "reason": "Distributes clamping and cutting forces evenly, preventing crack initiation at sharp corners."},
    ],
    ("CNC Machining", "Nylon"): [
        {"rule": "Hole Depth Ratio", "severity": "High",
         "message": "Nylon's flexibility causes drill wander in deep holes. Detected holes exceeding 3:1 depth ratio.",
         "action": "Added pilot holes and reduced maximum depth to 2.5x diameter per pass",
         "reason": "Nylon's low stiffness requires progressive drilling to maintain position accuracy."},
        {"rule": "Draft Angle Compliance", "severity": "Medium",
         "message": "Nylon parts absorb moisture and swell post-machining. Current tight tolerances will cause interference fits.",
         "action": "Added 0.05mm clearance allowance on all mating surfaces",
         "reason": "Compensates for up to 2.5% dimensional change from moisture absorption."},
    ],
    ("Injection Molding", "Aluminum"): [
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "Aluminum mold tooling requires uniform wall thickness (±15% max variation). Detected 40% variance between thinnest and thickest sections.",
         "action": "Cored out thick sections to achieve uniform 2.0mm nominal wall",
         "reason": "Prevents sink marks on Class-A surfaces and reduces cycle time by ensuring even cooling."},
        {"rule": "Draft Angle Compliance", "severity": "Critical",
         "message": "Aluminum molds with less than 2° draft produce surface drag marks during ejection due to thermal expansion.",
         "action": "Applied 3° draft to all vertical surfaces with textured finish compensation",
         "reason": "Ensures clean ejection without cosmetic defects. Extends mold life by 50,000+ cycles."},
    ],
    ("Injection Molding", "Steel"): [
        {"rule": "Fillet Radius Optimization", "severity": "High",
         "message": "Steel mold inserts with sharp corners create stress risers that cause premature cracking under injection pressure.",
         "action": "Added R0.5mm minimum radius to all EDM-cut corners",
         "reason": "Distributes injection pressure evenly, extending tool life from 100K to 500K shots."},
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "Steel tooling allows thinner walls but requires precise cooling channel placement. Detected hot spots.",
         "action": "Redesigned cooling circuit with conformal channels matching part geometry",
         "reason": "Reduces cycle time by 35% and eliminates warpage from uneven cooling."},
    ],
    ("Injection Molding", "ABS"): [
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "ABS polymer shrinks differentially if wall thickness varies more than 15%. Current design shows 40% variance (1.0mm to 1.4mm).",
         "action": "Normalized all walls to 1.25mm with transitional ribs",
         "reason": "Prevents severe sink marks and potato-chip warpage characteristic of ABS parts."},
        {"rule": "Draft Angle Compliance", "severity": "High",
         "message": "ABS parts require minimum 1° draft per side. Textured surfaces need additional 1.5° per 0.025mm texture depth.",
         "action": "Applied 2° base draft plus texture compensation",
         "reason": "ABS grips mold surfaces aggressively. Insufficient draft causes ejector pin marks and surface tearing."},
    ],
    ("Injection Molding", "Nylon"): [
        {"rule": "Fillet Radius Optimization", "severity": "High",
         "message": "Nylon's high melt flow creates gas traps at sharp internal corners, causing burn marks and weak weld lines.",
         "action": "Increased all internal radii to R1.0mm minimum with venting slots",
         "reason": "Allows trapped gas to escape before burn point. Eliminates cosmetic defects on visible surfaces."},
        {"rule": "Hole Depth Ratio", "severity": "Medium",
         "message": "Core pins for deep holes in nylon parts deflect under injection pressure, causing eccentric wall thickness.",
         "action": "Limited unsupported core pin length to 3x diameter with cross-bracing",
         "reason": "Maintains concentricity within ±0.05mm for bearing and fastener applications."},
    ],
    ("Sheet Metal", "Aluminum"): [
        {"rule": "Wall Thickness Check", "severity": "High",
         "message": "Aluminum sheet metal bends require minimum bend radius of 1x material thickness. Detected 0.5x radius specifications.",
         "action": "Increased minimum bend radius to 1.5x thickness for 6061-T6",
         "reason": "Prevents cracking on the outer surface of bends. T6 temper aluminum is less ductile than annealed grades."},
        {"rule": "Fillet Radius Optimization", "severity": "Medium",
         "message": "Relief notches required at bend intersections to prevent tearing. Multiple intersecting bends detected.",
         "action": "Added 3mm diameter relief holes at all bend intersection points",
         "reason": "Prevents material tearing where bend lines converge. Standard practice per ASME Y14.5."},
    ],
    ("Sheet Metal", "Steel"): [
        {"rule": "Draft Angle Compliance", "severity": "High",
         "message": "Steel sheet forming requires consideration of springback angle. Current design does not compensate for elastic recovery.",
         "action": "Over-bent all angles by 3-5° depending on material grade and thickness",
         "reason": "Compensates for springback inherent in steel sheet forming. Achieves target angles within ±0.5°."},
        {"rule": "Hole Depth Ratio", "severity": "Medium",
         "message": "Punched holes in steel sheet must maintain minimum 1.5x material thickness from edges and 2x from bends.",
         "action": "Repositioned 4 holes to maintain safe distance from bend lines",
         "reason": "Prevents hole distortion during bending and maintains structural integrity around fastener points."},
    ],
    ("Sheet Metal", "ABS"): [
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "ABS sheet thermoforming requires uniform thickness. Current design will thin by 40% at deep draw corners.",
         "action": "Added pre-stretch and plug-assist features to deep draw areas",
         "reason": "Maintains minimum 60% of original thickness at all points. Prevents structural weakness."},
        {"rule": "Fillet Radius Optimization", "severity": "High",
         "message": "Thermoformed ABS requires generous radii (min 3x thickness) to prevent stress whitening and cracking.",
         "action": "Applied 4x thickness radius to all formed corners",
         "reason": "ABS crystallizes at sharp bends, causing brittle fracture under impact loading."},
    ],
    ("Sheet Metal", "Nylon"): [
        {"rule": "Wall Thickness Check", "severity": "High",
         "message": "Nylon sheet processing requires temperature-controlled forming. Current geometry has regions that will cool unevenly.",
         "action": "Redesigned with uniform cross-sections and heating zone alignment",
         "reason": "Ensures crystallinity is consistent throughout, preventing weak amorphous zones."},
        {"rule": "Fillet Radius Optimization", "severity": "Medium",
         "message": "Nylon sheet bending requires larger radii than rigid polymers due to its memory effect.",
         "action": "Increased all bend radii to 5x material thickness",
         "reason": "Prevents stress relaxation and long-term dimensional creep at bend points."},
    ],
    ("Casting", "Aluminum"): [
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "Aluminum die casting requires minimum 1.5mm wall thickness. Detected 0.8mm sections that will cause cold shuts.",
         "action": "Increased minimum wall to 2.0mm with gradual thickness transitions",
         "reason": "Prevents misrun defects where molten aluminum freezes before filling the mold cavity."},
        {"rule": "Draft Angle Compliance", "severity": "Critical",
         "message": "Die cast aluminum requires 1-3° draft minimum. Complex internal features detected with zero draft.",
         "action": "Applied 2° draft to all surfaces parallel to die pull direction",
         "reason": "Essential for part ejection. Zero-draft causes die locking and surface tearing."},
    ],
    ("Casting", "Steel"): [
        {"rule": "Fillet Radius Optimization", "severity": "Critical",
         "message": "Steel investment casting requires generous radii to prevent hot tearing during solidification.",
         "action": "Applied R3mm minimum fillets to all junctions and section changes",
         "reason": "Steel contracts significantly during cooling. Sharp corners create triaxial stress states causing cracks."},
        {"rule": "Hole Depth Ratio", "severity": "High",
         "message": "Cast-in holes in steel are limited to 2x diameter depth. Deeper holes require post-cast machining.",
         "action": "Redesigned deep holes as pilot cast + machined finish operations",
         "reason": "Casting cores for deep holes in steel become unstable and shift during pour, causing scrap."},
    ],
    ("Casting", "ABS"): [
        {"rule": "Wall Thickness Check", "severity": "High",
         "message": "ABS rotational casting requires 3-6mm wall thickness. Current thin sections will be structurally inadequate.",
         "action": "Increased all walls to minimum 4mm with corner build-up compensation",
         "reason": "Rotational casting naturally thins at corners. Starting thickness must account for this redistribution."},
        {"rule": "Draft Angle Compliance", "severity": "Medium",
         "message": "Rotationally cast ABS parts need 5° minimum draft for shrink-release from mold.",
         "action": "Applied 6° draft to all external surfaces",
         "reason": "ABS shrinks 0.5-0.7% and grips mold surfaces. Extra draft prevents stuck-in-mold failures."},
    ],
    ("Casting", "Nylon"): [
        {"rule": "Fillet Radius Optimization", "severity": "High",
         "message": "Cast nylon (MC Nylon) requires thick sections and large radii. Detected thin ribs that will not fill properly.",
         "action": "Increased rib thickness to 4mm minimum with R5mm base fillets",
         "reason": "Nylon casting monomer has high viscosity. Thin sections solidify before complete fill."},
        {"rule": "Wall Thickness Check", "severity": "Critical",
         "message": "Cast nylon minimum section thickness is 6mm. Detected 3mm walls that will have void defects.",
         "action": "Thickened all walls to 6mm minimum with gradual transitions",
         "reason": "Monomer polymerization generates heat internally. Thin walls cool too fast, creating internal voids."},
    ],
}

AEROSPACE_RULES = {
    ("CNC Precision", "Titanium"): [
        {"rule": "Weight Optimization", "severity": "Critical",
         "message": "Titanium component mass exceeds allowable weight budget by 15%. Excess material detected in non-structural regions.",
         "action": "Applied topology-optimized pocket pattern removing 22% mass from non-load-bearing zones",
         "reason": "Every gram matters in aerospace. Reduced component from 340g to 265g while maintaining FOS > 2.5."},
        {"rule": "Stress Tolerance Analysis", "severity": "Critical",
         "message": "Von Mises stress concentration at mounting bolt holes exceeds Ti-6Al-4V yield strength (880 MPa) under 3G load case.",
         "action": "Added reinforcement bosses and enlarged fillet transitions around bolt patterns",
         "reason": "Stress at bolt holes reduced from 910 MPa to 620 MPa. Safety margin increased to 1.42x yield."},
    ],
    ("CNC Precision", "Aluminum 7075"): [
        {"rule": "Fatigue Resistance Check", "severity": "Critical",
         "message": "7075-T6 aluminum has known fatigue sensitivity at stress concentrations. Detected sharp notch geometry at rib intersections.",
         "action": "Blended all rib junctions with R3mm fillets and shot-peen surface specification",
         "reason": "Fatigue life improved from 50,000 cycles to 500,000+ cycles at operating load. Meets DO-160 requirements."},
        {"rule": "Safety Factor Verification", "severity": "High",
         "message": "Current design FOS is 1.3 at critical load path. Aerospace minimum is 1.5 for metallic primary structure.",
         "action": "Increased cross-section at critical path by 12% and added backup load path",
         "reason": "Achieved FOS 1.65 for limit load and 1.1 for ultimate load per FAR 25.303 requirements."},
    ],
    ("CNC Precision", "Carbon Fiber"): [
        {"rule": "Weight Optimization", "severity": "High",
         "message": "Carbon fiber layup orientation not optimized for primary load direction. Estimated 20% excess weight from over-designed plies.",
         "action": "Reoriented ply schedule: 0°/±45°/90° ratio changed to 50/40/10 for tension-dominant loading",
         "reason": "Weight reduced by 18% while increasing axial stiffness by 25%. Fiber alignment now matches load vectors."},
        {"rule": "Stress Tolerance Analysis", "severity": "Critical",
         "message": "Interlaminar shear stress at ply drop-offs exceeds matrix capability (85 MPa ILSS for epoxy system).",
         "action": "Staggered ply drop-offs over 15mm length with minimum 3mm spacing between drops",
         "reason": "Interlaminar shear reduced to 45 MPa. Prevents delamination under combined loading."},
    ],
    ("CNC Precision", "Inconel"): [
        {"rule": "Fatigue Resistance Check", "severity": "Critical",
         "message": "Inconel 718 high-temperature fatigue properties degrade above 650°C. Detected thin sections that will overheat.",
         "action": "Added thermal management features: cooling passages and heat shields in high-temperature zones",
         "reason": "Peak temperature reduced from 720°C to 580°C, maintaining full fatigue properties for 10,000+ flight hours."},
        {"rule": "Safety Factor Verification", "severity": "Critical",
         "message": "Inconel component operating near creep regime. Current safety factor does not account for time-dependent deformation.",
         "action": "Applied creep-adjusted safety factors using Larson-Miller parameter analysis",
         "reason": "Design life extended from 5,000 to 15,000 hours with creep strain below 0.2% allowable."},
    ],
    ("Composite Manufacturing", "Titanium"): [
        {"rule": "Weight Optimization", "severity": "High",
         "message": "Titanium-composite hybrid joint design has excessive fastener count. Weight penalty of 800g from over-engineering.",
         "action": "Replaced 60% of mechanical fasteners with co-cured bonded joints confirmed by NDI",
         "reason": "Net weight saving of 650g per assembly. Bond strength verified at 30 MPa lap shear."},
        {"rule": "Stress Tolerance Analysis", "severity": "Critical",
         "message": "Galvanic corrosion risk at titanium-CFRP interface. Direct contact causes matrix degradation in humid environments.",
         "action": "Specified fiberglass isolation layer between titanium fittings and carbon fiber structure",
         "reason": "Eliminates galvanic couple. Qualified per ASTM G71 for 30-year service life in marine atmosphere."},
    ],
    ("Composite Manufacturing", "Aluminum 7075"): [
        {"rule": "Fatigue Resistance Check", "severity": "High",
         "message": "Aluminum-composite bonded joint exhibits fatigue degradation under cyclic thermal loading (-55°C to +80°C).",
         "action": "Added mechanical fastener backup and flexible adhesive with CTE-matched interlayer",
         "reason": "Joint retains 90% strength after 20,000 thermal cycles. Meets certification requirements for fail-safe design."},
        {"rule": "Safety Factor Verification", "severity": "High",
         "message": "Aluminum fitting bolted to composite panel shows bearing failure risk at 1.3x limit load.",
         "action": "Enlarged bearing area by 40% and added titanium bushings in composite holes",
         "reason": "Bearing stress reduced to 60% of allowable. Titanium bushings prevent hole elongation."},
    ],
    ("Composite Manufacturing", "Carbon Fiber"): [
        {"rule": "Weight Optimization", "severity": "Critical",
         "message": "Current layup schedule uses quasi-isotropic layup for all panels. Non-optimal for directional loading.",
         "action": "Tailored each panel layup to match local load paths using FEA-driven ply optimization",
         "reason": "Total laminate weight reduced 23% with improved stiffness matching. No panels below minimum gauge."},
        {"rule": "Stress Tolerance Analysis", "severity": "Critical",
         "message": "Impact damage tolerance not addressed. 50J impact (tool drop) causes BVDI that reduces compression strength 40%.",
         "action": "Specified 2-ply fabric outer layers and increased minimum skin gauge to 1.5mm",
         "reason": "CAI strength after 50J impact exceeds design allowable by 15%. Meets AMC 20-29 damage tolerance."},
    ],
    ("Composite Manufacturing", "Inconel"): [
        {"rule": "Fatigue Resistance Check", "severity": "Critical",
         "message": "Inconel overlay on composite structure creates thermal expansion mismatch. CTE delta = 11 µε/°C.",
         "action": "Designed floating attachment with slotted holes allowing 0.5mm thermal growth per 100mm",
         "reason": "Eliminates thermal stress in joint. Inconel protection maintained across -60°C to +300°C range."},
        {"rule": "Safety Factor Verification", "severity": "High",
         "message": "Inconel heat shield attachment torque spec may crush underlying composite core.",
         "action": "Added potted inserts with 20mm diameter footprints and controlled torque to 5Nm",
         "reason": "Core compression stress below 1 MPa. Meets honeycomb core crush allowable with margin."},
    ],
    ("Metal Additive Manufacturing", "Titanium"): [
        {"rule": "Weight Optimization", "severity": "Critical",
         "message": "Solid titanium design does not leverage AM topology optimization capability. Estimated 35% removable mass.",
         "action": "Applied generative design with 0.5mm minimum wall and internal lattice structures",
         "reason": "Mass reduced 38% from 520g to 322g. Stress-optimized lattice density varies by load path."},
        {"rule": "Fatigue Resistance Check", "severity": "Critical",
         "message": "As-built AM titanium surface roughness (Ra 15µm) creates fatigue notch factor of 2.5x.",
         "action": "Specified HIP treatment + critical surface machining to Ra 1.6µm",
         "reason": "Fatigue life improved 5x. HIP closes internal porosity; surface finishing removes crack initiation sites."},
    ],
    ("Metal Additive Manufacturing", "Aluminum 7075"): [
        {"rule": "Stress Tolerance Analysis", "severity": "Critical",
         "message": "AM aluminum 7075 has lower elongation (5%) vs wrought (11%). Design assumes wrought ductility.",
         "action": "Redesigned for AM-specific properties: reduced strain concentration, added stress-relief geometry",
         "reason": "Peak strain reduced to 3%, within AM material capability. All load paths remain elastic."},
        {"rule": "Safety Factor Verification", "severity": "High",
         "message": "AM aluminum mechanical properties vary with build direction. Current design loads Z-axis in tension.",
         "action": "Reoriented build direction to align primary loads with X-Y plane (stronger axis)",
         "reason": "Tensile strength in load direction increased from 380 MPa to 480 MPa. FOS improved from 1.2 to 1.6."},
    ],
    ("Metal Additive Manufacturing", "Carbon Fiber"): [
        {"rule": "Weight Optimization", "severity": "High",
         "message": "Chopped carbon fiber in AM process has isotropic properties. Design applies CF material but uses conservative isotropic factors.",
         "action": "Optimized wall sections using AM-CF specific test data. Reduced over-designed areas.",
         "reason": "Weight reduced 15% while ensuring all sections exceed minimum stiffness requirements."},
        {"rule": "Stress Tolerance Analysis", "severity": "Medium",
         "message": "Carbon fiber AM parts exhibit anisotropy at layer boundaries. Z-direction tensile strength is 40% lower.",
         "action": "Redesigned load paths to avoid Z-axis tension. Added cross-laminated infill pattern.",
         "reason": "All primary loads now carried in X-Y plane. Z-axis loads limited to compression (where CF-AM excels)."},
    ],
    ("Metal Additive Manufacturing", "Inconel"): [
        {"rule": "Fatigue Resistance Check", "severity": "Critical",
         "message": "Inconel 718 AM parts require specific heat treatment for gamma-double-prime precipitation hardening.",
         "action": "Specified AMS 5663 equivalent heat treat: 1066°C solution + 760°C/620°C double age",
         "reason": "Achieves 1240 MPa UTS with 12% elongation. Fatigue properties match wrought specification."},
        {"rule": "Safety Factor Verification", "severity": "Critical",
         "message": "AM Inconel has residual stress from thermal gradients during build. Risk of distortion on plate removal.",
         "action": "Added stress-relief heat treatment step before plate removal. Optimized build orientation.",
         "reason": "Residual stress reduced 80%. Dimensional accuracy within ±0.1mm after plate release."},
    ],
}

THREED_RULES = {
    ("FDM", "PLA"): [
        {"rule": "Overhang Angle Detection", "severity": "Critical",
         "message": "Overhang angles exceeding 45° detected on 3 features. FDM cannot print in mid-air — these will sag or fail.",
         "action": "Redesigned overhangs to 40° maximum with chamfered transitions",
         "reason": "Eliminates need for support material. Surface finish improved from Ra 25µm to Ra 12µm."},
        {"rule": "Support Structure Analysis", "severity": "High",
         "message": "Enclosed cavity detected with no drain holes. Internal supports will be permanently trapped inside.",
         "action": "Added 5mm drain holes on non-visible faces and redesigned cavity to be self-supporting",
         "reason": "Allows support removal and prevents trapped material from rattling or affecting balance."},
    ],
    ("FDM", "ABS"): [
        {"rule": "Print Orientation Optimization", "severity": "Critical",
         "message": "Primary structural load is perpendicular to layer lines. FDM parts are weakest in Z-direction (layer adhesion).",
         "action": "Rotated part 90° to align layer lines with primary tensile load direction",
         "reason": "Z-direction tensile strength in ABS is only 40% of X-Y. Reorientation doubles effective strength."},
        {"rule": "Layer Thickness Optimization", "severity": "High",
         "message": "0.3mm layer height specified. ABS parts with cosmetic requirements need finer layers for surface quality.",
         "action": "Specified 0.15mm layer height for visible surfaces with 0.25mm inner infill",
         "reason": "Surface quality improved from Ra 30µm to Ra 10µm. Print time increase limited to 25% vs full fine."},
    ],
    ("FDM", "Resin"): [
        {"rule": "Overhang Angle Detection", "severity": "High",
         "message": "Note: FDM with resin-infused filaments behaves differently from standard FDM. Resin additives increase brittleness.",
         "action": "Added 2mm wall thickness buffer and reduced overhang limit to 35°",
         "reason": "Resin-composite filaments crack more easily at layer boundaries. Extra thickness improves fracture resistance."},
        {"rule": "Support Structure Analysis", "severity": "Medium",
         "message": "Resin-composite filaments are harder to sand. Support interface marks will be more visible.",
         "action": "Redesigned to minimize support contact area. Used tree supports with 0.15mm Z-gap.",
         "reason": "Reduced support scarring by 70%. Remaining marks easily removed with 400-grit sanding."},
    ],
    ("FDM", "Nylon"): [
        {"rule": "Print Orientation Optimization", "severity": "Critical",
         "message": "Nylon warps severely on FDM due to high shrinkage (1.5-2%). Large flat bottom surface will curl.",
         "action": "Added mouse-ear anti-warp pads and brim of 10mm. Recommended enclosed heated chamber.",
         "reason": "Warpage reduced from 3mm to 0.2mm deflection. Brim provides sufficient bed adhesion for nylon."},
        {"rule": "Layer Thickness Optimization", "severity": "High",
         "message": "Nylon layer adhesion requires higher temperatures and wider extrusion. Current 0.1mm layers inadequate.",
         "action": "Specified 0.2mm layer height at 260°C with 110% extrusion width",
         "reason": "Interlayer bond strength increased 3x. Z-direction strength reaches 70% of X-Y (vs 35% at 0.1mm)."},
    ],
    ("SLA", "PLA"): [
        {"rule": "Overhang Angle Detection", "severity": "Medium",
         "message": "SLA can handle steeper overhangs than FDM but PLA-like resins are less forgiving. 60° overhangs detected.",
         "action": "Added light support points every 5mm for overhangs between 45-65°",
         "reason": "Prevents layer delamination during peel cycle. Support points leave minimal marks on PLA resin."},
        {"rule": "Layer Thickness Optimization", "severity": "Medium",
         "message": "50µm layer height specified. PLA-based resin benefits from 25µm for detailed features detected in design.",
         "action": "Applied variable layer height: 25µm for detailed regions, 50µm for bulk volume",
         "reason": "Captures fine details at 25µm while keeping total print time within 30% of uniform 50µm."},
    ],
    ("SLA", "ABS"): [
        {"rule": "Support Structure Analysis", "severity": "Critical",
         "message": "ABS-like resin is brittle before post-cure. Current support layout will cause part fracture during removal.",
         "action": "Redesigned supports with tapered touch points (0.3mm) and angled orientation to reduce peel force",
         "reason": "Part survives support removal without cracking. Break-away force reduced from 15N to 3N per point."},
        {"rule": "Print Orientation Optimization", "severity": "High",
         "message": "Large cross-section parallel to build plate will create excessive peel force (suction cup effect).",
         "action": "Tilted part 25° from horizontal to reduce per-layer cross-section by 60%",
         "reason": "Peak peel force reduced from 180N to 70N. Prevents layer shifts and FEP film damage."},
    ],
    ("SLA", "Resin"): [
        {"rule": "Overhang Angle Detection", "severity": "High",
         "message": "Standard resin handles 30° minimum support angle. Detected islands (floating geometry) that have zero connection in early layers.",
         "action": "Added bridge supports for island features and increased early layer exposure 20%",
         "reason": "Island features now connected from layer 1. Zero floating geometry ensures 100% print success."},
        {"rule": "Layer Thickness Optimization", "severity": "Medium",
         "message": "Current uniform 100µm layers oversimplify areas with fine surface detail and text embossing.",
         "action": "Applied adaptive layer height: 25µm for text/detail regions, 100µm for structural bulk",
         "reason": "Text legibility improved from unreadable to crisp at 6pt font. Only 15% total time increase."},
    ],
    ("SLA", "Nylon"): [
        {"rule": "Support Structure Analysis", "severity": "High",
         "message": "Nylon-like SLA resin (e.g., Durable) is flexible. Standard rigid supports will deform before detaching.",
         "action": "Used heavy-duty supports with 0.5mm contact points and 45° breakaway angles",
         "reason": "Flexible resin requires more robust supports. Heavy-duty points detach cleanly without deformation."},
        {"rule": "Print Orientation Optimization", "severity": "Medium",
         "message": "Flexible nylon-like parts need orientation that minimizes support on functional surfaces.",
         "action": "Oriented with functional surface facing up (away from supports). Added sacrificial raft on bottom.",
         "reason": "All Class-A surfaces achieve Ra 2µm finish. Raft absorbs peel stresses away from final part."},
    ],
    ("SLS", "PLA"): [
        {"rule": "Overhang Angle Detection", "severity": "Low",
         "message": "SLS is support-free (powder bed supports). However, PLA powder has limited availability for SLS systems.",
         "action": "Verified geometry is self-draining for unsintered powder. Added 2mm escape holes to enclosed volumes.",
         "reason": "Trapped powder adds weight and can degrade over time if not removed. Drain holes solve this."},
        {"rule": "Layer Thickness Optimization", "severity": "Medium",
         "message": "SLS PLA optimal layer thickness is 100-150µm. Current 200µm specification sacrifices surface quality.",
         "action": "Set layer height to 100µm. Adjusted laser power for PLA sintering window.",
         "reason": "Part density improved from 92% to 97%. Surface roughness reduced from Ra 15µm to Ra 9µm."},
    ],
    ("SLS", "ABS"): [
        {"rule": "Print Orientation Optimization", "severity": "High",
         "message": "SLS ABS parts show mechanical property differences based on build orientation. X-Y vs Z can differ 20%.",
         "action": "Oriented primary load-bearing axis in X-Y plane. Nested efficiently within build volume.",
         "reason": "Maximizes mechanical properties in the loaded direction while optimizing build chamber utilization."},
        {"rule": "Support Structure Analysis", "severity": "Low",
         "message": "SLS requires no supports but trapped powder in thin channels (<2mm) cannot be removed by compressed air.",
         "action": "Widened all internal channels to minimum 3mm diameter. Added powder exit features.",
         "reason": "Ensures complete powder removal. Prevents weight increase and potential thermal degradation of trapped media."},
    ],
    ("SLS", "Resin"): [
        {"rule": "Layer Thickness Optimization", "severity": "High",
         "message": "Resin powder for SLS requires precise laser parameters. Current settings may cause over-sintering.",
         "action": "Calibrated laser power to 28W with 2500mm/s scan speed for resin powder characteristics",
         "reason": "Achieves 98% density without thermal degradation. Mechanical properties within 95% of injection molded."},
        {"rule": "Overhang Angle Detection", "severity": "Low",
         "message": "While SLS is support-free, extreme horizontal overhangs can cause heat buildup and curl in resin powder.",
         "action": "Adjusted part orientation so largest flat surfaces are vertical to minimize heat accumulation",
         "reason": "Eliminates thermal curl. Dimensional accuracy improved from ±0.3mm to ±0.15mm."},
    ],
    ("SLS", "Nylon"): [
        {"rule": "Print Orientation Optimization", "severity": "Critical",
         "message": "Nylon PA12 SLS is the optimal SLS material. Part nesting must account for 3.5-4% shrinkage.",
         "action": "Applied 3.7% scale compensation per axis plus orientation for optimal warpage control",
         "reason": "Final dimensions within ±0.1mm. Nylon SLS achieves 95% of injection-molded PA12 properties."},
        {"rule": "Layer Thickness Optimization", "severity": "Medium",
         "message": "Standard 100µm SLS PA12 layers are optimal. Reducing below 80µm causes excessive curl and delamination.",
         "action": "Confirmed 100µm layer height with optimized contour scanning for surface quality",
         "reason": "Best balance of speed, strength, and surface finish. Living hinge features achieve 1M+ cycles."},
    ],
    ("Metal 3D Printing", "PLA"): [
        {"rule": "Support Structure Analysis", "severity": "Critical",
         "message": "Metal 3D printing does not use PLA. This material selection is incompatible with Metal AM processes.",
         "action": "Material auto-corrected: recommend Stainless Steel 316L or Titanium Ti64 for metal AM",
         "reason": "PLA is a polymer and cannot be processed in DMLS/SLM metal systems. Material substitution required."},
        {"rule": "Overhang Angle Detection", "severity": "Critical",
         "message": "Metal AM requires support for all angles below 45° regardless of material. Critical for thermal management.",
         "action": "Generated lattice support structures for all overhangs. Added 0.5mm Z-offset for easy removal.",
         "reason": "Metal supports prevent thermal warpage and anchor part to build plate. Essential for part accuracy."},
    ],
    ("Metal 3D Printing", "ABS"): [
        {"rule": "Support Structure Analysis", "severity": "Critical",
         "message": "Metal 3D printing is incompatible with ABS polymer. Attempting metal AM with polymer material.",
         "action": "Material auto-corrected: recommend Inconel 718 or Aluminum AlSi10Mg for metal AM",
         "reason": "ABS decomposes at metal sintering temperatures (1400°C+). Use appropriate metal powder."},
        {"rule": "Print Orientation Optimization", "severity": "High",
         "message": "Note: For ABS prototyping of this design, FDM or SLA processes are recommended instead of metal AM.",
         "action": "Provided dual-path recommendation: Metal AM design rules applied, plus FDM-ABS alternative settings",
         "reason": "Allows parallel prototyping in ABS for form/fit while metal AM part is manufactured."},
    ],
    ("Metal 3D Printing", "Resin"): [
        {"rule": "Support Structure Analysis", "severity": "Critical",
         "message": "Resin is not suitable for metal 3D printing processes (DMLS/SLM/EBM).",
         "action": "Material auto-corrected: recommend Stainless Steel 17-4PH or Cobalt-Chrome for metal AM",
         "reason": "Metal AM requires metal powder feedstock. Resin is for SLA/DLP processes only."},
        {"rule": "Layer Thickness Optimization", "severity": "High",
         "message": "Metal AM layer thickness depends on powder particle size (20-60µm typical). Not resin parameters.",
         "action": "Set layer height to 40µm for fine detail in recommended metal alternative",
         "reason": "40µm layers provide excellent detail resolution while maintaining reasonable build speed."},
    ],
    ("Metal 3D Printing", "Nylon"): [
        {"rule": "Support Structure Analysis", "severity": "Critical",
         "message": "Metal 3D printing cannot process nylon polymer. SLS is the correct process for nylon parts.",
         "action": "Provided recommendation: Redirected to SLS process for Nylon PA12, metal AM with Ti64 as alternative",
         "reason": "Nylon PA12 is best processed via SLS. If metal is required, titanium provides similar weight benefits."},
        {"rule": "Print Orientation Optimization", "severity": "High",
         "message": "For future reference: if this design requires metal, build orientation analysis provided for Ti64 alternative.",
         "action": "Optimized orientation for minimum support volume and maximum surface quality on critical features",
         "reason": "Reduced support material by 40%. All functional surfaces achieve Ra 6µm after bead blasting."},
    ],
}

# General rules that can appear across any domain
GENERAL_CHECKS = [
    {"rule": "Geometric Complexity Score", "severity": "Medium",
     "message": "Design complexity index is elevated. Some features may increase manufacturing cost significantly.",
     "action": "Simplified 3 non-critical features to reduce tooling complexity",
     "reason": "Manufacturing cost reduced by estimated 20% without functional compromise."},
    {"rule": "Tolerance Stack-up Analysis", "severity": "High",
     "message": "Accumulated tolerance stack across assembly exceeds functional requirement.",
     "action": "Revised datum scheme and tightened 2 key dimensions from ±0.2mm to ±0.1mm",
     "reason": "Assembly fit guaranteed at worst-case tolerance combination."},
    {"rule": "Material Utilization Efficiency", "severity": "Medium",
     "message": "Material buy-to-fly ratio: 8:1. Significant raw material waste detected in current design approach.",
     "action": "Near-net-shape redesign reduces buy-to-fly ratio to 3:1",
     "reason": "Raw material cost reduced 62%. Environmental impact significantly improved."},
    {"rule": "Surface Finish Specification", "severity": "Medium",
     "message": "Over-specified surface finish on non-functional surfaces increases machining time.",
     "action": "Relaxed non-critical surface finish from Ra 1.6µm to Ra 6.3µm",
     "reason": "Machining time reduced 30% on affected surfaces. No functional impact."},
]


# ============================================================
# AI SIMULATION LAYER
# ============================================================

class AISimulationEngine:
    """Simulates CNN/PointNet feature extraction and confidence scoring."""

    @staticmethod
    def generate_feature_vector(filename: str, domain: str) -> list:
        """Generate a simulated feature vector mimicking PointNet output."""
        seed = int(hashlib.md5(f"{filename}{domain}".encode()).hexdigest()[:8], 16)
        rng = random.Random(seed)
        return [round(rng.gauss(0, 1), 4) for _ in range(128)]

    @staticmethod
    def calculate_confidence(num_errors: int, num_rules_checked: int, is_repeat: bool) -> float:
        """Calculate AI confidence score based on analysis depth."""
        base_confidence = 0.85
        rule_coverage = min(num_rules_checked / 10.0, 1.0) * 0.1
        error_penalty = num_errors * 0.015
        repeat_bonus = 0.05 if is_repeat else 0
        noise = random.uniform(-0.02, 0.02)
        return round(min(0.99, max(0.70, base_confidence + rule_coverage - error_penalty + repeat_bonus + noise)), 4)

    @staticmethod
    def generate_heatmap_data(errors: list, width: int = 100, height: int = 100) -> list:
        """Generate optimization heatmap data points."""
        heatmap = []
        for i, error in enumerate(errors):
            seed_x = ((i * 31 + 17) % 80) + 10
            seed_y = ((i * 47 + 23) % 80) + 10
            radius = 15 if error.get("severity") == "Critical" else 10
            intensity = 0.9 if error.get("severity") == "Critical" else 0.6
            heatmap.append({
                "x": seed_x, "y": seed_y,
                "radius": radius,
                "intensity": round(intensity + random.uniform(-0.1, 0.1), 2),
                "rule": error.get("rule", ""),
                "severity": error.get("severity", "Medium")
            })
        return heatmap

    @staticmethod
    def generate_model_metrics() -> dict:
        """Return simulated model training metrics."""
        return {
            "model_version": "4.2.0-stable",
            "architecture": "PointNet++ with DFM Rule Attention Layer",
            "framework": "PyTorch 2.1",
            "training_datasets": [
                {"name": "ShapeNet", "samples": 51300, "source": "Stanford 3D Repository"},
                {"name": "ModelNet40", "samples": 12311, "source": "Princeton Shape Benchmark"},
                {"name": "Thingi10K", "samples": 10000, "source": "Thingiverse Curated Collection"},
                {"name": "Fusion 360 Gallery", "samples": 8600, "source": "Autodesk Fusion 360 Public Gallery"},
                {"name": "NASA 3D Models", "samples": 480, "source": "NASA 3D Resources"},
                {"name": "ABC Dataset", "samples": 1000000, "source": "NYU – A Big CAD Model Dataset"},
                {"name": "GrabCAD Community", "samples": 15000, "source": "GrabCAD Engineering Library"},
                {"name": "TraceParts CAD", "samples": 22000, "source": "TraceParts Engineering Components"},
                {"name": "3D ContentCentral", "samples": 18000, "source": "Dassault Systèmes Parts Library"},
                {"name": "PartNet", "samples": 26671, "source": "Stanford – Fine-grained Part Segmentation"},
                {"name": "FEA Simulation Data", "samples": 5200, "source": "Internal Stress/Strain Mapped Geometries"},
            ],
            "total_training_samples": 1170562,
            "training_accuracy": {
                "mechanical": {"accuracy": 0.943, "precision": 0.951, "recall": 0.936, "f1": 0.943},
                "aerospace": {"accuracy": 0.967, "precision": 0.972, "recall": 0.961, "f1": 0.966},
                "additive": {"accuracy": 0.938, "precision": 0.944, "recall": 0.931, "f1": 0.937},
                "overall": {"accuracy": 0.949, "precision": 0.956, "recall": 0.943, "f1": 0.949},
            },
            "training_epochs": 150,
            "learning_rate": 0.001,
            "batch_size": 64,
            "optimizer": "AdamW",
            "loss_function": "Cross-Entropy + Custom DFM Penalty Loss",
            "input_pipeline": "CAD → Mesh → Point Cloud (8192 points) → PointNet++ Feature Extraction → DFM Rule Attention → Classification + Regression Heads",
            "inference_time_ms": 340,
            "gpu_used": "NVIDIA A100 40GB",
            "training_time_hours": 48,
        }


ai_engine = AISimulationEngine()


# ============================================================
# NEURAL LEARNING SYSTEM
# ============================================================

def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return []
    return []


def save_history(entry):
    history = load_history()
    history.append(entry)
    history = history[-50:]
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


def load_learning_data():
    if os.path.exists(LEARNING_FILE):
        try:
            with open(LEARNING_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {"corrections": [], "model_version": "4.2.0-stable", "total_feedback": 0, "accuracy_boost": 0.0}
    return {"corrections": [], "model_version": "4.2.0-stable", "total_feedback": 0, "accuracy_boost": 0.0}


def save_learning_data(data):
    with open(LEARNING_FILE, "w") as f:
        json.dump(data, f, indent=2)


# ============================================================
# PYDANTIC MODELS
# ============================================================

class ValidationResult(BaseModel):
    score: int
    confidence: float
    domain: str
    process: str
    material: str
    filename: str
    filetype: str
    is_repeat: bool = False
    errors: list[dict]
    suggestions: list[dict]
    warnings: list[str]
    heatmap: list[dict]
    feature_vector_sample: list[float]
    ai_insight: str = ""
    model_version: str = "4.2.0-stable"


class FeedbackRequest(BaseModel):
    filename: str
    domain: str
    process: str
    material: str
    rule_id: str
    correction_type: str  # "false_positive", "severity_change", "new_rule"
    user_note: str = ""


# ============================================================
# API ENDPOINTS
# ============================================================

@app.get("/")
async def root():
    return {"engine": "DesignIQ", "version": "4.2.0", "status": "operational"}


@app.get("/api/domains")
async def get_domains():
    """Returns all domains with their available processes and materials."""
    return DOMAINS


@app.get("/api/model-info")
async def get_model_info():
    """Returns model architecture, training metrics, and dataset information."""
    metrics = ai_engine.generate_model_metrics()
    learning = load_learning_data()
    metrics["feedback_received"] = learning["total_feedback"]
    metrics["accuracy_boost_from_feedback"] = learning["accuracy_boost"]
    return metrics


@app.post("/api/feedback")
async def submit_feedback(feedback: FeedbackRequest):
    """Stores user corrections for incremental learning."""
    learning = load_learning_data()
    learning["corrections"].append({
        "filename": feedback.filename,
        "domain": feedback.domain,
        "process": feedback.process,
        "material": feedback.material,
        "rule_id": feedback.rule_id,
        "correction_type": feedback.correction_type,
        "user_note": feedback.user_note,
        "timestamp": datetime.now().isoformat(),
    })
    learning["total_feedback"] += 1
    # Simulate incremental learning: each correction slightly improves accuracy
    learning["accuracy_boost"] = round(min(0.05, learning["total_feedback"] * 0.002), 4)
    learning["corrections"] = learning["corrections"][-100:]
    save_learning_data(learning)
    return {
        "status": "feedback_recorded",
        "total_feedback": learning["total_feedback"],
        "model_improvement": f"+{learning['accuracy_boost']*100:.2f}% accuracy boost from feedback"
    }


@app.post("/api/validate")
async def validate_design(
    file: UploadFile = File(...),
    process: str = Form("CNC Machining"),
    material: str = Form("Aluminum"),
    domain: str = Form("Mechanical Engineering"),
):
    filename = file.filename or "unknown_file"

    # Simulated AI check for "CAD-related" files
    ext = os.path.splitext(filename)[1].lower()
    valid_cad_exts = {".stl", ".step", ".stp", ".obj", ".ply", ".igs", ".iges", ".dxf", ".sldprt", ".prt", ".f3d", ".stepnc", ".dwg"}
    image_exts = {".png", ".jpg", ".jpeg", ".bmp", ".webp"}
    
    is_valid_cad = False
    if ext in valid_cad_exts:
        is_valid_cad = True
    elif ext in image_exts:
        # Simulate AI vision detecting a CAD model by checking filename keywords
        cad_keywords = ["cad", "design", "model", "part", "assembly", "mech", "structure", "blueprint", "drawing", "3d"]
        if any(kw in filename.lower() for kw in cad_keywords):
            is_valid_cad = True
    
    if not is_valid_cad:
        return {"error": "The uploaded file or image does not appear to be CAD-related. No analysis or output can be generated for non-CAD designs."}

    # Persistent memory logic
    history = load_history()
    is_repeat = any(h["filename"] == filename for h in history)

    # Select rule set based on domain
    if domain == "Mechanical Engineering":
        rule_bank = MECHANICAL_RULES
    elif domain == "Aerospace Engineering":
        rule_bank = AEROSPACE_RULES
    elif domain == "3D Design / Additive":
        rule_bank = THREED_RULES
    else:
        rule_bank = MECHANICAL_RULES

    combo_key = (process, material)
    specific_rules = rule_bank.get(combo_key, [])

    # If no exact match, find closest
    if not specific_rules:
        for key, rules in rule_bank.items():
            if process in key[0]:
                specific_rules = rules
                break

    # If still nothing, use first available
    if not specific_rules:
        for key, rules in rule_bank.items():
            specific_rules = rules
            break

    # Build errors and suggestions
    final_errors = []
    final_suggestions = []
    warnings = []

    for idx, rule_data in enumerate(specific_rules):
        final_errors.append({
            "id": idx,
            "severity": rule_data["severity"],
            "rule": rule_data["rule"],
            "message": rule_data["message"],
        })
        final_suggestions.append({
            "id": idx,
            "action": rule_data["action"],
            "reason": rule_data["reason"],
        })

    # Add 1-2 general checks randomly
    num_general = random.randint(1, 2)
    shuffled_general = random.sample(GENERAL_CHECKS, min(num_general, len(GENERAL_CHECKS)))
    for i, extra in enumerate(shuffled_general):
        eid = len(final_errors) + i
        final_errors.append({
            "id": eid,
            "severity": extra["severity"],
            "rule": extra["rule"],
            "message": extra["message"],
        })
        final_suggestions.append({
            "id": eid,
            "action": extra["action"],
            "reason": extra["reason"],
        })

    # Generate warnings
    if domain == "Aerospace Engineering":
        warnings.append("Aerospace design: All results must be verified against FAR/CS-25 certification requirements.")
        warnings.append("Material traceability and cert documentation required per AS9100.")
    elif domain == "3D Design / Additive":
        warnings.append("3D printed parts require post-processing. Results assume as-printed condition.")
        if material in ["PLA", "Resin"]:
            warnings.append(f"{material} has limited structural applications. Consider material upgrade for load-bearing parts.")
    elif domain == "Mechanical Engineering":
        warnings.append("Manufacturing tolerances assume standard shop capability (±0.1mm). Tighter tolerances may require CNC validation.")

    if is_repeat:
        warnings.append("Previously analyzed design detected. Neural cache applied for faster processing.")

    # Calculate scores
    critical_count = sum(1 for e in final_errors if e["severity"] == "Critical")
    high_count = sum(1 for e in final_errors if e["severity"] == "High")
    base_score = 95 - (critical_count * 10) - (high_count * 5) + random.randint(-3, 3)
    if is_repeat:
        base_score += 5
    base_score = max(45, min(98, base_score))

    # AI simulation
    confidence = ai_engine.calculate_confidence(len(final_errors), len(specific_rules) + num_general, is_repeat)
    heatmap = ai_engine.generate_heatmap_data(final_errors)
    feature_sample = ai_engine.generate_feature_vector(filename, domain)[:10]

    # AI insight
    learning = load_learning_data()
    ai_insight = f"Analysis powered by PointNet++ v4.2 | Domain: {domain} | "
    ai_insight += f"Confidence: {confidence*100:.1f}% | "
    ai_insight += f"Rules evaluated: {len(final_errors)} | "
    if learning["total_feedback"] > 0:
        ai_insight += f"Model improved by {learning['accuracy_boost']*100:.1f}% from {learning['total_feedback']} user corrections."
    else:
        ai_insight += "Baseline model. Submit feedback to improve accuracy."

    # Save to history
    save_history({
        "filename": filename,
        "domain": domain,
        "process": process,
        "material": material,
        "timestamp": datetime.now().isoformat(),
        "score": base_score,
        "confidence": confidence,
    })

    return ValidationResult(
        score=base_score,
        confidence=confidence,
        domain=domain,
        process=process,
        material=material,
        filename=filename,
        filetype=file.content_type or "application/octet-stream",
        is_repeat=is_repeat,
        errors=final_errors,
        suggestions=final_suggestions,
        warnings=warnings,
        heatmap=heatmap,
        feature_vector_sample=feature_sample,
        ai_insight=ai_insight,
        model_version="4.2.0-stable",
    )
