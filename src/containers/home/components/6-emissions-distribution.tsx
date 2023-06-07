import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import DistributionIcon from 'svgs/ui/distribution-mobile.svg';

import FadeYScroll from '../animations/fade-y-scroll/component';
import RiveScrollAnimation from '../rive-components/rive-scroll';

const Text = () => (
  <div className="sm:w-1/2">
    <SectionTitle>Distribution of emissions.</SectionTitle>
    <SectionSubtitle className="mt-2 mb-6">
      The top 10% are responsible for nearly 50% of emissions.
    </SectionSubtitle>
    <p className="text-base">
      The wealthiest people are better positioned to deal with the impacts and adaptations to the
      climate crisis. Meanwhile, the people who contribute least to the crisis also have the least
      financial resources to react to its impacts.
    </p>
  </div>
);

const Source = () => (
  <>
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
  </>
);

const EmissionsDistribution = () => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });

  const animationProgress = useTransform(scrollYProgress, [0, 0.33, 0.55], [0, 0, 0.7]);

  const height = useTransform(animationProgress, [0, 0.25], [`${12}vh`, `${35}vh`]);

  const y = useTransform(scrollYProgress, [0, 0.33], ['-50vh', '0vh']);
  const opacity = useTransform(scrollYProgress, [0.2, 0.33], [0, 1]);

  return (
    <div ref={target} className="flex w-full flex-col items-center justify-center sm:h-[150vh]">
      {/* DESKTOP */}
      <div className="absolute hidden h-[150vh] w-full sm:block">
        <div className="sticky top-0 min-h-screen w-full">
          <div className="container flex min-h-screen flex-col items-center justify-between pb-10 sm:pt-20 lg:pt-36">
            <motion.div className="" style={{ y, opacity }}>
              <Text />
            </motion.div>
            <motion.div
              style={{ height }}
              className="flex w-full flex-1 items-center justify-center"
            >
              <RiveScrollAnimation
                scrollY={animationProgress}
                fileName="chart_share_of_emissions"
                stateMachine="Default"
                stateMachineInput="scrollPos"
                className="h-[33.75vw] w-screen"
                autoplay
              />
            </motion.div>
            <div className="flex-0 mt-auto place-items-end self-end text-sm">
              <Source />
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <FadeYScroll className="w-full">
        <div className="container flex min-h-screen flex-col justify-between pt-14 pb-6 sm:hidden">
          <div>
            <Text />
          </div>
          <div className="mt-5 mb-7">
            <Icon icon={DistributionIcon} className="w-full" />
          </div>
          <div className="text-xs">
            <Source />
          </div>
        </div>
      </FadeYScroll>
    </div>
  );
};

export default EmissionsDistribution;
