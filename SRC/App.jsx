import { useState, useEffect, useRef } from "react";

// ─── INITIAL CATALOGUE DATA ───────────────────────────────────────────────────
const CATEGORIES_DATA = [
  {
    id: "fasteners", name: "Fasteners & Bolts", icon: "🔩",
    items: [
      { id: "f1", name: "Hex Bolt M8", description: "Grade 8.8 zinc-plated hex bolt", image: null, variants: [{ size: "M8x20mm", price: 4.50, qty: 100 }, { size: "M8x40mm", price: 6.00, qty: 80 }, { size: "M8x60mm", price: 7.50, qty: 60 }] },
      { id: "f2", name: "Hex Bolt M10", description: "Grade 8.8 zinc-plated hex bolt", image: null, variants: [{ size: "M10x30mm", price: 6.50, qty: 90 }, { size: "M10x50mm", price: 8.00, qty: 70 }, { size: "M10x80mm", price: 10.00, qty: 50 }] },
      { id: "f3", name: "Coach Screw", description: "Heavy duty wood coach screw", image: null, variants: [{ size: "6x50mm", price: 3.50, qty: 200 }, { size: "6x75mm", price: 4.50, qty: 150 }, { size: "8x100mm", price: 6.00, qty: 100 }] },
      { id: "f4", name: "Cup Head Bolt", description: "Mushroom head carriage bolt", image: null, variants: [{ size: "M6x30mm", price: 3.00, qty: 150 }, { size: "M8x40mm", price: 4.50, qty: 120 }, { size: "M10x50mm", price: 6.00, qty: 90 }] },
      { id: "f5", name: "Nut M8", description: "Zinc-plated hex nut full", image: null, variants: [{ size: "M8", price: 1.20, qty: 500 }, { size: "M10", price: 1.80, qty: 400 }, { size: "M12", price: 2.50, qty: 300 }] },
      { id: "f6", name: "Spring Washer", description: "Split spring lock washer", image: null, variants: [{ size: "M6", price: 0.50, qty: 1000 }, { size: "M8", price: 0.80, qty: 800 }, { size: "M10", price: 1.00, qty: 600 }] },
      { id: "f7", name: "Flat Washer", description: "Form A flat steel washer", image: null, variants: [{ size: "M6", price: 0.40, qty: 1000 }, { size: "M8", price: 0.60, qty: 800 }, { size: "M10", price: 0.80, qty: 600 }] },
      { id: "f8", name: "Self-Tapping Screw", description: "Pan head self-tapping screw", image: null, variants: [{ size: "3.5x25mm", price: 0.80, qty: 500 }, { size: "4.2x38mm", price: 1.10, qty: 400 }, { size: "4.8x50mm", price: 1.50, qty: 300 }] },
      { id: "f9", name: "Anchor Bolt", description: "Concrete wedge anchor bolt", image: null, variants: [{ size: "M8x75mm", price: 8.50, qty: 100 }, { size: "M10x100mm", price: 11.00, qty: 80 }, { size: "M12x125mm", price: 14.00, qty: 60 }] },
      { id: "f10", name: "Toggle Bolt", description: "Wing toggle cavity bolt", image: null, variants: [{ size: "M5x75mm", price: 5.00, qty: 150 }, { size: "M6x100mm", price: 7.00, qty: 100 }, { size: "M8x125mm", price: 9.50, qty: 80 }] },
      { id: "f11", name: "Tek Screw", description: "Self-drilling hex head screw", image: null, variants: [{ size: "5.5x25mm", price: 1.20, qty: 500 }, { size: "5.5x50mm", price: 1.80, qty: 400 }, { size: "6.3x75mm", price: 2.50, qty: 300 }] },
      { id: "f12", name: "Rivet Nut", description: "Threaded blind rivet nut", image: null, variants: [{ size: "M6", price: 4.50, qty: 200 }, { size: "M8", price: 6.00, qty: 150 }, { size: "M10", price: 8.00, qty: 100 }] },
    ]
  },
  {
    id: "nails", name: "Nails & Staples", icon: "📌",
    items: [
      { id: "n1", name: "Common Round Wire Nail", description: "Bright finish round wire nails", image: null, variants: [{ size: "2\" (50mm)", price: 12.00, qty: 500 }, { size: "3\" (75mm)", price: 16.00, qty: 400 }, { size: "4\" (100mm)", price: 22.00, qty: 300 }] },
      { id: "n2", name: "Galvanised Clout Nail", description: "Hot dip galvanised clout nail", image: null, variants: [{ size: "2.5x50mm", price: 18.00, qty: 300 }, { size: "3.0x75mm", price: 24.00, qty: 250 }, { size: "3.5x100mm", price: 32.00, qty: 200 }] },
      { id: "n3", name: "Hardboard Pin", description: "Small head hardboard panel pin", image: null, variants: [{ size: "25mm", price: 8.00, qty: 1000 }, { size: "38mm", price: 10.00, qty: 800 }, { size: "50mm", price: 12.00, qty: 600 }] },
      { id: "n4", name: "Chipboard Screw", description: "Pozi countersunk chipboard screw", image: null, variants: [{ size: "4x40mm", price: 0.60, qty: 500 }, { size: "4x60mm", price: 0.80, qty: 400 }, { size: "5x80mm", price: 1.10, qty: 300 }] },
      { id: "n5", name: "Masonry Nail", description: "Cut masonry nail hardened", image: null, variants: [{ size: "50mm", price: 15.00, qty: 200 }, { size: "75mm", price: 20.00, qty: 150 }, { size: "100mm", price: 28.00, qty: 100 }] },
      { id: "n6", name: "Roofing Screw", description: "Hex washer head roofing screw", image: null, variants: [{ size: "45mm", price: 1.50, qty: 500 }, { size: "65mm", price: 2.00, qty: 400 }, { size: "90mm", price: 2.80, qty: 300 }] },
      { id: "n7", name: "Framing Nail", description: "Bright smooth shank framing nail", image: null, variants: [{ size: "3.1x90mm", price: 25.00, qty: 300 }, { size: "3.3x100mm", price: 30.00, qty: 250 }] },
      { id: "n8", name: "Concrete Nail", description: "Hardened steel concrete nail", image: null, variants: [{ size: "50mm", price: 18.00, qty: 200 }, { size: "75mm", price: 24.00, qty: 150 }, { size: "100mm", price: 32.00, qty: 100 }] },
      { id: "n9", name: "Joist Hanger Nail", description: "Short shank joist hanger nail", image: null, variants: [{ size: "30mm", price: 10.00, qty: 500 }, { size: "40mm", price: 13.00, qty: 400 }] },
      { id: "n10", name: "Staple Heavy Duty", description: "Galvanised heavy duty staple", image: null, variants: [{ size: "20mm", price: 8.00, qty: 1000 }, { size: "30mm", price: 10.00, qty: 800 }, { size: "40mm", price: 14.00, qty: 600 }] },
    ]
  {
    id: "plumbing", name: "Plumbing & Fittings", icon: "🚿",
    items: [
      { id: "p1", name: "BSP Nipple", description: "Galvanised BSP running nipple", image: null, variants: [{ size: "1/2\"", price: 18.00, qty: 50 }, { size: "3/4\"", price: 24.00, qty: 40 }, { size: "1\"", price: 32.00, qty: 30 }] },
      { id: "p2", name: "Elbow 90°", description: "Galvanised BSP elbow 90 degree", image: null, variants: [{ size: "1/2\"", price: 22.00, qty: 50 }, { size: "3/4\"", price: 30.00, qty: 40 }, { size: "1\"", price: 42.00, qty: 30 }] },
      { id: "p3", name: "Tee Equal", description: "Galvanised BSP equal tee", image: null, variants: [{ size: "1/2\"", price: 28.00, qty: 40 }, { size: "3/4\"", price: 38.00, qty: 30 }, { size: "1\"", price: 52.00, qty: 20 }] },
      { id: "p4", name: "Ball Valve", description: "Full bore brass ball valve", image: null, variants: [{ size: "1/2\"", price: 95.00, qty: 20 }, { size: "3/4\"", price: 125.00, qty: 15 }, { size: "1\"", price: 165.00, qty: 10 }] },
      { id: "p5", name: "Gate Valve", description: "Brass gate valve BSP", image: null, variants: [{ size: "1/2\"", price: 85.00, qty: 20 }, { size: "3/4\"", price: 115.00, qty: 15 }, { size: "1\"", price: 155.00, qty: 10 }] },
      { id: "p6", name: "CPVC Pipe", description: "Hot cold CPVC pressure pipe 1m", image: null, variants: [{ size: "15mm", price: 45.00, qty: 50 }, { size: "22mm", price: 65.00, qty: 40 }, { size: "28mm", price: 85.00, qty: 30 }] },
      { id: "p7", name: "uPVC Pressure Pipe", description: "uPVC class 9 pressure pipe 1m", image: null, variants: [{ size: "25mm", price: 38.00, qty: 50 }, { size: "32mm", price: 52.00, qty: 40 }, { size: "50mm", price: 88.00, qty: 30 }] },
      { id: "p8", name: "Teflon Tape", description: "PTFE thread seal tape 12m", image: null, variants: [{ size: "12mm x 12m", price: 8.50, qty: 200 }, { size: "19mm x 12m", price: 12.00, qty: 150 }] },
      { id: "p9", name: "Pipe Clamp", description: "Two bolt pipe clamp saddle", image: null, variants: [{ size: "20mm", price: 12.00, qty: 100 }, { size: "25mm", price: 15.00, qty: 80 }, { size: "32mm", price: 18.00, qty: 60 }] },
      { id: "p10", name: "Flexible Hose", description: "Stainless braided flexible hose", image: null, variants: [{ size: "300mm", price: 75.00, qty: 30 }, { size: "500mm", price: 95.00, qty: 25 }, { size: "800mm", price: 120.00, qty: 20 }] },
      { id: "p11", name: "Float Valve", description: "Brass float valve ballcock", image: null, variants: [{ size: "1/2\" Low", price: 65.00, qty: 30 }, { size: "1/2\" High", price: 65.00, qty: 30 }] },
      { id: "p12", name: "Pipe Reducer", description: "Galvanised BSP hex reducer", image: null, variants: [{ size: "3/4\" to 1/2\"", price: 22.00, qty: 40 }, { size: "1\" to 3/4\"", price: 28.00, qty: 30 }] },
    ]
  },
  {
    id: "electrical", name: "Electrical & Conduit", icon: "⚡",
    items: [
      { id: "e1", name: "Conduit Rigid PVC", description: "PVC rigid conduit pipe 3m", image: null, variants: [{ size: "20mm", price: 42.00, qty: 50 }, { size: "25mm", price: 52.00, qty: 40 }, { size: "32mm", price: 68.00, qty: 30 }] },
      { id: "e2", name: "Conduit Elbow PVC", description: "PVC conduit 90° elbow inspection", image: null, variants: [{ size: "20mm", price: 18.00, qty: 80 }, { size: "25mm", price: 22.00, qty: 60 }, { size: "32mm", price: 28.00, qty: 40 }] },
      { id: "e3", name: "Cable Tie", description: "Nylon UV-stabilised cable tie", image: null, variants: [{ size: "100mm", price: 0.30, qty: 1000 }, { size: "200mm", price: 0.50, qty: 800 }, { size: "300mm", price: 0.80, qty: 600 }] },
      { id: "e4", name: "Twin & Earth Cable", description: "1.5mm² 100m twin & earth cable", image: null, variants: [{ size: "1.5mm² 100m", price: 850.00, qty: 10 }, { size: "2.5mm² 100m", price: 1250.00, qty: 8 }, { size: "4mm² 100m", price: 1950.00, qty: 5 }] },
      { id: "e5", name: "DB Enclosure", description: "Surface mount distribution board", image: null, variants: [{ size: "4-way", price: 185.00, qty: 15 }, { size: "8-way", price: 245.00, qty: 10 }, { size: "12-way", price: 325.00, qty: 8 }] },
      { id: "e6", name: "MCB Breaker", description: "Single pole miniature circuit breaker", image: null, variants: [{ size: "10A", price: 65.00, qty: 50 }, { size: "16A", price: 65.00, qty: 50 }, { size: "20A", price: 68.00, qty: 40 }, { size: "32A", price: 72.00, qty: 30 }] },
      { id: "e7", name: "Conduit Saddle", description: "Heavy duty conduit saddle clip", image: null, variants: [{ size: "20mm", price: 3.50, qty: 200 }, { size: "25mm", price: 4.50, qty: 150 }, { size: "32mm", price: 5.50, qty: 100 }] },
      { id: "e8", name: "Junction Box", description: "IP65 weatherproof junction box", image: null, variants: [{ size: "80x80mm", price: 45.00, qty: 50 }, { size: "100x100mm", price: 58.00, qty: 40 }, { size: "150x150mm", price: 85.00, qty: 25 }] },
      { id: "e9", name: "Earth Clamp", description: "Bronze earth rod clamp", image: null, variants: [{ size: "1/2\"", price: 28.00, qty: 50 }, { size: "5/8\"", price: 35.00, qty: 40 }] },
      { id: "e10", name: "Wire Connector", description: "Push-in spring wire connector", image: null, variants: [{ size: "2-way", price: 4.50, qty: 200 }, { size: "3-way", price: 5.50, qty: 150 }, { size: "5-way", price: 7.50, qty: 100 }] },
        ]
  },
  {
    id: "hand_tools", name: "Hand Tools", icon: "🔨",
    items: [
      { id: "ht1", name: "Hammer Claw", description: "Fibreglass handle claw hammer", image: null, variants: [{ size: "450g", price: 195.00, qty: 20 }, { size: "570g", price: 225.00, qty: 15 }] },
      { id: "ht2", name: "Screwdriver Set", description: "6-piece CR-V screwdriver set", image: null, variants: [{ size: "6-piece", price: 285.00, qty: 15 }, { size: "10-piece", price: 425.00, qty: 10 }] },
      { id: "ht3", name: "Spanner Set", description: "Combination spanner set metric", image: null, variants: [{ size: "6-piece 8-17mm", price: 345.00, qty: 10 }, { size: "12-piece 6-22mm", price: 595.00, qty: 8 }] },
      { id: "ht4", name: "Allen Key Set", description: "Long arm hex key set metric", image: null, variants: [{ size: "9-piece metric", price: 145.00, qty: 20 }, { size: "9-piece imperial", price: 145.00, qty: 20 }] },
      { id: "ht5", name: "Spirit Level", description: "Aluminium box section spirit level", image: null, variants: [{ size: "600mm", price: 185.00, qty: 15 }, { size: "1000mm", price: 265.00, qty: 10 }, { size: "1200mm", price: 295.00, qty: 8 }] },
      { id: "ht6", name: "Tape Measure", description: "Bi-material rubber grip tape measure", image: null, variants: [{ size: "5m", price: 95.00, qty: 30 }, { size: "8m", price: 135.00, qty: 20 }, { size: "10m", price: 165.00, qty: 15 }] },
      { id: "ht7", name: "Hacksaw", description: "Heavy duty bi-metal hacksaw", image: null, variants: [{ size: "Standard", price: 145.00, qty: 15 }, { size: "Junior", price: 65.00, qty: 20 }] },
      { id: "ht8", name: "Chisel Set", description: "Wood chisel set with case", image: null, variants: [{ size: "4-piece", price: 265.00, qty: 10 }, { size: "6-piece", price: 385.00, qty: 8 }] },
      { id: "ht9", name: "Utility Knife", description: "Heavy duty retractable utility knife", image: null, variants: [{ size: "Standard", price: 65.00, qty: 30 }, { size: "Heavy Duty", price: 95.00, qty: 20 }] },
      { id: "ht10", name: "Pliers Set", description: "3-piece combination pliers set", image: null, variants: [{ size: "3-piece 200mm", price: 245.00, qty: 15 }] },
      { id: "ht11", name: "Hammer Ball Peen", description: "Fibreglass ball peen hammer", image: null, variants: [{ size: "300g", price: 155.00, qty: 15 }, { size: "450g", price: 185.00, qty: 12 }] },
      { id: "ht12", name: "Mallet Rubber", description: "Non-marking rubber mallet", image: null, variants: [{ size: "400g", price: 125.00, qty: 20 }, { size: "600g", price: 155.00, qty: 15 }] },
    ]
  },
  {
    id: "power_tools", name: "Power Tools", icon: "🔧",
    items: [
      { id: "pt1", name: "Drill Cordless", description: "18V brushless cordless drill/driver", image: null, variants: [{ size: "18V 2Ah", price: 1850.00, qty: 8 }, { size: "18V 4Ah", price: 2250.00, qty: 5 }] },
      { id: "pt2", name: "Angle Grinder", description: "850W angle grinder", image: null, variants: [{ size: "115mm", price: 895.00, qty: 10 }, { size: "125mm", price: 985.00, qty: 8 }, { size: "230mm", price: 1450.00, qty: 5 }] },
      { id: "pt3", name: "Jigsaw", description: "550W variable speed jigsaw", image: null, variants: [{ size: "550W", price: 1250.00, qty: 8 }, { size: "700W", price: 1650.00, qty: 5 }] },
      { id: "pt4", name: "Circular Saw", description: "1200W circular saw 185mm", image: null, variants: [{ size: "1200W 185mm", price: 1650.00, qty: 6 }, { size: "1500W 210mm", price: 2150.00, qty: 4 }] },
      { id: "pt5", name: "Rotary Hammer", description: "SDS+ rotary hammer drill", image: null, variants: [{ size: "800W 22mm", price: 1950.00, qty: 6 }, { size: "1100W 28mm", price: 2850.00, qty: 4 }] },
      { id: "pt6", name: "Random Orbital Sander", description: "125mm random orbital sander 300W", image: null, variants: [{ size: "300W", price: 895.00, qty: 10 }, { size: "400W", price: 1150.00, qty: 8 }] },
      { id: "pt7", name: "Impact Wrench", description: "18V cordless impact wrench", image: null, variants: [{ size: "18V 1/2\"", price: 2250.00, qty: 5 }, { size: "18V 3/4\"", price: 2850.00, qty: 3 }] },
      { id: "pt8", name: "Drill Bit Set", description: "HSS cobalt drill bit set", image: null, variants: [{ size: "13-piece 1-13mm", price: 285.00, qty: 20 }, { size: "19-piece 1-10mm", price: 385.00, qty: 15 }] },
      { id: "pt9", name: "Reciprocating Saw", description: "950W reciprocating saw variable speed", image: null, variants: [{ size: "950W", price: 1450.00, qty: 6 }] },
      { id: "pt10", name: "Heat Gun", description: "2000W variable temperature heat gun", image: null, variants: [{ size: "1600W", price: 650.00, qty: 10 }, { size: "2000W", price: 895.00, qty: 8 }] },
    ]
  },
  {
    id: "abrasives", name: "Abrasives & Grinding", icon: "⚙️",
    items: [
      { id: "a1", name: "Grinding Disc", description: "Aluminium oxide grinding disc", image: null, variants: [{ size: "115mm", price: 18.00, qty: 50 }, { size: "125mm", price: 22.00, qty: 50 }, { size: "230mm", price: 45.00, qty: 25 }] },
      { id: "a2", name: "Cutting Disc", description: "Thin cut-off disc metal/inox", image: null, variants: [{ size: "115x1mm", price: 12.00, qty: 100 }, { size: "125x1mm", price: 14.00, qty: 100 }, { size: "230x1.9mm", price: 28.00, qty: 50 }] },
      { id: "a3", name: "Flap Disc", description: "Zirconia alumina flap disc", image: null, variants: [{ size: "115mm 40G", price: 35.00, qty: 40 }, { size: "125mm 60G", price: 42.00, qty: 40 }, { size: "125mm 80G", price: 42.00, qty: 40 }] },
      { id: "a4", name: "Sandpaper Sheet", description: "Aluminium oxide sandpaper sheet", image: null, variants: [{ size: "60G", price: 4.50, qty: 200 }, { size: "80G", price: 4.50, qty: 200 }, { size: "120G", price: 4.50, qty: 200 }, { size: "180G", price: 4.50, qty: 200 }] },
      { id: "a5", name: "Sanding Disc 125mm", description: "Hook & loop sanding disc 125mm", image: null, variants: [{ size: "40G", price: 8.00, qty: 100 }, { size: "80G", price: 8.00, qty: 100 }, { size: "120G", price: 8.00, qty: 100 }] },
      { id: "a6", name: "Wire Brush Cup", description: "Knotted wire cup brush", image: null, variants: [{ size: "65mm", price: 45.00, qty: 30 }, { size: "75mm", price: 52.00, qty: 25 }] },
      { id: "a7", name: "Wire Brush Flat", description: "Steel wire flat brush", image: null, variants: [{ size: "Hand brush", price: 28.00, qty: 50 }] },
      { id: "a8", name: "Diamond Blade", description: "Segmented diamond cutting blade", image: null, variants: [{ size: "115mm", price: 125.00, qty: 20 }, { size: "230mm", price: 245.00, qty: 10 }, { size: "300mm", price: 385.00, qty: 8 }] },
      { id: "a9", name: "Emery Cloth Roll", description: "Emery cloth roll 50m", image: null, variants: [{ size: "50mm x 50m 60G", price: 185.00, qty: 10 }, { size: "50mm x 50m 120G", price: 185.00, qty: 10 }] },
      { id: "a10", name: "Polishing Disc", description: "Foam polishing pad 125mm", image: null, variants: [{ size: "125mm orange", price: 35.00, qty: 30 }, { size: "125mm black", price: 35.00, qty: 30 }] },
    ]
  },
  {
    id: "adhesives", name: "Adhesives & Sealants", icon: "🔗",
    items: [
      { id: "ad1", name: "Silicone Sealant", description: "Neutral cure silicone sealant 300ml", image: null, variants: [{ size: "300ml White", price: 65.00, qty: 30 }, { size: "300ml Clear", price: 65.00, qty: 30 }, { size: "300ml Black", price: 65.00, qty: 25 }] },
      { id: "ad2", name: "Acrylic Sealant", description: "Paintable acrylic gap sealant 300ml", image: null, variants: [{ size: "300ml White", price: 42.00, qty: 40 }, { size: "300ml Beige", price: 42.00, qty: 30 }] },
      { id: "ad3", name: "Construction Adhesive", description: "High strength construction adhesive 300ml", image: null, variants: [{ size: "300ml", price: 75.00, qty: 25 }, { size: "500ml", price: 115.00, qty: 15 }] },
      { id: "ad4", name: "Epoxy Adhesive", description: "5-minute two-part epoxy adhesive", image: null, variants: [{ size: "25ml", price: 55.00, qty: 50 }, { size: "56ml", price: 85.00, qty: 30 }] },
      { id: "ad5", name: "Contact Adhesive", description: "Solvent-based contact cement 1L", image: null, variants: [{ size: "500ml", price: 95.00, qty: 20 }, { size: "1L", price: 165.00, qty: 15 }, { size: "5L", price: 650.00, qty: 5 }] },
      { id: "ad6", name: "PVA Adhesive", description: "Multi-purpose PVA woodglue", image: null, variants: [{ size: "500ml", price: 55.00, qty: 30 }, { size: "1L", price: 95.00, qty: 20 }, { size: "5L", price: 380.00, qty: 8 }] },
      { id: "ad7", name: "Foam Sealant", description: "Expanding PU foam sealant 750ml", image: null, variants: [{ size: "750ml", price: 95.00, qty: 25 }, { size: "750ml Gun-grade", price: 125.00, qty: 15 }] },
      { id: "ad8", name: "Thread Sealant", description: "Anaerobic thread locking compound", image: null, variants: [{ size: "10ml Medium", price: 65.00, qty: 30 }, { size: "10ml High Strength", price: 65.00, qty: 25 }] },
      { id: "ad9", name: "Weatherseal Tape", description: "Self-adhesive EPDM weatherseal", image: null, variants: [{ size: "9x4mm x 5m", price: 38.00, qty: 50 }, { size: "12x4mm x 5m", price: 45.00, qty: 40 }] },
      { id: "ad10", name: "Double-Sided Tape", description: "Heavy duty double-sided mounting tape", image: null, variants: [{ size: "19mm x 5m", price: 28.00, qty: 80 }, { size: "25mm x 5m", price: 35.00, qty: 60 }] },
      {
    id: "adhesives", name: "Adhesives & Sealants", icon: "🔗",
    items: [
      { id: "ad1", name: "Silicone Sealant", description: "Neutral cure silicone sealant 300ml", image: null, variants: [{ size: "300ml White", price: 65.00, qty: 30 }, { size: "300ml Clear", price: 65.00, qty: 30 }, { size: "300ml Black", price: 65.00, qty: 25 }] },
      { id: "ad2", name: "Acrylic Sealant", description: "Paintable acrylic gap sealant 300ml", image: null, variants: [{ size: "300ml White", price: 42.00, qty: 40 }, { size: "300ml Beige", price: 42.00, qty: 30 }] },
      { id: "ad3", name: "Construction Adhesive", description: "High strength construction adhesive 300ml", image: null, variants: [{ size: "300ml", price: 75.00, qty: 25 }, { size: "500ml", price: 115.00, qty: 15 }] },
      { id: "ad4", name: "Epoxy Adhesive", description: "5-minute two-part epoxy adhesive", image: null, variants: [{ size: "25ml", price: 55.00, qty: 50 }, { size: "56ml", price: 85.00, qty: 30 }] },
      { id: "ad5", name: "Contact Adhesive", description: "Solvent-based contact cement 1L", image: null, variants: [{ size: "500ml", price: 95.00, qty: 20 }, { size: "1L", price: 165.00, qty: 15 }, { size: "5L", price: 650.00, qty: 5 }] },
      { id: "ad6", name: "PVA Adhesive", description: "Multi-purpose PVA woodglue", image: null, variants: [{ size: "500ml", price: 55.00, qty: 30 }, { size: "1L", price: 95.00, qty: 20 }, { size: "5L", price: 380.00, qty: 8 }] },
      { id: "ad7", name: "Foam Sealant", description: "Expanding PU foam sealant 750ml", image: null, variants: [{ size: "750ml", price: 95.00, qty: 25 }, { size: "750ml Gun-grade", price: 125.00, qty: 15 }] },
      { id: "ad8", name: "Thread Sealant", description: "Anaerobic thread locking compound", image: null, variants: [{ size: "10ml Medium", price: 65.00, qty: 30 }, { size: "10ml High Strength", price: 65.00, qty: 25 }] },
      { id: "ad9", name: "Weatherseal Tape", description: "Self-adhesive EPDM weatherseal", image: null, variants: [{ size: "9x4mm x 5m", price: 38.00, qty: 50 }, { size: "12x4mm x 5m", price: 45.00, qty: 40 }] },
      { id: "ad10", name: "Double-Sided Tape", description: "Heavy duty double-sided mounting tape", image: null, variants: [{ size: "19mm x 5m", price: 28.00, qty: 80 }, { size: "25mm x 5m", price: 35.00, qty: 60 }] },
    ]
  },
  {
    id: "paint", name: "Paint & Coatings", icon: "🎨",
    items: [
      { id: "pa1", name: "PVA Wall Paint", description: "Interior PVA water-based wall paint", image: null, variants: [{ size: "1L White", price: 95.00, qty: 30 }, { size: "5L White", price: 385.00, qty: 15 }, { size: "20L White", price: 1350.00, qty: 5 }] },
      { id: "pa2", name: "Alkyd Enamel", description: "Gloss alkyd enamel oil paint", image: null, variants: [{ size: "500ml White", price: 78.00, qty: 30 }, { size: "1L White", price: 135.00, qty: 20 }, { size: "5L White", price: 565.00, qty: 8 }] },
      { id: "pa3", name: "Rust Paint", description: "Anti-rust primer & topcoat in one", image: null, variants: [{ size: "500ml Black", price: 85.00, qty: 25 }, { size: "500ml Red Oxide", price: 85.00, qty: 25 }, { size: "1L Black", price: 155.00, qty: 15 }] },
      { id: "pa4", name: "Bitumen Paint", description: "Black bituminous waterproof coating", image: null, variants: [{ size: "1L", price: 95.00, qty: 20 }, { size: "5L", price: 395.00, qty: 10 }] },
      { id: "pa5", name: "Roof Paint", description: "Acrylic waterproof roof coating", image: null, variants: [{ size: "5L Red", price: 485.00, qty: 10 }, { size: "5L Grey", price: 485.00, qty: 10 }, { size: "20L Red", price: 1650.00, qty: 4 }] },
      { id: "pa6", name: "Paint Roller Set", description: "9\" roller frame + tray + sleeve", image: null, variants: [{ size: "9\" Set", price: 95.00, qty: 30 }, { size: "12\" Set", price: 125.00, qty: 20 }] },
      { id: "pa7", name: "Paint Brush Set", description: "Synthetic bristle paint brush set", image: null, variants: [{ size: "3-piece flat", price: 65.00, qty: 30 }, { size: "5-piece mixed", price: 95.00, qty: 20 }] },
      { id: "pa8", name: "Masking Tape", description: "Crepe masking tape", image: null, variants: [{ size: "18mm x 50m", price: 22.00, qty: 100 }, { size: "24mm x 50m", price: 28.00, qty: 80 }, { size: "48mm x 50m", price: 45.00, qty: 50 }] },
      { id: "pa9", name: "Paint Thinner", description: "Mineral turpentine paint thinner", image: null, variants: [{ size: "500ml", price: 35.00, qty: 50 }, { size: "1L", price: 58.00, qty: 30 }, { size: "5L", price: 225.00, qty: 10 }] },
      { id: "pa10", name: "Primer Undercoat", description: "Universal primer undercoat", image: null, variants: [{ size: "1L White", price: 115.00, qty: 25 }, { size: "5L White", price: 465.00, qty: 8 }] },
    ]
  },
  {
    id: "safety", name: "Safety & PPE", icon: "🦺",
    items: [
      { id: "s1", name: "Safety Helmet", description: "ANSI Type 1 hard hat", image: null, variants: [{ size: "White", price: 85.00, qty: 30 }, { size: "Yellow", price: 85.00, qty: 30 }, { size: "Red", price: 85.00, qty: 20 }] },
      { id: "s2", name: "Safety Glasses", description: "Clear lens anti-fog safety glasses", image: null, variants: [{ size: "Clear", price: 28.00, qty: 100 }, { size: "Tinted", price: 28.00, qty: 80 }] },
      { id: "s3", name: "Safety Gloves", description: "Cut-resistant work gloves", image: null, variants: [{ size: "S", price: 38.00, qty: 30 }, { size: "M", price: 38.00, qty: 50 }, { size: "L", price: 38.00, qty: 50 }, { size: "XL", price: 38.00, qty: 30 }] },
      { id: "s4", name: "Dust Mask FFP2", description: "Fold flat FFP2 respirator mask", image: null, variants: [{ size: "FFP2 (5-pack)", price: 55.00, qty: 50 }, { size: "FFP3 (5-pack)", price: 85.00, qty: 30 }] },
      { id: "s5", name: "Ear Defenders", description: "Over-ear noise reduction defenders SNR 28dB", image: null, variants: [{ size: "SNR 28dB", price: 95.00, qty: 25 }, { size: "SNR 35dB", price: 135.00, qty: 15 }] },
      { id: "s6", name: "Hi-Vis Vest", description: "Class 2 high visibility safety vest", image: null, variants: [{ size: "M/L", price: 45.00, qty: 50 }, { size: "XL/XXL", price: 45.00, qty: 40 }] },
      { id: "s7", name: "Safety Boots", description: "Steel toe cap safety boot S1P", image: null, variants: [{ size: "6", price: 485.00, qty: 10 }, { size: "7", price: 485.00, qty: 10 }, { size: "8", price: 485.00, qty: 10 }, { size: "9", price: 485.00, qty: 10 }, { size: "10", price: 485.00, qty: 8 }] },
      { id: "s8", name: "First Aid Kit", description: "Complete workshop first aid kit", image: null, variants: [{ size: "Small (50 person)", price: 285.00, qty: 15 }, { size: "Large (100 person)", price: 485.00, qty: 8 }] },
      { id: "s9", name: "Fall Arrest Harness", description: "Full body fall arrest safety harness", image: null, variants: [{ size: "Universal", price: 685.00, qty: 10 }] },
      { id: "s10", name: "Knee Pads", description: "Professional foam knee protection pads", image: null, variants: [{ size: "Universal", price: 125.00, qty: 25 }] },
      {
    id: "steel", name: "Steel & Metal Stock", icon: "🏗️",
    items: [
      { id: "st1", name: "Angle Iron", description: "Equal angle iron 6m length", image: null, variants: [{ size: "25x25x3mm", price: 185.00, qty: 20 }, { size: "40x40x4mm", price: 295.00, qty: 15 }, { size: "50x50x5mm", price: 425.00, qty: 10 }] },
      { id: "st2", name: "Flat Bar", description: "Hot rolled steel flat bar 6m", image: null, variants: [{ size: "25x5mm", price: 145.00, qty: 20 }, { size: "40x6mm", price: 225.00, qty: 15 }, { size: "50x8mm", price: 345.00, qty: 10 }] },
      { id: "st3", name: "Square Bar", description: "Mild steel square bar 6m", image: null, variants: [{ size: "12x12mm", price: 165.00, qty: 15 }, { size: "16x16mm", price: 245.00, qty: 10 }, { size: "20x20mm", price: 345.00, qty: 8 }] },
      { id: "st4", name: "Round Bar", description: "Mild steel round bar 6m", image: null, variants: [{ size: "10mm", price: 125.00, qty: 15 }, { size: "12mm", price: 165.00, qty: 12 }, { size: "16mm", price: 245.00, qty: 10 }] },
      { id: "st5", name: "Square Tube", description: "Mild steel square hollow tube 6m", image: null, variants: [{ size: "25x25x2mm", price: 245.00, qty: 15 }, { size: "40x40x3mm", price: 385.00, qty: 10 }, { size: "50x50x3mm", price: 465.00, qty: 8 }] },
      { id: "st6", name: "Rectangular Tube", description: "Mild steel rectangular tube 6m", image: null, variants: [{ size: "25x50x2mm", price: 285.00, qty: 12 }, { size: "40x80x3mm", price: 465.00, qty: 8 }] },
      { id: "st7", name: "I-Beam", description: "Universal column I-beam 6m", image: null, variants: [{ size: "100x50mm", price: 1250.00, qty: 5 }, { size: "125x65mm", price: 1650.00, qty: 4 }] },
      { id: "st8", name: "Sheet Metal", description: "Galvanised sheet metal 2440x1220mm", image: null, variants: [{ size: "0.5mm", price: 285.00, qty: 20 }, { size: "0.8mm", price: 385.00, qty: 15 }, { size: "1.0mm", price: 465.00, qty: 10 }] },
      { id: "st9", name: "Aluminium Flat Bar", description: "Aluminium flat bar 6m", image: null, variants: [{ size: "25x3mm", price: 185.00, qty: 15 }, { size: "40x5mm", price: 295.00, qty: 10 }] },
      { id: "st10", name: "Stainless Rod", description: "316 grade stainless steel round rod 3m", image: null, variants: [{ size: "8mm", price: 185.00, qty: 15 }, { size: "10mm", price: 245.00, qty: 10 }, { size: "12mm", price: 325.00, qty: 8 }] },
    ]
  },
  {
    id: "locks", name: "Locks & Security", icon: "🔒",
    items: [
      { id: "l1", name: "Mortise Lock", description: "60mm backset mortise door lock", image: null, variants: [{ size: "60mm backset", price: 285.00, qty: 20 }, { size: "70mm backset", price: 295.00, qty: 15 }] },
      { id: "l2", name: "Padlock", description: "Hardened steel shackle padlock", image: null, variants: [{ size: "40mm", price: 125.00, qty: 30 }, { size: "50mm", price: 165.00, qty: 25 }, { size: "60mm", price: 225.00, qty: 20 }] },
      { id: "l3", name: "Deadbolt Lock", description: "Single cylinder deadbolt lock", image: null, variants: [{ size: "60mm backset", price: 195.00, qty: 20 }, { size: "70mm backset", price: 205.00, qty: 15 }] },
      { id: "l4", name: "Door Handle Set", description: "Lever on rose door handle set", image: null, variants: [{ size: "Satin Chrome", price: 245.00, qty: 20 }, { size: "Polished Brass", price: 265.00, qty: 15 }, { size: "Matt Black", price: 285.00, qty: 15 }] },
      { id: "l5", name: "Door Closer", description: "Adjustable overhead door closer", image: null, variants: [{ size: "Size 2", price: 345.00, qty: 15 }, { size: "Size 3", price: 385.00, qty: 12 }, { size: "Size 4", price: 425.00, qty: 8 }] },
      { id: "l6", name: "Hinge Butt", description: "Solid brass butt hinge pair", image: null, variants: [{ size: "75mm", price: 65.00, qty: 50 }, { size: "100mm", price: 85.00, qty: 40 }, { size: "125mm", price: 115.00, qty: 30 }] },
      { id: "l7", name: "Gate Latch", description: "Galvanised rising gate latch", image: null, variants: [{ size: "Standard", price: 78.00, qty: 30 }, { size: "Heavy Duty", price: 115.00, qty: 20 }] },
      { id: "l8", name: "Security Chain", description: "8mm hardened steel security chain 1m", image: null, variants: [{ size: "1m", price: 185.00, qty: 20 }, { size: "2m", price: 325.00, qty: 12 }] },
      { id: "l9", name: "Hasp & Staple", description: "Zinc die-cast hasp and staple", image: null, variants: [{ size: "75mm", price: 45.00, qty: 40 }, { size: "100mm", price: 58.00, qty: 30 }] },
      { id: "l10", name: "Door Stop", description: "Satin chrome floor-mounted door stop", image: null, variants: [{ size: "Floor mount", price: 55.00, qty: 40 }, { size: "Wall mount", price: 45.00, qty: 40 }] },
    ]
  },
  {
    id: "roofing", name: "Roofing & Cladding", icon: "🏠",
    items: [
      { id: "r1", name: "IBR Sheeting", description: "0.47mm IBR profile roofing sheet per metre", image: null, variants: [{ size: "686mm wide per 1m", price: 165.00, qty: 100 }, { size: "686mm wide per 3m", price: 445.00, qty: 50 }] },
      { id: "r2", name: "Corrugated Sheet", description: "0.47mm corrugated iron sheet per metre", image: null, variants: [{ size: "762mm wide per 1m", price: 145.00, qty: 100 }, { size: "762mm wide per 3m", price: 395.00, qty: 50 }] },
      { id: "r3", name: "Ridge Cap", description: "Galvanised ridge cap 2.5m", image: null, variants: [{ size: "IBR profile", price: 185.00, qty: 30 }, { size: "Corrugated profile", price: 175.00, qty: 30 }] },
      { id: "r4", name: "Flashband Tape", description: "Self-adhesive bitumen flashband roll", image: null, variants: [{ size: "100mm x 10m", price: 185.00, qty: 20 }, { size: "150mm x 10m", price: 245.00, qty: 15 }, { size: "225mm x 10m", price: 345.00, qty: 10 }] },
      { id: "r5", name: "Guttering PVC", description: "PVC half-round gutter 4m", image: null, variants: [{ size: "100mm Brown", price: 155.00, qty: 25 }, { size: "100mm White", price: 155.00, qty: 25 }, { size: "150mm Brown", price: 215.00, qty: 15 }] },
      { id: "r6", name: "Downpipe PVC", description: "PVC round downpipe 4m", image: null, variants: [{ size: "68mm Brown", price: 125.00, qty: 25 }, { size: "68mm White", price: 125.00, qty: 25 }] },
      { id: "r7", name: "Roofing Felt", description: "15kg bitumen roofing felt 10m", image: null, variants: [{ size: "1m x 10m", price: 245.00, qty: 20 }] },
      { id: "r8", name: "Fibre Cement Board", description: "6mm Nutec fibre cement board", image: null, variants: [{ size: "1200x2400mm", price: 285.00, qty: 20 }, { size: "1200x3000mm", price: 345.00, qty: 15 }] },
      { id: "r9", name: "J-Channel Trim", description: "PVC J-channel cladding trim 3m", image: null, variants: [{ size: "25mm", price: 85.00, qty: 40 }, { size: "38mm", price: 95.00, qty: 30 }] },
      { id: "r10", name: "Translucent Sheet", description: "Corrugated polycarbonate light sheet per metre", image: null, variants: [{ size: "762mm per 1m", price: 195.00, qty: 30 }] },
    ]
  },  },
  {
    id: "welding", name: "Welding Supplies", icon: "🔥",
    items: [
      { id: "w1", name: "Welding Rod E6013", description: "General purpose E6013 electrodes 5kg", image: null, variants: [{ size: "2.5mm 5kg", price: 145.00, qty: 20 }, { size: "3.2mm 5kg", price: 155.00, qty: 20 }, { size: "4.0mm 5kg", price: 165.00, qty: 15 }] },
      { id: "w2", name: "MIG Wire", description: "ER70S-6 MIG welding wire 15kg spool", image: null, variants: [{ size: "0.8mm 15kg", price: 585.00, qty: 8 }, { size: "1.0mm 15kg", price: 595.00, qty: 8 }] },
      { id: "w3", name: "Welding Helmet", description: "Auto-darkening welding helmet", image: null, variants: [{ size: "Fixed shade 11", price: 245.00, qty: 10 }, { size: "Auto DIN 9-13", price: 645.00, qty: 8 }] },
      { id: "w4", name: "Welding Gloves", description: "Leather TIG/MIG welding gloves", image: null, variants: [{ size: "M", price: 75.00, qty: 20 }, { size: "L", price: 75.00, qty: 20 }, { size: "XL", price: 75.00, qty: 15 }] },
      { id: "w5", name: "Welding Wire Brush", description: "Stainless steel welding chipping brush", image: null, variants: [{ size: "Standard", price: 35.00, qty: 30 }] },
      { id: "w6", name: "Angle Grinder Disc Weld", description: "Grinding disc for weld clean-up 125mm", image: null, variants: [{ size: "125mm x 6mm", price: 38.00, qty: 50 }] },
      { id: "w7", name: "Welding Clamp", description: "Earth clamp 300A welding ground clamp", image: null, variants: [{ size: "300A", price: 95.00, qty: 20 }, { size: "500A", price: 145.00, qty: 10 }] },
      { id: "w8", name: "Anti-Spatter Spray", description: "Silicone-free anti-spatter welding spray", image: null, variants: [{ size: "400ml", price: 65.00, qty: 25 }] },
      { id: "w9", name: "Welding Jacket", description: "Leather split welding jacket", image: null, variants: [{ size: "M", price: 385.00, qty: 8 }, { size: "L", price: 385.00, qty: 8 }, { size: "XL", price: 395.00, qty: 6 }] },
      { id: "w10", name: "Gas Regulator", description: "Argon/CO2 dual gauge gas regulator", image: null, variants: [{ size: "Standard 0-25L/min", price: 485.00, qty: 5 }] },
    ]
  },
  {
    id: "ladders", name: "Ladders & Access", icon: "🪜",
    items: [
      { id: "la1", name: "Aluminium Step Ladder", description: "EN131 aluminium platform step ladder", image: null, variants: [{ size: "4-step", price: 545.00, qty: 8 }, { size: "6-step", price: 745.00, qty: 6 }, { size: "8-step", price: 945.00, qty: 4 }] },
      { id: "la2", name: "Extension Ladder", description: "Double extension aluminium ladder", image: null, variants: [{ size: "3m+3m", price: 1250.00, qty: 4 }, { size: "4m+4m", price: 1650.00, qty: 3 }] },
      { id: "la3", name: "Combination Ladder", description: "Multi-purpose combination ladder", image: null, variants: [{ size: "3.6m", price: 1450.00, qty: 4 }, { size: "4.6m", price: 1850.00, qty: 3 }] },
      { id: "la4", name: "Work Platform", description: "Aluminium folding work platform", image: null, variants: [{ size: "2-step 0.6m", price: 685.00, qty: 6 }, { size: "3-step 0.9m", price: 885.00, qty: 4 }] },
      { id: "la5", name: "Loft Ladder", description: "Timber loft attic access ladder", image: null, variants: [{ size: "2.5m", price: 1850.00, qty: 3 }, { size: "3.0m", price: 2150.00, qty: 2 }] },
      { id: "la6", name: "Ladder Stabiliser", description: "Aluminium ladder standoff stabiliser", image: null, variants: [{ size: "Universal fit", price: 285.00, qty: 10 }] },
      { id: "la7", name: "Anti-Slip Ladder Feet", description: "Rubber anti-slip ladder safety feet pair", image: null, variants: [{ size: "Universal pair", price: 95.00, qty: 20 }] },
      { id: "la8", name: "Scaffold Clamp", description: "Swivel tube scaffold clamp", image: null, variants: [{ size: "48mm OD", price: 55.00, qty: 50 }] },
      { id: "la9", name: "Trestle A-Frame", description: "Aluminium foldable painter's trestle", image: null, variants: [{ size: "900mm", price: 285.00, qty: 10 }, { size: "1200mm", price: 345.00, qty: 8 }] },
      { id: "la10", name: "Ladder Hook", description: "Steel roof ladder hook pair", image: null, variants: [{ size: "Universal pair", price: 145.00, qty: 15 }] },
    ]
  },
  {
    id: "drainage", name: "Drainage & Sewage", icon: "🌊",
    items: [
      { id: "dr1", name: "HDPE Pipe", description: "50mm HDPE sewer pipe 6m", image: null, variants: [{ size: "50mm 6m", price: 285.00, qty: 20 }, { size: "75mm 6m", price: 395.00, qty: 15 }, { size: "110mm 6m", price: 585.00, qty: 10 }] },
      { id: "dr2", name: "PVC Drain Pipe", description: "PVC solid wall drain pipe 110mm 3m", image: null, variants: [{ size: "110mm 3m", price: 265.00, qty: 20 }, { size: "160mm 3m", price: 425.00, qty: 12 }] },
      { id: "dr3", name: "Inspection Chamber", description: "370mm diameter inspection chamber base", image: null, variants: [{ size: "370mm base", price: 485.00, qty: 8 }, { size: "450mm base", price: 645.00, qty: 6 }] },
      { id: "dr4", name: "Gully Trap", description: "PVC P-trap gully with surround", image: null, variants: [{ size: "110mm inlet", price: 185.00, qty: 20 }] },
      { id: "dr5", name: "Floor Drain", description: "Stainless steel floor waste drain 100mm", image: null, variants: [{ size: "100x100mm", price: 125.00, qty: 25 }, { size: "150x150mm", price: 165.00, qty: 20 }] },
      { id: "dr6", name: "Channel Drain", description: "PVC channel drain 1m length", image: null, variants: [{ size: "100mm wide 1m", price: 185.00, qty: 15 }] },
      { id: "dr7", name: "Pipe Coupling", description: "PVC push-fit drain coupling", image: null, variants: [{ size: "110mm", price: 45.00, qty: 40 }, { size: "160mm", price: 65.00, qty: 25 }] },
      { id: "dr8", name: "Bend 45°", description: "PVC drain sweep bend", image: null, variants: [{ size: "110mm 45°", price: 55.00, qty: 30 }, { size: "110mm 90°", price: 58.00, qty: 30 }] },
      { id: "dr9", name: "Grease Trap", description: "PVC grease interceptor trap", image: null, variants: [{ size: "Small 10L/min", price: 645.00, qty: 5 }] },
      { id: "dr10", name: "Rodding Eye", description: "PVC drain rodding access eye", image: null, variants: [{ size: "110mm", price: 85.00, qty: 20 }] },
    ]},
  {
    id: "tape", name: "Tape, Rope & Chain", icon: "🔗",
    items: [
      { id: "t1", name: "Galvanised Chain", description: "Short link galvanised chain per metre", image: null, variants: [{ size: "4mm", price: 18.00, qty: 100 }, { size: "6mm", price: 28.00, qty: 80 }, { size: "8mm", price: 45.00, qty: 60 }] },
      { id: "t2", name: "Nylon Rope", description: "8-strand plaited nylon rope per metre", image: null, variants: [{ size: "8mm", price: 12.00, qty: 100 }, { size: "12mm", price: 22.00, qty: 80 }, { size: "16mm", price: 38.00, qty: 60 }] },
      { id: "t3", name: "Strapping Banding", description: "Polypropylene strapping roll 16mm", image: null, variants: [{ size: "16mm x 1000m", price: 165.00, qty: 10 }] },
      { id: "t4", name: "Gaffer Tape", description: "Heavy duty cloth gaffer tape 50mm", image: null, variants: [{ size: "50mm x 50m Black", price: 65.00, qty: 30 }, { size: "50mm x 50m Silver", price: 65.00, qty: 30 }] },
      { id: "t5", name: "Duct Tape", description: "Heavy duty silver duct tape 48mm", image: null, variants: [{ size: "48mm x 50m", price: 55.00, qty: 40 }] },
      { id: "t6", name: "Carabiner Snap Hook", description: "Zinc alloy snap hook carabiner", image: null, variants: [{ size: "60mm", price: 28.00, qty: 50 }, { size: "80mm", price: 38.00, qty: 40 }] },
      { id: "t7", name: "Wire Rope", description: "6x19 galvanised wire rope per metre", image: null, variants: [{ size: "6mm", price: 22.00, qty: 100 }, { size: "8mm", price: 35.00, qty: 80 }, { size: "10mm", price: 52.00, qty: 60 }] },
      { id: "t8", name: "Ratchet Strap", description: "Heavy duty cargo ratchet strap 5m", image: null, variants: [{ size: "25mm 1000kg", price: 85.00, qty: 20 }, { size: "50mm 2500kg", price: 135.00, qty: 15 }] },
      { id: "t9", name: "Bungee Cord", description: "Heavy duty elastic bungee cord", image: null, variants: [{ size: "600mm", price: 18.00, qty: 50 }, { size: "900mm", price: 25.00, qty: 40 }] },
      { id: "t10", name: "Shade Cloth", description: "50% UV shade cloth per metre", image: null, variants: [{ size: "1m wide Green", price: 28.00, qty: 100 }, { size: "2m wide Green", price: 52.00, qty: 60 }] },
    ]
  },
  {
    id: "storage", name: "Storage & Racking", icon: "📦",
    items: [
      { id: "sr1", name: "Heavy Duty Shelf Bracket", description: "Heavy duty steel shelf bracket", image: null, variants: [{ size: "300mm", price: 45.00, qty: 50 }, { size: "450mm", price: 58.00, qty: 40 }, { size: "600mm", price: 75.00, qty: 30 }] },
      { id: "sr2", name: "Pallet Racking Beam", description: "Pallet racking load beam 2.7m", image: null, variants: [{ size: "2.7m 2000kg/pair", price: 485.00, qty: 10 }] },
      { id: "sr3", name: "Pallet Racking Upright", description: "Pallet racking upright frame 2m", image: null, variants: [{ size: "2m frame", price: 745.00, qty: 8 }, { size: "3m frame", price: 985.00, qty: 6 }] },
      { id: "sr4", name: "Wall Anchor Sleeve", description: "Zinc sleeve wall expansion anchor", image: null, variants: [{ size: "M8x40mm", price: 5.50, qty: 100 }, { size: "M10x50mm", price: 7.50, qty: 80 }, { size: "M12x60mm", price: 9.50, qty: 60 }] },
      { id: "sr5", name: "Corner Bracket", description: "Steel 90° corner bracket", image: null, variants: [{ size: "40x40x3mm", price: 12.00, qty: 100 }, { size: "60x60x4mm", price: 18.00, qty: 80 }] },
      { id: "sr6", name: "Perforated Angle", description: "Slotted angle iron 2m per piece", image: null, variants: [{ size: "38x38x3mm", price: 75.00, qty: 30 }, { size: "50x50x3mm", price: 95.00, qty: 20 }] },
      { id: "sr7", name: "Tool Cabinet", description: "Steel 5-drawer tool cabinet", image: null, variants: [{ size: "5-drawer Red", price: 1850.00, qty: 4 }, { size: "7-drawer Black", price: 2450.00, qty: 3 }] },
      { id: "sr8", name: "Bin Tray Organiser", description: "Wall mount parts bin tray", image: null, variants: [{ size: "Small 6-bin", price: 185.00, qty: 15 }, { size: "Large 10-bin", price: 295.00, qty: 10 }] },
      { id: "sr9", name: "Workbench", description: "Steel frame hardwood top workbench", image: null, variants: [{ size: "1500x600mm", price: 2850.00, qty: 3 }, { size: "1800x750mm", price: 3450.00, qty: 2 }] },
      { id: "sr10", name: "Trolley Platform", description: "Steel platform hand trolley 300kg", image: null, variants: [{ size: "300kg capacity", price: 1250.00, qty: 5 }] },
    ]
  },
];

const ADMIN_PASSWORD = "PopsProps2024!";
const WHATSAPP_NUMBER = "27625648068"; // Replace with actual number
const BANK_DETAILS = {
  bank: "First National Bank",
  accountName: "Pops & Props Hardware",
  accountNumber: "62xxxxxxxxxx",
  branchCode: "250655",
  reference: "Your Order Number"
};
// ─── PRICE CALCULATION ─────────────────────────────────────────────────────────
const calcPrice = (basePrice, mode, qty = 1) => {
  if (mode === "retail") return +(basePrice * 1.5).toFixed(2);
  if (mode === "wholesale") {
    if (qty >= 30) return +(basePrice * 1.2).toFixed(2);
    if (qty >= 16) return +(basePrice * 1.25).toFixed(2);
    if (qty >= 5) return +(basePrice * 1.3).toFixed(2);
    return +(basePrice * 1.5).toFixed(2); // retail price if < 5 units
  }
  return basePrice;
};

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("catalogue"); // catalogue | cart | invoice | admin | item
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("popsPropsCategories");
    return saved ? JSON.parse(saved) : CATEGORIES_DATA;
  });
  const [cart, setCart] = useState([]);
  const [priceMode, setPriceMode] = useState("retail");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("popsPropsOrders");
    return saved ? JSON.parse(saved) : [];
  });
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPwInput, setAdminPwInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [orderComplete, setOrderComplete] = useState(null);
  const [popFile, setPopFile] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "", address: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const fileInputRef = useRef();
  const cameraInputRef = useRef();
  const popInputRef = useRef();

  useEffect(() => {
    localStorage.setItem("popsPropsCategories", JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem("popsPropsOrders", JSON.stringify(orders));
  }, [orders]);

  const cartTotal = cart.reduce((sum, item) => sum + calcPrice(item.variantPrice, priceMode, item.qty) * item.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (item, variant, qty) => {
    setCart(prev => {
      const key = `${item.id}-${variant.size}`;
      const existing = prev.find(c => c.key === key);
      if (existing) return prev.map(c => c.key === key ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { key, itemId: item.id, itemName: item.name, variantSize: variant.size, variantPrice: variant.price, qty, image: item.image, categoryId: selectedCategory?.id }];
    });
  };
  const updateCartQty = (key, delta) => {
    setCart(prev => prev.map(c => c.key === key ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeFromCart = (key) => setCart(prev => prev.filter(c => c.key !== key));

  const handleAdminLogin = () => {
    if (adminPwInput === ADMIN_PASSWORD) { setAdminUnlocked(true); setAdminError(""); setView("admin"); }
    else { setAdminError("Incorrect password"); }
  };

  const handleImageCapture = (itemId, catId, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCategories(prev => prev.map(cat => cat.id === catId ? {
        ...cat, items: cat.items.map(it => it.id === itemId ? { ...it, image: e.target.result } : it)
      } : cat));
    };
    reader.readAsDataURL(file);
  };

  const generateOrderNumber = () => `PP${Date.now().toString().slice(-6)}`;

  const submitOrder = () => {
    const orderNum = generateOrderNumber();
    const collectionDate = new Date();
    let workDays = 0;
    while (workDays < 3) {
      collectionDate.setDate(collectionDate.getDate() + 1);
      const day = collectionDate.getDay();
      if (day !== 0 && day !== 6) workDays++;
    }

    const newOrder = {
      id: orderNum,
      date: new Date().toLocaleDateString("en-ZA"),
      customer: customerInfo,
      items: cart.map(c => ({ ...c, unitPrice: calcPrice(c.variantPrice, priceMode, c.qty) })),
      total: cartTotal,
      priceMode,
      collectionDate: collectionDate.toLocaleDateString("en-ZA"),
      status: "Pending POP",
      pop: popFile ? "uploaded" : "pending"
    };

    setOrders(prev => [...prev, newOrder]);
    setOrderComplete(newOrder);
    setCart([]);
    setPopFile(null);
    setCustomerInfo({ name: "", email: "", phone: "", address: "" });
    setView("invoice");

    // WhatsApp message
    const msg = encodeURIComponent(
      `🔩 NEW ORDER - Pops & Props Hardware\n\nOrder: ${orderNum}\nCustomer: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nTotal: R${cartTotal.toFixed(2)}\nMode: ${priceMode}\n\nPOP ${popFile ? "attached" : "to follow"}\n\nCollection: ${collectionDate.toLocaleDateString("en-ZA")} (3 working days after payment clears)`
    );
    setTimeout(() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank"), 800);
  };

  const filteredCategories = searchQuery
    ? categories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(cat => cat.items.length > 0)
    : categories;
  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Barlow', 'Segoe UI', sans-serif", background: "#0f1117", minHeight: "100vh", color: "#f0f0f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1a1d26; } ::-webkit-scrollbar-thumb { background: #e85d04; border-radius: 3px; }
        .btn { cursor: pointer; border: none; border-radius: 6px; font-family: inherit; font-weight: 700; transition: all 0.15s; }
        .btn-primary { background: #e85d04; color: #fff; padding: 10px 20px; }
        .btn-primary:hover { background: #f77f00; transform: translateY(-1px); }
        .btn-secondary { background: #1e2130; color: #ccc; padding: 10px 20px; border: 1px solid #333; }
        .btn-secondary:hover { border-color: #e85d04; color: #e85d04; }
        .btn-ghost { background: transparent; color: #e85d04; padding: 6px 14px; border: 1px solid #e85d04; border-radius: 6px; cursor: pointer; font-weight: 600; font-family: inherit; transition: all 0.15s; font-size: 13px; }
        .btn-ghost:hover { background: #e85d04; color: #fff; }
        .btn-danger { background: #c0392b; color: #fff; padding: 8px 16px; border-radius: 6px; cursor: pointer; border: none; font-family: inherit; font-weight: 600; transition: all 0.15s; }
        .btn-danger:hover { background: #e74c3c; }
        input, textarea, select { font-family: inherit; }
        .card { background: #1a1d26; border: 1px solid #2a2d3a; border-radius: 12px; overflow: hidden; transition: all 0.2s; }
        .card:hover { border-color: #e85d04; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,93,4,0.15); }
        .tag { display: inline-block; background: #e85d04; color: #fff; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .tag-ws { background: #1a6b3a; }
        .input-field { background: #0f1117; border: 1px solid #2a2d3a; color: #f0f0f0; padding: 10px 14px; border-radius: 8px; width: 100%; outline: none; transition: border-color 0.15s; }
        .input-field:focus { border-color: #e85d04; }
        .badge { position: absolute; top: -6px; right: -6px; background: #e85d04; color: #fff; border-radius: 999px; width: 20px; height: 20px; font-size: 11px; font-weight: 900; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* ─── TOPBAR ─────────────────────────────────────────── */}
      <div style={{ background: "#13161f", borderBottom: "2px solid #e85d04", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => { setView("catalogue"); setSelectedCategory(null); setSelectedItem(null); }}>
          <span style={{ fontSize: 28 }}>🔩</span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: 1, color: "#e85d04" }}>POPS & PROPS</div>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>Hardware & Tools</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Price Mode Toggle */}
          <div style={{ display: "flex", background: "#0f1117", borderRadius: 8, border: "1px solid #2a2d3a", overflow: "hidden" }}>
            {["retail", "wholesale"].map(m => (
              <button key={m} className="btn" onClick={() => setPriceMode(m)}
                style={{ padding: "7px 14px", background: priceMode === m ? "#e85d04" : "transparent", color: priceMode === m ? "#fff" : "#888", borderRadius: 0, fontSize: 12, textTransform: "capitalize" }}>
                {m === "retail" ? "🛒 Retail" : "📦 Wholesale"}
              </button>
            ))}
          </div>

          {/* Cart */}
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setView("cart")}>
            <button className="btn btn-secondary" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
              🛒 <span style={{ fontSize: 13 }}>R{cartTotal.toFixed(2)}</span>
            </button>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>

          {/* Admin */}
          <button className="btn btn-ghost" onClick={() => { if (adminUnlocked) setView("admin"); else setView("admin-login"); }}>
            {adminUnlocked ? "⚙️ Admin" : "🔐"}
          </button>
        </div>
      </div>

      {/* ─── CONTENT ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 16px" }}>

        {/* ══ CATALOGUE VIEW ══ */}
        {(view === "catalogue" && !selectedCategory) && (
          <div>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #1a1d26 0%, #13161f 100%)", border: "1px solid #2a2d3a", borderRadius: 16, padding: "32px 28px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.05 }}>🔩</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: "#e85d04", marginBottom: 8 }}>YOUR TRUSTED HARDWARE PARTNER</div>
              <div style={{ color: "#aaa", marginBottom: 20, maxWidth: 500 }}>Quality tools, fasteners, plumbing, electrical & more. EFT only · Collection 3 working days after payment clears.</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span className="tag">{categories.length} Categories</span>
                <span className="tag" style={{ background: "#1a3a6b" }}>🏦 EFT Payment</span>
                <span className="tag" style={{ background: "#1a6b3a" }}>📅 3 Day Collection</span>
                <span className="tag" style={{ background: "#6b1a6b" }}>{priceMode === "retail" ? "🛒 Retail +50%" : "📦 Wholesale Pricing"}</span>
              </div>
            </div>
            {/* Search */}
            <div style={{ marginBottom: 24, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#555" }}>🔍</span>
              <input className="input-field" style={{ paddingLeft: 40 }} placeholder="Search all products…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>

            {searchQuery ? (
              <div>
                <div style={{ color: "#aaa", marginBottom: 16, fontSize: 14 }}>Results for "{searchQuery}":</div>
                {filteredCategories.map(cat => (
                  <div key={cat.id} style={{ marginBottom: 24 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: "#e85d04", marginBottom: 12 }}>{cat.icon} {cat.name}</div>
                    <ItemGrid items={cat.items} cat={cat} priceMode={priceMode} onSelect={(item) => { setSelectedItem(item); setSelectedCategory(cat); setView("item"); }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
                {categories.map(cat => (
                  <div key={cat.id} className="card" style={{ cursor: "pointer", padding: 20, textAlign: "center" }} onClick={() => { setSelectedCategory(cat); }}>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>{cat.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{cat.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{cat.items.length} items</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ CATEGORY VIEW ══ */}
        {view === "catalogue" && selectedCategory && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <button className="btn-ghost" onClick={() => setSelectedCategory(null)}>← Back</button>
              <span style={{ fontSize: 28 }}>{selectedCategory.icon}</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28 }}>{selectedCategory.name}</span>
            </div>
            <ItemGrid items={selectedCategory.items} cat={selectedCategory} priceMode={priceMode} onSelect={(item) => { setSelectedItem(item); setView("item"); }} />
          </div>
        )}

        {/* ══ ITEM DETAIL ══ */}
        {view === "item" && selectedItem && (
          <ItemDetail item={selectedItem} cat={selectedCategory} priceMode={priceMode} onBack={() => { setView("catalogue"); }} onAdd={addToCart} />
        )}

        {/* ══ CART VIEW ══ */}
        {view === "cart" && (
          <CartView cart={cart} priceMode={priceMode} calcPrice={calcPrice} onUpdateQty={updateCartQty} onRemove={removeFromCart} onBack={() => setView("catalogue")} onCheckout={() => setView("checkout")} cartTotal={cartTotal} />
        )}

        {/* ══ CHECKOUT VIEW ══ */}
        {view === "checkout" && (
          <CheckoutView cart={cart} priceMode={priceMode} calcPrice={calcPrice} cartTotal={cartTotal} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} popFile={popFile} setPopFile={setPopFile} popInputRef={popInputRef} bankDetails={BANK_DETAILS} onBack={() => setView("cart")} onSubmit={submitOrder} />
        )}

        {/* ══ INVOICE VIEW ══ */}
        {view === "invoice" && orderComplete && (
          <InvoiceView order={orderComplete} bankDetails={BANK_DETAILS} whatsappNumber={WHATSAPP_NUMBER} onDone={() => { setOrderComplete(null); setView("catalogue"); }} />
        )}

        {/* ══ ADMIN LOGIN ══ */}
        {view === "admin-login" && (
          <div style={{ maxWidth: 380, margin: "60px auto", background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 16, padding: 32 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, marginBottom: 6, color: "#e85d04" }}>🔐 Admin Access</div>
            <div style={{ color: "#888", marginBottom: 24, fontSize: 14 }}>Enter your admin password to continue.</div>
            <input className="input-field" type="password" placeholder="Admin password" value={adminPwInput} onChange={e => setAdminPwInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdminLogin()} style={{ marginBottom: 12 }} />
            {adminError && <div style={{ color: "#e74c3c", fontSize: 13, marginBottom: 12 }}>{adminError}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdminLogin}>Login</button>
              <button className="btn btn-secondary" onClick={() => setView("catalogue")}>Cancel</button>
            </div>
          </div>
        )}

        {/* ══ ADMIN PANEL ══ */}
        {view === "admin" && adminUnlocked && (
          <AdminPanel categories={categories} setCategories={setCategories} orders={orders} onLogout={() => { setAdminUnlocked(false); setView("catalogue"); }} fileInputRef={fileInputRef} cameraInputRef={cameraInputRef} handleImageCapture={handleImageCapture} />
        )}
      </div>
    </div>
  );
// ─── ITEM GRID ─────────────────────────────────────────────────────────────────
function ItemGrid({ items, cat, priceMode, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
      {items.map(item => {
        const minPrice = Math.min(...item.variants.map(v => v.price));
        return (
          <div key={item.id} className="card" style={{ cursor: "pointer" }} onClick={() => onSelect(item)}>
            <div style={{ height: 140, background: item.image ? "transparent" : "#0f1117", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {item.image ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 44, opacity: 0.2 }}>{cat?.icon || "📦"}</span>}
              {!item.image && <span style={{ position: "absolute", bottom: 6, right: 8, fontSize: 10, color: "#555" }}>No image</span>}
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>{item.description}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e85d04", fontWeight: 700 }}>From R{calcPrice(minPrice, priceMode, priceMode === "wholesale" ? 5 : 1).toFixed(2)}</span>
                <span style={{ fontSize: 11, color: "#555" }}>{item.variants.length} size{item.variants.length > 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ITEM DETAIL ───────────────────────────────────────────────────────────────
function ItemDetail({ item, cat, priceMode, onBack, onAdd }) {
  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const [qty, setQty] = useState(priceMode === "wholesale" ? 5 : 1);

  const price = calcPrice(selectedVariant.price, priceMode, qty);
  const markup = priceMode === "retail" ? 50 :
    qty >= 30 ? 20 : qty >= 16 ? 25 : qty >= 5 ? 30 : 50;

  return (
    <div>
      <button className="btn-ghost" onClick={onBack} style={{ marginBottom: 20 }}>← Back to {cat?.name}</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: item.image ? "transparent" : "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 12, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {item.image ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
            : <div style={{ textAlign: "center", color: "#444" }}><div style={{ fontSize: 64 }}>{cat?.icon || "📦"}</div><div style={{ fontSize: 12 }}>No image added</div></div>}
        </div>
        <div>
          <div style={{ marginBottom: 6 }}><span className="tag">{cat?.name}</span></div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, margin: "8px 0" }}>{item.name}</h2>
          <p style={{ color: "#999", marginBottom: 20 }}>{item.description}</p>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Select Size / Variant</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.variants.map((v, i) => (
                <button key={i} className="btn" onClick={() => setSelectedVariant(v)}
                  style={{ padding: "8px 16px", background: selectedVariant === v ? "#e85d04" : "#1a1d26", color: selectedVariant === v ? "#fff" : "#ccc", border: `1px solid ${selectedVariant === v ? "#e85d04" : "#2a2d3a"}` }}>
                  {v.size}<br /><span style={{ fontSize: 10 }}>Stock: {v.qty}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "#0f1117", borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888", fontSize: 13 }}>Base price:</span>
              <span>R{selectedVariant.price.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888", fontSize: 13 }}>Markup ({markup}%):</span>
              <span className="tag" style={{ fontSize: 11 }}>+{markup}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #2a2d3a", paddingTop: 8 }}>
              <span style={{ fontWeight: 700 }}>Your price:</span>
              <span style={{ color: "#e85d04", fontWeight: 900, fontSize: 22 }}>R{price.toFixed(2)}</span>
            </div>
          </div>

          {priceMode === "wholesale" && (
            <div style={{ background: "#0f1117", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 12 }}>
              <div style={{ color: "#f77f00", fontWeight: 700, marginBottom: 6 }}>📦 Wholesale Pricing Tiers</div>
              {[{ min: 5, max: 15, pct: 30 }, { min: 16, max: 29, pct: 25 }, { min: 30, max: "∞", pct: 20 }].map(tier => (
                <div key={tier.min} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, color: qty >= tier.min && (tier.max === "∞" || qty <= tier.max) ? "#4ade80" : "#777" }}>
                  <span>{tier.min}–{tier.max} units</span><span>+{tier.pct}% markup</span>
                </div>
              ))}
              {qty < 5 && <div style={{ color: "#e74c3c", fontSize: 11, marginTop: 6 }}>⚠️ Min 5 units for wholesale pricing</div>}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", background: "#0f1117", borderRadius: 8, border: "1px solid #2a2d3a" }}>
              <button className="btn" onClick={() => setQty(q => Math.max(priceMode === "wholesale" ? 1 : 1, q - 1))} style={{ padding: "8px 16px", background: "transparent", color: "#fff", fontSize: 18 }}>−</button>
              <span style={{ padding: "0 16px", fontWeight: 700, minWidth: 40, textAlign: "center" }}>{qty}</span>
              <button className="btn" onClick={() => setQty(q => q + 1)} style={{ padding: "8px 16px", background: "transparent", color: "#fff", fontSize: 18 }}>+</button>
            </div>
            <span style={{ color: "#888", fontSize: 13 }}>= R{(price * qty).toFixed(2)}</span>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={() => { onAdd(item, selectedVariant, qty); onBack(); }}>
            🛒 Add to Cart — R{(price * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );// ─── CART VIEW ─────────────────────────────────────────────────────────────────
function CartView({ cart, priceMode, calcPrice, onUpdateQty, onRemove, onBack, onCheckout, cartTotal }) {
  if (cart.length === 0) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Your cart is empty</div>
      <button className="btn btn-primary" onClick={onBack}>Browse Catalogue</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button className="btn-ghost" onClick={onBack}>← Continue Shopping</button>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28 }}>Your Cart</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <div>
          {cart.map(item => {
            const price = calcPrice(item.variantPrice, priceMode, item.qty);
            return (
              <div key={item.key} style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 10, padding: 16, marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 60, height: 60, background: "#0f1117", borderRadius: 8, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.image ? <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 24, opacity: 0.3 }}>📦</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{item.itemName}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{item.variantSize}</div>
                  <div style={{ fontSize: 13, color: "#e85d04" }}>R{price.toFixed(2)} each</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className="btn" onClick={() => onUpdateQty(item.key, -1)} style={{ background: "#0f1117", color: "#fff", padding: "4px 10px", border: "1px solid #2a2d3a" }}>−</button>
                  <span style={{ minWidth: 32, textAlign: "center", fontWeight: 700 }}>{item.qty}</span>
                  <button className="btn" onClick={() => onUpdateQty(item.key, 1)} style={{ background: "#0f1117", color: "#fff", padding: "4px 10px", border: "1px solid #2a2d3a" }}>+</button>
                </div>
                <div style={{ minWidth: 90, textAlign: "right", fontWeight: 700 }}>R{(price * item.qty).toFixed(2)}</div>
                <button className="btn-danger" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => onRemove(item.key)}>✕</button>
              </div>
            );
          })}
        </div>
        <div style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 12, padding: 24, height: "fit-content" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, marginBottom: 16 }}>Order Summary</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "#aaa" }}>
            <span>Items ({cart.reduce((s, c) => s + c.qty, 0)})</span>
            <span>R{cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "#aaa" }}>
            <span>Pricing mode</span>
            <span className="tag" style={{ background: priceMode === "retail" ? "#e85d04" : "#1a6b3a" }}>{priceMode}</span>
          </div>
          <div style={{ borderTop: "1px solid #2a2d3a", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 22 }}>
            <span>Total</span>
            <span style={{ color: "#e85d04" }}>R{cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", padding: 14, marginTop: 16, fontSize: 16 }} onClick={onCheckout}>
            Proceed to Checkout →
          </button>
          <div style={{ marginTop: 12, fontSize: 11, color: "#666", textAlign: "center" }}>🏦 EFT payment · 📅 3 working day collection</div>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT VIEW ─────────────────────────────────────────────────────────────
function CheckoutView({ cart, priceMode, calcPrice, cartTotal, customerInfo, setCustomerInfo, popFile, setPopFile, popInputRef, bankDetails, onBack, onSubmit }) {
  const canSubmit = customerInfo.name && customerInfo.phone;
  return (
    <div>
      <button className="btn-ghost" onClick={onBack} style={{ marginBottom: 20 }}>← Back to Cart</button>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, marginBottom: 24 }}>Checkout</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          {/* Customer Info */}
          <div style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 14, color: "#e85d04" }}>👤 Customer Details</div>
            {[["name", "Full Name *", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number *", "tel"], ["address", "Collection Address / Notes", "text"]].map(([key, label, type]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{label}</div>
                <input className="input-field" type={type} value={customerInfo[key]} onChange={e => setCustomerInfo(p => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
          </div>

          {/* Bank Details */}
          <div style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 14, color: "#e85d04" }}>🏦 EFT Banking Details</div>
            {Object.entries(bankDetails).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: "#888", textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1")}:</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, background: "#0f1117", borderRadius: 8, padding: 10, fontSize: 12, color: "#f77f00" }}>
              ⚠️ Use your phone number or name as reference. Collection available 3 working days after payment reflects.
            </div>
          </div>
        </div>

        <div>
          {/* Order Summary */}
          <div style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 14, color: "#e85d04" }}>🧾 Order Summary</div>
            {cart.map(item => {
              const price = calcPrice(item.variantPrice, priceMode, item.qty);
              return (
                <div key={item.key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span>{item.itemName} ({item.variantSize}) x{item.qty}</span>
                  <span>R{(price * item.qty).toFixed(2)}</span>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid #2a2d3a", paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 20 }}>
              <span>Total Due</span><span style={{ color: "#e85d04" }}>R{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* POP Upload */}
          <div style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: "#e85d04" }}>📎 Proof of Payment (POP)</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Upload your EFT payment confirmation. Your order will be confirmed once payment reflects.</div>
            <input ref={popInputRef} type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={e => setPopFile(e.target.files[0])} />
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { popInputRef.current.removeAttribute("capture"); popInputRef.current.click(); }}>📁 Gallery / File</button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { popInputRef.current.setAttribute("capture", "environment"); popInputRef.current.click(); }}>📷 Camera</button>
            </div>
            {popFile && <div style={{ marginTop: 10, fontSize: 13, color: "#4ade80" }}>✅ {popFile.name}</div>}
            {!popFile && <div style={{ marginTop: 10, fontSize: 12, color: "#f77f00" }}>⚠️ You can still proceed without POP — send via WhatsApp separately</div>}
          </div>

          <button className="btn btn-primary" disabled={!canSubmit} style={{ width: "100%", padding: 16, fontSize: 16, opacity: canSubmit ? 1 : 0.5 }} onClick={onSubmit}>
            ✅ Place Order & Send via WhatsApp
          </button>
          <div style={{ marginTop: 10, fontSize: 12, color: "#666", textAlign: "center" }}>Order will be sent to WhatsApp for confirmation</div>
        </div>
      </div>
    </div>
  );// ─── INVOICE VIEW ──────────────────────────────────────────────────────────────
function InvoiceView({ order, bankDetails, onDone }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ background: "#1a1d26", border: "2px solid #e85d04", borderRadius: 16, padding: 32 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>✅</div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: "#4ade80" }}>ORDER PLACED!</div>
          <div style={{ color: "#888", marginTop: 4 }}>WhatsApp message sent to confirm your order</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20, background: "#0f1117", borderRadius: 10, padding: 16 }}>
          <div><div style={{ fontSize: 11, color: "#888" }}>ORDER NUMBER</div><div style={{ fontWeight: 700, color: "#e85d04" }}>{order.id}</div></div>
          <div><div style={{ fontSize: 11, color: "#888" }}>ORDER DATE</div><div style={{ fontWeight: 700 }}>{order.date}</div></div>
          <div><div style={{ fontSize: 11, color: "#888" }}>CUSTOMER</div><div style={{ fontWeight: 700 }}>{order.customer.name}</div></div>
          <div><div style={{ fontSize: 11, color: "#888" }}>COLLECTION DATE</div><div style={{ fontWeight: 700, color: "#4ade80" }}>{order.collectionDate}</div></div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: "#e85d04" }}>Items Ordered</div>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2a2d3a", fontSize: 14 }}>
              <span>{item.itemName} — {item.variantSize} × {item.qty}</span>
              <span>R{(item.unitPrice * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, fontWeight: 900, fontSize: 20 }}>
            <span>TOTAL DUE</span><span style={{ color: "#e85d04" }}>R{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ background: "#0f1117", borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: "#e85d04", marginBottom: 10 }}>🏦 Payment Details</div>
          {Object.entries(bankDetails).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: "#888", textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1")}:</span>
              <span style={{ fontWeight: 600 }}>{k === "reference" ? order.id : v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a3a1a", border: "1px solid #2a6b2a", borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 14 }}>
          📅 <strong>Collection Date: {order.collectionDate}</strong><br />
          <span style={{ color: "#aaa", fontSize: 12 }}>Your order will be ready for collection 3 working days after your EFT payment reflects in our account.</span>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={onDone}>
          🏠 Back to Catalogue
        </button>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ categories, setCategories, orders, onLogout, fileInputRef, cameraInputRef, handleImageCapture }) {
  const [tab, setTab] = useState("items");
  const [editingItem, setEditingItem] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id);
  const [imageTarget, setImageTarget] = useState(null);
  const localFileRef = useRef();
  const localCameraRef = useRef();

  const selectedCat = categories.find(c => c.id === selectedCatId);

  const saveItem = (catId, item) => {
    setCategories(prev => prev.map(cat => cat.id === catId ? {
      ...cat, items: cat.items.map(it => it.id === item.id ? item : it)
    } : cat));
    setEditingItem(null);
  };

  const addItem = (catId) => {
    const newItem = { id: `new_${Date.now()}`, name: "New Item", description: "Description", image: null, variants: [{ size: "Standard", price: 0, qty: 0 }] };
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: [...cat.items, newItem] } : cat));
    setEditingItem(newItem);
  };

  const deleteItem = (catId, itemId) => {
    if (window.confirm("Delete this item?")) setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: cat.items.filter(it => it.id !== itemId) } : cat));
  };

  const handleLocalImage = (file) => {
    if (!imageTarget) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCategories(prev => prev.map(cat => cat.id === imageTarget.catId ? {
        ...cat, items: cat.items.map(it => it.id === imageTarget.itemId ? { ...it, image: e.target.result } : it)
      } : cat));
      if (editingItem && editingItem.id === imageTarget.itemId) setEditingItem(p => ({ ...p, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: "#e85d04" }}>⚙️ Admin Panel</div>
        <button className="btn-danger" onClick={onLogout}>Logout</button>
      </div>

      <input ref={localFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleLocalImage(e.target.files[0])} />
      <input ref={localCameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => handleLocalImage(e.target.files[0])} />

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[["items", "📦 Items"], ["orders", "🧾 Orders"], ["categories", "🗂️ Categories"]].map(([t, l]) => (
          <button key={t} className="btn" onClick={() => setTab(t)}
            style={{ padding: "10px 20px", background: tab === t ? "#e85d04" : "#1a1d26", color: tab === t ? "#fff" : "#aaa", border: "1px solid #2a2d3a" }}>
            {l}
          </button>
        ))}
      </div>

      {/* ITEMS TAB */}
      {tab === "items" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <select className="input-field" style={{ width: "auto" }} value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
            <button className="btn btn-primary" onClick={() => addItem(selectedCatId)}>+ Add Item</button>
          </div>

          {selectedCat?.items.map(item => (
            <div key={item.id} style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              {editingItem?.id === item.id ? (
                <EditItemForm item={editingItem} catId={selectedCatId} onSave={saveItem} onCancel={() => setEditingItem(null)}
                  onImageGallery={() => { setImageTarget({ catId: selectedCatId, itemId: item.id }); localFileRef.current.click(); }}
                  onImageCamera={() => { setImageTarget({ catId: selectedCatId, itemId: item.id }); localCameraRef.current.click(); }}
                  setEditingItem={setEditingItem} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 64, height: 64, background: "#0f1117", borderRadius: 8, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.image ? <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: 24, opacity: 0.25 }}>📷</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{item.description}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{item.variants.length} variant(s) — R{Math.min(...item.variants.map(v => v.price)).toFixed(2)} base</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-ghost" onClick={() => { setImageTarget({ catId: selectedCatId, itemId: item.id }); localFileRef.current.click(); }}>📁 Img</button>
                    <button className="btn-ghost" onClick={() => { setImageTarget({ catId: selectedCatId, itemId: item.id }); localCameraRef.current.click(); }}>📷</button>
                    <button className="btn-ghost" onClick={() => setEditingItem({ ...item })}>✏️ Edit</button>
                    <button className="btn-danger" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => deleteItem(selectedCatId, item.id)}>🗑️</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ORDERS TAB */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 ? <div style={{ color: "#888", textAlign: "center", padding: 40 }}>No orders yet</div> :
            orders.slice().reverse().map(order => (
              <div key={order.id} style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: "#e85d04" }}>{order.id}</span>
                  <span className="tag" style={{ background: order.pop === "uploaded" ? "#1a6b3a" : "#6b1a1a" }}>{order.pop === "uploaded" ? "POP Uploaded" : "POP Pending"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, fontSize: 13 }}>
                  <div><span style={{ color: "#888" }}>Customer: </span>{order.customer.name}</div>
                  <div><span style={{ color: "#888" }}>Date: </span>{order.date}</div>
                  <div><span style={{ color: "#888" }}>Collection: </span>{order.collectionDate}</div>
                  <div><span style={{ color: "#888" }}>Phone: </span>{order.customer.phone}</div>
                  <div><span style={{ color: "#888" }}>Mode: </span><span className="tag" style={{ background: order.priceMode === "retail" ? "#e85d04" : "#1a6b3a", fontSize: 10 }}>{order.priceMode}</span></div>
                  <div><span style={{ color: "#888" }}>Total: </span><span style={{ color: "#e85d04", fontWeight: 700 }}>R{order.total.toFixed(2)}</span></div>
                </div>
                <div style={{ marginTop: 10, borderTop: "1px solid #2a2d3a", paddingTop: 10, fontSize: 13 }}>
                  {order.items.map((it, i) => <span key={i} style={{ color: "#888", marginRight: 12 }}>{it.itemName} ({it.variantSize}) x{it.qty}</span>)}
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* CATEGORIES TAB */}
      {tab === "categories" && (
        <div>
          <div style={{ color: "#888", marginBottom: 16, fontSize: 14 }}>Edit category names and icons. Adding/removing categories coming in next update.</div>
          {categories.map((cat, ci) => (
            <div key={cat.id} style={{ background: "#1a1d26", border: "1px solid #2a2d3a", borderRadius: 10, padding: 16, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
              {editingCat === cat.id ? (
                <>
                  <input className="input-field" style={{ width: 60 }} defaultValue={cat.icon}
                    onChange={e => setCategories(prev => prev.map((c, i) => i === ci ? { ...c, icon: e.target.value } : c))} />
                  <input className="input-field" style={{ flex: 1 }} defaultValue={cat.name}
                    onChange={e => setCategories(prev => prev.map((c, i) => i === ci ? { ...c, name: e.target.value } : c))} />
                  <button className="btn btn-primary" style={{ padding: "8px 16px" }} onClick={() => setEditingCat(null)}>Save</button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 28 }}>{cat.icon}</span>
                  <span style={{ flex: 1, fontWeight: 600 }}>{cat.name}</span>
                  <span style={{ fontSize: 12, color: "#666" }}>{cat.items.length} items</span>
                  <button className="btn-ghost" onClick={() => setEditingCat(cat.id)}>✏️ Edit</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
// ─── EDIT ITEM FORM ────────────────────────────────────────────────────────────
function EditItemForm({ item, catId, onSave, onCancel, onImageGallery, onImageCamera, setEditingItem }) {
  const update = (key, val) => setEditingItem(p => ({ ...p, [key]: val }));
  const updateVariant = (i, key, val) => setEditingItem(p => ({ ...p, variants: p.variants.map((v, idx) => idx === i ? { ...v, [key]: key === "price" || key === "qty" ? +val : val } : v) }));
  const addVariant = () => setEditingItem(p => ({ ...p, variants: [...p.variants, { size: "New Size", price: 0, qty: 0 }] }));
  const removeVariant = (i) => setEditingItem(p => ({ ...p, variants: p.variants.filter((_, idx) => idx !== i) }));

  return (
    <div style={{ background: "#0f1117", borderRadius: 10, padding: 16 }}>
      <div style={{ fontWeight: 700, marginBottom: 14, color: "#e85d04" }}>✏️ Editing: {item.name}</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Item Name</div>
          <input className="input-field" value={item.name} onChange={e => update("name", e.target.value)} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Description</div>
          <input className="input-field" value={item.description} onChange={e => update("description", e.target.value)} />
        </div>
      </div>

      {/* Image */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Product Image</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {item.image && <img src={item.image} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid #2a2d3a" }} />}
          <button className="btn-ghost" onClick={onImageGallery}>📁 From Gallery</button>
          <button className="btn-ghost" onClick={onImageCamera}>📷 Take Photo</button>
          {item.image && <button className="btn-ghost" style={{ color: "#e74c3c", borderColor: "#e74c3c" }} onClick={() => update("image", null)}>Remove</button>}
        </div>
      </div>

      {/* Variants */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: "#888" }}>Sizes & Pricing</div>
          <button className="btn-ghost" onClick={addVariant}>+ Add Variant</button>
        </div>
        {item.variants.map((v, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
            <input className="input-field" placeholder="Size/Name" value={v.size} onChange={e => updateVariant(i, "size", e.target.value)} />
            <input className="input-field" type="number" placeholder="Base Price (R)" value={v.price} onChange={e => updateVariant(i, "price", e.target.value)} />
            <input className="input-field" type="number" placeholder="Stock Qty" value={v.qty} onChange={e => updateVariant(i, "qty", e.target.value)} />
            <button className="btn-danger" style={{ padding: "8px 12px" }} onClick={() => removeVariant(i)}>✕</button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onSave(catId, item)}>💾 Save Changes</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
}

}
}
}
