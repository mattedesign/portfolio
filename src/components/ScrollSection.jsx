import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Smooth easing curve for cinematic feel
const smoothEase = [0.25, 0.1, 0.25, 1];

// Reusable section wrapper with scroll-triggered animations
export function ScrollSection({
  children,
  className = '',
  id,
  index = 0,
  showPeek = true
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{ y, opacity }}
      transition={{ ease: smoothEase }}
    >
      {children}
    </motion.section>
  );
}

// Staggered container for animating children
export function StaggerContainer({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual animated item
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: smoothEase }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Fade in on scroll
export function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

// Page number indicator
export function PageIndicator({ current, total, className = '' }) {
  return (
    <div className={`font-mono text-sm tracking-wider ${className}`}>
      <span className="font-bold">{String(current).padStart(2, '0')}</span>
      <span className="text-slate-400">/{String(total).padStart(2, '0')}</span>
    </div>
  );
}
