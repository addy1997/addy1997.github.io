import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { profile } from '../data/profile';
import type { SkillLevel, TechClass } from '../data/profile';

/* ── Level config ───────────────────────────────────────── */
const LEVEL: Record<SkillLevel, { pct: number; color: string; label: string }> = {
  Beginner:     { pct: 33,  color: '#93C5FD', label: 'Beginner' },
  Intermediate: { pct: 66,  color: '#2563EB', label: 'Intermediate' },
  Advanced:     { pct: 85,  color: '#F59E0B', label: 'Advanced' },
  Expert:       { pct: 100, color: '#10B981', label: 'Expert' },
};

/* ── TechClass config ───────────────────────────────────── */
const TC: Record<TechClass, { color: string; bg: string; border: string; label: string }> = {
  Core:       { color: '#3B82F6', bg: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.30)', label: 'Core' },
  Supporting: { color: '#10B981', bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.30)', label: 'Supporting' },
  Emerging:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.30)', label: 'Emerging' },
};

/* ── Devicon lookup ─────────────────────────────────────── */
const DEVICON: Record<string, string | null> = {
  'C++ 11/14/17/20': 'devicon-cplusplus-plain colored',
  'Python':           'devicon-python-plain colored',
  'C#':               'devicon-csharp-plain colored',
  'JavaScript':       'devicon-javascript-plain colored',
  'TypeScript':       'devicon-typescript-original colored',
  'React':            'devicon-react-original colored',
  'Node.js':          'devicon-nodejs-plain colored',
  'Microsoft Azure':  'devicon-azure-plain colored',
  'Docker':           'devicon-docker-plain colored',
  'AWS':              'devicon-amazonwebservices-plain colored',
  'GitHub CI/CD':     'devicon-github-original',              // no colored — octocat is black; use currentColor
  'PyTorch':          'devicon-pytorch-original colored',
  'NumPy':            'devicon-numpy-plain colored',
  'SciPy':            null,
  'TensorFlow':       'devicon-tensorflow-original colored',
  'Keras':            'devicon-keras-plain colored',
  'OpenCV':           'devicon-opencv-plain colored',
  'ROS / ROS2':       null,
  'Gazebo':           null,
  'LangChain':        null,
  'LangGraph':        null,
  'Matplotlib':       'devicon-matplotlib-plain colored',
  'Plotly':           'devicon-plotly-plain colored',
  'LaTeX':            'devicon-latex-original',              // no colored — logo is dark; use currentColor
};

/* Icons that need an explicit color override (monochrome brand icons) */
const DEVICON_STYLE: Record<string, React.CSSProperties> = {
  'GitHub CI/CD': { color: 'var(--c-text)' },
  'LaTeX':        { color: 'var(--c-text)' },
};

const FALLBACK: Record<string, string> = {
  /* Tech — no devicon */
  'SciPy': 'Sp', 'ROS / ROS2': 'ROS', 'Gazebo': 'Gz', 'LangChain': 'LC', 'LangGraph': 'LG',
  /* System Design */
  'Scalable Software Architecture': 'Arch', 'Design Patterns': 'DP',
  'Safety-Critical System Design': 'SSD',  'Event-Driven Architecture': 'EDA',
  'API Design & Integration': 'API',        'Exception Handling & Recovery': 'EHR',
  /* Communication */
  'Technical Documentation': 'Doc', 'Presentations & Demos': 'Prs',
  'Scientific Academic Writing': 'SAW',    'Collaborative Problem Solving': 'CPS',
  /* Project Management */
  'Agile & Scrum': 'Scrum', 'Kanban Boards': 'Kan', 'Task Prioritization': 'Pri',
  'Cross-Functional Collaboration': 'XFC', 'Project Documentation': 'PDc',
  'Risk Assessment & Issue Tracking': 'Risk',
};

/* ── Ecosystem geometry ─────────────────────────────────── */
const ECO = { size: 620, r: { Core: 112, Supporting: 202, Emerging: 272 }, nodeR: 26 } as const;
const ECO_CX = ECO.size / 2;
const ECO_CY = ECO.size / 2;

type FlatSkill = {
  name: string; level: SkillLevel; techClass: TechClass;
  categoryId: string; categoryLabel: string; x: number; y: number;
};

function placeOnRing(
  items: Omit<FlatSkill, 'x' | 'y'>[],
  radius: number,
): FlatSkill[] {
  return items.map((item, i) => {
    const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
    return { ...item, x: ECO_CX + radius * Math.cos(angle), y: ECO_CY + radius * Math.sin(angle) };
  });
}

/* ── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};
const cardAnim = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number], delay: i * 0.07 },
  }),
};

/* ════════════════════════════════════════════════════════
   TRADITIONAL VIEW
   ════════════════════════════════════════════════════════ */
function SkillBar({ name, level, index }: { name: string; level: SkillLevel; index: number }) {
  const cfg = LEVEL[level];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--c-text)', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: cfg.color, fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' }}>{cfg.label}</span>
      </div>
      <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: 'var(--c-subtle)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${cfg.pct}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 + index * 0.08 }}
          style={{ height: '100%', borderRadius: '9999px', background: `linear-gradient(90deg, ${cfg.color}cc, ${cfg.color})`, boxShadow: `0 0 6px ${cfg.color}66` }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, skills, index }: { category: string; skills: { name: string; level: SkillLevel }[]; index: number }) {
  return (
    <motion.div
      custom={index} variants={cardAnim} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(37,99,235,0.10)' }}
      transition={{ duration: 0.2 }}
      style={{ borderRadius: '0.875rem', border: '1px solid var(--c-subtle)', backgroundColor: 'var(--c-surface)', padding: '1.5rem', transition: 'background-color 0.25s ease, border-color 0.25s ease' }}
    >
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.01em', marginBottom: '1.1rem' }}>{category}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {skills.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} index={i} />)}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   INTERACTIVE — GRID VIEW
   ════════════════════════════════════════════════════════ */
function IconCard({ name, level, techClass, index }: { name: string; level: SkillLevel; techClass: TechClass; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tc = TC[techClass], lc = LEVEL[level], icon = DEVICON[name];
  return (
    <motion.div
      custom={index} variants={cardAnim} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: `0 12px 28px ${tc.color}22` }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '0.55rem', borderRadius: '0.875rem',
        border: `1px solid ${hovered ? tc.border : 'var(--c-subtle)'}`,
        backgroundColor: hovered ? tc.bg : 'var(--c-surface)',
        padding: '1.25rem 0.75rem 1rem', cursor: 'default',
        transition: 'background-color 0.2s ease, border-color 0.2s ease', minHeight: '110px',
      }}
    >
      <span style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: tc.color, boxShadow: `0 0 4px ${tc.color}99` }} />
      {icon ? (
        <i className={icon} style={{ fontSize: '2rem', lineHeight: 1, ...DEVICON_STYLE[name] }} />
      ) : (
        <span style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: `${tc.color}22`, color: tc.color, fontSize: '0.65rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
          {FALLBACK[name] ?? name.slice(0, 3)}
        </span>
      )}
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 500, color: 'var(--c-text)', textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'absolute', inset: 0, borderRadius: '0.875rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', backgroundColor: `${tc.color}ee` }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{lc.label}</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', fontFamily: "'Inter', sans-serif" }}>{techClass}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   INTERACTIVE — ECOSYSTEM VIEW
   ════════════════════════════════════════════════════════ */
function EcosystemNode({ name, level, techClass, x, y, dimmed }: FlatSkill & { dimmed: boolean }) {
  const [hovered, setHovered] = useState(false);
  const tc = TC[techClass], lc = LEVEL[level], icon = DEVICON[name];
  const flipTooltip = (y / ECO.size) > 0.72;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${(x / ECO.size) * 100}%`,
        top: `${(y / ECO.size) * 100}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 20 : 1,
        opacity: dimmed ? 0.2 : 1,
        transition: 'opacity 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={hovered ? { scale: 1.3 } : { scale: 1 }}
        transition={{ duration: 0.18 }}
        style={{
          width: ECO.nodeR * 2, height: ECO.nodeR * 2, borderRadius: '50%',
          backgroundColor: hovered ? tc.bg : 'var(--c-surface)',
          border: `1.5px solid ${tc.color}77`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: hovered ? `0 0 16px ${tc.color}66, 0 0 4px ${tc.color}33` : '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'background-color 0.18s ease, box-shadow 0.18s ease',
        }}
      >
        {icon ? (
          <i className={icon} style={{ fontSize: '1.3rem', lineHeight: 1, ...DEVICON_STYLE[name] }} />
        ) : (
          <span style={{ fontSize: '0.56rem', fontWeight: 700, color: tc.color, fontFamily: "'Inter', sans-serif", letterSpacing: '0.01em' }}>
            {FALLBACK[name] ?? name.slice(0, 3)}
          </span>
        )}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: flipTooltip ? 6 : -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              [flipTooltip ? 'bottom' : 'top']: '115%',
              left: '50%', transform: 'translateX(-50%)',
              backgroundColor: 'var(--c-surface)',
              border: `1px solid ${tc.color}44`,
              borderRadius: '0.5rem',
              padding: '0.5rem 0.8rem',
              whiteSpace: 'nowrap',
              boxShadow: `0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px ${tc.color}22`,
              zIndex: 50, pointerEvents: 'none',
            }}
          >
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'var(--c-text)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
              {name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: lc.color }}>
                {lc.label}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'var(--c-muted)' }}>
                {lc.pct}%
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 500,
                color: tc.color, backgroundColor: tc.bg,
                padding: '0.1rem 0.45rem', borderRadius: '9999px', border: `1px solid ${tc.border}`,
              }}>
                {techClass}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EcosystemView({ nodes, dimmedSet }: { nodes: FlatSkill[]; dimmedSet: Set<string> }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}
      style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', aspectRatio: '1 / 1' }}
    >
      {/* SVG layer */}
      <svg
        viewBox={`0 0 ${ECO.size} ${ECO.size}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {/* Concentric dashed rings */}
        {(Object.entries(ECO.r) as [TechClass, number][]).map(([cls, r]) => (
          <circle key={cls} cx={ECO_CX} cy={ECO_CY} r={r}
            fill="none" stroke={TC[cls].color} strokeWidth="1"
            strokeDasharray="5 8" opacity="0.22"
          />
        ))}

        {/* Spiderweb radial lines */}
        {nodes.map((n) => (
          <line key={`l-${n.name}`}
            x1={ECO_CX} y1={ECO_CY} x2={n.x} y2={n.y}
            stroke={TC[n.techClass].color} strokeWidth="0.75"
            opacity={dimmedSet.has(n.name) ? '0.04' : '0.18'}
            style={{ transition: 'opacity 0.25s ease' }}
          />
        ))}

        {/* Proficiency arcs around each node */}
        {nodes.map((n) => {
          const lc = LEVEL[n.level];
          return (
            <circle key={`arc-${n.name}`}
              cx={n.x} cy={n.y} r={ECO.nodeR + 2}
              fill="none" stroke={lc.color} strokeWidth="2.5"
              pathLength="100"
              strokeDasharray={`${lc.pct} ${100 - lc.pct}`}
              strokeDashoffset="25"
              strokeLinecap="round"
              opacity={dimmedSet.has(n.name) ? '0.04' : '0.75'}
              style={{ transition: 'opacity 0.25s ease' }}
            />
          );
        })}

        {/* Center indicator */}
        <circle cx={ECO_CX} cy={ECO_CY} r="12" fill="var(--c-accent)" opacity="0.12" />
        <circle cx={ECO_CX} cy={ECO_CY} r="5"  fill="var(--c-accent)" opacity="0.9" />
      </svg>

      {/* HTML icon nodes */}
      {nodes.map((n) => (
        <EcosystemNode key={n.name} {...n} dimmed={dimmedSet.has(n.name)} />
      ))}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN SECTION
   ════════════════════════════════════════════════════════ */
export default function Skills() {
  const [mode, setMode]         = useState<'traditional' | 'interactive'>('traditional');
  const [subMode, setSubMode]   = useState<'ecosystem' | 'grid'>('ecosystem');
  const [query, setQuery]       = useState('');
  const [catFilter, setCatFilter]       = useState('all');
  const [classFilter, setClassFilter]   = useState<TechClass | 'all'>('all');
  const [levelFilter, setLevelFilter]   = useState<SkillLevel | 'all'>('all');

  const allSkills = useMemo(() =>
    profile.skillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({ ...s, categoryId: cat.id, categoryLabel: cat.category }))
    ), []
  );

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSkills.filter((s) => {
      if (q && !s.name.toLowerCase().includes(q)) return false;
      if (catFilter !== 'all' && s.categoryId !== catFilter) return false;
      if (classFilter !== 'all' && s.techClass !== classFilter) return false;
      if (levelFilter !== 'all' && s.level !== levelFilter) return false;
      return true;
    });
  }, [allSkills, query, catFilter, classFilter, levelFilter]);

  const filteredNames = useMemo(() => new Set(filteredSkills.map((s) => s.name)), [filteredSkills]);

  /* Ecosystem shows tech stack only — soft-skill categories would overcrowd the rings */
  const TECH_CATEGORY_IDS = new Set(['languages', 'web', 'devops', 'ml', 'robotics', 'agentic']);

  const ecoNodes = useMemo(() => {
    const techSkills = allSkills.filter((s) => TECH_CATEGORY_IDS.has(s.categoryId));
    const byClass = (cls: TechClass) => techSkills.filter((s) => s.techClass === cls);
    return [
      ...placeOnRing(byClass('Core'), ECO.r.Core),
      ...placeOnRing(byClass('Supporting'), ECO.r.Supporting),
      ...placeOnRing(byClass('Emerging'), ECO.r.Emerging),
    ];
  }, [allSkills]);

  /* Which nodes to dim = those NOT in filteredNames (only meaningful when filter is active) */
  const hasFilter = query.trim() !== '' || catFilter !== 'all' || classFilter !== 'all' || levelFilter !== 'all';
  const dimmedSet = useMemo(
    () => hasFilter ? new Set(allSkills.filter((s) => !filteredNames.has(s.name)).map((s) => s.name)) : new Set<string>(),
    [hasFilter, allSkills, filteredNames]
  );

  return (
    <section
      id="skills" className="py-24"
      style={{ backgroundColor: 'var(--c-surface)', borderTop: '1px solid var(--c-subtle)', transition: 'background-color 0.25s ease' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Heading + main toggle ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}
        >
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: '0.5rem' }}>
              What I work with
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Skills
            </h2>
            <div style={{ width: '2.5rem', height: '2px', backgroundColor: 'var(--c-subtle)', marginTop: '1rem' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.375rem', padding: '0.25rem', borderRadius: '0.625rem', backgroundColor: 'var(--c-bg)', border: '1px solid var(--c-subtle)' }}>
            {(['traditional', 'interactive'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: '0.4rem 0.9rem', borderRadius: '0.4rem', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500,
                textTransform: 'capitalize', transition: 'all 0.18s ease',
                backgroundColor: mode === m ? 'var(--c-surface)' : 'transparent',
                color: mode === m ? 'var(--c-accent)' : 'var(--c-muted)',
                boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}>{m}</button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ══ TRADITIONAL ══ */}
          {mode === 'traditional' && (
            <motion.div key="traditional" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
              {/* Clickable level-filter pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => setLevelFilter('all')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.3rem 0.85rem', borderRadius: '9999px', border: '1px solid var(--c-subtle)',
                    backgroundColor: levelFilter === 'all' ? 'var(--c-accent)' : 'transparent',
                    color: levelFilter === 'all' ? '#fff' : 'var(--c-muted)',
                    fontSize: '0.75rem', fontFamily: "'Inter', sans-serif", fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.18s ease',
                  }}
                >All</button>
                {(Object.entries(LEVEL) as [SkillLevel, typeof LEVEL[SkillLevel]][]).map(([lvl, cfg]) => {
                  const active = levelFilter === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(active ? 'all' : lvl)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.3rem 0.85rem', borderRadius: '9999px',
                        border: `1px solid ${active ? cfg.color : 'var(--c-subtle)'}`,
                        backgroundColor: active ? `${cfg.color}18` : 'transparent',
                        color: active ? cfg.color : 'var(--c-muted)',
                        fontSize: '0.75rem', fontFamily: "'Inter', sans-serif", fontWeight: active ? 600 : 400,
                        cursor: 'pointer', transition: 'all 0.18s ease',
                        boxShadow: active ? `0 0 0 1px ${cfg.color}44` : 'none',
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cfg.color, display: 'inline-block', boxShadow: active ? `0 0 5px ${cfg.color}` : 'none' }} />
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="skills-grid">
                {profile.skillCategories
                  .map((cat) => ({ ...cat, skills: cat.skills.filter((s) => levelFilter === 'all' || s.level === levelFilter) }))
                  .filter((cat) => cat.skills.length > 0)
                  .map((cat, i) => (
                    <SkillCard key={cat.id} category={cat.category} skills={cat.skills} index={i} />
                  ))}
              </div>
              {profile.skillCategories.every((cat) => cat.skills.every((s) => levelFilter !== 'all' && s.level !== levelFilter)) && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--c-muted)', textAlign: 'center', padding: '3rem 0' }}>
                  No skills match this proficiency level.
                </p>
              )}
            </motion.div>
          )}

          {/* ══ INTERACTIVE ══ */}
          {mode === 'interactive' && (
            <motion.div key="interactive" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

              {/* Sub-toggle: Ecosystem | Grid */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '0.375rem', padding: '0.2rem', borderRadius: '0.5rem', backgroundColor: 'var(--c-bg)', border: '1px solid var(--c-subtle)' }}>
                  {(['ecosystem', 'grid'] as const).map((sm) => (
                    <button key={sm} onClick={() => setSubMode(sm)} style={{
                      padding: '0.35rem 0.85rem', borderRadius: '0.35rem', border: 'none', cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", fontSize: '0.76rem', fontWeight: 500,
                      textTransform: 'capitalize', transition: 'all 0.18s ease',
                      backgroundColor: subMode === sm ? 'var(--c-surface)' : 'transparent',
                      color: subMode === sm ? 'var(--c-accent)' : 'var(--c-muted)',
                      boxShadow: subMode === sm ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    }}>{sm === 'ecosystem' ? 'Ecosystem View' : 'Grid View'}</button>
                  ))}
                </div>

                {/* TechClass legend */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                  {(Object.entries(TC) as [TechClass, typeof TC[TechClass]][]).map(([cls, cfg]) => (
                    <span key={cls} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', fontFamily: "'Inter', sans-serif", color: 'var(--c-muted)' }}>
                      <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: cfg.color, boxShadow: `0 0 4px ${cfg.color}99` }} />
                      {cfg.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: subMode === 'ecosystem' ? '1.5rem' : '2rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: '1 1 180px', maxWidth: '260px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-muted)', pointerEvents: 'none' }} />
                  <input
                    type="text" placeholder="Search skills…" value={query} onChange={(e) => setQuery(e.target.value)}
                    style={{ width: '100%', paddingLeft: '2.1rem', paddingRight: '0.75rem', paddingTop: '0.45rem', paddingBottom: '0.45rem', borderRadius: '0.5rem', border: '1px solid var(--c-subtle)', backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--c-accent)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--c-subtle)')}
                  />
                </div>
                <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} style={{ flex: '0 0 auto', padding: '0.45rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--c-subtle)', backgroundColor: 'var(--c-bg)', color: 'var(--c-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
                  <option value="all">All Categories</option>
                  {profile.skillCategories.map((c) => <option key={c.id} value={c.id}>{c.category}</option>)}
                </select>
                <select value={classFilter} onChange={(e) => setClassFilter(e.target.value as TechClass | 'all')} style={{ flex: '0 0 auto', padding: '0.45rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--c-subtle)', backgroundColor: 'var(--c-bg)', color: 'var(--c-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
                  <option value="all">All Classes</option>
                  <option value="Core">Core</option>
                  <option value="Supporting">Supporting</option>
                  <option value="Emerging">Emerging</option>
                </select>
                <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value as SkillLevel | 'all')} style={{ flex: '0 0 auto', padding: '0.45rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--c-subtle)', backgroundColor: 'var(--c-bg)', color: 'var(--c-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <AnimatePresence mode="wait">
                {subMode === 'ecosystem' ? (
                  <motion.div key="eco" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <EcosystemView nodes={ecoNodes} dimmedSet={dimmedSet} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'var(--c-muted)' }}>
                      Technology stack only — switch to <button onClick={() => setSubMode('grid')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--c-accent)', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}>Grid View</button> to see all skills
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    {filteredSkills.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.875rem' }} className="icon-grid">
                        {filteredSkills.map((s, i) => (
                          <IconCard key={s.name} name={s.name} level={s.level} techClass={s.techClass} index={i} />
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--c-muted)', textAlign: 'center', padding: '3rem 0' }}>
                        No skills match your filters.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .icon-grid   { grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
}
