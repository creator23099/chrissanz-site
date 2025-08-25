// lib/industries.config.ts
export type FAQ = { q: string; a: string };
export type Phase = { label: string; weeks: string; bullets: string[] };

export type Industry = {
  slug: string;                        // e.g., "med-spas"
  title: string;
  subtitle?: string;
  heroCopy: string;
  proof: { label: string; value: string }[];
  ownerWhyUs: string[];
  helped: string[];                    // “How we’ve helped …”
  outcomes: string[];
  delivery: { headline: string; phases: Phase[]; footnote?: string };
  faqs: FAQ[];                         // 4 per industry
  seo?: { title?: string; description?: string; keywords?: string[] };
  ctas?: { primary?: { label: string; href: string }; secondary?: { label: string; href: string } };
};

const DELIVERY: Industry["delivery"] = {
  headline:
    "Validated POC in ~14 days. Typical production hardening and rollout within ~60 days (scope & integrations dependent).",
  phases: [
    {
      label: "Weeks 1–2",
      weeks: "Discovery, Data Access, POC",
      bullets: [
        "Owner-first discovery: goals, constraints, compliance",
        "Credentials, data mapping, guardrail plan",
        "Ship a working POC targeting 1–2 highest-ROI workflows",
      ],
    },
    {
      label: "Weeks 3–6",
      weeks: "Iteration, Guardrails, Analytics, QA",
      bullets: [
        "Tighten prompts/flows based on real usage",
        "Policies, approvals, fallbacks & alerts",
        "Event tracking + dashboards, staging QA",
      ],
    },
    {
      label: "Weeks 7–8",
      weeks: "Production Rollout, Training, Playbooks",
      bullets: [
        "Phased rollout with monitoring",
        "Team training & SOP/playbooks",
        "Post-launch tuning to hit agreed KPIs",
      ],
    },
  ],
  footnote: "Timelines may adjust with scope and compliance requirements.",
};

// ---------- INDUSTRY DATA (edit/add here) ----------
export const INDUSTRIES: Industry[] = [
  {
    slug: "med-spas",
    title: "Med Spas",
    subtitle: "Consulting-first automation that fills the calendar.",
    heroCopy:
      "We learn how your spa actually runs — intake, reminders, reviews, billing, and content — then build systems that book real appointments and reduce no-shows. We measure what matters: booked & completed visits, show rate, and ROI by channel.",
    proof: [
      { label: "Lead reply time", value: "< 60 sec" },
      { label: "Follow-up cadence", value: "7-touch" },
      { label: "Review velocity", value: "↑ month-over-month" },
      { label: "POC timeline", value: "~ 14 days" },
    ],
    ownerWhyUs: [
      "Consulting approach: we map your front desk reality, tools, and constraints first.",
      "We staff up as needed (senior engineers/analysts/design) for high-stakes builds.",
      "Clear TMAP: milestones, responsibilities, and success criteria agreed upfront.",
      "Owner dashboard with attribution you can trust (UTMs + CRM calendar sync).",
    ],
    helped: [
      "Office operations: inbox triage, insurance prompts, and routing to the right coordinator.",
      "Appointment setting & confirmations: instant replies with booking links; smart reminders to reduce no-shows.",
      "Billing workflows: pre-visit estimates, deposit requests, and payment follow-ups.",
      "Review engine: request, route, and draft on-brand responses to grow local SEO.",
      "Content ops: one script → Reels/Shorts/captions/blog; scheduled and tracked.",
      "Smart AI meeting notes: summarize consults, log next steps, and create follow-ups.",
    ],
    outcomes: [
      "More booked and completed appointments from the same demand.",
      "Lower no-shows and faster lead-to-chair time.",
      "Higher ratings → stronger local SEO → lower CAC.",
      "Owner clarity: KPIs and source-level ROI in one place.",
    ],
    delivery: DELIVERY,
    faqs: [
      {
        q: "How do you customize around our front desk, calendar, and CRM?",
        a: "We interview staff, document intake/confirmation patterns, and connect to your calendar and CRM. The responder uses your tone, routes high-intent leads to booking links or live staff, and logs every action for auditability.",
      },
      {
        q: "Can you help with billing and payment follow-ups?",
        a: "Yes. We automate pre-visit estimates, deposit or card-on-file requests, and polite follow-ups after service. Payment events are written back to your CRM/ledger so reporting stays accurate.",
      },
      {
        q: "How do you handle HIPAA and patient privacy?",
        a: "We implement least-privilege access, encrypted transit/storage, PHI minimization/redaction in prompts, role-based controls, and audit logs. We avoid storing PHI in chat histories and keep integrations within signed BAAs as required.",
      },
      {
        q: "Do we need paid ads to see results?",
        a: "Not necessarily. Many spas lift conversion by fixing intake, reminders, reviews, and reactivation first. We can add or scale paid once the engine is dependable and attributable.",
      },
    ],
    seo: {
      title: "Med Spa Consulting & Automation | Book More Clients",
      description:
        "Consulting-first automation for med spas: intake, confirmations, billing, review engine, content ops, and AI meeting notes. POC in ~14 days; rollout ~60 days.",
      keywords: ["med spa automation", "HIPAA intake", "spa review automation", "appointment confirmations"],
    },
    ctas: {
      primary: { label: "Book a Strategy Call", href: "/strategy-call" },
      secondary: { label: "See Services", href: "/services" },
    },
  },
  {
    slug: "contractors",
    title: "Contractors",
    subtitle: "From inquiry to scheduled job — without inbox babysitting.",
    heroCopy:
      "We map how your office and crews estimate, schedule, and invoice. Then we automate the grind — so bids move to decisions, updates go out on time, and happy customers leave reviews.",
    proof: [
      { label: "Quote follow-ups", value: "7-touch" },
      { label: "First response", value: "< 60 sec" },
      { label: "Review volume", value: "↑ consistently" },
      { label: "POC timeline", value: "~ 14 days" },
    ],
    ownerWhyUs: [
      "Discovery across job types, territories, and seasonality — not one-size-fits-all.",
      "We can expand the team for complex scheduling/field ops or multi-region rollouts.",
      "TMAP with milestones and acceptance criteria so owners have real visibility.",
      "Owner pipeline and job status views that reflect ground truth.",
    ],
    helped: [
      "Office operations: lead intake, job-type routing, office ↔ field handoffs.",
      "Appointment setting: book site visits, confirmations, and reschedule flows.",
      "Billing & collections: deposit requests, staged invoices, and reminders.",
      "Customer updates: automated status texts/emails during job phases.",
      "Review engine: request, route, draft replies; publish to the right profiles.",
      "AI meeting notes: summarize site visits/calls and create task checklists.",
    ],
    outcomes: [
      "More accepted bids from the same lead volume.",
      "Fewer dropped balls between office and field.",
      "Higher local ranking via steady reviews.",
      "Forecasting and cash-flow clarity for the owner.",
    ],
    delivery: DELIVERY,
    faqs: [
      {
        q: "Can you work with our CRM or spreadsheets?",
        a: "Yes. We integrate or bridge with your tools, map fields, and keep logs clean so office and field stay aligned. No rip-and-replace required.",
      },
      {
        q: "How do you handle customer data and privacy?",
        a: "We minimize PII, encrypt data in transit and at rest, restrict access through roles, and provide audit logs. Opt-out and data-retention controls are respected across channels.",
      },
      {
        q: "What happens after hours or on weekends?",
        a: "Leads receive fast, on-brand replies with options to book a call/visit. Urgent categories can alert on-call staff. All interactions are logged for morning follow-up.",
      },
      {
        q: "Can you automate invoicing and collections?",
        a: "Yes. We support deposit requests, milestone invoices, and polite dunning flows. Payment events can update your CRM/accounting automatically.",
      },
    ],
    seo: {
      title: "Contractor Automation | Intake, Scheduling, Billing, Reviews",
      description:
        "Consulting-first systems for contractors: office ops, appointment setting, billing, status updates, reviews, and AI notes. POC in ~14 days.",
      keywords: ["contractor automation", "scheduling automation", "invoice reminders", "review engine"],
    },
    ctas: {
      primary: { label: "Schedule a Call", href: "/strategy-call" },
      secondary: { label: "See Services", href: "/services" },
    },
  },
  {
    slug: "lawyers",
    title: "Law Firms",
    subtitle: "Compliant intake, nurture, and content — with audit trails.",
    heroCopy:
      "We align with your matter types, conflicts checks, and approvals. Then we automate intake, nurture, and content ops — with logs and controls your partners can trust.",
    proof: [
      { label: "Intake SLA", value: "< 60 sec" },
      { label: "Conflicts prompts", value: "Enabled" },
      { label: "Audit trails", value: "End-to-end" },
      { label: "POC timeline", value: "~ 14 days" },
    ],
    ownerWhyUs: [
      "Compliance-minded discovery before any automation.",
      "We can augment staff with senior engineers for case-mgmt or content workflows.",
      "TMAP with matter-type pilots and partner sign-offs at each stage.",
      "Dashboards with consult rate, show rate, and signed matters by channel.",
    ],
    helped: [
      "Office operations: intake triage, conflict prompts, and partner escalation.",
      "Consult scheduling: availability, confirmations, and rescheduling paths.",
      "Billing triggers: engagement letters, retainers, and invoice reminders.",
      "Content operations: repurpose briefs/notes → articles, posts, and updates.",
      "AI meeting notes: summarize consults with privileged/PII redaction.",
      "Knowledge ops: matter templates, precedent retrieval, and checklists.",
    ],
    outcomes: [
      "Faster intake and fewer dropped leads.",
      "Higher consult show rate and signed matters.",
      "Consistent thought leadership with approvals.",
      "Compliance guardrails with visibility.",
    ],
    delivery: DELIVERY,
    faqs: [
      {
        q: "How do you handle confidentiality, PII, and conflicts?",
        a: "We minimize and redact PII in prompts, enforce role-based access, log actions, and maintain conflict prompts and escalation paths. Sensitive data can be isolated to private stores with strict retention.",
      },
      {
        q: "Will this replace staff?",
        a: "No — it removes repetitive tasks so attorneys and staff focus on high-value work. We provide training, approvals, and SOPs so the team remains in control.",
      },
      {
        q: "Can you generate consult notes and tasks automatically?",
        a: "Yes. We create privileged summaries with redaction, task lists by matter type, and next-step reminders — all synced to your case system.",
      },
      {
        q: "What KPIs matter to partners?",
        a: "Time-to-first-response, consult booking rate, show rate, signed matters, and cost per matter by channel — all tracked in dashboards.",
      },
    ],
    seo: {
      title: "Law Firm Automation | Intake, Scheduling, Billing, Content",
      description:
        "Consulting-first automation for firms: intake/conflicts, consult scheduling, billing triggers, content ops, and AI notes. POC in ~14 days; rollout ~60 days.",
      keywords: ["law firm automation", "confidential intake", "PII redaction", "case management sync"],
    },
    ctas: {
      primary: { label: "Talk to Us", href: "/strategy-call" },
      secondary: { label: "See Services", href: "/services" },
    },
  },
  {
    slug: "dentistry",
    title: "Dentists & Specialty",
    subtitle: "Fewer no-shows. More booked chairs. Clear reporting.",
    heroCopy:
      "We study your patient flow — new vs. existing, insurance, reminders — and implement intake responders, recall campaigns, billing prompts, and content that drives bookings.",
    proof: [
      { label: "No-show reduction", value: "↓ 10–25%" },
      { label: "Review lift", value: "↑ steady" },
      { label: "Channels", value: "Email/SMS/WhatsApp" },
      { label: "POC timeline", value: "~ 14 days" },
    ],
    ownerWhyUs: [
      "Discovery on recall cadence, hygiene blocks, specialty mix, and insurance.",
      "We can scale the team to handle PMS quirks and multi-location rollout.",
      "TMAP with phased pilots and front-desk sign-off each step.",
      "Attribution (UTMs + PMS/CRM sync) the owner can trust.",
    ],
    helped: [
      "Office operations: intake with insurance prompts and routing.",
      "Appointment setting & confirmations with smart reminder logic.",
      "Billing prompts: pre-estimates, deposit requests, and follow-ups.",
      "Recall & reactivation sequences for lapsed patients.",
      "Review engine: request, route, and draft responses.",
      "AI meeting notes: summarize consults and log next steps to PMS/CRM.",
    ],
    outcomes: [
      "More booked & completed appointments; filled hygiene blocks.",
      "Lower no-shows via confirmations and easy rescheduling.",
      "Higher review volume → stronger local SEO.",
      "Clear ROI by source and campaign.",
    ],
    delivery: DELIVERY,
    faqs: [
      {
        q: "How do you handle HIPAA and PHI?",
        a: "We implement least-privilege access, encrypt data at rest/in transit, redact PHI in prompts, and avoid storing PHI in chat logs. Integrations operate under BAAs where required, with audit logs and retention controls.",
      },
      {
        q: "Can you connect to our PMS and messaging tools?",
        a: "Yes. We integrate or bridge with your PMS/CRM and messaging stack, map fields, and keep clean logs for staff visibility — no rip-and-replace required.",
      },
      {
        q: "How do you reduce no-shows?",
        a: "Multi-channel reminders with smart timing and confirmations, easy rescheduling, and a gentle reactivation sequence if a patient goes cold.",
      },
      {
        q: "Which KPIs do owners see?",
        a: "Booked/completed appointments, show rate, review velocity, and cost per booking by source — all in a simple dashboard.",
      },
    ],
    seo: {
      title: "Dental Automation | Intake, Confirmations, Billing, Recalls",
      description:
        "Consulting-first automation for dental and specialty: intake with insurance prompts, confirmations, billing reminders, recalls, reviews, and AI notes. POC in ~14 days.",
      keywords: ["dental automation", "HIPAA reminders", "patient recall", "appointment confirmations"],
    },
    ctas: {
      primary: { label: "Book a Strategy Call", href: "/strategy-call" },
      secondary: { label: "See Services", href: "/services" },
    },
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    subtitle: "Compliant lead handling, nurture, and content — with audit trails.",
    heroCopy:
      "We align with your policies and approvals, then automate intent routing, nurture, billing reminders, and content with logs leadership can trust.",
    proof: [
      { label: "Compliance", value: "Policies + logs" },
      { label: "First response", value: "< 60 sec" },
      { label: "Channels", value: "Email/SMS/WhatsApp" },
      { label: "POC timeline", value: "~ 14 days" },
    ],
    ownerWhyUs: [
      "Discovery on product lines, suitability, and approvals — not one-size-fits-all.",
      "We can staff senior engineers for complex data/BI and entitlements.",
      "TMAP with risk controls, approvals, and sign-offs per phase.",
      "Dashboards with ROI, meeting rates, and pipeline health.",
    ],
    helped: [
      "Office operations: intake triage, KYC/qualification prompts, advisor routing.",
      "Appointment setting: calendar holds, confirmations, and reschedules.",
      "Billing/reminders for advisory or subscription services with clear receipts.",
      "Content ops: compliant repurposing with pre-approval and archive.",
      "AI meeting notes: summarize with restricted fields and policy disclaimers.",
      "BI/CRM sync: attribution, funnel stages, and leadership reporting.",
    ],
    outcomes: [
      "More qualified meetings from existing demand.",
      "Lower manual load on advisors/CSMs.",
      "Fewer compliance misses via guardrails and approvals.",
      "Clear ROI and pipeline visibility for leadership.",
    ],
    delivery: DELIVERY,
    faqs: [
      {
        q: "How do you meet SEC/FINRA/GLBA expectations?",
        a: "We codify policies and disclosures, require approvals where needed, restrict data access by role, encrypt data in transit/at rest, and preserve immutable logs and archives for review. Content changes are versioned with who/when/what.",
      },
      {
        q: "What systems can you connect?",
        a: "CRMs, marketing tools, messaging/e-mail, data warehouses, and content repositories. We map fields, pass UTMs, and keep an auditable trail for internal/external review.",
      },
      {
        q: "Can we start with a narrow POC?",
        a: "Yes. We validate one high-impact workflow in ~14 days, then scale once KPIs and compliance gates are satisfied.",
      },
      {
        q: "How do you protect sensitive client information?",
        a: "Least-privilege access, tokenized storage where possible, encrypted transport, data-retention controls, and redaction in prompts. We also support SSO/SAML and periodic access reviews.",
      },
    ],
    seo: {
      title: "Automation for Financial Services | Intake, Scheduling, Billing, Content",
      description:
        "Consulting-first systems for financial services: compliant intake, appointment setting, billing reminders, content ops with approvals, AI notes, and BI/CRM sync. POC in ~14 days; rollout ~60 days.",
      keywords: ["financial services automation", "SEC FINRA compliance", "GLBA data controls"],
    },
    ctas: {
      primary: { label: "Schedule a Call", href: "/strategy-call" },
      secondary: { label: "See Services", href: "/services" },
    },
  },
];

// Helpers
export const INDUSTRY_BY_SLUG = Object.fromEntries(INDUSTRIES.map(i => [i.slug, i]));
export const SLUGS = INDUSTRIES.map(i => i.slug);