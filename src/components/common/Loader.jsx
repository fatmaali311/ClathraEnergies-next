import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <motion.div
        className="w-16 h-16 border-4 border-[var(--primary-green)] border-t-transparent rounded-full animate-spin md:w-20 md:h-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        role="progressbar"
        aria-label="Loading..."
      />
    </div>
  )
}