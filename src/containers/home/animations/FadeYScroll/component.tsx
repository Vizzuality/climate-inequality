import { PropsWithChildren, useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const clamp = (v, threshold) => {
  if (v < threshold) {
    const p = (threshold - v) * (1 / threshold);

    // clamp value between 0 and 1
    return 1 - Math.min(Math.max(p, 0), 1) * 1.25;
  }

  if (v > 1 - threshold) {
    const p = (threshold - (1 - v)) * (1 / threshold);
    return 1 - Math.min(Math.max(p, 0), 1) * 1.25;
  }

  return 1;
};

type FadeYScrollProps = PropsWithChildren & {
  className?: string;
  threshold?: number;
};

const FadeYScroll = ({ children, className, threshold = 0.3 }: FadeYScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });

  const opacity = useTransform(scrollYProgress, (v) => clamp(v, threshold));

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeYScroll;
