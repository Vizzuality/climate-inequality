import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import { stepAtom } from 'store/home';

import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRecoilValue } from 'recoil';

const threshold = 0.2;
const clamp = (v) => {
  if (v < threshold) {
    const p = (threshold - v) * (1 / threshold) * 2;

    // clamp value between 0 and 1
    return 1 - Math.min(Math.max(p, 0), 1);
  }

  if (v > 1 - threshold) {
    const p = (threshold - (1 - v)) * (1 / threshold) * 2;
    return 1 - Math.min(Math.max(p, 0), 1);
  }

  return 1;
};

interface ScrollItemProps extends PropsWithChildren {
  step: number;
  onChange: (step: number) => void;
  sticky?: number;
}

const ScrollItem = ({ children, step, onChange, sticky }: ScrollItemProps) => {
  const s = useRecoilValue(stepAtom);
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const itemOffset = sticky > 0 ? 'end' : 'end';
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', `${itemOffset} start`],
  });
  const stickyThreshold = 0.4;
  const log = (...p) => children.key === 'text-layers-1' && console.log(...p);

  const opacity = useTransform(scrollYProgress, (v) => v);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    log('v', Math.floor(latest * 10) / 10, children);
    if (sticky > 0) {
      if (latest > stickyThreshold && latest < 1 - stickyThreshold) {
        setIsSticky(latest > stickyThreshold && latest < 1 - stickyThreshold);
      }
      // if (latest < stickyThreshold || (latest > 1 - stickyThreshold && sticky > 0)) {
      //   setIsSticky(true);
      // }
    }
  });
  useEffect(() => {
    if (inView && s !== step) {
      log('---', s, step);
      onChange(step);
    }
  }, [s, step, inView, onChange]);
  const stickyClasses = isSticky ? `fixed top-0` : 'relative';

  return (
    <motion.section
      ref={ref}
      className={'h-small-screen'}
      style={{
        opacity,
      }}
    >
      {sticky ? (
        <div className={cx('h-screen bg-700 bg-opacity-50', { [stickyClasses]: sticky > 0 })}>
          {children}
        </div>
      ) : (
        children
      )}
      {sticky > 0 && <motion.div className="relative -mt-[99vh] h-screen" />}
    </motion.section>
  );
};

export default ScrollItem;
