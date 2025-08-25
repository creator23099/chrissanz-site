"use client";

import React, { useMemo, useState, useEffect } from "react";

/* =========================================================================
   Helpers
   ========================================================================= */
const fmtCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(isFinite(n) ? n : 0);

const fmtInt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString() : "0");
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const WORKING_DAYS = 22;
const WEEKS_PER_MONTH = 4.33;

/* =========================================================================
   Industries & Field Specs
   ========================================================================= */
type Industry = "healthcare" | "home_services" | "legal" | "agency" | "back_office_ops";

const INDUSTRY_LABELS: Record<Industry, string> = {
  healthcare: "Healthcare / Med Spa / Dental",
  home_services: "High-Ticket Home Services",
  legal: "Legal Services",
  agency: "Agency / B2B Services / Consulting",
  back_office_ops: "Back-Office / Operations",
};

type FieldType = "number" | "currency" | "percent" | "time";
type FieldGroup = "Volume" | "Tasks" | "Performance" | "Value" | "Costs";

type FieldSpec = {
  id: string;
  label: string;
  group: FieldGroup;
  type: FieldType;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  hint?: string;
};

type FieldValues = Record<string, number>;

/**
 * Each industry includes:
 * - Staff counts for the relevant team
 * - Daily/Weekly/Monthly task hours (per staff where applicable)
 * - Performance + value levers used for revenue lift
 */
const FIELDS: Record<Industry, FieldSpec[]> = {
  healthcare: [
    // Volume
    { id: "inquiries", label: "Monthly Inquiries", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },
    { id: "appointments", label: "Monthly Appointments", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },

    // Tasks + staff
    { id: "staffCount", label: "Admin / Front Desk Staff", group: "Tasks", type: "number", min: 0, max: 500, step: 1 },
    { id: "dailyAdminHrs", label: "Daily Admin Hours per Staff", group: "Tasks", type: "time", min: 0, max: 24, step: 0.25, suffix: "hrs/day/staff", hint: "Confirmations, reminders, scheduling, insurance, billing" },
    { id: "weeklyBillingHrs", label: "Weekly Billing / Collections", group: "Tasks", type: "time", min: 0, max: 60, step: 0.25, suffix: "hrs/wk", hint: "Insurance claims, payment follow-ups" },
    { id: "monthlyFollowupHrs", label: "Monthly Follow-up Hours", group: "Tasks", type: "time", min: 0, max: 400, step: 0.25, suffix: "hrs/mo", hint: "Treatment reminders, annual checkups, post-care calls" },

    // Performance
    { id: "responseMins", label: "Response Time (minutes)", group: "Performance", type: "number", min: 0, max: 480, step: 1 },
    { id: "bookRate", label: "Booking Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "showRate", label: "Show Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "acceptRate", label: "Treatment Acceptance", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },

    // Value & Costs
    { id: "avgCase", label: "Average Case Value", group: "Value", type: "currency", min: 0, max: 1000000, step: 50 },
    { id: "hourly", label: "Fully-Loaded Hourly (Admin Blend)", group: "Costs", type: "currency", min: 0, max: 500, step: 1, hint: "Wages + benefits + taxes" },
  ],

  home_services: [
    // Volume
    { id: "leads", label: "Monthly Leads", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },
    { id: "estimates", label: "Monthly Estimates / Consults", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },

    // Tasks + staff
    { id: "staffCount", label: "Office / Admin Staff", group: "Tasks", type: "number", min: 0, max: 500, step: 1 },
    { id: "dailyAdminHrs", label: "Daily Admin Hours per Staff", group: "Tasks", type: "time", min: 0, max: 24, step: 0.25, suffix: "hrs/day/staff", hint: "Scheduling, customer updates, permit tracking" },
    { id: "weeklyCoordHrs", label: "Weekly Job Coordination", group: "Tasks", type: "time", min: 0, max: 60, step: 0.25, suffix: "hrs/wk", hint: "Materials, crew scheduling, status updates" },
    { id: "monthlyFollowupHrs", label: "Monthly Customer Follow-up", group: "Tasks", type: "time", min: 0, max: 400, step: 0.25, suffix: "hrs/mo", hint: "Maintenance reminders, seasonal outreach, warranties" },

    // Performance
    { id: "speedToLead", label: "Speed-to-Lead (minutes)", group: "Performance", type: "number", min: 0, max: 480, step: 1 },
    { id: "setRate", label: "Consultation Set Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "showRate", label: "Consultation Show Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "closeRate", label: "Close Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },

    // Value & Costs
    { id: "avgJob", label: "Average Job Value", group: "Value", type: "currency", min: 0, max: 1000000, step: 100 },
    { id: "hourly", label: "Ops/Admin Hourly (Fully-Loaded)", group: "Costs", type: "currency", min: 0, max: 500, step: 1 },
  ],

  legal: [
    // Volume
    { id: "inquiries", label: "Monthly Inquiries", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },
    { id: "consultations", label: "Monthly Consultations", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },

    // Tasks + staff
    { id: "staffCount", label: "Paralegal / Admin Staff", group: "Tasks", type: "number", min: 0, max: 500, step: 1 },
    { id: "dailyAdminHrs", label: "Daily Admin Hours per Staff", group: "Tasks", type: "time", min: 0, max: 24, step: 0.25, suffix: "hrs/day/staff", hint: "Document prep, court scheduling, client updates" },
    { id: "weeklyDocHrs", label: "Weekly Document Processing", group: "Tasks", type: "time", min: 0, max: 60, step: 0.25, suffix: "hrs/wk", hint: "Filing, research, forms" },
    { id: "monthlyClientHrs", label: "Monthly Client Communications", group: "Tasks", type: "time", min: 0, max: 400, step: 0.25, suffix: "hrs/mo", hint: "Status updates, billing calls, case explanations" },

    // Performance
    { id: "responseMins", label: "Response Time (minutes)", group: "Performance", type: "number", min: 0, max: 480, step: 1 },
    { id: "consultSet", label: "Consultation Set Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "consultShow", label: "Consultation Show Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "matterOpen", label: "Matter Open Rate (from consults)", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },

    // Value & Costs
    { id: "avgRetainer", label: "Average Case / Initial Retainer", group: "Value", type: "currency", min: 0, max: 1000000, step: 100 },
    { id: "hourly", label: "Fully-Loaded Hourly (Paralegal Blend)", group: "Costs", type: "currency", min: 0, max: 500, step: 1 },
  ],

  agency: [
    // Volume
    { id: "qualifiedInbound", label: "Qualified Inbound / Month", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },
    { id: "meetings", label: "Monthly Discovery Calls", group: "Volume", type: "number", min: 0, max: 100000, step: 1 },

    // Tasks + staff
    { id: "staffCount", label: "BDR / Admin Staff", group: "Tasks", type: "number", min: 0, max: 500, step: 1 },
    { id: "dailyAdminHrs", label: "Daily Admin Hours per Staff", group: "Tasks", type: "time", min: 0, max: 24, step: 0.25, suffix: "hrs/day/staff", hint: "CRM updates, onboarding, comms" },
    { id: "weeklyProposalHrs", label: "Weekly Proposal / SOW Creation", group: "Tasks", type: "time", min: 0, max: 60, step: 0.25, suffix: "hrs/wk", hint: "Custom proposals, contracts" },
    { id: "monthlyClientHrs", label: "Monthly Pipeline Follow-up", group: "Tasks", type: "time", min: 0, max: 400, step: 0.25, suffix: "hrs/mo", hint: "Nurturing, check-ins, upsell" },

    // Performance
    { id: "responseMins", label: "Response Time (minutes)", group: "Performance", type: "number", min: 0, max: 480, step: 1 },
    { id: "meetingRate", label: "Meeting Set Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "meetingShow", label: "Meeting Show Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },
    { id: "winRate", label: "Win Rate", group: "Performance", type: "percent", min: 1, max: 100, step: 1, suffix: "%" },

    // Value & Costs
    { id: "avgDeal", label: "Average Deal Value (first 90 days)", group: "Value", type: "currency", min: 0, max: 1000000, step: 100 },
    { id: "hourly", label: "Ops/Admin Hourly (Fully-Loaded)", group: "Costs", type: "currency", min: 0, max: 500, step: 1 },
  ],

  back_office_ops: [
    // Volume
    { id: "items", label: "Monthly Items / Tasks", group: "Volume", type: "number", min: 0, max: 1000000, step: 1 },

    // Tasks + staff
    { id: "staffCount", label: "Processing Staff", group: "Tasks", type: "number", min: 0, max: 500, step: 1 },
    { id: "dailyAdminHrs", label: "Daily Admin Hours per Staff", group: "Tasks", type: "time", min: 0, max: 24, step: 0.25, suffix: "hrs/day/staff", hint: "Data entry, validation, corrections" },
    { id: "weeklyQAHrs", label: "Weekly QA / Review", group: "Tasks", type: "time", min: 0, max: 60, step: 0.25, suffix: "hrs/wk", hint: "Quality checks, audits" },
    { id: "weeklyReportingHrs", label: "Weekly Reporting", group: "Tasks", type: "time", min: 0, max: 60, step: 0.25, suffix: "hrs/wk", hint: "Dashboards, client reports" },

    // Performance
    { id: "errorRate", label: "Current Error Rate", group: "Performance", type: "percent", min: 0, max: 100, step: 0.1, suffix: "%" },

    // Value & Costs
    { id: "costPerError", label: "Cost per Error", group: "Value", type: "currency", min: 0, max: 100000, step: 10 },
    { id: "hourly", label: "Fully-Loaded Hourly", group: "Costs", type: "currency", min: 0, max: 500, step: 1 },
  ],
};

/* Default values */
const DEFAULTS: Record<Industry, FieldValues> = {
  healthcare: {
    inquiries: 150,
    appointments: 380,
    staffCount: 4,
    dailyAdminHrs: 1.2,
    weeklyBillingHrs: 6,
    monthlyFollowupHrs: 24,
    responseMins: 45,
    bookRate: 60,
    showRate: 80,
    acceptRate: 55,
    avgCase: 1800,
    hourly: 35,
  },
  home_services: {
    leads: 200,
    estimates: 110,
    staffCount: 3,
    dailyAdminHrs: 1,
    weeklyCoordHrs: 8,
    monthlyFollowupHrs: 10,
    speedToLead: 35,
    setRate: 45,
    showRate: 75,
    closeRate: 35,
    avgJob: 8500,
    hourly: 35,
  },
  legal: {
    inquiries: 120,
    consultations: 60,
    staffCount: 3,
    dailyAdminHrs: 1,
    weeklyDocHrs: 10,
    monthlyClientHrs: 12,
    responseMins: 60,
    consultSet: 50,
    consultShow: 85,
    matterOpen: 55,
    avgRetainer: 4500,
    hourly: 75,
  },
  agency: {
    qualifiedInbound: 180,
    meetings: 80,
    staffCount: 3,
    dailyAdminHrs: 0.8,
    weeklyProposalHrs: 6,
    monthlyClientHrs: 10,
    responseMins: 90,
    meetingRate: 45,
    meetingShow: 80,
    winRate: 25,
    avgDeal: 6000,
    hourly: 50,
  },
  back_office_ops: {
    items: 8000,
    staffCount: 6,
    dailyAdminHrs: 1,
    weeklyQAHrs: 6,
    weeklyReportingHrs: 4,
    errorRate: 4,
    costPerError: 65,
    hourly: 40,
  },
};

/* Impact calculation assumptions */
const ASSUMPTIONS = {
  // Automation efficiency by cadence
  dailyAutomation: 0.7,
  weeklyAutomation: 0.6,
  monthlyAutomation: 0.5,

  healthcare: {
    maxBookingLift: 0.25,
    noShowRecovery: 0.2,
  },
  home_services: {
    maxSetRateLift: 0.35,
    recoveredLeadFactor: 0.18,
  },
  legal: {
    maxSetRateLift: 0.2,
    recoveredNoShow: 0.15,
  },
  agency: {
    maxMeetingLift: 0.2,
    recoveredNotSet: 0.12,
  },
  back_office_ops: {
    errorReduction: 0.8,
  },
};

/* =========================================================================
   Impact Calculator
   ========================================================================= */
type Impact = {
  monthlyHoursSaved: number;
  staffCostSavings: number;
  revenueLift: number;
  totalMonthlyImpact: number;
  annualImpact: number;
  breakdown: Record<string, number>;
  assumptions: string[];
};

function computeImpact(industry: Industry, v: FieldValues): Impact {
  const A = ASSUMPTIONS;

  // shared automation math for task-hours
  const staff = v.staffCount || 0;

  const dailyHours = (v.dailyAdminHrs || 0) * WORKING_DAYS * staff;
  const weeklyHours =
    (industry === "home_services" ? (v.weeklyCoordHrs || 0) : 0) +
    (industry === "legal" ? (v.weeklyDocHrs || 0) : 0) +
    (industry === "agency" ? (v.weeklyProposalHrs || 0) : 0) +
    (industry === "back_office_ops" ? (v.weeklyQAHrs || 0) + (v.weeklyReportingHrs || 0) : 0);

  const weeklyHoursTotal = weeklyHours * WEEKS_PER_MONTH * staff;

  const monthlyHours =
    (industry === "healthcare" ? (v.monthlyFollowupHrs || 0) : 0) +
    (industry === "home_services" ? (v.monthlyFollowupHrs || 0) : 0) +
    (industry === "legal" ? (v.monthlyClientHrs || 0) : 0) +
    (industry === "agency" ? (v.monthlyClientHrs || 0) : 0);

  const monthlyHoursTotal = monthlyHours * staff;

  const automatedDaily = dailyHours * A.dailyAutomation;
  const automatedWeekly = weeklyHoursTotal * A.weeklyAutomation;
  const automatedMonthly = monthlyHoursTotal * A.monthlyAutomation;

  const automatedHours = automatedDaily + automatedWeekly + automatedMonthly;
  const staffSavings = automatedHours * (v.hourly || 0);

  // industry-specific revenue lift
  let revenue = 0;
  const breakdown: Record<string, number> = {
    "Daily admin (automated hrs)": Math.round(automatedDaily),
    "Weekly tasks (automated hrs)": Math.round(automatedWeekly),
    "Monthly tasks (automated hrs)": Math.round(automatedMonthly),
  };
  const assumptions: string[] = [
    "70% daily, 60% weekly, 50% monthly automation",
  ];

  switch (industry) {
    case "healthcare": {
      const inquiries = v.inquiries || 0;
      const baseBook = (v.bookRate || 0) / 100;
      const show = (v.showRate || 0) / 100;
      const accept = (v.acceptRate || 0) / 100;
      // faster response → booking lift up to max
      const liftPct = clamp01((v.responseMins || 0) / 60) * A.healthcare.maxBookingLift;
      const improvedBook = Math.min(0.95, baseBook * (1 + liftPct));
      const addedBookings = inquiries * (improvedBook - baseBook);
      const baseNoShows = inquiries * baseBook * (1 - show);
      const recoveredShows = baseNoShows * A.healthcare.noShowRecovery;
      const addedAccepted = addedBookings * show * accept;
      const recoveredAccepted = recoveredShows * accept;
      revenue = (addedAccepted + recoveredAccepted) * (v.avgCase || 0);

      breakdown["Added bookings"] = Math.round(addedBookings);
      breakdown["Recovered no-shows"] = Math.round(recoveredShows);
      breakdown["Accepted treatments"] = Math.round(addedAccepted + recoveredAccepted);

      assumptions.push(
        `Up to ${Math.round(A.healthcare.maxBookingLift * 100)}% booking lift from instant response`,
        `${Math.round(A.healthcare.noShowRecovery * 100)}% no-show recovery via reminders`
      );
      break;
    }

    case "home_services": {
      const leads = v.leads || 0;
      const baseSet = (v.setRate || 0) / 100;
      const show = (v.showRate || 0) / 100;
      const close = (v.closeRate || 0) / 100;
      const lift = clamp01((v.speedToLead || 0) / 60) * A.home_services.maxSetRateLift;
      const improvedSet = Math.min(0.95, baseSet * (1 + lift));
      const addedSets = leads * (improvedSet - baseSet);
      const recoveredLeads = leads * (1 - baseSet) * A.home_services.recoveredLeadFactor;
      const totalConsults = (addedSets + recoveredLeads) * show;
      const addedWins = totalConsults * close;
      revenue = addedWins * (v.avgJob || 0);

      breakdown["Added consults"] = Math.round(addedSets);
      breakdown["Recovered leads"] = Math.round(recoveredLeads);
      breakdown["Additional wins"] = Math.round(addedWins);

      assumptions.push(
        `Up to ${Math.round(A.home_services.maxSetRateLift * 100)}% set-rate lift from instant response`,
        `${Math.round(A.home_services.recoveredLeadFactor * 100)}% missed-lead recovery via follow-ups`
      );
      break;
    }

    case "legal": {
      const inquiries = v.inquiries || 0;
      const baseSet = (v.consultSet || 0) / 100;
      const show = (v.consultShow || 85) / 100;
      const openRate = (v.matterOpen || 0) / 100;
      const lift = clamp01((v.responseMins || 0) / 60) * A.legal.maxSetRateLift;
      const improvedSet = Math.min(0.95, baseSet * (1 + lift));
      const addedConsults = inquiries * (improvedSet - baseSet);
      const baseNoShows = inquiries * baseSet * (1 - show);
      const recoveredConsults = baseNoShows * A.legal.recoveredNoShow;
      const totalConsults = (addedConsults + recoveredConsults) * show;
      const addedMatters = totalConsults * openRate;
      revenue = addedMatters * (v.avgRetainer || 0);

      breakdown["Added consultations"] = Math.round(addedConsults);
      breakdown["Recovered no-shows"] = Math.round(recoveredConsults);
      breakdown["Matters opened"] = Math.round(addedMatters);

      assumptions.push(
        `Up to ${Math.round(A.legal.maxSetRateLift * 100)}% consult set-rate lift from faster intake`,
        `${Math.round(A.legal.recoveredNoShow * 100)}% no-show recovery via reminders`
      );
      break;
    }

    case "agency": {
      const inbound = v.qualifiedInbound || 0;
      const baseMeet = (v.meetingRate || 0) / 100;
      const show = (v.meetingShow || 80) / 100;
      const win = (v.winRate || 0) / 100;
      const lift = clamp01((v.responseMins || 0) / 60) * A.agency.maxMeetingLift;
      const improvedMeet = Math.min(0.95, baseMeet * (1 + lift));
      const addedMeetings = inbound * (improvedMeet - baseMeet);
      const recovered = inbound * (1 - baseMeet) * A.agency.recoveredNotSet;
      const meetingsHeld = (addedMeetings + recovered) * show;
      const addedWins = meetingsHeld * win;
      revenue = addedWins * (v.avgDeal || 0);

      breakdown["Added meetings"] = Math.round(addedMeetings);
      breakdown["Recovered not-set"] = Math.round(recovered);
      breakdown["Additional wins"] = Math.round(addedWins);

      assumptions.push(
        `Up to ${Math.round(A.agency.maxMeetingLift * 100)}% meeting lift from instant response`,
        `${Math.round(A.agency.recoveredNotSet * 100)}% recovered not-set via automation`
      );
      break;
    }

    case "back_office_ops": {
      const items = v.items || 0;
      const errors = items * ((v.errorRate || 0) / 100);
      const errorsAvoided = errors * A.back_office_ops.errorReduction;
      const errorSavings = errorsAvoided * (v.costPerError || 0);

      breakdown["Items / month"] = Math.round(items);
      breakdown["Errors avoided"] = Math.round(errorsAvoided);
      assumptions.push(`${Math.round(A.back_office_ops.errorReduction * 100)}% error reduction from automation`);

      revenue = 0; // operational – savings only
      // add error savings to staff savings
      return {
        monthlyHoursSaved: automatedHours,
        staffCostSavings: staffSavings + errorSavings,
        revenueLift: 0,
        totalMonthlyImpact: staffSavings + errorSavings,
        annualImpact: (staffSavings + errorSavings) * 12,
        breakdown,
        assumptions,
      };
    }
  }

  const totalMonthlyImpact = staffSavings + revenue;
  return {
    monthlyHoursSaved: automatedHours,
    staffCostSavings: staffSavings,
    revenueLift: revenue,
    totalMonthlyImpact,
    annualImpact: totalMonthlyImpact * 12,
    breakdown,
    assumptions,
  };
}

/* =========================================================================
   Main Component
   ========================================================================= */
export default function PremiumROI() {
  const [industry, setIndustry] = useState<Industry>("home_services");
  const [values, setValues] = useState<Record<Industry, FieldValues>>(DEFAULTS);

  const setField = (id: string, value: number) => {
    setValues((prev) => ({
      ...prev,
      [industry]: { ...prev[industry], [id]: value },
    }));
  };

  const impact = useMemo(() => computeImpact(industry, values[industry]), [industry, values]);

  // group fields for UI
  const fieldsByGroup = useMemo(() => {
    const fields = FIELDS[industry];
    const groups: Record<FieldGroup, FieldSpec[]> = {
      Volume: [],
      Tasks: [],
      Performance: [],
      Value: [],
      Costs: [],
    };
    fields.forEach((f) => groups[f.group].push(f));
    return groups;
  }, [industry]);

  return (
    <section className="relative py-16">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]" />
        <div className="absolute top-40 -right-24 h-[360px] w-[140%] -rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.08),transparent)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 bg-clip-text text-transparent">
            AI ROI Calculator
          </h2>
          <p className="text-gray-900 mt-2">Estimate the revenue lift and cost savings from AI automation for your business.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <IndustryTabs
            value={industry}
            onChange={(k) => setIndustry(k as Industry)}
            options={[
              { key: "healthcare", label: INDUSTRY_LABELS.healthcare },
              { key: "home_services", label: INDUSTRY_LABELS.home_services },
              { key: "legal", label: INDUSTRY_LABELS.legal },
              { key: "agency", label: INDUSTRY_LABELS.agency },
              { key: "back_office_ops", label: INDUSTRY_LABELS.back_office_ops },
            ]}
          />
        </div>

        {/* Container */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 rounded-3xl shadow-2xl p-6 md:p-7">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Metrics</h3>

              <div className="space-y-7">
                {(Object.keys(fieldsByGroup) as (keyof typeof fieldsByGroup)[]).map((group) => {
                  const fields = fieldsByGroup[group];
                  if (!fields?.length) return null;
                  return (
                    <div key={group}>
                      <div className="text-[11px] font-semibold tracking-wide uppercase text-gray-700 mb-2">{group}</div>
                      <div className="grid gap-4">
                        {fields.map((f) => (
                          <InputField
                            key={f.id}
                            field={f}
                            value={values[industry][f.id] ?? 0}
                            onChange={(val) => setField(f.id, val)}
                          />
                        ))}
                      </div>
                      {group === "Tasks" && (
                        <div className="mt-3 p-3 rounded-xl border border-blue-200 bg-blue-50 text-[13px] text-blue-800">
                          Automation model: <b>70%</b> of daily hours, <b>60%</b> of weekly hours, and <b>50%</b> of monthly hours are automatable.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              <RoiStat title="Hours Saved / Month" value={`${fmtInt(impact.monthlyHoursSaved)} hrs`} tone="blue" />
              <RoiStat title="Staff Cost Savings / Month" value={fmtCurrency(impact.staffCostSavings)} tone="green" />
              <RoiStat title="Incremental Revenue / Month" value={fmtCurrency(impact.revenueLift)} tone="orange" />
              {/* green emphasis as requested */}
              <RoiStat title="Total Monthly Impact" value={fmtCurrency(impact.totalMonthlyImpact)} tone="green" emphasize />
            </div>

            {/* Breakdown */}
            <div className="mt-6 rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-sm p-5 shadow-lg">
              <div className="text-sm font-semibold text-gray-900 mb-2">Breakdown</div>
              <div className="divide-y divide-gray-100">
                {Object.entries(impact.breakdown).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-2 text-sm">
                    <span className="text-gray-700">{k}</span>
                    <span className="font-semibold text-gray-900">{fmtInt(v)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual & Assumptions */}
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <div className="rounded-2xl border-2 border-gray-200/60 bg-gradient-to-br from-slate-50 to-gray-50 p-5 shadow-lg">
                <div className="text-sm font-semibold text-gray-900 mb-1">Annual Impact</div>
                <div className="text-2xl font-bold text-gray-900">{fmtCurrency(impact.annualImpact)}</div>
                <div className="text-xs text-gray-600 mt-2">Total value delivered per year</div>
              </div>

              <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-sm p-5 shadow-lg">
                <div className="text-sm font-semibold text-gray-900 mb-2">Assumptions</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  {impact.assumptions.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-sm p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Ready to get precise numbers?</div>
                  <div className="text-sm text-gray-600">We’ll validate these assumptions and map your custom ROI.</div>
                </div>
                <a
                  href="/strategy-call"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg rounded-xl font-bold text-white px-5 py-3"
                >
                  Get Your Custom AI Roadmap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   UI Components
   ========================================================================= */

// Premium pill-style industry tabs (matches your screenshot vibe)
function IndustryTabs({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (k: string) => void;
  options: { key: string; label: string }[];
}) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg px-2 py-2">
      <div className="flex flex-wrap gap-2 justify-center">
          {options.map((o) => {
            const active = value === o.key;
            return (
              <button
                key={o.key}
                onClick={() => onChange(o.key)}
                className={[
                  "whitespace-nowrap px-5 py-3 rounded-full text-sm font-bold transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700"
                    : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200",
                ].join(" ")}
                aria-pressed={active}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Clearable number input (fixes the `030` issue)
function InputField({
  field,
  value,
  onChange,
}: {
  field: FieldSpec;
  value: number;
  onChange: (value: number) => void;
}) {
  const [local, setLocal] = useState<string>(() => (Number.isFinite(value) ? String(value) : ""));

  useEffect(() => {
    setLocal(Number.isFinite(value) ? String(value) : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocal(val);
    const n = Number(val);
    if (!Number.isNaN(n)) onChange(n);
    if (val === "") onChange(0); // allows full clear without NaN in calc
  };

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {field.label}{" "}
        {field.suffix ? <span className="text-gray-900">({field.suffix})</span> : null}
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={field.min}
        max={field.max}
        step={field.step || 1}
        value={local}
        onChange={handleChange}
        placeholder="0"
        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl 
focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
transition-all duration-200 bg-white text-gray-900 placeholder-gray-700"
      />
      {field.hint && <p className="text-xs text-gray-500 mt-1">{field.hint}</p>}
    </div>
  );
}

function RoiStat({
  title,
  value,
  tone = "blue",
  emphasize = false,
}: {
  title: string;
  value: string;
  tone?: "blue" | "green" | "orange" | "purple";
  emphasize?: boolean;
}) {
  const toneMap: Record<string, string> = {
    blue: "from-blue-50 to-sky-50",
    green: "from-green-50 to-emerald-50",
    orange: "from-orange-50 to-amber-50",
    purple: "from-purple-50 to-pink-50",
  };
  return (
    <div
      className={[
        "rounded-2xl border-2 border-gray-200/60 p-5",
        emphasize ? `bg-gradient-to-r ${toneMap[tone]} shadow-2xl` : "bg-white/90 shadow-lg",
        "transition-all duration-300 hover:transform hover:scale-[1.02]",
      ].join(" ")}
    >
      <div className="text-[11px] font-semibold tracking-wide uppercase text-gray-700">{title}</div>
      <div className="text-[22px] md:text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}