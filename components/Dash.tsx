import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'dash';
  text: string;
  id: number;
}

async function askDash(messages: Message[], userMessage: string): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, userMessage }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.reply ?? "Sorry, I couldn't get a response.";
}

/* ── Typing indicator ──────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--c-accent)', display: 'block' }}
        />
      ))}
    </div>
  );
}

/* ── Avatar ────────────────────────────────────────────────── */
function DashAvatar({ size = 26 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      backgroundColor: 'var(--c-accent)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>D</div>
  );
}

/* ── Message bubble ────────────────────────────────────────── */
function Bubble({ msg }: { msg: Message }) {
  const isDash = msg.role === 'dash';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ display: 'flex', justifyContent: isDash ? 'flex-start' : 'flex-end', marginBottom: '0.6rem' }}
    >
      {isDash && <div style={{ marginRight: '0.5rem', alignSelf: 'flex-end', marginBottom: 2 }}><DashAvatar /></div>}
      <div style={{
        maxWidth: '80%',
        padding: '0.55rem 0.85rem',
        borderRadius: isDash ? '0.75rem 0.75rem 0.75rem 0.15rem' : '0.75rem 0.75rem 0.15rem 0.75rem',
        backgroundColor: isDash ? 'var(--c-surface)' : 'var(--c-accent)',
        border: isDash ? '1px solid var(--c-subtle)' : 'none',
        color: isDash ? 'var(--c-text)' : '#fff',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.825rem',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
      }}>
        {msg.text}
      </div>
    </motion.div>
  );
}

/* ── Suggested prompts ─────────────────────────────────────── */
const SUGGESTED = [
  "What does Adwait specialise in?",
  "Tell me about his projects",
  "How can I contact him?",
];

const WELCOME: Message = {
  role: 'dash',
  text: `Hi there! 👋 I'm Dash, Adwait's AI assistant.\n\nFeel free to ask me anything about his experience, skills, or projects!`,
  id: 0,
};

/* ── Main ──────────────────────────────────────────────────── */
export default function Dash() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');
    const userMsg: Message = { role: 'user', text: trimmed, id: nextId.current++ };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const reply = await askDash([...messages, userMsg], trimmed);
      setMessages((prev) => [...prev, { role: 'dash', text: reply, id: nextId.current++ }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'dash', text: "Sorry, something went wrong. Try again!", id: nextId.current++ }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Close Dash' : 'Chat with Dash'}
        style={{
          position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 400,
          width: 52, height: 52, borderRadius: '50%',
          backgroundColor: 'var(--c-accent)', color: '#fff',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(37,99,235,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.15rem', fontWeight: 700,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: 'flex' }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="d" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              D
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBadge && !open && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              style={{ position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid var(--c-bg)' }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed', bottom: '5.75rem', right: '1.75rem', zIndex: 399,
              width: 'min(360px, calc(100vw - 2rem))',
              height: 'min(500px, calc(100vh - 8rem))',
              display: 'flex', flexDirection: 'column',
              borderRadius: '1.25rem',
              backgroundColor: 'var(--c-bg)',
              border: '1px solid var(--c-subtle)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(37,99,235,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.9rem 1.1rem',
              borderBottom: '1px solid var(--c-subtle)',
              backgroundColor: 'var(--c-surface)', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <DashAvatar size={32} />
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>Dash</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'var(--c-muted)' }}>Adwait's AI assistant</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-muted)', display: 'flex', padding: 4, borderRadius: '0.4rem' }}>
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              {messages.map((m) => <Bubble key={m.id} msg={m} />)}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <DashAvatar />
                  <div style={{ padding: '0.55rem 0.85rem', borderRadius: '0.75rem 0.75rem 0.75rem 0.15rem', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-subtle)' }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && !loading && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
                  {SUGGESTED.map((s) => (
                    <button key={s} onClick={() => send(s)}
                      style={{
                        textAlign: 'left', background: 'none', border: '1px solid var(--c-subtle)',
                        borderRadius: '0.6rem', padding: '0.45rem 0.75rem', cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif", fontSize: '0.775rem', color: 'var(--c-accent)',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(37,99,235,0.06)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                    >{s}</button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '0.75rem 1rem', borderTop: '1px solid var(--c-subtle)',
              backgroundColor: 'var(--c-surface)', display: 'flex', gap: '0.5rem',
              alignItems: 'center', flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask me anything…"
                disabled={loading}
                style={{
                  flex: 1, border: '1px solid var(--c-subtle)', borderRadius: '0.6rem',
                  padding: '0.5rem 0.75rem', backgroundColor: 'var(--c-bg)', color: 'var(--c-text)',
                  fontFamily: "'Inter', sans-serif", fontSize: '0.825rem', outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--c-accent)')}
                onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--c-subtle)')}
              />
              <motion.button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  width: 34, height: 34, borderRadius: '0.5rem', border: 'none', flexShrink: 0,
                  backgroundColor: input.trim() && !loading ? 'var(--c-accent)' : 'var(--c-subtle)',
                  color: input.trim() && !loading ? '#fff' : 'var(--c-muted)',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.15s ease',
                }}
              ><Send size={15} /></motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
