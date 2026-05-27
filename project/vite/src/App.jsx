import { useState, useEffect } from "react";

const COLORS = {
  primary: "#FF6B35",
  primaryLight: "#FFF0EB",
  primaryDark: "#C94F1F",
  accent: "#1A1A2E",
  accentLight: "#16213E",
  gold: "#FFB347",
  goldLight: "#FFF8ED",
  green: "#22C55E",
  greenLight: "#DCFCE7",
  blue: "#3B82F6",
  blueLight: "#EFF6FF",
  purple: "#8B5CF6",
  purpleLight: "#F5F3FF",
  red: "#EF4444",
  gray100: "#F8F7F5",
  gray200: "#EDEBE6",
  gray300: "#D4D2CC",
  gray400: "#9B9891",
  gray500: "#6B6860",
  gray700: "#3A3936",
  gray900: "#1A1918",
};

const student = {
  name: "Ritom Kumar",
  shortName: "RK",
  email: "Ritomkumar25d@gmail.com",
  phone: "+91 8126018706",
  program: "B.Tech Computer Science",
  university: "The Hybrid Gurukul University",
  semester: "2nd Semester",
  year: "1st Year",
  admissionYear: "2025",
  systemId: "2025459239",
  dob: "30/04/2005",
  bloodGroup: "B+",
  gender: "Male",
  nationality: "Bangladesh",
  progress: 85,
};

const classes = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Matrix",
    teacher: "Bhaskar Jha",
    time: "10:00 AM",
    duration: "1hr 30min",
    status: "live",
    participants: 20,
    color: COLORS.primary,
    colorLight: COLORS.primaryLight,
    icon: "∑",
  },
  {
    id: 2,
    subject: "Science",
    topic: "Organisms",
    teacher: "Ritom Hajra",
    time: "1:00 PM",
    duration: "1hr 30min",
    status: "scheduled",
    day: "Today",
    color: COLORS.blue,
    colorLight: COLORS.blueLight,
    icon: "⚗",
  },
  {
    id: 3,
    subject: "Mathematics",
    topic: "Quadratic Equation",
    teacher: "Atul Pandey",
    time: "4:00 PM",
    duration: "1hr 24min",
    status: "upcoming",
    day: "Tomorrow",
    color: COLORS.purple,
    colorLight: COLORS.purpleLight,
    icon: "∫",
  },
];

const activities = [
  { id: 1, text: "Completed: Mathematics Assignment", time: "2 hours ago", icon: "✓", color: COLORS.green },
  { id: 2, text: "Attended: Science Live Class", time: "Yesterday", icon: "📡", color: COLORS.blue },
  { id: 3, text: "Submitted: Physics Lab Report", time: "2 days ago", icon: "📄", color: COLORS.purple },
];

const menuItems = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "classes", label: "Classes", icon: "▶" },
  { id: "planner", label: "Planner", icon: "◫" },
  { id: "mentor", label: "Mentor", icon: "♦" },
  { id: "more", label: "More", icon: "⋯" },
];

// --- Components ---

function Avatar({ name, size = 44, style = {} }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.32,
      letterSpacing: "0.5px", flexShrink: 0, ...style
    }}>
      {initials}
    </div>
  );
}

function Badge({ label, color, bg, style = {} }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: bg || COLORS.primaryLight, color: color || COLORS.primary,
      fontSize: 11, fontWeight: 700, padding: "3px 10px",
      borderRadius: 20, letterSpacing: "0.3px", ...style
    }}>
      {label}
    </span>
  );
}

function LivePulse() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: COLORS.red,
        animation: "pulse 1.2s ease-in-out infinite",
      }} />
      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }`}</style>
      <span style={{ color: COLORS.red, fontSize: 11, fontWeight: 700 }}>LIVE</span>
    </span>
  );
}

function ClassCard({ cls, onJoin }) {
  const isLive = cls.status === "live";
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${isLive ? cls.color + "40" : "#EDEBE6"}`,
      borderRadius: 16, padding: "14px 16px",
      marginBottom: 12,
      boxShadow: isLive ? `0 4px 20px ${cls.color}18` : "none",
      position: "relative", overflow: "hidden",
    }}>
      {isLive && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 80, height: 80, borderRadius: "0 0 0 80px",
          background: `${cls.color}12`,
        }} />
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: cls.colorLight, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>
          {cls.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.gray900 }}>{cls.subject}</span>
            {isLive ? <LivePulse /> : (
              <Badge
                label={cls.day || cls.status}
                color={cls.status === "upcoming" ? COLORS.purple : COLORS.blue}
                bg={cls.status === "upcoming" ? COLORS.purpleLight : COLORS.blueLight}
              />
            )}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: COLORS.gray500, marginBottom: 6 }}>
            {cls.topic} · {cls.teacher}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: COLORS.gray400 }}>
            <span>⏱ {cls.duration}</span>
            <span>🕐 {cls.time}</span>
            {cls.participants && <span>👥 {cls.participants} online</span>}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {isLive ? (
          <button onClick={onJoin} style={{
            flex: 1, background: cls.color, color: "#fff",
            border: "none", borderRadius: 10, padding: "10px 0",
            fontWeight: 700, fontSize: 14, cursor: "pointer",
            letterSpacing: "0.3px",
          }}>Join Live →</button>
        ) : (
          <>
            <button style={{
              flex: 1, background: COLORS.gray100, color: COLORS.gray700,
              border: "none", borderRadius: 10, padding: "9px 0",
              fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>View Schedule</button>
            <button style={{
              flex: 1, background: cls.colorLight, color: cls.color,
              border: "none", borderRadius: 10, padding: "9px 0",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>Set Reminder</button>
          </>
        )}
      </div>
    </div>
  );
}

function ProgressRing({ pct, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={COLORS.gray200} strokeWidth={8} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={COLORS.primary} strokeWidth={8}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle"
        fill={COLORS.gray900} fontSize={16} fontWeight={700}>{pct}%</text>
    </svg>
  );
}

// --- Screens ---

function LoginScreen({ onLogin }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => {
    if (pw === "demo" || (id && pw)) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onLogin(); }, 900);
    } else {
      setErr('Use any Student ID and password: demo');
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(160deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "2rem 1.5rem", fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Logo */}
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gold})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, margin: "0 auto 16px", boxShadow: `0 8px 32px ${COLORS.primary}40`,
        }}>☀</div>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 24, margin: 0, letterSpacing: "-0.5px" }}>
          The Hybrid Gurukul
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>
          Education · Growth · Guidance
        </p>
      </div>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: 360,
        background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
        borderRadius: 24, padding: "2rem", border: "1px solid rgba(255,255,255,0.12)",
      }}>
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 20, margin: "0 0 24px" }}>
          Student Login
        </h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Student ID
          </label>
          <input
            value={id} onChange={e => { setId(e.target.value); setErr(""); }}
            placeholder="Enter your System ID"
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 12,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Password
          </label>
          <input
            type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }}
            placeholder="Password"
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 12,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {err && <p style={{ color: "#FFB347", fontSize: 13, marginBottom: 16, textAlign: "center" }}>{err}</p>}

        <button onClick={handle} disabled={loading} style={{
          width: "100%", padding: "14px", borderRadius: 12,
          background: loading ? "rgba(255,107,53,0.5)" : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gold})`,
          color: "#fff", border: "none", fontWeight: 700, fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.3px",
          transition: "opacity 0.2s",
        }}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div style={{
          marginTop: 20, padding: "12px 16px", borderRadius: 10,
          background: "rgba(255,179,71,0.12)", border: "1px solid rgba(255,179,71,0.25)",
        }}>
          <p style={{ color: COLORS.gold, fontSize: 12, margin: 0, textAlign: "center" }}>
            🎓 Demo Mode: Use any email and password: demo
          </p>
        </div>
      </div>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 24 }}>
        Version 1.0.0 · © 2026 The Hybrid Gurukul
      </p>
    </div>
  );
}

function HomeScreen({ setTab }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: "0 0 1rem" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)`,
        padding: "3rem 1.5rem 1.8rem",
        borderRadius: "0 0 28px 28px",
        marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: "0 0 4px" }}>{greeting} ✌️</p>
            <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 24, margin: 0, letterSpacing: "-0.5px" }}>
              Ritom Kumar
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4, margin: "4px 0 0" }}>
              {student.year} · {student.semester}
            </p>
          </div>
          <Avatar name={student.name} size={52} />
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 12, marginTop: 20,
        }}>
          {[
            { label: "Semester", value: "2nd" },
            { label: "Progress", value: `${student.progress}%` },
            { label: "Classes Today", value: "2" },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: "rgba(255,255,255,0.1)",
              borderRadius: 14, padding: "10px 12px", textAlign: "center",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 1.25rem" }}>
        {/* Live Now */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.primary}05)`,
          border: `1.5px solid ${COLORS.primary}30`,
          borderRadius: 20, padding: "16px 18px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LivePulse />
              <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.gray900 }}>Live Now</span>
            </div>
            <span style={{ fontSize: 12, color: COLORS.gray400 }}>👥 20 online</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: COLORS.primaryLight, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 24,
            }}>∑</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, margin: 0, color: COLORS.gray900 }}>Mathematics</p>
              <p style={{ color: COLORS.gray500, fontSize: 13, margin: "2px 0 0" }}>
                Matrix · Bhaskar Jha · 1hr 30min
              </p>
            </div>
          </div>
          <button onClick={() => setTab("classes")} style={{
            width: "100%", marginTop: 14,
            background: COLORS.primary, color: "#fff",
            border: "none", borderRadius: 12, padding: "11px",
            fontWeight: 700, fontSize: 15, cursor: "pointer",
          }}>
            Join Class →
          </button>
        </div>

        {/* Progress */}
        <div style={{
          background: "#fff", border: `1px solid ${COLORS.gray200}`,
          borderRadius: 20, padding: "16px 18px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <ProgressRing pct={student.progress} />
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, margin: 0, color: COLORS.gray900 }}>
              Overall Progress
            </p>
            <p style={{ color: COLORS.gray500, fontSize: 13, margin: "4px 0 8px" }}>
              2nd Semester · 2025–26
            </p>
            <div style={{
              background: COLORS.greenLight, borderRadius: 8,
              padding: "4px 10px", display: "inline-block",
            }}>
              <span style={{ color: COLORS.green, fontSize: 12, fontWeight: 700 }}>↑ On Track</span>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontWeight: 800, fontSize: 17, margin: 0, color: COLORS.gray900 }}>Today's Classes</h2>
            <button onClick={() => setTab("classes")} style={{
              background: "none", border: "none", color: COLORS.primary,
              fontSize: 13, fontWeight: 700, cursor: "pointer", padding: 0,
            }}>View all →</button>
          </div>
          {classes.slice(0, 2).map(cls => (
            <ClassCard key={cls.id} cls={cls} onJoin={() => {}} />
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontWeight: 800, fontSize: 17, margin: "0 0 12px", color: COLORS.gray900 }}>Recent Activity</h2>
          <div style={{
            background: "#fff", border: `1px solid ${COLORS.gray200}`,
            borderRadius: 20, overflow: "hidden",
          }}>
            {activities.map((a, i) => (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px",
                borderBottom: i < activities.length - 1 ? `1px solid ${COLORS.gray100}` : "none",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: a.color + "18", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                }}>
                  <span style={{ color: a.color }}>{a.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, margin: 0, color: COLORS.gray900 }}>{a.text}</p>
                  <p style={{ color: COLORS.gray400, fontSize: 12, margin: "2px 0 0" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassesScreen() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "live", "scheduled", "upcoming"];
  const filtered = filter === "all" ? classes : classes.filter(c => c.status === filter);

  return (
    <div style={{ padding: "0 0 1rem" }}>
      <div style={{
        background: `linear-gradient(135deg, #1A1A2E, #0F3460)`,
        padding: "3rem 1.5rem 1.5rem",
        borderRadius: "0 0 28px 28px", marginBottom: 20,
      }}>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: "0 0 4px" }}>Classes</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>
          Wednesday, May 27, 2026
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "7px 16px", borderRadius: 20,
              background: filter === f ? COLORS.primary : "rgba(255,255,255,0.12)",
              color: filter === f ? "#fff" : "rgba(255,255,255,0.6)",
              border: "none", fontWeight: 700, fontSize: 12,
              cursor: "pointer", textTransform: "capitalize", whiteSpace: "nowrap",
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 1.25rem" }}>
        {filtered.map(cls => <ClassCard key={cls.id} cls={cls} onJoin={() => {}} />)}

        {/* Recording */}
        <div style={{
          background: "#fff", border: `1px solid ${COLORS.gray200}`,
          borderRadius: 20, padding: "16px 18px", marginTop: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: COLORS.goldLight, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>🎬</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: COLORS.gray900 }}>
                Completed Recordings
              </p>
              <p style={{ color: COLORS.gray400, fontSize: 13, margin: "2px 0 0" }}>
                3 past sessions available
              </p>
            </div>
          </div>
          <button style={{
            width: "100%", marginTop: 12,
            background: COLORS.goldLight, color: COLORS.gold,
            border: `1px solid ${COLORS.gold}40`, borderRadius: 10, padding: "10px",
            fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>
            View Recordings
          </button>
        </div>
      </div>
    </div>
  );
}

function PlannerScreen() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [25, 26, 27, 28, 29, 30, 31];
  const today = 2;
  const schedule = [
    { time: "10:00 AM", subj: "Mathematics", topic: "Matrix", color: COLORS.primary },
    { time: "1:00 PM", subj: "Science", topic: "Organisms", color: COLORS.blue },
    { time: "4:00 PM", subj: "Physics", topic: "Mechanics", color: COLORS.purple },
  ];

  return (
    <div style={{ padding: "0 0 1rem" }}>
      <div style={{
        background: `linear-gradient(135deg, #1A1A2E, #0F3460)`,
        padding: "3rem 1.5rem 1.5rem",
        borderRadius: "0 0 28px 28px", marginBottom: 20,
      }}>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: "0 0 4px" }}>Planner</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 20px" }}>May 2026</p>

        <div style={{ display: "flex", gap: 8 }}>
          {days.map((d, i) => (
            <div key={d} style={{ flex: 1, textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, margin: "0 0 6px", fontWeight: 600 }}>{d}</p>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: i === today ? COLORS.primary : "transparent",
                border: i === today ? "none" : "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto",
                color: i === today ? "#fff" : "rgba(255,255,255,0.7)",
                fontWeight: i === today ? 700 : 400, fontSize: 14,
              }}>
                {dates[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 1.25rem" }}>
        <h2 style={{ fontWeight: 800, fontSize: 17, margin: "0 0 16px", color: COLORS.gray900 }}>
          Wednesday, May 27
        </h2>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 46, top: 0, bottom: 0,
            width: 1, background: COLORS.gray200,
          }} />
          {schedule.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
              <p style={{ fontSize: 11, color: COLORS.gray400, width: 52, textAlign: "right",
                fontWeight: 600, paddingTop: 14, flexShrink: 0 }}>{s.time}</p>
              <div style={{
                width: 12, height: 12, borderRadius: "50%", background: s.color,
                border: `3px solid #fff`, boxShadow: `0 0 0 1px ${s.color}`,
                marginTop: 16, flexShrink: 0, position: "relative", zIndex: 1,
              }} />
              <div style={{
                flex: 1, background: "#fff", border: `1px solid ${COLORS.gray200}`,
                borderRadius: 14, padding: "12px 14px",
                borderLeft: `3px solid ${s.color}`,
              }}>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: COLORS.gray900 }}>{s.subj}</p>
                <p style={{ color: COLORS.gray400, fontSize: 12, margin: "3px 0 0" }}>{s.topic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MentorScreen() {
  return (
    <div style={{ padding: "0 0 1rem" }}>
      <div style={{
        background: `linear-gradient(135deg, #1A1A2E, #0F3460)`,
        padding: "3rem 1.5rem 1.8rem",
        borderRadius: "0 0 28px 28px", marginBottom: 20,
      }}>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: "0 0 4px" }}>Mentor Session</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>
          Your learning companion
        </p>
      </div>

      <div style={{ padding: "0 1.25rem" }}>
        {/* Upcoming */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.purple}15, ${COLORS.purple}05)`,
          border: `1.5px solid ${COLORS.purple}30`, borderRadius: 20,
          padding: "18px", marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <Badge label="Upcoming" color={COLORS.purple} bg={COLORS.purpleLight} />
              <p style={{ fontWeight: 700, fontSize: 16, margin: "8px 0 0", color: COLORS.gray900 }}>
                1-on-1 Mentor Session
              </p>
              <p style={{ color: COLORS.gray500, fontSize: 13, margin: "4px 0 0" }}>Tomorrow, 4:00 PM</p>
            </div>
            <div style={{
              width: 50, height: 50, borderRadius: "50%",
              background: COLORS.purpleLight,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
            }}>🎓</div>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.7)", borderRadius: 12,
            padding: "10px 14px", marginBottom: 12,
          }}>
            <p style={{ fontSize: 12, color: COLORS.gray500, margin: 0 }}>Focus Area</p>
            <p style={{ fontWeight: 600, fontSize: 14, color: COLORS.gray900, margin: "3px 0 0" }}>
              Exam Preparation & Study Strategy
            </p>
          </div>
          <button style={{
            width: "100%", background: COLORS.purple, color: "#fff",
            border: "none", borderRadius: 12, padding: "11px",
            fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>
            Join Session
          </button>
        </div>

        {/* Progress Summary */}
        <div style={{
          background: "#fff", border: `1px solid ${COLORS.gray200}`,
          borderRadius: 20, padding: "18px", marginBottom: 16,
        }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: COLORS.gray900 }}>
            This Month's Progress
          </h3>
          {[
            { label: "Classes Attended", val: 24, max: 28, color: COLORS.primary },
            { label: "Assignments Done", val: 8, max: 10, color: COLORS.green },
            { label: "Quiz Score", val: 85, max: 100, color: COLORS.blue, unit: "%" },
          ].map(p => (
            <div key={p.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: COLORS.gray700, fontWeight: 600 }}>{p.label}</span>
                <span style={{ fontSize: 13, color: p.color, fontWeight: 700 }}>
                  {p.val}{p.unit || ""} / {p.max}{p.unit || ""}
                </span>
              </div>
              <div style={{ background: COLORS.gray100, borderRadius: 6, height: 7, overflow: "hidden" }}>
                <div style={{
                  width: `${(p.val / p.max) * 100}%`, height: "100%",
                  background: p.color, borderRadius: 6,
                  transition: "width 1s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: "#fff", border: `1px solid ${COLORS.gray200}`,
          borderRadius: 20, padding: "18px",
        }}>
          <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 4px", color: COLORS.gray900 }}>
            🤝 Next Session
          </p>
          <p style={{ color: COLORS.gray400, fontSize: 13, margin: "0 0 12px" }}>This Month</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              flex: 1, background: COLORS.gray100, color: COLORS.gray700,
              border: "none", borderRadius: 10, padding: "10px",
              fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>Reschedule</button>
            <button style={{
              flex: 1, background: COLORS.primaryLight, color: COLORS.primary,
              border: "none", borderRadius: 10, padding: "10px",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ onLogout }) {
  const rows = [
    { label: "System ID", val: student.systemId },
    { label: "Email", val: student.email },
    { label: "Phone", val: student.phone },
    { label: "Program", val: student.program },
    { label: "University", val: student.university },
    { label: "Admission Year", val: student.admissionYear },
    { label: "Date of Birth", val: student.dob },
    { label: "Blood Group", val: student.bloodGroup },
    { label: "Gender", val: student.gender },
    { label: "Nationality", val: student.nationality },
  ];

  return (
    <div style={{ padding: "0 0 2rem" }}>
      <div style={{
        background: `linear-gradient(135deg, #1A1A2E, #0F3460)`,
        padding: "3rem 1.5rem 2.5rem",
        borderRadius: "0 0 28px 28px", marginBottom: -30,
        textAlign: "center",
      }}>
        <Avatar name={student.name} size={80} style={{ margin: "0 auto 12px" }} />
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: "0 0 4px" }}>{student.name}</h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, margin: 0 }}>{student.program}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <Badge label={student.year} color={COLORS.gold} bg="rgba(255,179,71,0.2)" />
          <Badge label={student.semester} color="rgba(255,255,255,0.7)" bg="rgba(255,255,255,0.12)" />
        </div>
      </div>

      <div style={{ padding: "0 1.25rem", paddingTop: 44 }}>
        <div style={{
          background: "#fff", border: `1px solid ${COLORS.gray200}`,
          borderRadius: 20, overflow: "hidden",
        }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "13px 18px", alignItems: "center",
              borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.gray100}` : "none",
            }}>
              <span style={{ fontSize: 13, color: COLORS.gray500, fontWeight: 600 }}>{r.label}</span>
              <span style={{
                fontSize: 13, color: COLORS.gray900, fontWeight: 600,
                maxWidth: "55%", textAlign: "right", wordBreak: "break-word",
              }}>{r.val}</span>
            </div>
          ))}
        </div>

        <button onClick={onLogout} style={{
          width: "100%", marginTop: 20, padding: "14px",
          background: "#FFF0EB", color: COLORS.primary,
          border: `1.5px solid ${COLORS.primary}30`, borderRadius: 14,
          fontWeight: 700, fontSize: 16, cursor: "pointer",
          letterSpacing: "0.3px",
        }}>
          Sign Out
        </button>

        <p style={{ textAlign: "center", color: COLORS.gray300, fontSize: 12, marginTop: 16 }}>
          Version 1.0.0 · © 2026 The Hybrid Gurukul
        </p>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("home");

  const screens = {
    home: <HomeScreen setTab={setTab} />,
    classes: <ClassesScreen />,
    planner: <PlannerScreen />,
    mentor: <MentorScreen />,
    more: <ProfileScreen onLogout={() => setLoggedIn(false)} />,
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.gray100, minHeight: "100vh",
      maxWidth: 430, margin: "0 auto", position: "relative",
    }}>
      {/* Scrollable content */}
      <div style={{ paddingBottom: 80, overflowY: "auto" }}>
        {screens[tab]}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)",
        borderTop: `1px solid ${COLORS.gray200}`,
        display: "flex", padding: "8px 0 12px", zIndex: 100,
      }}>
        {menuItems.map(m => {
          const active = tab === m.id;
          return (
            <button key={m.id} onClick={() => setTab(m.id)} style={{
              flex: 1, background: "none", border: "none",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 3, cursor: "pointer", padding: "6px 0",
            }}>
              <span style={{
                fontSize: 20, lineHeight: 1,
                color: active ? COLORS.primary : COLORS.gray400,
                transition: "color 0.2s",
              }}>{m.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: active ? 700 : 500,
                color: active ? COLORS.primary : COLORS.gray400,
                letterSpacing: "0.2px",
              }}>{m.label}</span>
              {active && (
                <span style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: COLORS.primary, position: "absolute",
                  bottom: 4,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
