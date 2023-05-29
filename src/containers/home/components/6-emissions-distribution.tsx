import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import RiveScrollAnimation from '../rive-components/rive-scroll';
import { scaleRange, useScrollY } from '../utils';

const EmissionsDistribution = () => {
  const target = useRef(null);

  const { scrollY: y, scrollYProgress } = useScroll({
    target,
    offset: ['start 0.25', 'start start'],
  });

  const animationScrollProgress = useTransform(scrollYProgress, (v) => {
    // console.log(v);
    if (v < 0.1) return 0.1;
    return v;
  });

  const textY = useTransform(scrollYProgress, (v) => {
    // if (v >= 0.4) {
    const variation = scaleRange(v, [0, 0.5], [0, -25]);
    //   return `${variation}vh`;
    // }
    const p = Math.min(Math.max(v, 0), 1);
    return `${(1 - p) * 100}%`;
  });

  return (
    <div
      ref={target}
      className="mt-14 flex min-h-screen flex-col items-center overflow-hidden pt-20 pb-10 sm:mt-[45vh]"
    >
      <motion.div
        className="container pb-8"
        style={
          {
            // opacity,
            // y: textY,
          }
        }
      >
        <div className=" max-w-lg">
          <SectionTitle>Distribution of emissions.</SectionTitle>
          <SectionSubtitle className="mt-2 mb-6" size="small">
            The top 10% are responsible for nearly 50% of emissions.
          </SectionSubtitle>
          <p className="text-base">
            The wealthiest people are better positioned to deal with the impacts and adaptations to
            the climate crisis. Meanwhile, the people who contribute least to the crisis also have
            the least financial resources to react to its impacts.
          </p>
        </div>
      </motion.div>
      <motion.div className="w-full">
        <RiveScrollAnimation
          scrollY={animationScrollProgress}
          fileName="chart_share_of_emissions"
          stateMachine="Default"
          stateMachineInput="scrollPos"
          className="diagram-animation h-[50vh] w-screen"
          autoplay
        />
      </motion.div>

      <motion.div className="container mt-auto place-items-end text-xs sm:self-end sm:text-sm">
        <p className="sm:text-end">
          Source:{' '}
          <a
            className="underline"
            href="https://wid.world/data/"
            target="_blank"
            rel="noopener noreferrer"
          >
            World Inequality Database
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default EmissionsDistribution;
