import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import FadeYScroll from '../animations/FadeYScroll/component';
import RiveScrollAnimation from '../rive-components/rive-scroll';
import { scaleRange } from '../utils';

const EmissionsDistribution = () => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'start start'],
  });

  const animationProgress = useTransform(scrollYProgress, [0, 0.75, 1], [0.02, 0.02, 0.7]);

  const height = useTransform(animationProgress, (v) => {
    if (v < 0.25) {
      const p = scaleRange(v, [0, 0.25], [10, 33.33]);
      return `${p}vh`;
    }
    return `${33.33}vh`;
  });

  return (
    <div
      ref={target}
      className="mt-14 flex min-h-screen flex-col items-center overflow-hidden pt-20 pb-10"
    >
      <div className="flex-0 container flex items-end">
        <div className="sticky bottom-0 h-fit flex-1 ">
          <FadeYScroll threshold={0.333}>
            <SectionTitle>Distribution of emissions.</SectionTitle>
            <SectionSubtitle className="mt-2 mb-6" size="small">
              The top 10% are responsible for nearly 50% of emissions.
            </SectionSubtitle>
            <p className="text-base">
              The wealthiest people are better positioned to deal with the impacts and adaptations
              to the climate crisis. Meanwhile, the people who contribute least to the crisis also
              have the least financial resources to react to its impacts.
            </p>
          </FadeYScroll>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex-1">
        <motion.div
          style={{ height }}
          className="container flex w-screen items-center overflow-hidden "
        >
          <RiveScrollAnimation
            scrollY={animationProgress}
            fileName="chart_share_of_emissions"
            stateMachine="Default"
            stateMachineInput="scrollPos"
            className="diagram-animation h-[50vh] w-full"
            autoplay
          />
        </motion.div>
      </div>

      <motion.div className="flex-0 container mt-auto place-items-end text-xs sm:self-end sm:text-sm">
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
