import { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingDown,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Percent,
  Calendar,
  IndianRupee,
  Layers,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

const FAQS = [
  {
    q: 'Which cars in India currently hold a certified 5-Star Global / Bharat NCAP rating?',
    a: 'Key 5-Star rated vehicles include the All-New Maruti Suzuki Dzire (2024), Tata Curvv, Tata Nexon, Tata Harrier, Tata Safari, Tata Punch, Volkswagen Virtus, Skoda Slavia, and Mahindra XUV700 & Scorpio-N. All undergo rigorous offset frontal, side barrier, and child occupant dynamic testing.',
  },
  {
    q: 'How much money does an Electric Car (EV) save compared to a Petrol vehicle?',
    a: 'On average, an EV runs at approximately ₹1.10 to ₹1.40 per km when charged at home, whereas a petrol vehicle consumes between ₹7.50 and ₹9.00 per km. For an average annual running of 15,000 km, an EV buyer saves roughly ₹85,000 to ₹1,00,000 every single year in fuel costs alone.',
  },
  {
    q: 'What is the ideal tenure and down payment for a new car loan in India?',
    a: 'Automotive financial advisors recommend paying at least 20% to 25% down payment and keeping the loan tenure between 3 to 5 years (36 to 60 months) to minimize total interest outflow while avoiding negative equity depreciation.',
  },
  {
    q: 'What is the difference between Mild Hybrid and Strong Self-Charging Hybrid?',
    a: 'Mild Hybrids (like Maruti Smart Hybrid) use a small integrated starter-generator (ISG) to assist during acceleration and auto engine start-stop, but cannot drive solely on electric power. Strong Hybrids (like Toyota Innova Hycross & Grand Vitara) feature high-voltage traction batteries and electric motors capable of pure EV driving at city speeds, yielding 25-28 kmpl.',
  },
];

export default function AutomotiveResourcesSection({ onOpenAIChatbot, onOpenFindDealers }) {
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(1000000); // 10 Lakh
  const [interestRate, setInterestRate] = useState(8.75); // 8.75%
  const [loanTenure, setLoanTenure] = useState(5); // 5 Years

  // EV Savings State
  const [annualKm, setAnnualKm] = useState(15000); // 15,000 km/year

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // EMI Calculation Logic
  const { monthlyEmi, totalInterest, totalPayable } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayable: Math.round(total),
    };
  }, [loanAmount, interestRate, loanTenure]);

  // Fuel vs EV Savings Calculation
  const { petrolCost, evCost, netSavings } = useMemo(() => {
    const petrolKmCost = 8.2; // ₹8.2 per km (12 kmpl @ ₹98/L)
    const evKmCost = 1.25; // ₹1.25 per km (15 kWh/100km @ ₹8/unit)

    const pTotal = Math.round(annualKm * petrolKmCost);
    const evTotal = Math.round(annualKm * evKmCost);
    return {
      petrolCost: pTotal,
      evCost: evTotal,
      netSavings: pTotal - evTotal,
    };
  }, [annualKm]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8" style={{ background: 'var(--color-base)', paddingTop: '40px', paddingBottom: '70px' }}>
      <div className="max-w-[1320px] mx-auto">
        {/* ─── Header: Matching Popular Cars & Most Used Cars Alignment ─── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-10 pb-5 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-1.5 h-7 rounded-full inline-block"
                style={{ background: 'var(--color-teal)' }}
              />
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{ color: 'var(--color-text)' }}
              >
                Financial Tools &amp; <span style={{ color: 'var(--color-teal)' }}>Advisory Resources</span>
              </h2>
            </div>
            <p
              className="text-sm sm:text-base pl-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Plan your car acquisition with precision using real-time EMI loan calculators, EV running economy models, and verified OEM certifications.
            </p>
          </div>

          {/* Single line to the corner */}
          <div className="flex items-center gap-2.5 shrink-0 pl-4 lg:pl-0">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              style={{
                background: 'rgba(30, 165, 153, 0.12)',
                color: 'var(--color-teal)',
                border: '1px solid rgba(30, 165, 153, 0.3)',
              }}
            >
              <Sparkles className="w-4 h-4 text-[var(--color-teal)]" />
              <span>Fintech &amp; Advisory Suite</span>
            </div>
          </div>
        </div>

        {/* ── 2-Column Core Resources: EMI Calculator & EV Savings ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 1. Interactive EMI Calculator Card */}
          <div
            className="rounded-2xl p-6 sm:p-7 border shadow-xl flex flex-col justify-between"
            style={{
              background: 'var(--color-card)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 border-b mb-6" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-teal)]/15 text-[var(--color-teal)] flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>Car Loan EMI Estimator</h3>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Accurate bank rate calculations</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[var(--color-teal)] text-white shadow-sm">
                  ₹{monthlyEmi.toLocaleString('en-IN')} / mo
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Loan Amount:</span>
                    <span className="text-[var(--color-teal)] text-sm font-black">
                      ₹{(loanAmount / 100000).toFixed(1)} Lakh (₹{loanAmount.toLocaleString('en-IN')})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="4000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[var(--color-teal)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>₹1 Lakh</span>
                    <span>₹20 Lakh</span>
                    <span>₹40 Lakh</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Annual Interest Rate:</span>
                    <span className="text-amber-500 text-sm font-black">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="14"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>7.0%</span>
                    <span>10.5%</span>
                    <span>14.0%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Tenure (Years):</span>
                    <span className="text-sm font-black" style={{ color: 'var(--color-text)' }}>{loanTenure} Years ({loanTenure * 12} Mos)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[3, 4, 5, 6, 7].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setLoanTenure(yr)}
                        className="py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        style={{
                          background: loanTenure === yr ? 'var(--color-teal)' : 'var(--color-hover-bg)',
                          color: loanTenure === yr ? '#ffffff' : 'var(--color-text-secondary)',
                          border: `1px solid ${loanTenure === yr ? 'var(--color-teal)' : 'var(--color-border)'}`,
                        }}
                      >
                        {yr} Yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* EMI Summary Output */}
            <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-2 text-center text-xs" style={{ borderColor: 'var(--color-border)' }}>
              <div className="p-2.5 rounded-xl" style={{ background: 'var(--color-hover-bg)', border: '1px solid var(--color-border)' }}>
                <span className="text-[10px] block" style={{ color: 'var(--color-text-secondary)' }}>Principal</span>
                <span className="font-bold" style={{ color: 'var(--color-text)' }}>₹{(loanAmount / 100000).toFixed(2)}L</span>
              </div>
              <div className="p-2.5 rounded-xl" style={{ background: 'var(--color-hover-bg)', border: '1px solid var(--color-border)' }}>
                <span className="text-[10px] block" style={{ color: 'var(--color-text-secondary)' }}>Total Interest</span>
                <span className="font-bold text-amber-500">₹{(totalInterest / 100000).toFixed(2)}L</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-500 font-semibold block">Total Payable</span>
                <span className="font-black text-emerald-500">₹{(totalPayable / 100000).toFixed(2)}L</span>
              </div>
            </div>
          </div>

          {/* 2. Fuel vs EV Annual Savings Calculator */}
          <div
            className="rounded-2xl p-6 sm:p-7 border shadow-xl flex flex-col justify-between"
            style={{
              background: 'var(--color-card)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 border-b mb-6" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>EV vs Petrol Savings Simulator</h3>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Annual operating cost comparison</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500 text-white shadow-sm">
                  Save ₹{netSavings.toLocaleString('en-IN')}/yr
                </span>
              </div>

              {/* Annual Distance Slider */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Your Annual Driving Distance:</span>
                  <span className="text-emerald-500 text-sm font-black">
                    {annualKm.toLocaleString('en-IN')} km / year (~{Math.round(annualKm / 12)} km/mo)
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="35000"
                  step="1000"
                  value={annualKm}
                  onChange={(e) => setAnnualKm(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>5,000 km</span>
                  <span>20,000 km</span>
                  <span>35,000 km</span>
                </div>
              </div>

              {/* Comparison Visual Bars */}
              <div className="space-y-4 text-xs">
                {/* Petrol Cost Bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>⛽ Petrol Running Cost (@ ₹8.20/km):</span>
                    </span>
                    <span className="font-bold text-rose-500">₹{petrolCost.toLocaleString('en-IN')} / yr</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-hover-bg)', border: '1px solid var(--color-border)' }}>
                    <div className="h-full bg-rose-500 rounded-full w-full" />
                  </div>
                </div>

                {/* EV Cost Bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>⚡ Electric EV Cost (@ ₹1.25/km):</span>
                    </span>
                    <span className="font-bold text-emerald-500">₹{evCost.toLocaleString('en-IN')} / yr</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-hover-bg)', border: '1px solid var(--color-border)' }}>
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round((evCost / petrolCost) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mt-6 text-xs" style={{ color: 'var(--color-text)' }}>
                <span className="font-bold text-emerald-500 block mb-0.5">5-Year Cumulative Savings Benchmark:</span>
                Switching to an EV saves approximately <strong className="font-black" style={{ color: 'var(--color-text)' }}>₹{(netSavings * 5).toLocaleString('en-IN')}</strong> over 5 years of ownership, effectively offsetting the initial battery premium.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Zero tailpipe emissions</span>
              <button
                onClick={() => onOpenAIChatbot && onOpenAIChatbot()}
                className="text-xs font-bold text-[var(--color-teal)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ask AI About EV Subsidies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. Certified Buyer Assurance & Quality Benchmarks ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              title: '140-Point Inspection',
              desc: 'Engine compression, transmission fluid, electrical OBD diagnostics & chassis integrity certified.',
              icon: ShieldCheck,
              color: 'text-teal-400',
              bg: 'bg-teal-500/10',
            },
            {
              title: 'RTO Transfer Assurance',
              desc: 'Seamless name transfer, RC endorsement, state NOC clearances, and loan hypothecation cancellation.',
              icon: CheckCircle2,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
            },
            {
              title: '7-Day Return Guarantee',
              desc: '100% money-back peace-of-mind guarantee if vehicle deviates from verified mechanical condition.',
              icon: Layers,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
            {
              title: 'Zero-Downpayment Financing',
              desc: 'Instant pre-approvals via top banking partners including HDFC, SBI, ICICI, and Axis Bank.',
              icon: IndianRupee,
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/10',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all hover:border-[var(--color-teal)]/40 hover:shadow-lg"
                style={{
                  background: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ─── Glowing Divider with Distance Same as Highlighted Topics ─── */}
        <div
          className="w-full"
          style={{ paddingTop: '50px', paddingBottom: '50px' }}
        >
          <div
            style={{
              height: '1.5px',
              width: '100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(30, 165, 153, 0.45) 20%, rgba(45, 212, 191, 0.6) 50%, rgba(30, 165, 153, 0.45) 80%, transparent 100%)',
              boxShadow: '0 0 15px rgba(30, 165, 153, 0.35)',
            }}
          />
        </div>

        {/* ── Frequently Asked Questions (FAQ) ── */}
        <div className="w-full">
          {/* FAQ Header: Correct Alignment Order to the Corner */}
          <div
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-10 pb-5 border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-1.5 h-7 rounded-full inline-block"
                  style={{ background: 'var(--color-teal)' }}
                />
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                  style={{ color: 'var(--color-text)' }}
                >
                  Frequently Asked <span style={{ color: 'var(--color-teal)' }}>Questions</span> by Car Buyers
                </h2>
              </div>
              <p
                className="text-sm sm:text-base pl-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Essential clarity on safety ratings, fuel types, and automotive financing
              </p>
            </div>

            {/* Single line to the corner */}
            <div className="flex items-center gap-2.5 shrink-0 pl-4 lg:pl-0">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                style={{
                  background: 'rgba(30, 165, 153, 0.12)',
                  color: 'var(--color-teal)',
                  border: '1px solid rgba(30, 165, 153, 0.3)',
                }}
              >
                <HelpCircle className="w-4 h-4 text-[var(--color-teal)]" />
                <span>Buyer Knowledge Base</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;

              return (
                <div
                  key={fIdx}
                  className="rounded-xl border overflow-hidden transition-colors"
                  style={{
                    background: 'var(--color-card)',
                    borderColor: isOpen ? 'var(--color-teal)' : 'var(--color-border)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : fIdx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[var(--color-teal)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                    )}
                  </button>

                  {isOpen && (
                    <div
                      className="px-4 pb-4 text-xs leading-relaxed border-t pt-3"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
