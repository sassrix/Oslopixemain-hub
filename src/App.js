import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hsizvuyfxdgqmztdttns.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzaXp2dXlmeGRncW16dGR0dG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTI5NzcsImV4cCI6MjA5MTAyODk3N30.SQ-NbB4tNnMHzZaZ0VKMWyty63LaWHzWXuwJQD0ViGo";
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const GOLD = "#C8A96E";
const BLUE = "#7EB8C9";
const GREEN = "#A3C4A8";
const PURPLE = "#B8A9D9";
const CORAL = "#C9907E";
const TEAL = "#6BBFB5";
const BG = "#0D0D0F";
const SURFACE = "#111114";
const SURFACE2 = "#16161a";
const BORDER = "#1e1e22";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⊞", color: GOLD },
  { id: "marketing", label: "Marketing", icon: "◈", color: GOLD },
  { id: "sales", label: "Sales", icon: "◇", color: BLUE },
  { id: "outreach", label: "Outreach", icon: "◉", color: GREEN },
  { id: "projects", label: "Projects", icon: "▣", color: PURPLE },
  { id: "billing", label: "Billing", icon: "◑", color: TEAL },
  { id: "rd", label: "R&D", icon: "◌", color: CORAL },
];

const BOTTOM_NAV = [
  { id: "dashboard", label: "Home", icon: "⊞", color: GOLD },
  { id: "sales", label: "Sales", icon: "◇", color: BLUE },
  { id: "projects", label: "Projects", icon: "▣", color: PURPLE },
  { id: "billing", label: "Billing", icon: "◑", color: TEAL },
  { id: "rd", label: "R&D", icon: "◌", color: CORAL },
];

const STATUS_COLORS = {
  new: "#555", contacted: BLUE, proposal: GOLD, negotiation: PURPLE, won: GREEN, lost: "#383838",
  draft: "#555", sent: BLUE, replied: GREEN, "no-reply": "#383838", "not-interested": "#383838",
  idea: "#555", "in-progress": BLUE, scheduled: GOLD, published: GREEN,
  active: GREEN, review: GOLD, completed: "#555", paused: "#383838",
  pending: "#555", done: GREEN,
  exploring: BLUE, testing: GOLD, adopted: GREEN, shelved: "#383838",
  // invoice statuses
  "invoice-draft": "#555", "invoice-sent": BLUE, paid: GREEN, overdue: CORAL, cancelled: "#383838",
};

const INVOICE_STATUSES = ["draft", "sent", "paid", "overdue", "cancelled"];
const INVOICE_STATUS_COLORS = { draft: "#555", sent: BLUE, paid: GREEN, overdue: CORAL, cancelled: "#383838" };
const PACKAGE_COLORS = { "3-in-1": GOLD, "website-only": BLUE, "photography-only": CORAL, "gbp-only": GREEN, custom: PURPLE };
const CATEGORY_COLORS = { website: BLUE, photography: CORAL, gbp: GREEN, design: PURPLE, copy: GOLD, other: "#555" };
const PLATFORM_ICONS = { instagram: "◉", google: "◈", linkedin: "▣", facebook: "◇", website: "⊞", other: "◌" };
const PLATFORM_COLORS = { instagram: CORAL, google: BLUE, linkedin: BLUE, facebook: "#5B8BC9", website: GOLD, other: "#666" };
const ASSET_ICONS = { logo: "◈", photography: "◉", template: "▣", font: "◌", color: "◇", document: "⊞", other: "◎" };
const ASSET_COLORS = { logo: GOLD, photography: CORAL, template: PURPLE, font: GREEN, color: BLUE, document: "#666", other: "#555" };
const IDEA_CATEGORY_COLORS = { service: CORAL, pricing: GOLD, process: BLUE, marketing: PURPLE, tech: GREEN, other: "#555" };
const POTENTIAL_COLORS = { high: GREEN, medium: GOLD, low: "#555" };

const LEAD_STATUSES = ["new", "contacted", "proposal", "negotiation", "won", "lost"];
const OUTREACH_STATUSES = ["draft", "sent", "replied", "no-reply", "not-interested"];
const OUTREACH_CHANNELS = ["email", "instagram", "linkedin", "phone", "walk-in"];
const CONTENT_STATUSES = ["idea", "in-progress", "scheduled", "published"];
const CONTENT_PLATFORMS = ["instagram", "google", "linkedin", "facebook", "website", "other"];
const CONTENT_TYPES = ["post", "reel", "story", "article", "blog", "gmb-update", "other"];
const SEO_PRIORITIES = ["high", "medium", "low"];
const ASSET_CATEGORIES = ["logo", "photography", "template", "font", "color", "document", "other"];
const PROJECT_STATUSES = ["active", "in-progress", "review", "completed", "paused"];
const PROJECT_PACKAGES = ["3-in-1", "website-only", "photography-only", "gbp-only", "custom"];
const DELIVERABLE_STATUSES = ["pending", "in-progress", "review", "done"];
const DELIVERABLE_CATEGORIES = ["website", "photography", "gbp", "design", "copy", "other"];
const IDEA_STATUSES = ["idea", "exploring", "testing", "adopted", "shelved"];
const IDEA_CATEGORIES = ["service", "pricing", "process", "marketing", "tech", "other"];
const IDEA_POTENTIALS = ["high", "medium", "low"];

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 768);
  useEffect(() => { const h = () => setV(window.innerWidth < 768); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return v;
}

// ── UI Primitives ─────────────────────────────────────────────────────────────

function Pill({ label, color }) {
  return <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${color}18`, color, border: `1px solid ${color}30`, textTransform: "capitalize", letterSpacing: 0.3, whiteSpace: "nowrap" }}>{label}</span>;
}

function Btn({ onClick, children, color = GOLD, variant = "solid", small }) {
  const base = { border: "none", borderRadius: 8, cursor: "pointer", fontSize: small ? 11 : 13, fontWeight: 500, padding: small ? "5px 12px" : "8px 18px", transition: "opacity 0.15s", fontFamily: "inherit" };
  if (variant === "solid") return <button onClick={onClick} style={{ ...base, background: color, color: BG }}>{children}</button>;
  if (variant === "ghost") return <button onClick={onClick} style={{ ...base, background: "transparent", color, border: `1px solid ${color}40` }}>{children}</button>;
  return <button onClick={onClick} style={{ ...base, background: SURFACE2, color: "#888", border: `1px solid ${BORDER}` }}>{children}</button>;
}

function Input({ label, value, onChange, type = "text", placeholder, options }) {
  const s = { background: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, color: "#f0ebe0", fontSize: 13, padding: "8px 12px", width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 11, color: "#555", letterSpacing: 0.5 }}>{label}</label>}
      {options ? <select value={value} onChange={e => onChange(e.target.value)} style={{ ...s, appearance: "none" }}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
        : type === "textarea" ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...s, resize: "vertical" }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={s} />}
    </div>
  );
}

function Modal({ title, onClose, children, color = GOLD }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, width: "100%", maxWidth: 500, maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: `1px solid ${BORDER}` }}>
          <span style={{ fontSize: 15, fontWeight: 500, color }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text, sub }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", gap: 10 }}>
      <span style={{ fontSize: 32, opacity: 0.15 }}>{icon}</span>
      <span style={{ fontSize: 14, color: "#555" }}>{text}</span>
      {sub && <span style={{ fontSize: 12, color: "#333" }}>{sub}</span>}
    </div>
  );
}

function SectionTab({ label, active, onClick, color }) {
  return <button onClick={onClick} style={{ padding: "7px 16px", borderRadius: 20, border: `1px solid ${active ? color : BORDER}`, background: active ? `${color}15` : "transparent", color: active ? color : "#555", fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s", whiteSpace: "nowrap" }}>{label}</button>;
}

function ProgressBar({ done, total, color = PURPLE }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 4, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: 11, color: "#555", minWidth: 32 }}>{pct}%</span>
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────

export default function OsloPixelHub() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => { db.from("activity").select("id").limit(1).then(({ error }) => { if (!error) setDbReady(true); }); }, []);

  const activeItem = NAV.find(n => n.id === active);

  return (
    <div style={{ display: "flex", height: "100vh", background: BG, fontFamily: "'DM Sans','Helvetica Neue',sans-serif", color: "#f0ebe0", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "fixed", top: -120, left: -80, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, right: -60, width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${TEAL}06 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      {!isMobile && (
        <aside style={{ width: sidebarOpen ? 220 : 60, transition: "width 0.32s cubic-bezier(0.4,0,0.2,1)", background: SURFACE, borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", zIndex: 10, flexShrink: 0, overflowX: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 14px 16px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${GOLD}, #a8894e)`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: BG, flexShrink: 0 }}>OP</div>
            {sidebarOpen && <div style={{ overflow: "hidden" }}><div style={{ fontSize: 14, fontWeight: 600, color: "#f0ebe0", whiteSpace: "nowrap" }}>OsloPixel</div><div style={{ fontSize: 9.5, color: "#555", letterSpacing: 1.2, textTransform: "uppercase", whiteSpace: "nowrap" }}>Control Hub</div></div>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 13, flexShrink: 0 }}>{sidebarOpen ? "←" : "→"}</button>
          </div>
          <div style={{ flex: 1, paddingTop: 8 }}>
            {sidebarOpen && <div style={{ padding: "10px 16px 4px", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#2e2e2e" }}>Modules</div>}
            {NAV.map(item => (
              <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", width: "100%", border: "none", borderLeft: `2px solid ${active === item.id ? item.color : "transparent"}`, background: active === item.id ? `${item.color}12` : "transparent", cursor: "pointer", textAlign: "left", transition: "all 0.18s", opacity: mounted ? 1 : 0, fontFamily: "inherit" }}>
                <span style={{ fontSize: 15, width: 20, textAlign: "center", flexShrink: 0, color: active === item.id ? item.color : "#555" }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: 13, color: active === item.id ? "#f0ebe0" : "#888", whiteSpace: "nowrap" }}>{item.label}</span>}
              </button>
            ))}
          </div>
          {sidebarOpen && <div style={{ padding: 16, borderTop: `1px solid ${BORDER}` }}><div style={{ fontSize: 9.5, color: "#2a2a2a", fontStyle: "italic" }}>Be visible. Be found. Be chosen.</div></div>}
        </aside>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 5 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 16px" : "0 28px", height: isMobile ? 52 : 56, borderBottom: `1px solid ${BORDER}`, background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isMobile && <div style={{ width: 26, height: 26, background: `linear-gradient(135deg, ${GOLD}, #a8894e)`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, color: BG }}>OP</div>}
            <span style={{ fontSize: 11, color: "#444", letterSpacing: 0.8, textTransform: "uppercase" }}>{activeItem?.label || "Dashboard"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: dbReady ? GREEN : "#444", transition: "background 0.5s" }} />
            {!isMobile && <span style={{ fontSize: 10, color: dbReady ? GREEN : "#444" }}>{dbReady ? "Connected" : "Connecting..."}</span>}
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #a8894e)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: BG }}>A</div>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "20px 16px 80px" : "28px" }}>
          {active === "dashboard" && <Dashboard isMobile={isMobile} mounted={mounted} setActive={setActive} dbReady={dbReady} />}
          {active === "marketing" && <MarketingModule isMobile={isMobile} />}
          {active === "sales" && <SalesModule isMobile={isMobile} />}
          {active === "outreach" && <OutreachModule isMobile={isMobile} />}
          {active === "projects" && <ProjectsModule isMobile={isMobile} />}
          {active === "billing" && <BillingModule isMobile={isMobile} />}
          {active === "rd" && <RDModule isMobile={isMobile} />}
        </div>

        {isMobile && (
          <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0e0e11", borderTop: `1px solid ${BORDER}`, display: "flex", zIndex: 100, height: 62 }}>
            {BOTTOM_NAV.map(item => (
              <button key={item.id} onClick={() => setActive(item.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, border: "none", background: "transparent", cursor: "pointer", borderTop: `2px solid ${active === item.id ? item.color : "transparent"}`, transition: "all 0.18s", fontFamily: "inherit" }}>
                <span style={{ fontSize: 18, color: active === item.id ? item.color : "#555" }}>{item.icon}</span>
                <span style={{ fontSize: 9.5, color: active === item.id ? "#f0ebe0" : "#555" }}>{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ isMobile, mounted, setActive, dbReady }) {
  const [stats, setStats] = useState({ leads: 0, projects: 0, invoiced: 0, paid: 0 });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (!dbReady) return;
    Promise.all([
      db.from("leads").select("status"),
      db.from("projects").select("status"),
      db.from("invoices").select("amount, status"),
      db.from("activity").select("*").order("created_at", { ascending: false }).limit(7),
    ]).then(([leads, projects, invoices, act]) => {
      const inv = invoices.data || [];
      setStats({
        leads: leads.data?.length || 0,
        projects: projects.data?.filter(p => p.status === "active" || p.status === "in-progress").length || 0,
        invoiced: inv.filter(i => i.status !== "cancelled").reduce((s, i) => s + (i.amount || 0), 0),
        paid: inv.filter(i => i.status === "paid").reduce((s, i) => s + (i.amount || 0), 0),
      });
      setActivity(act.data || []);
    });
  }, [dbReady]);

  const anim = (d = 0) => ({ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)", transition: `all 0.45s ease ${d}s` });

  const statCards = [
    { label: "Active Projects", value: stats.projects, color: PURPLE, id: "projects" },
    { label: "Leads in Pipeline", value: stats.leads, color: BLUE, id: "sales" },
    { label: "Total Invoiced", value: `NOK ${stats.invoiced.toLocaleString()}`, color: TEAL, id: "billing" },
    { label: "Total Paid", value: `NOK ${stats.paid.toLocaleString()}`, color: GREEN, id: "billing" },
  ];

  return (
    <div>
      <div style={{ ...anim(0), marginBottom: 24 }}>
        <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: 0, letterSpacing: -0.3 }}>Good to have you back, Aleksander.</h1>
        <p style={{ fontSize: 13, color: "#555", margin: "5px 0 0" }}>Here's where OsloPixel stands today.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {statCards.map((s, i) => (
          <div key={s.label} onClick={() => setActive(s.id)} style={{ ...anim(i * 0.07), background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px", cursor: "pointer" }}>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 600, letterSpacing: -0.5 }}>{s.value}</div>
            <div style={{ width: 24, height: 2, background: s.color, borderRadius: 1, marginTop: 8 }} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: 24 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: "#333", marginBottom: 14 }}>Modules</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 10 }}>
            {NAV.filter(n => n.id !== "dashboard").map((item, i) => (
              <button key={item.id} onClick={() => setActive(item.id)} style={{ ...anim(0.15 + i * 0.06), background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px", cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", fontFamily: "inherit" }}>
                <div style={{ fontSize: 18, color: item.color, width: 32, height: 32, border: `1px solid ${item.color}28`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "#ddd" }}>{item.label}</div>
                <div style={{ fontSize: 9.5, color: GREEN, marginTop: 4 }}>● Live</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.color}28, transparent)` }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: "#333", marginBottom: 14 }}>Activity</div>
            {activity.length === 0 ? <div style={{ fontSize: 12, color: "#333" }}>No activity yet.</div>
              : activity.map(a => (
                <div key={a.id} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12.5, color: "#ccc", lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 10.5, color: "#333", marginTop: 2 }}>{new Date(a.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</div>
                  </div>
                </div>
              ))}
          </div>
          <div style={{ background: `linear-gradient(135deg, ${GOLD}0a, ${GOLD}04)`, border: `1px solid ${GOLD}20`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>North Star</div>
            <p style={{ fontSize: 13, color: "#ccc", fontStyle: "italic", margin: "0 0 12px", lineHeight: 1.5 }}>"First impression partner for small businesses."</p>
            {["1–2 case studies", "Repeatable outreach", "Productized 3-in-1"].map(g => (
              <div key={g} style={{ fontSize: 11, color: "#555", display: "flex", gap: 6, marginBottom: 4 }}><span style={{ color: GOLD }}>✓</span>{g}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Billing Module ────────────────────────────────────────────────────────────

function BillingModule({ isMobile }) {
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const blank = { invoice_number: "", client_name: "", project_id: "", amount: "", status: "draft", issue_date: "", due_date: "", paid_date: "", notes: "", external_url: "" };
  const [form, setForm] = useState(blank);

  const load = useCallback(async () => {
    setLoading(true);
    const [inv, proj] = await Promise.all([
      db.from("invoices").select("*").order("created_at", { ascending: false }),
      db.from("projects").select("id, client_name, business").order("client_name"),
    ]);
    setInvoices(inv.data || []);
    setProjects(proj.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!form.client_name.trim()) return;
    const payload = {
      ...form,
      amount: parseFloat(form.amount) || 0,
      project_id: form.project_id || null,
      issue_date: form.issue_date || null,
      due_date: form.due_date || null,
      paid_date: form.paid_date || null,
    };
    if (selected) {
      await db.from("invoices").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", selected.id);
      await db.from("activity").insert({ text: `Invoice updated: ${form.client_name} — NOK ${payload.amount.toLocaleString()}`, module: "billing", type: "update" });
    } else {
      await db.from("invoices").insert(payload);
      await db.from("activity").insert({ text: `Invoice created: ${form.client_name} — NOK ${payload.amount.toLocaleString()}`, module: "billing", type: "new" });
    }
    setShowForm(false); setSelected(null); setForm(blank); load();
  };

  const remove = async (id, name) => {
    if (!window.confirm(`Remove invoice for ${name}?`)) return;
    await db.from("invoices").delete().eq("id", id);
    load();
  };

  const openEdit = (inv) => {
    setSelected(inv);
    setForm({ ...inv, amount: inv.amount || "", project_id: inv.project_id || "", issue_date: inv.issue_date || "", due_date: inv.due_date || "", paid_date: inv.paid_date || "", external_url: inv.external_url || "" });
    setShowForm(true);
  };

  // Calculations
  const totalInvoiced = invoices.filter(i => i.status !== "cancelled").reduce((s, i) => s + (i.amount || 0), 0);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + (i.amount || 0), 0);
  const totalOutstanding = invoices.filter(i => i.status === "sent").reduce((s, i) => s + (i.amount || 0), 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + (i.amount || 0), 0);
  const counts = INVOICE_STATUSES.reduce((acc, s) => { acc[s] = invoices.filter(i => i.status === s).length; return acc; }, {});
  const filtered = filter === "all" ? invoices : invoices.filter(i => i.status === filter);

  // Revenue by month (last 6 months, paid only)
  const monthlyRevenue = (() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en-GB", { month: "short" });
      const total = invoices.filter(inv => inv.status === "paid" && inv.paid_date?.startsWith(key)).reduce((s, inv) => s + (inv.amount || 0), 0);
      months.push({ label, total });
    }
    return months;
  })();
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.total), 1);

  const projectOptions = [{ id: "", client_name: "— No project —" }, ...projects];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: 0, color: TEAL }}>Billing</h1>
          <p style={{ fontSize: 12.5, color: "#555", margin: "4px 0 0" }}>{invoices.length} invoices · {counts.overdue || 0} overdue</p>
        </div>
        <Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={TEAL}>+ New Invoice</Btn>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total Invoiced", value: totalInvoiced, color: TEAL },
          { label: "Total Paid", value: totalPaid, color: GREEN },
          { label: "Outstanding", value: totalOutstanding, color: BLUE },
          { label: "Overdue", value: totalOverdue, color: CORAL },
        ].map(s => (
          <div key={s.label} style={{ background: SURFACE, border: `1px solid ${s.label === "Overdue" && totalOverdue > 0 ? CORAL + "44" : BORDER}`, borderRadius: 12, padding: "16px" }}>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: s.label === "Overdue" && totalOverdue > 0 ? CORAL : "#f0ebe0" }}>NOK {s.value.toLocaleString()}</div>
            <div style={{ width: 24, height: 2, background: s.color, borderRadius: 1, marginTop: 8 }} />
          </div>
        ))}
      </div>

      {/* Revenue chart + status filters side by side on desktop */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 280px", gap: 20, marginBottom: 28 }}>

        {/* Revenue by month bar chart */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: "#333", marginBottom: 16 }}>Revenue by Month (Paid)</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
            {monthlyRevenue.map((m, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", background: m.total > 0 ? TEAL : BORDER, borderRadius: "4px 4px 0 0", height: `${Math.max((m.total / maxRevenue) * 64, m.total > 0 ? 4 : 2)}px`, transition: "height 0.4s ease", minHeight: 2 }} />
                <span style={{ fontSize: 9.5, color: "#444" }}>{m.label}</span>
              </div>
            ))}
          </div>
          {totalPaid === 0 && <div style={{ fontSize: 11, color: "#333", textAlign: "center", marginTop: 8 }}>No paid invoices yet</div>}
        </div>

        {/* Status breakdown */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: "#333", marginBottom: 16 }}>By Status</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INVOICE_STATUSES.map(s => {
              const count = counts[s] || 0;
              const amt = invoices.filter(i => i.status === s).reduce((sum, i) => sum + (i.amount || 0), 0);
              return (
                <div key={s} onClick={() => setFilter(filter === s ? "all" : s)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "6px 8px", borderRadius: 8, background: filter === s ? `${INVOICE_STATUS_COLORS[s]}12` : "transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: INVOICE_STATUS_COLORS[s] }} />
                    <span style={{ fontSize: 12, color: "#aaa", textTransform: "capitalize" }}>{s}</span>
                    <span style={{ fontSize: 11, color: "#444" }}>({count})</span>
                  </div>
                  {amt > 0 && <span style={{ fontSize: 11, color: INVOICE_STATUS_COLORS[s] }}>NOK {amt.toLocaleString()}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Invoice list */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: "#333" }}>
          {filter === "all" ? `All Invoices (${invoices.length})` : `${filter} (${filtered.length})`}
        </div>
        {filter !== "all" && <button onClick={() => setFilter("all")} style={{ background: "none", border: "none", color: "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Clear filter ×</button>}
      </div>

      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div>
        : filtered.length === 0 ? <EmptyState icon="◑" text="No invoices yet" sub='Click "+ New Invoice" to add your first' />
        : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(inv => (
              <div key={inv.id} onClick={() => openEdit(inv)} style={{ background: SURFACE, border: `1px solid ${inv.status === "overdue" ? CORAL + "44" : BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                {/* Invoice number badge */}
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${TEAL}14`, border: `1px solid ${TEAL}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16, color: TEAL }}>◑</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0" }}>{inv.client_name}</span>
                    {inv.invoice_number && <span style={{ fontSize: 11, color: "#444" }}>#{inv.invoice_number}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <Pill label={inv.status} color={INVOICE_STATUS_COLORS[inv.status]} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: TEAL }}>NOK {(inv.amount || 0).toLocaleString()}</span>
                    {inv.due_date && inv.status !== "paid" && <span style={{ fontSize: 11, color: inv.status === "overdue" ? CORAL : "#444" }}>Due {new Date(inv.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
                    {inv.paid_date && <span style={{ fontSize: 11, color: GREEN }}>Paid {new Date(inv.paid_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
                    {inv.external_url && <a href={inv.external_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: TEAL, textDecoration: "none" }}>View invoice →</a>}
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); remove(inv.id, inv.client_name); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }}>×</button>
              </div>
            ))}
          </div>
        )}

      {showForm && (
        <Modal title={selected ? "Edit Invoice" : "New Invoice"} onClose={() => { setShowForm(false); setSelected(null); }} color={TEAL}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Client Name *" value={form.client_name} onChange={v => setForm(f => ({ ...f, client_name: v }))} placeholder="Marco Rossi" />
              <Input label="Invoice #" value={form.invoice_number} onChange={v => setForm(f => ({ ...f, invoice_number: v }))} placeholder="001" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Amount (NOK)" value={form.amount} onChange={v => setForm(f => ({ ...f, amount: v }))} type="number" placeholder="14900" />
              <Input label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={INVOICE_STATUSES} />
            </div>
            {/* Project link */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, color: "#555", letterSpacing: 0.5 }}>Linked Project</label>
              <select value={form.project_id} onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))} style={{ background: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, color: "#f0ebe0", fontSize: 13, padding: "8px 12px", outline: "none", fontFamily: "inherit", appearance: "none" }}>
                {projectOptions.map(p => <option key={p.id} value={p.id}>{p.client_name}{p.business ? ` — ${p.business}` : ""}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Issue Date" value={form.issue_date} onChange={v => setForm(f => ({ ...f, issue_date: v }))} type="date" />
              <Input label="Due Date" value={form.due_date} onChange={v => setForm(f => ({ ...f, due_date: v }))} type="date" />
            </div>
            {(form.status === "paid") && (
              <Input label="Paid Date" value={form.paid_date} onChange={v => setForm(f => ({ ...f, paid_date: v }))} type="date" />
            )}
            <Input label="External Invoice URL" value={form.external_url} onChange={v => setForm(f => ({ ...f, external_url: v }))} placeholder="Link to Fiken, Visma, PDF..." />
            <Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" placeholder="Any notes about this invoice..." />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn>
              <Btn onClick={save} color={TEAL}>{selected ? "Save Changes" : "Create Invoice"}</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── R&D Module ────────────────────────────────────────────────────────────────

function RDModule({ isMobile }) {
  const [tab, setTab] = useState("ideas");
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: "0 0 16px", color: CORAL }}>R&D</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <SectionTab label="Ideas & Experiments" active={tab === "ideas"} onClick={() => setTab("ideas")} color={CORAL} />
          <SectionTab label="Competitors" active={tab === "competitors"} onClick={() => setTab("competitors")} color={CORAL} />
        </div>
      </div>
      {tab === "ideas" && <IdeasTracker isMobile={isMobile} />}
      {tab === "competitors" && <CompetitorTracker isMobile={isMobile} />}
    </div>
  );
}

function IdeasTracker({ isMobile }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null); const [filter, setFilter] = useState("all");
  const blank = { title: "", category: "service", status: "idea", potential: "medium", description: "", notes: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("ideas").select("*").order("potential").order("created_at", { ascending: false }); setItems(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.title.trim()) return; if (selected) { await db.from("ideas").update({ ...form, updated_at: new Date().toISOString() }).eq("id", selected.id); } else { await db.from("ideas").insert(form); await db.from("activity").insert({ text: `New idea: ${form.title}`, module: "rd", type: "new" }); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, title) => { if (!window.confirm(`Remove "${title}"?`)) return; await db.from("ideas").delete().eq("id", id); load(); };
  const openEdit = (item) => { setSelected(item); setForm({ ...item }); setShowForm(true); };
  const filtered = filter === "all" ? items : items.filter(i => i.status === filter);
  const counts = IDEA_STATUSES.reduce((acc, s) => { acc[s] = items.filter(i => i.status === s).length; return acc; }, {});
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}><p style={{ fontSize: 12.5, color: "#555", margin: 0 }}>{items.length} ideas · {counts.adopted || 0} adopted</p><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={CORAL} small>+ Add Idea</Btn></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>{["all", ...IDEA_STATUSES].map(s => (<button key={s} onClick={() => setFilter(s)} style={{ padding: "4px 12px", borderRadius: 20, border: `1px solid ${filter === s ? (STATUS_COLORS[s] || CORAL) : BORDER}`, background: filter === s ? `${STATUS_COLORS[s] || CORAL}15` : "transparent", color: filter === s ? (STATUS_COLORS[s] || CORAL) : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{s === "all" ? `All (${items.length})` : `${s} (${counts[s] || 0})`}</button>))}</div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : filtered.length === 0 ? <EmptyState icon="◌" text="No ideas yet" sub='Click "+ Add Idea" to capture your first one' /> : (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 10 }}>
          {filtered.map(item => (<div key={item.id} onClick={() => openEdit(item)} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${POTENTIAL_COLORS[item.potential]}, transparent)` }} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}><div style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0", flex: 1, paddingRight: 8, lineHeight: 1.4 }}>{item.title}</div><button onClick={e => { e.stopPropagation(); remove(item.id, item.title); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 0, flexShrink: 0 }}>×</button></div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: item.description ? 10 : 0 }}><Pill label={item.status} color={STATUS_COLORS[item.status] || "#555"} /><Pill label={item.category} color={IDEA_CATEGORY_COLORS[item.category] || "#555"} /><Pill label={`${item.potential} potential`} color={POTENTIAL_COLORS[item.potential]} /></div>
            {item.description && <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5, marginTop: 8 }}>{item.description}</div>}
          </div>))}
        </div>)}
      {showForm && (<Modal title={selected ? "Edit Idea" : "New Idea"} onClose={() => { setShowForm(false); setSelected(null); }} color={CORAL}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Input label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Monthly GBP retainer" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}><Input label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={IDEA_CATEGORIES} /><Input label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={IDEA_STATUSES} /><Input label="Potential" value={form.potential} onChange={v => setForm(f => ({ ...f, potential: v }))} options={IDEA_POTENTIALS} /></div><Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} type="textarea" placeholder="What is this idea? Why does it matter?" /><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" placeholder="Research, risks, next steps..." /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={CORAL}>{selected ? "Save Changes" : "Add Idea"}</Btn></div></div></Modal>)}
    </div>
  );
}

function CompetitorTracker({ isMobile }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null);
  const blank = { name: "", website: "", location: "", strengths: "", weaknesses: "", pricing: "", notes: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("competitors").select("*").order("created_at", { ascending: false }); setItems(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.name.trim()) return; if (selected) { await db.from("competitors").update({ ...form, updated_at: new Date().toISOString() }).eq("id", selected.id); } else { await db.from("competitors").insert(form); await db.from("activity").insert({ text: `Competitor added: ${form.name}`, module: "rd", type: "new" }); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, name) => { if (!window.confirm(`Remove ${name}?`)) return; await db.from("competitors").delete().eq("id", id); load(); };
  const openEdit = (item) => { setSelected(item); setForm({ ...item }); setShowForm(true); };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}><p style={{ fontSize: 12.5, color: "#555", margin: 0 }}>{items.length} competitors tracked</p><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={CORAL} small>+ Add Competitor</Btn></div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : items.length === 0 ? <EmptyState icon="◌" text="No competitors yet" sub="Track who you're up against in Oslo" /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map(item => (<div key={item.id} onClick={() => openEdit(item)} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}><div><div style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0", marginBottom: 3 }}>{item.name}</div><div style={{ display: "flex", gap: 10 }}>{item.location && <span style={{ fontSize: 11, color: "#444" }}>📍 {item.location}</span>}{item.website && <a href={item.website.startsWith("http") ? item.website : `https://${item.website}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: CORAL, textDecoration: "none" }}>Website →</a>}</div></div><button onClick={e => { e.stopPropagation(); remove(item.id, item.name); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 0 }}>×</button></div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
              {item.strengths && <div style={{ background: `${GREEN}08`, border: `1px solid ${GREEN}18`, borderRadius: 8, padding: "10px 12px" }}><div style={{ fontSize: 9.5, color: GREEN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Strengths</div><div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{item.strengths}</div></div>}
              {item.weaknesses && <div style={{ background: `${CORAL}08`, border: `1px solid ${CORAL}18`, borderRadius: 8, padding: "10px 12px" }}><div style={{ fontSize: 9.5, color: CORAL, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Weaknesses</div><div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{item.weaknesses}</div></div>}
            </div>
            {item.pricing && <div style={{ fontSize: 11.5, color: "#555", marginTop: 10 }}>Pricing: <span style={{ color: GOLD }}>{item.pricing}</span></div>}
          </div>))}
        </div>)}
      {showForm && (<Modal title={selected ? "Edit Competitor" : "New Competitor"} onClose={() => { setShowForm(false); setSelected(null); }} color={CORAL}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Agency Oslo AS" /><Input label="Location" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="Oslo, Norway" /></div><Input label="Website" value={form.website} onChange={v => setForm(f => ({ ...f, website: v }))} placeholder="agencyoslo.no" /><Input label="Pricing" value={form.pricing} onChange={v => setForm(f => ({ ...f, pricing: v }))} placeholder="NOK 15,000–40,000" /><Input label="Strengths" value={form.strengths} onChange={v => setForm(f => ({ ...f, strengths: v }))} type="textarea" placeholder="What are they good at?" /><Input label="Weaknesses" value={form.weaknesses} onChange={v => setForm(f => ({ ...f, weaknesses: v }))} type="textarea" placeholder="Where do they fall short?" /><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" placeholder="Observations, opportunities..." /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={CORAL}>{selected ? "Save Changes" : "Add Competitor"}</Btn></div></div></Modal>)}
    </div>
  );
}

// ── Marketing Module ──────────────────────────────────────────────────────────

function MarketingModule({ isMobile }) {
  const [tab, setTab] = useState("content");
  return (
    <div>
      <div style={{ marginBottom: 24 }}><h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: "0 0 16px", color: GOLD }}>Marketing</h1><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><SectionTab label="Content Calendar" active={tab === "content"} onClick={() => setTab("content")} color={GOLD} /><SectionTab label="SEO Tracker" active={tab === "seo"} onClick={() => setTab("seo")} color={GOLD} /><SectionTab label="Brand Assets" active={tab === "assets"} onClick={() => setTab("assets")} color={GOLD} /></div></div>
      {tab === "content" && <ContentCalendar isMobile={isMobile} />}
      {tab === "seo" && <SEOTracker isMobile={isMobile} />}
      {tab === "assets" && <BrandAssets isMobile={isMobile} />}
    </div>
  );
}

function ContentCalendar({ isMobile }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null); const [filter, setFilter] = useState("all");
  const blank = { title: "", platform: "instagram", content_type: "post", status: "idea", caption: "", notes: "", scheduled_date: "", published_date: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("content").select("*").order("created_at", { ascending: false }); setItems(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.title.trim()) return; const payload = { ...form, scheduled_date: form.scheduled_date || null, published_date: form.published_date || null }; if (selected) { await db.from("content").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", selected.id); } else { await db.from("content").insert(payload); await db.from("activity").insert({ text: `New content: ${form.title} (${form.platform})`, module: "marketing", type: "new" }); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, title) => { if (!window.confirm(`Remove "${title}"?`)) return; await db.from("content").delete().eq("id", id); load(); };
  const openEdit = (item) => { setSelected(item); setForm({ ...item, scheduled_date: item.scheduled_date || "", published_date: item.published_date || "" }); setShowForm(true); };
  const filtered = filter === "all" ? items : items.filter(i => i.status === filter);
  const counts = CONTENT_STATUSES.reduce((acc, s) => { acc[s] = items.filter(i => i.status === s).length; return acc; }, {});
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}><p style={{ fontSize: 12.5, color: "#555", margin: 0 }}>{items.length} pieces · {counts.published || 0} published</p><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={GOLD} small>+ Add</Btn></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>{["all", ...CONTENT_STATUSES].map(s => (<button key={s} onClick={() => setFilter(s)} style={{ padding: "4px 12px", borderRadius: 20, border: `1px solid ${filter === s ? (STATUS_COLORS[s] || GOLD) : BORDER}`, background: filter === s ? `${STATUS_COLORS[s] || GOLD}15` : "transparent", color: filter === s ? (STATUS_COLORS[s] || GOLD) : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{s === "all" ? `All (${items.length})` : `${s} (${counts[s] || 0})`}</button>))}</div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : filtered.length === 0 ? <EmptyState icon="◈" text="No content yet" sub='Click "+ Add" to plan your first piece' /> : (<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{filtered.map(item => (<div key={item.id} onClick={() => openEdit(item)} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><div style={{ fontSize: 16, color: PLATFORM_COLORS[item.platform] || "#666", width: 34, height: 34, border: `1px solid ${PLATFORM_COLORS[item.platform] || "#666"}28`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{PLATFORM_ICONS[item.platform] || "◌"}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Pill label={item.status} color={STATUS_COLORS[item.status]} /><span style={{ fontSize: 11, color: "#444", textTransform: "capitalize" }}>{item.platform} · {item.content_type}</span>{item.scheduled_date && <span style={{ fontSize: 11, color: GOLD }}>Sched. {new Date(item.scheduled_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}</div></div><button onClick={e => { e.stopPropagation(); remove(item.id, item.title); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }}>×</button></div>))}</div>)}
      {showForm && (<Modal title={selected ? "Edit Content" : "New Content"} onClose={() => { setShowForm(false); setSelected(null); }} color={GOLD}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Input label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="Before/After website reveal" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Platform" value={form.platform} onChange={v => setForm(f => ({ ...f, platform: v }))} options={CONTENT_PLATFORMS} /><Input label="Type" value={form.content_type} onChange={v => setForm(f => ({ ...f, content_type: v }))} options={CONTENT_TYPES} /></div><Input label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={CONTENT_STATUSES} /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Scheduled Date" value={form.scheduled_date} onChange={v => setForm(f => ({ ...f, scheduled_date: v }))} type="date" /><Input label="Published Date" value={form.published_date} onChange={v => setForm(f => ({ ...f, published_date: v }))} type="date" /></div><Input label="Caption" value={form.caption} onChange={v => setForm(f => ({ ...f, caption: v }))} type="textarea" placeholder="Write your caption here..." /><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" placeholder="Ideas, hashtags, references..." /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={GOLD}>{selected ? "Save Changes" : "Add Content"}</Btn></div></div></Modal>)}
    </div>
  );
}

function SEOTracker({ isMobile }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null);
  const blank = { keyword: "", location: "", priority: "medium", current_rank: "", target_rank: "", search_volume: "", notes: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("seo_keywords").select("*").order("priority").order("created_at", { ascending: false }); setItems(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.keyword.trim()) return; if (selected) { await db.from("seo_keywords").update({ ...form, updated_at: new Date().toISOString() }).eq("id", selected.id); } else { await db.from("seo_keywords").insert(form); await db.from("activity").insert({ text: `SEO keyword: "${form.keyword}"`, module: "marketing", type: "new" }); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, kw) => { if (!window.confirm(`Remove "${kw}"?`)) return; await db.from("seo_keywords").delete().eq("id", id); load(); };
  const openEdit = (item) => { setSelected(item); setForm({ ...item }); setShowForm(true); };
  const PRIORITY_COLORS = { high: CORAL, medium: GOLD, low: "#555" };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}><p style={{ fontSize: 12.5, color: "#555", margin: 0 }}>{items.length} keywords</p><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={GOLD} small>+ Add Keyword</Btn></div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : items.length === 0 ? <EmptyState icon="◌" text="No keywords yet" sub="Add keywords you want to rank for" /> : (<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{items.map(item => (<div key={item.id} onClick={() => openEdit(item)} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}><span style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0" }}>{item.keyword}</span><Pill label={item.priority} color={PRIORITY_COLORS[item.priority]} /></div><div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{item.location && <span style={{ fontSize: 11, color: "#444" }}>📍 {item.location}</span>}{item.current_rank && <span style={{ fontSize: 11, color: "#555" }}>Rank: <span style={{ color: "#ccc" }}>{item.current_rank}</span></span>}{item.target_rank && <span style={{ fontSize: 11, color: "#555" }}>Target: <span style={{ color: GREEN }}>{item.target_rank}</span></span>}{item.search_volume && <span style={{ fontSize: 11, color: "#555" }}>Vol: <span style={{ color: BLUE }}>{item.search_volume}</span></span>}</div>{item.notes && <div style={{ fontSize: 11.5, color: "#444", marginTop: 5 }}>{item.notes}</div>}</div><button onClick={e => { e.stopPropagation(); remove(item.id, item.keyword); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }}>×</button></div>))}</div>)}
      {showForm && (<Modal title={selected ? "Edit Keyword" : "New Keyword"} onClose={() => { setShowForm(false); setSelected(null); }} color={GOLD}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Input label="Keyword *" value={form.keyword} onChange={v => setForm(f => ({ ...f, keyword: v }))} placeholder="nettside bedrifter oslo" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Location" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="Oslo, Norway" /><Input label="Priority" value={form.priority} onChange={v => setForm(f => ({ ...f, priority: v }))} options={SEO_PRIORITIES} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}><Input label="Current Rank" value={form.current_rank} onChange={v => setForm(f => ({ ...f, current_rank: v }))} placeholder="—" /><Input label="Target Rank" value={form.target_rank} onChange={v => setForm(f => ({ ...f, target_rank: v }))} placeholder="Top 3" /><Input label="Search Volume" value={form.search_volume} onChange={v => setForm(f => ({ ...f, search_volume: v }))} placeholder="320/mo" /></div><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" placeholder="Strategy, content ideas..." /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={GOLD}>{selected ? "Save Changes" : "Add Keyword"}</Btn></div></div></Modal>)}
    </div>
  );
}

function BrandAssets({ isMobile }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null);
  const blank = { name: "", category: "logo", url: "", description: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("brand_assets").select("*").order("category").order("created_at"); setItems(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.name.trim()) return; if (selected) { await db.from("brand_assets").update(form).eq("id", selected.id); } else { await db.from("brand_assets").insert(form); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, name) => { if (!window.confirm(`Remove "${name}"?`)) return; await db.from("brand_assets").delete().eq("id", id); load(); };
  const openEdit = (item) => { setSelected(item); setForm({ ...item }); setShowForm(true); };
  const grouped = ASSET_CATEGORIES.reduce((acc, cat) => { const g = items.filter(i => i.category === cat); if (g.length > 0) acc[cat] = g; return acc; }, {});
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}><p style={{ fontSize: 12.5, color: "#555", margin: 0 }}>{items.length} assets</p><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={GOLD} small>+ Add Asset</Btn></div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : items.length === 0 ? <EmptyState icon="◈" text="No assets yet" sub="Add links to your logos, photos, and templates" /> : Object.entries(grouped).map(([cat, catItems]) => (<div key={cat} style={{ marginBottom: 24 }}><div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: "#333", marginBottom: 10 }}>{cat}</div><div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 8 }}>{catItems.map(item => (<div key={item.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}><div style={{ fontSize: 16, color: ASSET_COLORS[item.category] || "#666", width: 34, height: 34, border: `1px solid ${ASSET_COLORS[item.category] || "#666"}28`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{ASSET_ICONS[item.category] || "◌"}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 500, color: "#f0ebe0", marginBottom: 2 }}>{item.name}</div>{item.description && <div style={{ fontSize: 11.5, color: "#555", marginBottom: 4 }}>{item.description}</div>}{item.url && <a href={item.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: GOLD, textDecoration: "none" }}>Open link →</a>}</div><div style={{ display: "flex", gap: 4, flexShrink: 0 }}><button onClick={() => openEdit(item)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 13, padding: 4 }}>✎</button><button onClick={() => remove(item.id, item.name)} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 4 }}>×</button></div></div>))}</div></div>))}
      {showForm && (<Modal title={selected ? "Edit Asset" : "New Asset"} onClose={() => { setShowForm(false); setSelected(null); }} color={GOLD}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Input label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Primary Logo" /><Input label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={ASSET_CATEGORIES} /><Input label="URL / Link" value={form.url} onChange={v => setForm(f => ({ ...f, url: v }))} placeholder="https://drive.google.com/..." /><Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} type="textarea" placeholder="What is this? When to use it?" /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={GOLD}>{selected ? "Save Changes" : "Add Asset"}</Btn></div></div></Modal>)}
    </div>
  );
}

// ── Sales Module ──────────────────────────────────────────────────────────────

function SalesModule({ isMobile }) {
  const [leads, setLeads] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null); const [filter, setFilter] = useState("all");
  const blank = { name: "", business: "", email: "", phone: "", status: "new", value: "", notes: "", source: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("leads").select("*").order("created_at", { ascending: false }); setLeads(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.name.trim()) return; const payload = { ...form, value: parseFloat(form.value) || 0 }; if (selected) { await db.from("leads").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", selected.id); await db.from("activity").insert({ text: `Lead updated: ${form.name}`, module: "sales", type: "update" }); } else { await db.from("leads").insert(payload); await db.from("activity").insert({ text: `New lead: ${form.name} (${form.business || "—"})`, module: "sales", type: "new" }); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, name) => { if (!window.confirm(`Remove ${name}?`)) return; await db.from("leads").delete().eq("id", id); load(); };
  const openEdit = (lead) => { setSelected(lead); setForm({ ...lead, value: lead.value || "" }); setShowForm(true); };
  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);
  const pipeline = LEAD_STATUSES.reduce((acc, s) => { acc[s] = leads.filter(l => l.status === s).length; return acc; }, {});
  const totalValue = leads.filter(l => l.status === "won").reduce((s, l) => s + (l.value || 0), 0);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}><div><h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: 0, color: BLUE }}>Sales Pipeline</h1><p style={{ fontSize: 12.5, color: "#555", margin: "4px 0 0" }}>{leads.length} leads · NOK {totalValue.toLocaleString()} won</p></div><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={BLUE}>+ Add Lead</Btn></div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${isMobile ? 3 : 6}, 1fr)`, gap: 8, marginBottom: 24 }}>{LEAD_STATUSES.map(s => (<button key={s} onClick={() => setFilter(filter === s ? "all" : s)} style={{ background: filter === s ? `${STATUS_COLORS[s]}18` : SURFACE, border: `1px solid ${filter === s ? STATUS_COLORS[s] : BORDER}`, borderRadius: 10, padding: "10px 8px", cursor: "pointer", textAlign: "center", fontFamily: "inherit" }}><div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 600, color: STATUS_COLORS[s] }}>{pipeline[s]}</div><div style={{ fontSize: 9.5, color: "#555", textTransform: "capitalize", marginTop: 2 }}>{s}</div></button>))}</div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : filtered.length === 0 ? <EmptyState icon="◇" text="No leads yet" sub='Click "+ Add Lead" to get started' /> : (<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{filtered.map(lead => (<div key={lead.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => openEdit(lead)}><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0" }}>{lead.name}</span>{lead.business && <span style={{ fontSize: 11, color: "#555" }}>{lead.business}</span>}</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Pill label={lead.status} color={STATUS_COLORS[lead.status]} />{lead.value > 0 && <span style={{ fontSize: 11, color: GOLD }}>NOK {lead.value.toLocaleString()}</span>}{lead.source && <span style={{ fontSize: 11, color: "#444" }}>via {lead.source}</span>}</div></div><button onClick={e => { e.stopPropagation(); remove(lead.id, lead.name); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }}>×</button></div>))}</div>)}
      {showForm && (<Modal title={selected ? "Edit Lead" : "New Lead"} onClose={() => { setShowForm(false); setSelected(null); }} color={BLUE}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Marco Rossi" /><Input label="Business" value={form.business} onChange={v => setForm(f => ({ ...f, business: v }))} placeholder="Rossi Café" /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} type="email" /><Input label="Phone" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={LEAD_STATUSES} /><Input label="Value (NOK)" value={form.value} onChange={v => setForm(f => ({ ...f, value: v }))} type="number" placeholder="8500" /></div><Input label="Source" value={form.source} onChange={v => setForm(f => ({ ...f, source: v }))} placeholder="Instagram, referral, walk-in..." /><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={BLUE}>{selected ? "Save Changes" : "Add Lead"}</Btn></div></div></Modal>)}
    </div>
  );
}

// ── Outreach Module ───────────────────────────────────────────────────────────

function OutreachModule({ isMobile }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null); const [filter, setFilter] = useState("all");
  const blank = { name: "", business: "", email: "", channel: "email", status: "draft", message: "", follow_up_date: "", notes: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("outreach").select("*").order("created_at", { ascending: false }); setItems(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => { if (!form.name.trim()) return; if (selected) { await db.from("outreach").update({ ...form, updated_at: new Date().toISOString() }).eq("id", selected.id); } else { await db.from("outreach").insert(form); await db.from("activity").insert({ text: `New outreach: ${form.name} via ${form.channel}`, module: "outreach", type: "new" }); } setShowForm(false); setSelected(null); setForm(blank); load(); };
  const remove = async (id, name) => { if (!window.confirm(`Remove ${name}?`)) return; await db.from("outreach").delete().eq("id", id); load(); };
  const openEdit = (item) => { setSelected(item); setForm({ ...item }); setShowForm(true); };
  const filtered = filter === "all" ? items : items.filter(i => i.status === filter);
  const counts = OUTREACH_STATUSES.reduce((acc, s) => { acc[s] = items.filter(i => i.status === s).length; return acc; }, {});
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}><div><h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: 0, color: GREEN }}>Client Outreach</h1><p style={{ fontSize: 12.5, color: "#555", margin: "4px 0 0" }}>{items.length} contacts · {counts.replied || 0} replied</p></div><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={GREEN}>+ Add Contact</Btn></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>{["all", ...OUTREACH_STATUSES].map(s => (<button key={s} onClick={() => setFilter(s)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${filter === s ? (STATUS_COLORS[s] || GREEN) : BORDER}`, background: filter === s ? `${STATUS_COLORS[s] || GREEN}15` : "transparent", color: filter === s ? (STATUS_COLORS[s] || GREEN) : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{s === "all" ? `All (${items.length})` : `${s} (${counts[s] || 0})`}</button>))}</div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : filtered.length === 0 ? <EmptyState icon="◉" text="No outreach yet" sub='Click "+ Add Contact" to start tracking' /> : (<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{filtered.map(item => (<div key={item.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => openEdit(item)}><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 14, fontWeight: 500, color: "#f0ebe0" }}>{item.name}</span>{item.business && <span style={{ fontSize: 11, color: "#555" }}>{item.business}</span>}</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Pill label={item.status} color={STATUS_COLORS[item.status]} /><span style={{ fontSize: 11, color: "#444" }}>via {item.channel}</span>{item.follow_up_date && <span style={{ fontSize: 11, color: GOLD }}>Follow-up {new Date(item.follow_up_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}</div></div><button onClick={e => { e.stopPropagation(); remove(item.id, item.name); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }}>×</button></div>))}</div>)}
      {showForm && (<Modal title={selected ? "Edit Contact" : "New Outreach"} onClose={() => { setShowForm(false); setSelected(null); }} color={GREEN}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Marco Rossi" /><Input label="Business" value={form.business} onChange={v => setForm(f => ({ ...f, business: v }))} placeholder="Rossi Café" /></div><Input label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} type="email" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Channel" value={form.channel} onChange={v => setForm(f => ({ ...f, channel: v }))} options={OUTREACH_CHANNELS} /><Input label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={OUTREACH_STATUSES} /></div><Input label="Follow-up Date" value={form.follow_up_date} onChange={v => setForm(f => ({ ...f, follow_up_date: v }))} type="date" /><Input label="Message / Script" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} type="textarea" placeholder="What did you say or plan to say..." /><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" placeholder="Context or follow-up notes..." /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={GREEN}>{selected ? "Save Changes" : "Add Contact"}</Btn></div></div></Modal>)}
    </div>
  );
}

// ── Projects Module ───────────────────────────────────────────────────────────

function ProjectsModule({ isMobile }) {
  const [projects, setProjects] = useState([]); const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false); const [selected, setSelected] = useState(null); const [openProject, setOpenProject] = useState(null); const [filter, setFilter] = useState("all");
  const blank = { client_name: "", business: "", package: "3-in-1", status: "active", start_date: "", due_date: "", value: "", notes: "" };
  const [form, setForm] = useState(blank);
  const load = useCallback(async () => { setLoading(true); const { data } = await db.from("projects").select("*, deliverables(*)").order("created_at", { ascending: false }); setProjects(data || []); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const save = async () => {
    if (!form.client_name.trim()) return;
    const payload = { ...form, value: parseFloat(form.value) || 0, start_date: form.start_date || null, due_date: form.due_date || null };
    if (selected) { await db.from("projects").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", selected.id); await db.from("activity").insert({ text: `Project updated: ${form.client_name}`, module: "projects", type: "update" }); }
    else {
      const { data } = await db.from("projects").insert(payload).select().single();
      await db.from("activity").insert({ text: `New project: ${form.client_name} (${form.package})`, module: "projects", type: "new" });
      if (data && form.package === "3-in-1") {
        await db.from("deliverables").insert([
          { project_id: data.id, title: "Discovery & brief", category: "other", status: "pending" },
          { project_id: data.id, title: "Photography session", category: "photography", status: "pending" },
          { project_id: data.id, title: "Photo editing & delivery", category: "photography", status: "pending" },
          { project_id: data.id, title: "Website design", category: "website", status: "pending" },
          { project_id: data.id, title: "Website copy", category: "copy", status: "pending" },
          { project_id: data.id, title: "Website launch", category: "website", status: "pending" },
          { project_id: data.id, title: "GBP setup & optimisation", category: "gbp", status: "pending" },
          { project_id: data.id, title: "Client handover", category: "other", status: "pending" },
        ]);
      }
    }
    setShowForm(false); setSelected(null); setForm(blank); load();
  };
  const remove = async (id, name) => { if (!window.confirm(`Remove project for ${name}?`)) return; await db.from("projects").delete().eq("id", id); if (openProject?.id === id) setOpenProject(null); load(); };
  const openEdit = (p) => { setSelected(p); setForm({ ...p, value: p.value || "", start_date: p.start_date || "", due_date: p.due_date || "" }); setShowForm(true); };
  const filtered = filter === "all" ? projects : projects.filter(p => p.status === filter);
  const counts = PROJECT_STATUSES.reduce((acc, s) => { acc[s] = projects.filter(p => p.status === s).length; return acc; }, {});
  const getProgress = (p) => { const dels = p.deliverables || []; return { done: dels.filter(d => d.status === "done").length, total: dels.length }; };
  if (openProject) { const fresh = projects.find(p => p.id === openProject.id) || openProject; return <ProjectDetail project={fresh} onBack={() => setOpenProject(null)} onRefresh={load} isMobile={isMobile} />; }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}><div><h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 500, margin: 0, color: PURPLE }}>Projects</h1><p style={{ fontSize: 12.5, color: "#555", margin: "4px 0 0" }}>{projects.length} projects · {counts.active || 0} active</p></div><Btn onClick={() => { setSelected(null); setForm(blank); setShowForm(true); }} color={PURPLE}>+ New Project</Btn></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>{["all", ...PROJECT_STATUSES].map(s => (<button key={s} onClick={() => setFilter(s)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${filter === s ? (STATUS_COLORS[s] || PURPLE) : BORDER}`, background: filter === s ? `${STATUS_COLORS[s] || PURPLE}15` : "transparent", color: filter === s ? (STATUS_COLORS[s] || PURPLE) : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{s === "all" ? `All (${projects.length})` : `${s} (${counts[s] || 0})`}</button>))}</div>
      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#444" }}>Loading...</div> : filtered.length === 0 ? <EmptyState icon="▣" text="No projects yet" sub='Click "+ New Project" to add your first client' /> : (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
          {filtered.map(project => { const { done, total } = getProgress(project); return (
            <div key={project.id} onClick={() => setOpenProject(project)} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${PACKAGE_COLORS[project.package] || PURPLE}, transparent)` }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}><div><div style={{ fontSize: 15, fontWeight: 500, color: "#f0ebe0", marginBottom: 4 }}>{project.client_name}</div>{project.business && <div style={{ fontSize: 12, color: "#555" }}>{project.business}</div>}</div><button onClick={e => { e.stopPropagation(); openEdit(project); }} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 13, padding: 4 }}>✎</button></div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}><Pill label={project.status} color={STATUS_COLORS[project.status] || PURPLE} /><Pill label={project.package} color={PACKAGE_COLORS[project.package] || GOLD} />{project.value > 0 && <span style={{ fontSize: 10, color: GOLD }}>NOK {project.value.toLocaleString()}</span>}</div>
              {total > 0 && <div style={{ marginBottom: 10 }}><div style={{ fontSize: 10.5, color: "#444", marginBottom: 6 }}>{done}/{total} deliverables done</div><ProgressBar done={done} total={total} color={PACKAGE_COLORS[project.package] || PURPLE} /></div>}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{project.due_date ? <span style={{ fontSize: 11, color: "#444" }}>Due {new Date(project.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span> : <span />}<div style={{ display: "flex", gap: 8 }}><span style={{ fontSize: 11, color: PURPLE }}>View →</span><button onClick={e => { e.stopPropagation(); remove(project.id, project.client_name); }} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 14, padding: 0 }}>×</button></div></div>
            </div>);})}
        </div>)}
      {showForm && (<Modal title={selected ? "Edit Project" : "New Project"} onClose={() => { setShowForm(false); setSelected(null); }} color={PURPLE}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Client Name *" value={form.client_name} onChange={v => setForm(f => ({ ...f, client_name: v }))} placeholder="Marco Rossi" /><Input label="Business" value={form.business} onChange={v => setForm(f => ({ ...f, business: v }))} placeholder="Rossi Café" /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Package" value={form.package} onChange={v => setForm(f => ({ ...f, package: v }))} options={PROJECT_PACKAGES} /><Input label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={PROJECT_STATUSES} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Start Date" value={form.start_date} onChange={v => setForm(f => ({ ...f, start_date: v }))} type="date" /><Input label="Due Date" value={form.due_date} onChange={v => setForm(f => ({ ...f, due_date: v }))} type="date" /></div><Input label="Value (NOK)" value={form.value} onChange={v => setForm(f => ({ ...f, value: v }))} type="number" placeholder="8500" /><Input label="Notes" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} type="textarea" />{!selected && <div style={{ background: `${PURPLE}0d`, border: `1px solid ${PURPLE}20`, borderRadius: 8, padding: "10px 12px" }}><div style={{ fontSize: 11, color: PURPLE, marginBottom: 4 }}>Auto-deliverables</div><div style={{ fontSize: 11, color: "#555" }}>3-in-1 projects get 8 standard deliverables automatically.</div></div>}<div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowForm(false); setSelected(null); }} variant="neutral">Cancel</Btn><Btn onClick={save} color={PURPLE}>{selected ? "Save Changes" : "Create Project"}</Btn></div></div></Modal>)}
    </div>
  );
}

function ProjectDetail({ project, onBack, onRefresh, isMobile }) {
  const [deliverables, setDeliverables] = useState(project.deliverables || []); const [showDelForm, setShowDelForm] = useState(false); const [selDel, setSelDel] = useState(null);
  const blankDel = { title: "", category: "website", status: "pending", due_date: "", notes: "" };
  const [delForm, setDelForm] = useState(blankDel);
  const loadDels = useCallback(async () => { const { data } = await db.from("deliverables").select("*").eq("project_id", project.id).order("created_at"); setDeliverables(data || []); }, [project.id]);
  useEffect(() => { loadDels(); }, [loadDels]);
  const saveDel = async () => { if (!delForm.title.trim()) return; const payload = { ...delForm, project_id: project.id, due_date: delForm.due_date || null }; if (selDel) { await db.from("deliverables").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", selDel.id); } else { await db.from("deliverables").insert(payload); } setShowDelForm(false); setSelDel(null); setDelForm(blankDel); loadDels(); onRefresh(); };
  const toggleDone = async (del) => { const ns = del.status === "done" ? "in-progress" : "done"; await db.from("deliverables").update({ status: ns, updated_at: new Date().toISOString() }).eq("id", del.id); if (ns === "done") { await db.from("activity").insert({ text: `Done: ${del.title} (${project.client_name})`, module: "projects", type: "milestone" }); } loadDels(); onRefresh(); };
  const removeDel = async (id) => { await db.from("deliverables").delete().eq("id", id); loadDels(); onRefresh(); };
  const openEditDel = (d) => { setSelDel(d); setDelForm({ ...d, due_date: d.due_date || "" }); setShowDelForm(true); };
  const done = deliverables.filter(d => d.status === "done").length; const total = deliverables.length;
  const grouped = DELIVERABLE_CATEGORIES.reduce((acc, cat) => { const g = deliverables.filter(d => d.category === cat); if (g.length > 0) acc[cat] = g; return acc; }, {});
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 12, padding: 0, marginBottom: 16, fontFamily: "inherit" }}>← Back to Projects</button>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
        <div><h1 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 500, margin: "0 0 6px", color: PURPLE }}>{project.client_name}</h1>{project.business && <div style={{ fontSize: 13, color: "#555", marginBottom: 10 }}>{project.business}</div>}<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Pill label={project.status} color={STATUS_COLORS[project.status] || PURPLE} /><Pill label={project.package} color={PACKAGE_COLORS[project.package] || GOLD} />{project.value > 0 && <span style={{ fontSize: 11, color: GOLD, alignSelf: "center" }}>NOK {project.value.toLocaleString()}</span>}</div></div>
        <Btn onClick={() => { setSelDel(null); setDelForm(blankDel); setShowDelForm(true); }} color={PURPLE} small>+ Add</Btn>
      </div>
      {total > 0 && <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 18px", marginBottom: 24 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 12, color: "#555" }}>Overall Progress</span><span style={{ fontSize: 12, color: PURPLE }}>{done}/{total} done</span></div><ProgressBar done={done} total={total} color={PURPLE} />{project.due_date && <div style={{ fontSize: 11, color: "#444", marginTop: 10 }}>Due {new Date(project.due_date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>}</div>}
      {total === 0 ? <EmptyState icon="▣" text="No deliverables yet" sub='Click "+ Add" to add tasks' /> : Object.entries(grouped).map(([cat, dels]) => (
        <div key={cat} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: CATEGORY_COLORS[cat] || "#333", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}><span>{cat}</span><div style={{ flex: 1, height: 1, background: `${CATEGORY_COLORS[cat] || "#333"}22` }} /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {dels.map(d => (<div key={d.id} style={{ background: SURFACE, border: `1px solid ${d.status === "done" ? "#1e2a1e" : BORDER}`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => toggleDone(d)} style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${d.status === "done" ? GREEN : "#333"}`, background: d.status === "done" ? `${GREEN}20` : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}>{d.status === "done" && <span style={{ color: GREEN, fontSize: 11, lineHeight: 1 }}>✓</span>}</button>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, color: d.status === "done" ? "#444" : "#f0ebe0", textDecoration: d.status === "done" ? "line-through" : "none", marginBottom: (d.due_date || (d.status !== "pending" && d.status !== "done")) ? 4 : 0 }}>{d.title}</div><div style={{ display: "flex", gap: 8 }}>{d.status !== "pending" && d.status !== "done" && <Pill label={d.status} color={STATUS_COLORS[d.status] || "#555"} />}{d.due_date && <span style={{ fontSize: 10.5, color: "#444" }}>Due {new Date(d.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}</div></div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}><button onClick={() => openEditDel(d)} style={{ background: "none", border: "none", color: "#3a3a3a", cursor: "pointer", fontSize: 13, padding: 4 }}>✎</button><button onClick={() => removeDel(d.id)} style={{ background: "none", border: "none", color: "#2e2e2e", cursor: "pointer", fontSize: 14, padding: 4 }}>×</button></div>
            </div>))}
          </div>
        </div>))}
      {showDelForm && (<Modal title={selDel ? "Edit Deliverable" : "New Deliverable"} onClose={() => { setShowDelForm(false); setSelDel(null); }} color={PURPLE}><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><Input label="Title *" value={delForm.title} onChange={v => setDelForm(f => ({ ...f, title: v }))} placeholder="Photography session" /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Input label="Category" value={delForm.category} onChange={v => setDelForm(f => ({ ...f, category: v }))} options={DELIVERABLE_CATEGORIES} /><Input label="Status" value={delForm.status} onChange={v => setDelForm(f => ({ ...f, status: v }))} options={DELIVERABLE_STATUSES} /></div><Input label="Due Date" value={delForm.due_date} onChange={v => setDelForm(f => ({ ...f, due_date: v }))} type="date" /><Input label="Notes" value={delForm.notes} onChange={v => setDelForm(f => ({ ...f, notes: v }))} type="textarea" /><div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}><Btn onClick={() => { setShowDelForm(false); setSelDel(null); }} variant="neutral">Cancel</Btn><Btn onClick={saveDel} color={PURPLE}>{selDel ? "Save Changes" : "Add Deliverable"}</Btn></div></div></Modal>)}
    </div>
  );
}
