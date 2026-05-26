import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

export default function ResumeButton() {
  return (
    <motion.a
      href="/assets/Adwait_N_Resume.pdf"
      download="Adwait_Naik_Resume.pdf"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-colors"
      style={{
        backgroundColor: '#2563EB',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      aria-label="Download resume PDF"
    >
      <FileDown size={16} />
      Resume
    </motion.a>
  );
}
