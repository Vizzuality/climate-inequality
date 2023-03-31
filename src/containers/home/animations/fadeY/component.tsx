import { PropsWithChildren } from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import { useScrollDirection } from 'hooks/home';

import { STEP_DURATION } from 'containers/home/animations/constants';

interface FadeYProps extends PropsWithChildren {
  className?: string;
}

const FadeY = ({ className, children }: FadeYProps) => {
  const { direction } = useScrollDirection();

  const variants = {
    initial: (d: number) => ({
      opacity: 0,
      y: d * 100,
      scale: 0.9,
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: STEP_DURATION,
        delay: STEP_DURATION / 4,
        ease: 'easeOut',
        opacity: {
          ease: 'linear',
        },
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      y: -d * 100,
      scale: 0.9,
      transition: {
        duration: STEP_DURATION,
        delay: 0,
        ease: 'anticipate',
        opacity: {
          ease: 'linear',
        },
      },
    }),
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
      className={cx({
        'absolute top-0 left-0 z-0 h-full w-full pt-20': true,
        [className]: className,
      })}
    >
      {children}
    </motion.div>
  );
};

export default FadeY;
