import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, FileDown } from 'lucide-react';
import { profile } from '../data/profile';

export default function ResumeButton() {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const [{ pdf }, { ResumePDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../resume/ResumePDF'),
      ]);
      const blob = await pdf(<ResumePDF data={profile} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Adwait_Naik_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      console.error('Resume generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleGenerate}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-colors"
      style={{
        backgroundColor: loading ? '#93C5FD' : '#2563EB',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
      aria-label="Generate and download resume PDF"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <FileDown size={16} />
          Generate Resume
        </>
      )}
    </motion.button>
  );
}
