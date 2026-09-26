import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  User,
  Send,
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Gauge,
  Fuel,
  Users,
  Cog,
  ShieldCheck,
  RefreshCw,
  FileText,
  Award,
} from 'lucide-react';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

/**
 * Executive Automotive Assessment & Market Analysis Database
 */
const CAR_DESCRIPTIONS = {
  'tata-curvv':
    'The Tata Curvv pioneers India’s mass-market SUV Coupe segment, harmonizing aerodynamic fastback proportions with commanding 208 mm ground clearance. Engineered on the ATLAS modular architecture, it delivers exceptional high-speed touring poise, a segment-first gesture-controlled powered tailgate, dual high-definition screens, and a certified 5-Star Bharat NCAP safety cell bolstered by Level 2 ADAS active intervention.',
  'tata-nexon':
    'A structural safety pioneer in India’s compact SUV market, the Tata Nexon is engineered on a high-tensile steel safety cage that established 5-Star Global NCAP standards. The latest generation delivers refined dual-screen ergonomics, multi-drive dynamics (Eco, City, Sport), electronic stability program as standard, and responsive turbocharged petrol and diesel powertrains.',
  'tata-harrier':
    'Derived from the Land Rover D8-derived OMEGA-Arc platform, the Tata Harrier provides true European cross-country chassis composure, exceptional high-speed stability, and expansive road presence. Equipped with a 170 PS Kryotec 2.0L turbo-diesel engine, 5-Star Bharat NCAP structural rating, and 11 ADAS capabilities, it serves as a premier long-distance executive cruiser.',
  'tata-safari':
    'Tata Motors’ flagship 6/7-seater SUV combines executive luxury with rugged engineering. Delivering ventilated first and second-row captain seats, ambient mood lighting, a panoramic skyroof, and an ultra-safe reinforced safety shell, the Safari provides supreme cross-country comfort for large families.',
  'maruti-dzire':
    'The 2024-2025 All-New Maruti Suzuki Dzire sets a historic milestone in India’s compact sedan segment by securing a prestigious 5-Star Global NCAP adult safety rating. Powered by the high-efficiency Z-Series 1.2L engine achieving up to 33.73 km/kg on CNG, it integrates a segment-first electric sunroof, 360-degree surround vision, and refined executive rear legroom.',
  'maruti-swift':
    'Celebrated as India’s dynamic compact driver’s hatchback, the new Swift incorporates the ultra-refined Z12E powertrain offering high compression efficiency exceeding 25 kmpl. Standardized with 6 airbags, electronic stability control, and a driver-focused cockpit, it delivers agile urban manoeuvrability and low total cost of ownership.',
  'maruti-brezza':
    'The Maruti Suzuki Brezza provides dependable, high-durability compact SUV utility powered by the 1.5L K15C DualJet engine with Smart Hybrid technology. Distinguished by upright command seating, supple suspension damping, an electric sunroof, head-up display, and renowned service network support across India.',
  'maruti-baleno':
    'A premier offering in the premium hatchback class, the Baleno delivers expansive cabin real estate, supreme rear-seat comfort, and state-of-the-art tech including a 9-inch SmartPlay Pro+ display and 360-degree surround camera, backed by peppy fuel-efficient mechanicals.',
  'vw-virtus':
    'Engineered under the robust MQB-A0-IN platform, the Volkswagen Virtus exemplifies German automotive dynamics tailored for Indian road conditions. Notable for its segment-leading 521-litre cargo volume, 5-Star Global NCAP adult and child safety ratings, laser-welded roof architecture, and an exhilarating 1.5L TSI EVO engine with Active Cylinder Technology and 7-speed DSG.',
  'vw-taigun':
    'A dynamically sharp compact SUV built on high-tensile hot-formed steel, delivering pristine high-speed composure, European ride damping, and segment-leading structural safety ratings.',
  'honda-city':
    'The 5th-generation Honda City is the benchmark executive sedan in the Indian market. Defined by timeless styling, the renowned 1.5L i-VTEC high-revving engine, sofa-grade rear seat compliance, and Honda Sensing Level 2 camera-based ADAS technology.',
  'honda-elevate':
    'Honda’s global mid-size SUV engineered specifically for Indian driving terrains, showcasing a bold upright grille, class-topping 220 mm ground clearance, expansive outward visibility, and reliable naturally aspirated VTEC performance.',
  'hyundai-creta':
    'India’s top-selling midsize SUV delivers a comprehensive balance of executive prestige, futuristic quad-beam LED aesthetics, seamless dual 10.25-inch panoramic screens, and 19 Hyundai SmartSense Level 2 ADAS features paired with refined petrol and diesel powertrains.',
  'hyundai-venue':
    'A feature-loaded urban compact SUV offering segment-first power-adjustable driver seating, connected car tech with Alexa integration, distinct dark chrome parametric grille, and punchy 1.0L Turbo GDi performance.',
  'hyundai-i20':
    'A sophisticated European-styled premium hatchback featuring an assertive parametric jewel grille, digital instrument cluster, crisp Bose 7-speaker acoustics, and refined ride quality.',
  'hyundai-verna':
    'A futuristic executive sedan distinguished by its fastback silhouette, parametric light bar, potent 160 PS 1.5L Turbo petrol engine, and certified 5-Star Global NCAP crash safety rating.',
  'mahindra-thar':
    'An authentic off-road legend modernized for daily urban usability. Built on a rugged ladder-frame chassis with shift-on-the-fly 4x4, mechanical locking differential, robust all-terrain capability, and 4-star crash safety ratings.',
  'mahindra-scorpio-n':
    'Known as the "Big Daddy of SUVs", the Scorpio-N delivers immense presence, a commanding high seating vantage point, rear-wheel drive / 4XPLOR terrain management, and powerful mStallion petrol and mHawk diesel powertrains with 5-star Global NCAP safety.',
  'mahindra-xuv700':
    'Mahindra’s flagship technology tour-de-force featuring high-resolution dual 10.25-inch super screens, Sony 3D 12-speaker acoustic immersion, auto-booster headlights, Level 2 ADAS, and class-dominating 200 PS mStallion turbo power.',
  'toyota-fortuner':
    'The undisputed king of full-size ladder-frame SUVs in India, revered for unmatched resale retention, indestructible mechanical reliability, 500 Nm torque output from its 2.8L diesel engine, and go-anywhere 4WD drivetrain.',
  'toyota-innova-hycross':
    'Revolutionizing the premium MPV segment with a monocoque TNGA-C chassis and self-charging strong hybrid powertrain delivering 21.1 kmpl. Offers second-row ottoman lounge recliners, electric panoramic sunroof, and ultra-plush ride compliance.',
  'kia-seltos':
    'A design and tech trendsetter featuring dual panoramic curved displays, dual-zone climate control, 32 standard safety features, and a potent 160 PS turbo-petrol powertrain.',
  'kia-sonet':
    'A muscular compact SUV boasting Level 1 ADAS safety tech, ventilated front seating, dual 10.25-inch connected screens, and multiple punchy powertrain options including turbo-petrol and diesel.',
  'kia-carens':
    'A practical and refined 6/7-seater family recreational vehicle offering one-touch electric tumble second-row seats, 6 standard airbags, and smooth automatic driving dynamics.',
  'kia-ev6':
    'Kia’s flagship electric crossover built on the dedicated E-GMP 800V ultra-fast architecture, boasting up to 708 km ARAI range, supercar-level acceleration, and futuristic design.',
  'tata-punch':
    'India’s top-selling micro-SUV built on the ALFA architecture with a certified 5-Star Global NCAP safety rating, high 187 mm ground clearance, commanding SUV driving stance, and fuel-efficient petrol & i-CNG twin-cylinder options.',
  'tata-altroz':
    'A premium 5-Star Global NCAP rated hatchback featuring 90-degree wide-opening doors, laser-welded structural rigidity, factory-fitted i-CNG twin-tanks, and sophisticated European road manners.',
  'tata-tiago':
    'A dependable compact urban hatchback celebrated for sturdy 4-Star Global NCAP crash safety, peppy Revotron performance, and accessible zero-emission electric powertrain variants.',
  'maruti-fronx':
    'A stylish coupe-crossover derived from the Baleno platform with raised ground clearance, bold upright NEXA grille, refined 1.0L Turbo Boosterjet engine option, and 6-speed paddle-shift automatic transmission.',
  'maruti-grand-vitara':
    'Maruti Suzuki’s flagship mid-size SUV co-developed with Toyota, featuring intelligent ALLGRIP AWD capability and an ultra-frugal self-charging Strong Hybrid powertrain achieving up to 27.97 kmpl.',
  'maruti-ertiga':
    'India’s undisputed leading 7-seater MPV, praised for exceptional passenger packaging, proven K15C Smart Hybrid efficiency, factory-fitted S-CNG technology, and low lifetime ownership cost.',
  'hyundai-exter':
    'An entry-level urban SUV equipped with 6 airbags standard across all variants, dashcam with dual cameras, electric sunroof, smart voice commands, and robust city ground clearance.',
  'hyundai-alcazar':
    'A premium 6/7-seater SUV derivative of the Creta featuring extended wheelbase, ventilated captain seating, Level 2 ADAS, dynamic 1.5L Turbo petrol power, and executive highway comfort.',
  'mahindra-xuv-3xo':
    'A segment-disrupting compact SUV armed with Level 2 ADAS (a segment first), dual-zone climate control, panoramic skyroof, and segment-best mStallion TGDi turbo performance.',
  'mahindra-scorpio-classic':
    'The timeless, rugged Indian road icon retaining the classic ladder-frame presence, durable 2.2L mHawk diesel engine, hydraulic power steering feedback, and commanding high-perch seating.',
  'mahindra-bolero':
    'The legendary workhorse of rural and semi-urban India, renowned for indestructible metal bumper ruggedness, mHawk75 diesel torque, micro-hybrid technology, and unmatched mechanical durability.',
  'toyota-innova-crysta':
    'The revered long-distance MPV benchmark powered by the proven 2.4L GD turbo-diesel engine, body-on-frame toughness, sofa-grade captain seats, and bulletproof long-term resale value.',
  'toyota-urban-cruiser-hyryder':
    'Toyota’s sophisticated mid-size SUV engineered on TNGA architecture, offering segment-leading 27.97 kmpl fuel economy with self-charging Strong Hybrid electric technology.',
  'toyota-glanza':
    'A refined premium hatchback with modern Toyota styling, intuitive 9-inch Smart Playcast display, 6 airbags, 360-degree camera, and low operational maintenance costs.',
  'honda-amaze':
    'Honda’s refined compact sedan delivering plush interior space, a proven 1.2L i-VTEC petrol engine, silky-smooth CVT automatic, and renowned Japanese manufacturing reliability.',
  'vw-tiguan':
    'Volkswagen’s flagship German-engineered luxury SUV featuring standard 4MOTION all-wheel-drive, 190 PS 2.0L TSI power, matrix LED IQ.Light illumination, and European refinement.',
  'mg-astor':
    'A high-tech compact SUV featuring an AI personal robot assistant on the dashboard, Level 2 ADAS autonomous safety suite, sangria red leather interiors, and panoramic sunroof.',
  'mg-zs-ev':
    'A mature all-electric SUV with a 50.3 kWh Prismatic cell battery delivering 461 km certified range, 176 PS electric performance, and connected car intelligence.',
  'mg-windsor-ev':
    'An innovative crossover EV boasting aero-lounge reclining rear seats (135-degree angle), 15.6-inch GRANDVIEW display, and innovative battery-as-a-service architecture.',
  'mg-comet-ev':
    'A futuristic ultra-compact urban smart EV with GSEV platform engineering, dual 10.25-inch screens, agile 4.2m turning radius, and minimal operating costs for city driving.',
  'mg-hector':
    'The "Internet Inside" pioneer offering unmatched interior living-room volume, an immense 14-inch HD portrait infotainment display, panoramic sunroof, and Level 2 ADAS.',
};

function getCarDescription(car) {
  if (CAR_DESCRIPTIONS[car.id]) return CAR_DESCRIPTIONS[car.id];
  return `The ${car.name} is a distinguished ${car.bodyType} by ${car.brand} in the Indian automotive market, positioned in the ${car.priceRange} ex-showroom price bracket. Offered with ${car.fuelTypes} powertrain options, it delivers an ARAI-certified efficiency of ${car.specs?.mileage} with an engine output of ${car.specs?.power} and ${car.specs?.torque}. Configured with ${car.specs?.seating} capacity and ${car.specs?.bootSpace} of luggage volume, its structural setup includes ${car.specs?.safety?.split(',')[0]} for comprehensive occupant security.`;
}

const QUICK_PROMPTS = [
  'Tata Curvv Analysis',
  'Best SUV under ₹15 Lakh',
  'Maruti Dzire Variants & Pricing',
  '5-Star NCAP Safest Vehicles',
  'Volkswagen Virtus Executive Specs',
  '7-Seater Family Transporters',
];

/**
 * Dedicated Specific Car Dictionary
 * Ordered carefully so multi-word / more specific car identifiers take precedence:
 * e.g., 'scorpio classic' before 'scorpio', 'innova crysta' before 'innova', 'swift dzire' before 'swift',
 * 'grand vitara' before 'vitara brezza', 'xuv 3xo' before 'xuv700'.
 */
const SPECIFIC_CAR_RULES = [
  // TATA MOTORS
  { id: 'tata-curvv', keywords: ['curvv', 'curv', 'tata curvv', 'curvv ev', 'curvv coupe'] },
  { id: 'tata-harrier', keywords: ['harrier', 'tata harrier', 'harrier dark'] },
  { id: 'tata-safari', keywords: ['safari', 'tata safari', 'safari dark'] },
  { id: 'tata-punch', keywords: ['punch', 'tata punch', 'punch ev', 'punch cng'] },
  { id: 'tata-altroz', keywords: ['altroz', 'tata altroz', 'altroz racer'] },
  { id: 'tata-tiago', keywords: ['tiago', 'tata tiago', 'tiago ev'] },
  { id: 'tata-nexon', keywords: ['nexon', 'tata nexon', 'nexon ev'] },

  // MARUTI SUZUKI
  { id: 'maruti-dzire', keywords: ['dzire', 'desire', 'swift dzire', 'maruti dzire', 'new dzire'] },
  { id: 'maruti-swift', keywords: ['swift', 'maruti swift', 'new swift'] },
  { id: 'maruti-brezza', keywords: ['brezza', 'maruti brezza', 'vitara brezza'] },
  { id: 'maruti-grand-vitara', keywords: ['grand vitara', 'vitara', 'maruti vitara', 'maruti grand vitara'] },
  { id: 'maruti-fronx', keywords: ['fronx', 'maruti fronx'] },
  { id: 'maruti-baleno', keywords: ['baleno', 'maruti baleno'] },
  { id: 'maruti-ertiga', keywords: ['ertiga', 'maruti ertiga'] },

  // HYUNDAI
  { id: 'hyundai-creta', keywords: ['creta', 'hyundai creta', 'creta n line', 'creta facelift'] },
  { id: 'hyundai-venue', keywords: ['venue', 'hyundai venue', 'venue n line'] },
  { id: 'hyundai-i20', keywords: ['i20', 'i 20', 'i-20', 'hyundai i20', 'i20 n line'] },
  { id: 'hyundai-verna', keywords: ['verna', 'hyundai verna', 'new verna'] },
  { id: 'hyundai-exter', keywords: ['exter', 'hyundai exter'] },
  { id: 'hyundai-alcazar', keywords: ['alcazar', 'hyundai alcazar'] },

  // MAHINDRA
  { id: 'mahindra-thar', keywords: ['thar', 'mahindra thar', 'thar roxx', 'roxx', 'thar 4x4'] },
  { id: 'mahindra-scorpio-classic', keywords: ['scorpio classic', 'classic scorpio'] },
  { id: 'mahindra-scorpio-n', keywords: ['scorpio n', 'scorpio-n', 'scorpion', 'scorpio', 'mahindra scorpio', 'mahindra scorpio n'] },
  { id: 'mahindra-xuv-3xo', keywords: ['3xo', 'xuv 3xo', 'xuv3xo', 'xuv-3xo', 'xuv300', 'xuv 300'] },
  { id: 'mahindra-xuv700', keywords: ['xuv700', 'xuv 700', 'xuv-700', 'mahindra xuv700', 'mahindra xuv 700', 'xuv'] },
  { id: 'mahindra-bolero', keywords: ['bolero', 'bolero neo', 'mahindra bolero'] },

  // TOYOTA
  { id: 'toyota-fortuner', keywords: ['fortuner', 'legender', 'toyota fortuner'] },
  { id: 'toyota-innova-crysta', keywords: ['innova crysta', 'crysta', 'toyota crysta'] },
  { id: 'toyota-innova-hycross', keywords: ['innova hycross', 'hycross', 'innova', 'toyota innova', 'toyota hycross'] },
  { id: 'toyota-urban-cruiser-hyryder', keywords: ['hyryder', 'urban cruiser hyryder', 'urban cruiser', 'toyota hyryder'] },
  { id: 'toyota-glanza', keywords: ['glanza', 'toyota glanza'] },

  // KIA
  { id: 'kia-seltos', keywords: ['seltos', 'kia seltos'] },
  { id: 'kia-sonet', keywords: ['sonet', 'kia sonet'] },
  { id: 'kia-carens', keywords: ['carens', 'kia carens'] },
  { id: 'kia-ev6', keywords: ['ev6', 'ev 6', 'kia ev6'] },

  // HONDA
  { id: 'honda-city', keywords: ['honda city', 'city sedan', 'city hybrid', 'city hehev', 'city zx', 'city vx'] },
  { id: 'honda-elevate', keywords: ['elevate', 'honda elevate'] },
  { id: 'honda-amaze', keywords: ['amaze', 'honda amaze'] },

  // VOLKSWAGEN
  { id: 'vw-virtus', keywords: ['virtus', 'volkswagen virtus', 'vw virtus'] },
  { id: 'vw-taigun', keywords: ['taigun', 'volkswagen taigun', 'vw taigun'] },
  { id: 'vw-tiguan', keywords: ['tiguan', 'volkswagen tiguan', 'vw tiguan'] },

  // MG MOTOR
  { id: 'mg-hector', keywords: ['hector', 'hector plus', 'mg hector'] },
  { id: 'mg-astor', keywords: ['astor', 'mg astor'] },
  { id: 'mg-zs-ev', keywords: ['zs ev', 'zsev', 'zs-ev', 'mg zs ev', 'mg zs'] },
  { id: 'mg-windsor-ev', keywords: ['windsor', 'windsor ev', 'mg windsor', 'mg windsor ev'] },
  { id: 'mg-comet-ev', keywords: ['comet', 'comet ev', 'mg comet', 'mg comet ev'] },
];

/**
 * Intelligent AI Recommendation & Car Search Engine
 * When user asks about a specific car, STRICTLY returns ONLY that 1 car's details.
 */
function processAIQuery(query) {
  const q = query.toLowerCase().trim();
  const normalizedQ = q.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. HIGH-PRECISION SPECIFIC CAR MATCHING
  // If the query mentions any specific car model or alias, return ONLY THAT CAR!
  // ─────────────────────────────────────────────────────────────────────────────
  let matchedCar = null;

  // A. Check dedicated SPECIFIC_CAR_RULES first
  for (const rule of SPECIFIC_CAR_RULES) {
    for (const kw of rule.keywords) {
      const normKw = kw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      // Word boundary regex check
      const regex = new RegExp(`(^|\\s)${normKw}(\\s|$)`, 'i');
      if (regex.test(normalizedQ) || normalizedQ === normKw) {
        matchedCar = INDIAN_MARKET_CARS.find((c) => c.id === rule.id);
        break;
      }
    }
    if (matchedCar) break;
  }

  // B. Fallback check across full car names & model titles in database
  if (!matchedCar) {
    for (const car of INDIAN_MARKET_CARS) {
      const normCarName = car.name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const normModelOnly = normCarName
        .replace(/^(maruti suzuki|maruti|tata|hyundai|mahindra|toyota|kia|honda|volkswagen|vw|mg motor|mg)\s+/, '')
        .trim();

      if (normModelOnly && (new RegExp(`(^|\\s)${normModelOnly}(\\s|$)`, 'i').test(normalizedQ) || normalizedQ === normModelOnly)) {
        matchedCar = car;
        break;
      }

      if (new RegExp(`(^|\\s)${normCarName}(\\s|$)`, 'i').test(normalizedQ) || normalizedQ === normCarName) {
        matchedCar = car;
        break;
      }
    }
  }

  // C. Check Honda City specific edge case (distinguish "city driving" from "city")
  if (!matchedCar && (new RegExp(`(^|\\s)city(\\s|$)`, 'i').test(normalizedQ))) {
    if (!normalizedQ.includes('traffic') && !normalizedQ.includes('driving') && !normalizedQ.includes('commute') && !normalizedQ.includes('mileage')) {
      matchedCar = INDIAN_MARKET_CARS.find((c) => c.id === 'honda-city');
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MANDATORY USER REQUIREMENT:
  // When the user asks about ONE SPECIFIC CAR, give ONLY THAT CAR'S DETAILS!
  // ═════════════════════════════════════════════════════════════════════════
  if (matchedCar) {
    return {
      text: `Executive Automotive Advisory Report for **${matchedCar.name}**:\nBelow is the complete official variant breakdown with ex-showroom pricing, followed directly by the exact technical specifications and engineering benchmarks for this specific vehicle:`,
      cars: [matchedCar], // STRICTLY only this single car!
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. BRAND SEARCH (Only when NO specific model was mentioned)
  // ─────────────────────────────────────────────────────────────────────────────
  const brandKeywords = [
    { key: 'tata', brand: 'Tata Motors', models: 'Nexon, Curvv, Harrier, Safari, Punch, Altroz, Tiago' },
    { key: 'suzuki', brand: 'Maruti Suzuki', models: 'Dzire, Swift, Brezza, Baleno, Fronx, Grand Vitara, Ertiga' },
    { key: 'maruti', brand: 'Maruti Suzuki', models: 'Dzire, Swift, Brezza, Baleno, Fronx, Grand Vitara, Ertiga' },
    { key: 'hyundai', brand: 'Hyundai', models: 'Creta, Venue, Verna, i20, Exter, Alcazar' },
    { key: 'mahindra', brand: 'Mahindra', models: 'Thar, Scorpio-N, XUV700, XUV 3XO, Scorpio Classic, Bolero' },
    { key: 'toyota', brand: 'Toyota', models: 'Fortuner, Innova Hycross, Innova Crysta, Hyryder, Glanza' },
    { key: 'kia', brand: 'Kia', models: 'Seltos, Sonet, Carens, EV6' },
    { key: 'honda', brand: 'Honda', models: 'City, Elevate, Amaze' },
    { key: 'volkswagen', brand: 'Volkswagen', models: 'Virtus, Taigun, Tiguan' },
    { key: 'vw', brand: 'Volkswagen', models: 'Virtus, Taigun, Tiguan' },
    { key: 'mg', brand: 'MG Motor', models: 'Hector, Astor, Windsor EV, ZS EV, Comet EV' },
  ];

  for (const b of brandKeywords) {
    const brandRegex = new RegExp(`(^|\\s)${b.key}(\\s|$)`, 'i');
    if (brandRegex.test(normalizedQ)) {
      const brandCars = INDIAN_MARKET_CARS.filter((c) =>
        c.brand.toLowerCase().includes(b.brand.toLowerCase())
      );
      return {
        text: `Market Assessment for **${b.brand}** in India:\nAvailable models include **${b.models}**.\n\nTo view complete official variants and exact technical specifications for any specific model, please ask about that car directly (e.g. *"Tell me about ${b.models.split(',')[0].trim()}"*). Below are key representatives from ${b.brand}:`,
        cars: brandCars.slice(0, 3),
      };
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. REQUIREMENTS: BUDGET CATEGORY SEARCH
  // ─────────────────────────────────────────────────────────────────────────────
  if (normalizedQ.includes('under') && (normalizedQ.includes('15') || normalizedQ.includes('12') || normalizedQ.includes('10'))) {
    const maxBudget = normalizedQ.includes('10') ? 10.5 : normalizedQ.includes('12') ? 12.5 : 15.5;
    const budgetCars = INDIAN_MARKET_CARS.filter((c) => {
      const match = c.priceRange.match(/₹([\d.]+)/);
      return match ? parseFloat(match[1]) <= maxBudget : false;
    });

    return {
      text: `Strategic Portfolio Recommendation (Budget: **Under ₹${maxBudget} Lakh**):\nHere are the top-rated vehicles that optimize price-to-performance, safety metrics, and operational value in the Indian market:`,
      cars: budgetCars.slice(0, 3),
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. REQUIREMENTS: 7-SEATER / FAMILY CATEGORY SEARCH
  // ─────────────────────────────────────────────────────────────────────────────
  if (normalizedQ.includes('7 seater') || normalizedQ.includes('7seater') || normalizedQ.includes('large family')) {
    const familyCars = INDIAN_MARKET_CARS.filter(
      (c) =>
        c.specs?.seating?.includes('7') ||
        c.bodyType.includes('MPV') ||
        c.bodyType.includes('7-Seater')
    );
    return {
      text: `Executive Fleet & Family Advisory (7-Seater / High-Capacity Requirement):\nEvaluated for passenger ingress/egress, modular luggage volume, third-row ergonomics, and complete variant pricing:`,
      cars: familyCars.slice(0, 3),
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. REQUIREMENTS: SAFETY / 5-STAR CATEGORY SEARCH
  // ─────────────────────────────────────────────────────────────────────────────
  if (normalizedQ.includes('safe') || normalizedQ.includes('5 star') || normalizedQ.includes('ncap')) {
    const safeCars = INDIAN_MARKET_CARS.filter((c) => c.specs?.safety?.includes('5-Star'));
    return {
      text: `Vehicle Safety & Structural Integrity Report (5-Star Certified Models):\nThe following vehicles have been validated through rigorous Global NCAP / Bharat NCAP impact protocols with advanced active and passive safety architecture:`,
      cars: safeCars.slice(0, 3),
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. REQUIREMENTS: ELECTRIC / EV CATEGORY SEARCH
  // ─────────────────────────────────────────────────────────────────────────────
  if (normalizedQ.includes('electric') || normalizedQ.includes('ev') || normalizedQ.includes('battery')) {
    const evCars = INDIAN_MARKET_CARS.filter((c) => c.fuelTypes.includes('Electric'));
    return {
      text: `Electric Mobility Advisory (Zero-Emission Fleet in India):\nEvaluated for real-world driving range, battery thermal management in Indian climatic conditions, fast-charging infrastructure compatibility, and variant economics:`,
      cars: evCars.slice(0, 3),
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. GENERAL ADVISORY GUIDANCE (Do not dump unrequested cars)
  // ─────────────────────────────────────────────────────────────────────────────
  return {
    text: `Welcome to the **Executive Automotive Advisory AI**.\n\nTo view complete official variants and exact technical specifications, please ask about any specific vehicle in India:\n• **Tata Curvv**, **Tata Nexon**, **Tata Harrier**, or **Tata Punch**\n• **Maruti Dzire**, **Maruti Swift**, **Brezza**, or **Grand Vitara**\n• **Hyundai Creta**, **Venue**, **i20**, or **Verna**\n• **Mahindra Thar**, **Scorpio-N**, or **XUV700**\n• **Volkswagen Virtus** or **Taigun**\n• **Toyota Fortuner** or **Innova Hycross**\n• **Honda City** or **Elevate**\n• **Kia Seltos** or **Sonet**\n• **MG Hector** or **Windsor EV**\n\nOr ask by your specific requirements (e.g. *"Best SUV under ₹15 Lakh"*, *"7-Seater family cars"*, *"Safest 5-Star NCAP cars"*).`,
    cars: [],
  };
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: 'Welcome to the **Executive Automotive Advisory AI** for the Indian Market.\n\nState your purchase requirements (e.g. *"Family SUV under ₹15 Lakh"*, *"Best diesel highway cruiser"*, *"Safest family car with 5-star rating"*) or specify any model (e.g. *"Tata Curvv"*, *"Maruti Dzire"*, *"Volkswagen Virtus"*) to receive a comprehensive technical analysis, executive description, core specifications, and variant price schedule.',
    cars: [],
    timestamp: 'Just now',
  },
];

/**
 * AIChatbotModal — Professional Automotive Advisory Chatbot (Strictly Image-Free)
 */
export default function AIChatbotModal({ isOpen, onClose, onSelectCar }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedVariants, setExpandedVariants] = useState({});
  const messagesEndRef = useRef(null);

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputQuery('');
    setIsTyping(false);
    setExpandedVariants({});
  };

  // Refresh and clean conversation whenever modal is closed
  useEffect(() => {
    if (!isOpen) {
      resetChat();
    }
  }, [isOpen]);

  const handleClose = () => {
    resetChat();
    if (onClose) onClose();
  };

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    // Append user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: q,
      cars: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // AI synthesis delay
    setTimeout(() => {
      const response = processAIQuery(q);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        cars: response.cars,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  const toggleVariants = (carId) => {
    setExpandedVariants((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Chatbot Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-4xl h-[92vh] max-h-[860px] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* ─── Header: AI Assistant Brand & Status ─── */}
          <div
            className="p-4 sm:p-5 border-b shrink-0 flex items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 165, 153, 0.14) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-2xl flex items-center justify-center shadow-md relative"
                style={{
                  background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                  color: '#ffffff',
                }}
              >
                <Bot className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2
                    className="text-base sm:text-lg font-extrabold tracking-tight"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Carzento AI Advisor
                  </h2>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(30, 165, 153, 0.15)',
                      color: 'var(--color-teal)',
                      border: '1px solid rgba(30, 165, 153, 0.3)',
                    }}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Indian Market Intelligence</span>
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Executive Automotive Advisory &bull; Technical Specifications &bull; Variant Pricing
                </p>
              </div>
            </div>

            {/* Header Actions: Refresh + Close */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                style={{
                  background: 'rgba(30, 165, 153, 0.12)',
                  color: 'var(--color-teal)',
                  border: '1px solid rgba(30, 165, 153, 0.28)',
                }}
                title="Refresh and clear conversation"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl transition-colors cursor-pointer shrink-0"
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                }}
                title="Close Advisor"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ─── Chat Message Feed ─── */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div
                    className="h-8 w-8 rounded-xl shrink-0 flex items-center justify-center shadow-sm"
                    style={{ background: 'var(--color-teal)', color: '#ffffff' }}
                  >
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    msg.sender === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                  }`}
                  style={{
                    background: msg.sender === 'user' ? 'var(--color-teal)' : 'var(--color-card)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--color-text)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>

                  {/* Professional Executive Car Cards (Strictly Image-Free) */}
                  {msg.cars && msg.cars.length > 0 && (
                    <div className="mt-3.5 space-y-3.5">
                      {msg.cars.map((car) => {
                        const isExpanded = !!expandedVariants[car.id];

                        return (
                          <div
                            key={car.id}
                            className="rounded-2xl p-4 sm:p-5 shadow-lg transition-all"
                            style={{
                              background: 'var(--color-base)',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            {/* Card Header: Brand, Model, Segment, Price */}
                            <div
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b"
                              style={{ borderColor: 'var(--color-border)' }}
                            >
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white"
                                    style={{ background: 'var(--color-teal)' }}
                                  >
                                    {car.brand}
                                  </span>
                                  <span
                                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                                    style={{
                                      background: 'rgba(255, 255, 255, 0.08)',
                                      color: 'var(--color-text-secondary)',
                                    }}
                                  >
                                    {car.bodyType}
                                  </span>
                                  <span
                                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                                    style={{
                                      background: 'rgba(30, 165, 153, 0.1)',
                                      color: 'var(--color-teal)',
                                    }}
                                  >
                                    {car.fuelTypes}
                                  </span>
                                </div>
                                <h3
                                  className="text-lg sm:text-xl font-black tracking-tight"
                                  style={{ color: 'var(--color-text)' }}
                                >
                                  {car.name}
                                </h3>
                              </div>

                              {/* Ex-Showroom Price Range */}
                              <div className="sm:text-right">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                                  Ex-Showroom Price Range
                                </span>
                                <span className="text-base sm:text-lg font-black text-[var(--color-teal)]">
                                  {car.priceRange}
                                </span>
                              </div>
                            </div>

                            {/* Executive Vehicle Assessment */}
                            <div
                              className="my-3 p-3 sm:p-3.5 rounded-xl text-xs sm:text-[13px] leading-relaxed"
                              style={{
                                background: 'rgba(0, 0, 0, 0.03)',
                                border: '1px solid var(--color-border)',
                              }}
                            >
                              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-teal)] mb-1">
                                <Award className="h-3.5 w-3.5" />
                                <span>Executive Vehicle Assessment</span>
                              </div>
                              <p style={{ color: 'var(--color-text-secondary)' }}>
                                {getCarDescription(car)}
                              </p>
                            </div>

                            {/* ─── 1. Official Variants & Pricing Table ─── */}
                            {car.variants && car.variants.length > 0 && (
                              <div className="my-3.5 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-teal)]">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span>Official Variants &amp; Ex-Showroom Pricing</span>
                                  </div>
                                  <span className="text-[11px] px-2 py-0.5 rounded font-medium text-neutral-400 bg-white/5">
                                    {car.variants.length} Variants
                                  </span>
                                </div>

                                <div
                                  className="overflow-x-auto rounded-xl border max-h-[300px] overflow-y-auto"
                                  style={{
                                    borderColor: 'var(--color-border)',
                                    background: 'rgba(0, 0, 0, 0.02)',
                                  }}
                                >
                                  <table className="w-full text-left border-collapse text-xs">
                                    <thead className="sticky top-0 z-10">
                                      <tr
                                        style={{
                                          background: 'rgba(15, 23, 42, 0.95)',
                                          borderBottom: '1px solid var(--color-border)',
                                        }}
                                      >
                                        <th className="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-neutral-400">
                                          Variant Trim
                                        </th>
                                        <th className="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-neutral-400">
                                          Engine / Fuel
                                        </th>
                                        <th className="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-neutral-400">
                                          Transmission
                                        </th>
                                        <th className="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-neutral-400 hidden sm:table-cell">
                                          Key Features
                                        </th>
                                        <th className="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-right text-[var(--color-teal)]">
                                          Ex-Showroom Price
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                                      {car.variants.map((v, idx) => (
                                        <tr
                                          key={idx}
                                          className="hover:bg-white/[0.03] transition-colors"
                                          style={{
                                            background:
                                              idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                                          }}
                                        >
                                          <td
                                            className="py-2 px-3 font-bold whitespace-nowrap"
                                            style={{ color: 'var(--color-text)' }}
                                          >
                                            {v.name}
                                          </td>
                                          <td className="py-2 px-3 text-neutral-400 whitespace-nowrap">
                                            {v.engine}
                                          </td>
                                          <td className="py-2 px-3 whitespace-nowrap">
                                            <span
                                              className="px-2 py-0.5 rounded text-[10px] font-semibold"
                                              style={{
                                                background: 'rgba(30, 165, 153, 0.1)',
                                                color: 'var(--color-teal)',
                                              }}
                                            >
                                              {v.transmission}
                                            </span>
                                          </td>
                                          <td
                                            className="py-2 px-3 text-neutral-400 hidden sm:table-cell text-[11px] max-w-[260px] truncate"
                                            title={v.keyFeatures}
                                          >
                                            {v.keyFeatures}
                                          </td>
                                          <td className="py-2 px-3 font-black text-right whitespace-nowrap text-sm text-[var(--color-teal)]">
                                            {v.price}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* ─── 2. Exact Technical Specifications Table (Directly Below Variants) ─── */}
                            {car.specs && (
                              <div className="my-4 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-teal)]">
                                    <Gauge className="h-3.5 w-3.5" />
                                    <span>Exact Technical Specifications</span>
                                  </div>
                                  <span className="text-[11px] px-2 py-0.5 rounded font-medium text-neutral-400 bg-white/5">
                                    Official OEM &amp; ARAI Benchmarks
                                  </span>
                                </div>

                                <div
                                  className="overflow-hidden rounded-xl border"
                                  style={{
                                    borderColor: 'var(--color-border)',
                                    background: 'rgba(0, 0, 0, 0.02)',
                                  }}
                                >
                                  <table className="w-full text-left border-collapse text-xs">
                                    <tbody
                                      className="divide-y"
                                      style={{ borderColor: 'var(--color-border)' }}
                                    >
                                      {[
                                        { label: 'Engine & Displacement', value: car.specs.engine, icon: Gauge },
                                        { label: 'Max Power Output', value: car.specs.power, icon: Sparkles },
                                        { label: 'Peak Torque', value: car.specs.torque, icon: Cog },
                                        {
                                          label: 'ARAI Certified Mileage',
                                          value: car.specs.mileage,
                                          highlight: true,
                                          icon: Fuel,
                                        },
                                        { label: 'Transmission Choices', value: car.specs.transmission, icon: Cog },
                                        { label: 'Seating Capacity', value: car.specs.seating, icon: Users },
                                        { label: 'Boot Space (Cargo Volume)', value: car.specs.bootSpace, icon: Users },
                                        { label: 'Fuel Tank Capacity', value: car.specs.fuelTank, icon: Fuel },
                                        {
                                          label: 'Ground Clearance',
                                          value: car.specs.groundClearance,
                                          icon: SlidersHorizontal,
                                        },
                                        {
                                          label: 'Safety Certification & Rating',
                                          value: car.specs.safety,
                                          highlightBadge: true,
                                          icon: ShieldCheck,
                                        },
                                      ]
                                        .filter((item) => item.value)
                                        .map((item, sIdx) => {
                                          const IconComp = item.icon;
                                          return (
                                            <tr
                                              key={sIdx}
                                              className="hover:bg-white/[0.03] transition-colors"
                                              style={{
                                                background:
                                                  sIdx % 2 === 0
                                                    ? 'transparent'
                                                    : 'rgba(255, 255, 255, 0.015)',
                                              }}
                                            >
                                              <td className="py-2.5 px-3.5 font-semibold text-neutral-400 w-2/5 sm:w-1/3 flex items-center gap-2 whitespace-nowrap">
                                                <IconComp className="h-3.5 w-3.5 text-[var(--color-teal)] shrink-0" />
                                                <span>{item.label}</span>
                                              </td>
                                              <td
                                                className="py-2.5 px-3.5 font-bold"
                                                style={{ color: 'var(--color-text)' }}
                                              >
                                                {item.highlight ? (
                                                  <span className="text-[var(--color-teal)] font-extrabold">
                                                    {item.value}
                                                  </span>
                                                ) : item.highlightBadge ? (
                                                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    {item.value}
                                                  </span>
                                                ) : (
                                                  item.value
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Navigation Action */}
                            <div
                              className="mt-3 pt-3 border-t flex items-center justify-end"
                              style={{ borderColor: 'var(--color-border)' }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  handleClose();
                                  onSelectCar(car);
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer hover:underline text-[var(--color-teal)]"
                              >
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                <span>Inspect Full Dimensional Specifications Sheet &rarr;</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <span className="block text-[10px] mt-1.5 opacity-60 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center">
                <div
                  className="h-8 w-8 rounded-xl shrink-0 flex items-center justify-center shadow-sm"
                  style={{ background: 'var(--color-teal)', color: '#ffffff' }}
                >
                  <Bot className="h-4 w-4" />
                </div>
                <div
                  className="rounded-2xl px-4 py-3 shadow-sm rounded-tl-sm flex items-center gap-1.5"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--color-teal)] animate-bounce" />
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--color-teal)] animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--color-teal)] animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                  <span className="text-xs text-neutral-400 ml-2">
                    Synthesizing automotive market data...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ─── Quick Prompt Chips ─── */}
          <div
            className="p-3 border-t shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar"
            style={{
              borderColor: 'var(--color-border)',
              background: 'rgba(0, 0, 0, 0.02)',
            }}
          >
            <span
              className="text-[11px] font-bold shrink-0 uppercase tracking-wider pl-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Suggested:
            </span>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer font-medium hover:scale-105"
                style={{
                  background: 'var(--color-input)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* ─── Footer Input Bar ─── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3.5 sm:p-4 border-t shrink-0 flex items-center gap-2"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-card)',
            }}
          >
            <div
              className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
              style={{
                background: 'var(--color-input)',
                border: '1px solid var(--color-border)',
              }}
            >
              <input
                type="text"
                placeholder="Ask about requirements (e.g. 7-seater SUV under 15 Lakh) or any car (e.g. Tata Curvv, Dzire)..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-neutral-500"
                style={{ color: 'var(--color-text)' }}
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="h-10 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                color: '#ffffff',
              }}
            >
              <span>Consult AI</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
