// import { PropsWithChildren, useEffect, useRef } from 'react';

// import { useInView } from 'framer-motion';
// // import { useMediaQuery } from 'usehooks-ts';

// import { screens } from 'styles/styles.config';
// interface ScrollItemProps extends PropsWithChildren {
//   sectionStep: number;
//   onChange: (sectionStep: number) => void;
// }
// const ScrollItem = ({ children, sectionStep, onChange }: ScrollItemProps) => {
//   const lg = true;

//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, {
//     amount: 0.5,
//     margin: '0% 0% 0% 0%',
//     ...(!lg && {
//       amount: 0,
//       margin: '0% 0% -50% 0%',
//     }),
//   });

//   useEffect(() => {
//     if (inView) {
//       onChange(sectionStep);
//     }
//   }, [sectionStep, inView, onChange]);

//   return (
//     <section ref={ref} id={`scroll-${sectionStep}`} className="lg:h-small-screen lg:min-h-[100vh]">
//       {children}
//     </section>
//   );
// };

// export default ScrollItem;

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
  sectionStep: number;
  onChange: (sectionStep: number) => void;
  sticky?: number;
}

const ScrollItem = ({ children, sectionStep, onChange, sticky }: ScrollItemProps) => {
  const currentStep = useRecoilValue(stepAtom);
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const itemOffset = sticky > 0 ? 'end' : 'end';
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', `${itemOffset} start`],
  });
  const stickyThreshold = 0.4;
  const log = (...p) => (children as any).key === 'text-layers-1' && console.log(...p);

  const opacity = useTransform(scrollYProgress, (v) => {
    // console.log({ v });
    return v;
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // console.log('v', Math.floor(latest * 10) / 10, children);
    if (sticky > 0) {
      // if (latest > stickyThreshold && latest < 1 - stickyThreshold) {
      //   setIsSticky(true);
      // }
      // if (latest < stickyThreshold || (latest > 1 - stickyThreshold && sticky > 0)) {
      //   setIsSticky(true);
      // }
      // console.log(
      //   currentStep,
      //   sectionStep,
      //   sticky,
      //   currentStep >= sectionStep,
      //   currentStep <= sectionStep + (sticky - 1)
      // );
      if (currentStep >= sectionStep && currentStep <= sectionStep + (sticky - 1)) {
        setIsSticky(true);
      }
    }
  });
  // console.log(isSticky);
  useEffect(() => {
    if (inView) {
      // console.log('---', { currentStep, sectionStep });
      onChange(sectionStep);
    }
  }, [currentStep, sectionStep, inView, onChange]);
  const stickyClasses = isSticky ? `fixed top-0` : 'relative';

  return (
    <motion.section
      ref={ref}
      style={{
        opacity: 1,
      }}
      className={cx('', {
        'fixed top-0':
          sticky > 0 && currentStep >= sectionStep && currentStep <= sectionStep + (sticky - 1),
        // [`h-[${sticky * 100}vh] bg-300 bg-opacity-10`]: sticky > 0,
        'h-screen': !sticky,
      })}
    >
      {sticky ? (sticky > 0 ? children : null) : children}
      {/* {sticky > 0 && <motion.div className="relative -mt-[99vh] h-screen" />} */}
    </motion.section>
  );
};

export default ScrollItem;
