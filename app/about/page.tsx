"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

/* ===== Types ===== */
type Milestone = {
  year: string;
  title: string;
  description: string;
  color: "red" | "green" | "purple" | "orange";
};

type Stat = {
  number: string;
  label: string;
  subtext: string;
  color: "blue" | "green" | "purple" | "orange";
};

type CoreValue = {
  icon: string;
  title: string;
  description: string;
  color: "red" | "green" | "blue" | "purple";
};

type Testimonial = {
  quote: string;
  author: string;
  company: string;
  industry: string;
  result: string;
  timeframe: string;
};

type TeamMember = {
  name: string;
  title: string;
  focus: string;
  blurb: string;
  metrics?: string[];
  roleColor: "blue" | "green" | "purple";
  // Optional: when you have real headshots, replace placeholderSrc with your image path
  placeholderSrc?: string;
};

/* ===== Brand ===== */
const BRAND = "Tropiq Automations"; // update this when you rebrand

/* ===== Timeline (refined, “we” voice, accurate attribution) ===== */
const milestones: Milestone[] = [
  {
    year: "2018",
    title: "The Breaking Point in Business Inefficiency",
    description:
      "We watched organizations across industries lose millions to manual processes while faster competitors pulled ahead. It was clear the market needed a systematic, scalable solution.",
    color: "red",
  },
  {
    year: "2020",
    title: "First Major Breakthrough",
    description:
      "We deployed a comprehensive automation system for a struggling insurance broker—yielding 67% faster lead conversion, $300K in new revenue, and 25 hours saved weekly through automated workflows and follow-up.",
    color: "green",
  },
  {
    year: "2022",
    title: "AI Integration Revolution",
    description:
      "We moved beyond single tools to full-stack systems across healthcare, legal, and services. Clients began consistently achieving 5× ROI within months as operations became faster, leaner, and more consistent.",
    color: "purple",
  },
  {
    year: "2024",
    title: "Elite AI Partnership Team",
    description:
      "Founder Chris partnered with senior engineers Zaine and Hassan—combining business strategy with deep technical execution. The technical team brings a track record of 300+ automation deployments with a 100% client success rate.",
    color: "orange",
  },
];

/* ===== Stats (cred set) ===== */
const stats: Stat[] = [
  {
    number: "300+",
    label: "AI Systems Delivered",
    subtext: "Technical team track record across healthcare, legal, services & ops",
    color: "blue",
  },
  {
    number: "10+",
    label: "Years’ Combined Expertise",
    subtext: "Hands-on AI automation, integration & production delivery",
    color: "green",
  },
  {
    number: "$1M+",
    label: "Client Revenue Unlocked",
    subtext: "Recovered opportunities and faster cycle times",
    color: "purple",
  },
  {
    number: "100%",
    label: "Measured ROI Rate",
    subtext: "Clients achieve 5× ROI within months with ongoing optimization",
    color: "orange",
  },
];

/* ===== Core Values / Approach Pillars ===== */
const coreValues: CoreValue[] = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "AI Agent Engineering",
    description:
      "We architect, deploy, and maintain agents specific to your operations—from intake and qualification to routing, scheduling, billing, and beyond.",
    color: "red",
  },
  {
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 003.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    title: "Fully Managed Delivery",
    description:
      "We handle end-to-end implementation, integration into your stack, training, and iteration—so your team gets outcomes, not overhead.",
    color: "green",
  },
  {
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "Business-First Engineering",
    description:
      "We anchor builds to profit levers: faster response, higher conversion, less admin load, and repeatable scale.",
    color: "blue",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "A Real Partner",
    description:
      "We embed with your team, align to goals, train staff, ensure adoption—and keep tuning as you grow.",
    color: "purple",
  },
];

/* ===== Testimonials ===== */
const testimonials: Testimonial[] = [
  {
    quote:
      "We cut 20+ admin hours a week and doubled consult show rates. The team handled everything—from integrations to training—fast.",
    author: "David Chen",
    company: "Pacific Insurance Group",
    industry: "Insurance Services",
    result: "52% revenue lift",
    timeframe: "4 months",
  },
  {
    quote:
      "Our lead qualification and follow-up now run automatically. We saved ~$8K/month in wasted time and closed more high-ticket work.",
    author: "Maria Rodriguez",
    company: "Elite Home Solutions",
    industry: "Home Services",
    result: "$8K monthly savings",
    timeframe: "8 weeks ROI",
  },
  {
    quote:
      "Loan processing dropped from days to hours. CSAT climbed and we 3×’d volume without adding headcount.",
    author: "Robert Kim",
    company: "First Capital Lending",
    industry: "Financial Services",
    result: "60% CSAT increase",
    timeframe: "3× capacity",
  },
];

/* ===== Team ===== */
const team: TeamMember[] = [
  {
    name: "Chris Sanz",
    title: "Founder & Business AI Strategist",
    focus: "Business Process Optimization & AI Strategy",
    blurb:
      "Over a decade of watching businesses pay inefficiency taxes—now focused on helping leaders avoid them while driving growth with measurable ROI.",
    roleColor: "blue",
    placeholderSrc: "", // add headshot src when ready
  },
  {
    name: "Zaine",
    title: "Senior AI Engineer",
    focus: "AI Agent Development & System Architecture",
    blurb: "12 years of engineering experience with 150+ automation deployments across complex environments.",
    metrics: ["150+ deployments", "Deep system architecture"],
    roleColor: "green",
    placeholderSrc: "",
  },
  {
    name: "Hassan",
    title: "Senior AI Engineer",
    focus: "Integration & Workflow Automation",
    blurb: "8 years of experience integrating CRMs, phones, billing, and ops—delivering reliable, scalable automation.",
    metrics: ["170+ deployments", "Integration specialist"],
    roleColor: "purple",
    placeholderSrc: "",
  },
];

/* ===== Color Map ===== */
const colorMap = {
  red: {
    chip: "bg-red-600 text-white",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-500 to-red-600",
  },
  blue: {
    chip: "bg-blue-600 text-white",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    chip: "bg-green-600 text-white",
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
  },
  purple: {
    chip: "bg-purple-600 text-white",
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-500 to-purple-600",
  },
  orange: {
    chip: "bg-orange-600 text-white",
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-500 to-orange-600",
  },
} as const;

/* ===== Presentational Components ===== */
function StatCard({ stat }: { stat: Stat }) {
  const colors = colorMap[stat.color];
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-center">
        <div className={`text-5xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent mb-3`}>
          {stat.number}
        </div>
        <div className="text-xl font-bold text-gray-900 mb-2">{stat.label}</div>
        <div className="text-sm text-gray-600 leading-relaxed">{stat.subtext}</div>
      </div>
    </div>
  );
}

function ValueCard({ value }: { value: CoreValue }) {
  const colors = colorMap[value.color];
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-16 h-16 bg-gradient-to-r ${colors.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
      <p className="text-gray-700 leading-relaxed text-lg">{value.description}</p>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
      <div className="mb-6">
        <svg className="w-10 h-10 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
        <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">“{testimonial.quote}”</p>
      </div>
      <div className="border-t border-gray-100 pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
            <div className="text-blue-600 font-semibold">{testimonial.company}</div>
            <div className="text-gray-500 text-sm">{testimonial.industry}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">{testimonial.result}</div>
            <div className="text-sm text-gray-500">{testimonial.timeframe}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const tone = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-fuchsia-600",
  }[member.roleColor];

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Headshot placeholder */}
      <div className="flex justify-center mb-6">
        <div className="w-28 h-28 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {/* When you have headshots: replace this wrapper with <img src={member.placeholderSrc} className="w-full h-full object-cover" alt={member.name} /> */}
          <span className="text-xs text-gray-500 text-center px-3">Upload headshot</span>
        </div>
      </div>

      <div className="text-center">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tone} mb-3`}>
          {member.title}
        </div>
        <h4 className="text-xl font-black text-gray-900">{member.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{member.focus}</p>
      </div>

      <p className="text-gray-700 mt-5">{member.blurb}</p>

      {member.metrics?.length ? (
        <ul className="mt-4 text-sm text-gray-700 space-y-1">
          {member.metrics.map((m, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ===== Main Component ===== */
export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "approach">("story");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="mb-8">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Unlocking Growth Through AI Partnership
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                Build Systems That
                <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Create Advantage
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
                At <span className="font-semibold">{BRAND}</span>, we believe businesses shouldn’t be held back by inefficiency.
                Our team combines <strong>10+ years of hands-on AI automation</strong> with a technical track record of{" "}
                <strong>300+ successful deployments</strong> across healthcare, legal, services, and operations.
              </p>
              <p className="text-lg text-blue-200 mb-10">
                Founded by <span className="font-semibold">Chris Sanz</span> and engineered by{" "}
                <span className="font-semibold">Zaine</span> and <span className="font-semibold">Hassan</span>, we don’t just build tools—
                we engineer <em>business outcomes</em>: more revenue, less overhead, and measurable ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="/strategy-call"
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-5 rounded-xl text-xl font-bold hover:from-green-600 hover:to-blue-700 transition-all shadow-2xl transform hover:scale-105 text-center"
                >
                  Book a Strategy Call
                </a>
                <a
                  href="/case-studies"
                  className="border-2 border-white text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white hover:text-gray-900 transition-all text-center"
                >
                  See Client Results
                </a>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-green-400">300+</div>
                  <div className="text-gray-300 font-medium">Systems Delivered (technical team)</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-400">10+ Years</div>
                  <div className="text-gray-300 font-medium">Combined Expertise</div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 shadow-2xl">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-6xl font-black text-white">AI</span>
              </div>
              <div className="text-center text-white">
                <h3 className="text-3xl font-black mb-2">{BRAND}</h3>
                <p className="text-xl text-blue-300 font-bold mb-6">Custom AI Systems • Managed Delivery</p>
                <div className="space-y-3 text-lg">
                  <p className="flex items-center justify-center"><span className="text-2xl mr-3">🤝</span>Strategic partnership, not just tooling</p>
                  <p className="flex items-center justify-center"><span className="text-2xl mr-3">⚙️</span>Deep integrations across your stack</p>
                  <p className="flex items-center justify-center"><span className="text-2xl mr-3">📈</span>ROI measured in weeks, not years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Proof in the Numbers</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Real outcomes from leaders who chose speed, clarity, and automation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <p className="text-2xl text-white font-bold mb-4">“They don’t just automate tasks—they redesign how your business works.”</p>
            <p className="text-blue-200 text-lg">— Operations Director, Multi-Location Services Group</p>
          </div>
        </div>
      </section>

      {/* Team Section (headshot-ready) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">The Team Behind the Systems</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategy meets senior engineering. Replace busywork with intelligent operations built for scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Timeline + Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Mission & Method</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Eliminate the inefficiency tax and replace it with scalable, intelligent systems that drive growth.
            </p>
          </div>

          <Tabs activeTabDefault="story" />

          {/* Timeline */}
          <div className="max-w-5xl mx-auto mt-14">
            <div className="space-y-8">
              {milestones.map((m, i) => {
                const colors = colorMap[m.color];
                return (
                  <div key={i} className="flex items-start space-x-8 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`${colors.chip} rounded-2xl w-20 h-20 flex items-center justify-center text-xl font-black flex-shrink-0 shadow-lg`}>
                      {m.year}
                    </div>
                    <div className="pt-3">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">{m.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Approach blocks */}
          <div className="max-w-6xl mx-auto mt-16">
            <div className="text-center mb-12 bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-2xl">
              <h3 className="text-3xl font-black text-gray-900 mb-6">How We Work With You</h3>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                We partner with your team to assess opportunities, align solutions to goals, integrate with your stack,
                train your people, and ensure adoption across departments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              {coreValues.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-900 to-blue-900 p-12 rounded-2xl text-center shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6">A Promise We Stand Behind</h3>
              <p className="text-xl text-green-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                We hold ourselves to outcomes. If you haven’t hit measurable ROI, we keep optimizing until you do.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-bold">ROI Obsessed</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-bold">Fast Iteration</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="font-bold">Long-Term Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real businesses, real outcomes—from intake to back-office ops</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-12 rounded-2xl text-center shadow-2xl">
            <h3 className="text-3xl font-black text-white mb-6">Ready to stop losing time to manual processes?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              We’ll identify where automation pays back first and map a path to compounding ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/strategy-call"
                className="bg-white text-blue-600 px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105"
              >
                Book Free Strategy Call
              </a>
              <a
                href="/case-studies"
                className="border-2 border-white text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white hover:text-blue-600 transition-all"
              >
                See Client Results
              </a>
            </div>
            <p className="text-blue-200 mt-6 text-lg">30-minute consultation • Practical roadmap • No fluff</p>
          </div>
        </div>
      </section>

      
    </div>
  );
}

/* ===== Small helper: tabs for Mission vs Approach (keeps code tidy) ===== */
function Tabs({ activeTabDefault = "story" as "story" | "approach" }) {
  const [activeTab, setActiveTab] = useState<"story" | "approach">(activeTabDefault);

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-center space-x-2 bg-gray-100 rounded-2xl p-2 max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab("story")}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === "story" ? "bg-white text-blue-600 shadow-lg transform scale-105" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mission
          </button>
          <button
            onClick={() => setActiveTab("approach")}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === "approach" ? "bg-white text-blue-600 shadow-lg transform scale-105" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Our Approach
          </button>
        </div>
      </div>

      {activeTab === "story" && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-12 rounded-2xl mb-6 shadow-lg">
            <div className="text-gray-800 leading-relaxed space-y-6 text-lg">
              <p>
                <strong>Our mission is simple:</strong> remove the friction that drains time, money, and momentum.
                We design for measurable outcomes—faster response, higher conversion, and leaner operations.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Save hours per week across intake, follow-ups, scheduling, and ops.</li>
                <li>Lift lead conversion and client retention with instant, consistent execution.</li>
                <li>Deliver 5× ROI within months—and keep optimizing beyond that.</li>
                <li>Scale systems with you as volume and complexity grow.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "approach" && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-12 rounded-2xl mb-6 shadow-lg">
            <div className="text-gray-800 leading-relaxed space-y-6 text-lg">
              <p>
                We partner with your team to assess opportunities, align solutions to goals, integrate with your stack,
                train your people, and ensure adoption across departments. Then we keep tuning as you grow.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Discovery: map profit levers and quick-win automations.</li>
                <li>Design: architect AI agents and data flows fit to your stack.</li>
                <li>Delivery: implement, integrate, train, and measure.</li>
                <li>Iterate: optimize for compounding ROI.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}