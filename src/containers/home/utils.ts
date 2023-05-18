import { RefObject, useState } from 'react';

import { useScroll, useMotionValueEvent } from 'framer-motion';

type ScrollYProps = {
  target: RefObject<HTMLElement>;
  container?: RefObject<HTMLElement>;
  offset?: any;
};

export const useScrollY = ({ target, container, offset }: ScrollYProps) => {
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll({
    container,
    target,
    offset,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const progress = latest * 100;
    setScrollY(progress);
  });

  return { scrollY, scrollYProgress };
};
