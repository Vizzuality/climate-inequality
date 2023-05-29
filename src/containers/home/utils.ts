import { RefObject, useState } from 'react';

import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

type ScrollYProps = {
  target: RefObject<HTMLElement>;
  container?: RefObject<HTMLElement>;
  offset?: any;
};

export const useScrollY = ({ target, container, offset }: ScrollYProps) => {
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress, scrollY: y } = useScroll({
    container,
    target,
    offset,
    // smooth: 100,
  });

  // const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
  // const springY = useSpring(scrollYProgress, physics)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const progress = latest * 100;
    setScrollY(progress);
  });

  return { scrollY, scrollYProgress, y };
};

export const scaleRange = (
  unscaledNum: number,
  domain: [number, number],
  range: [number, number]
) => {
  const [min, max] = domain;
  const [minAllowed, maxAllowed] = range;
  return ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed;
};
