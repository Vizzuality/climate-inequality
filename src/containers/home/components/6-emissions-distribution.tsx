import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import DistributionIcon from 'svgs/ui/distribution-mobile.svg';

import RiveScrollAnimation from '../rive-components/rive-scroll';

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
  const distributionMobileOpacity = useTransform(scrollYProgress, [0.33, 0.5], [0, 1]);

  return (
    <div ref={target} className="flex h-[150vh] w-full flex-col items-center justify-center ">
      <div className="absolute h-[150vh]">
        <div className="sticky top-0 h-screen">
          <div className="flex h-full flex-col pt-20 pb-10 lg:pt-36">
            <motion.div className="container" style={{ y, opacity }}>
              <div className="sm:w-1/2">
                <SectionTitle>Distribution of emissions.</SectionTitle>
                <SectionSubtitle className="mt-2 mb-6" size="small">
                  The top 10% are responsible for nearly 50% of emissions.
                </SectionSubtitle>
                <p className="text-base">
                  The wealthiest people are better positioned to deal with the impacts and
                  adaptations to the climate crisis. Meanwhile, the people who contribute least to
                  the crisis also have the least financial resources to react to its impacts.
                </p>
              </div>
            </motion.div>

            {/* DESKTOP ANIMATION */}
            <div className="hidden sm:block">
              <motion.div style={{ height }} className="container flex w-screen items-center">
                <RiveScrollAnimation
                  scrollY={animationProgress}
                  fileName="chart_share_of_emissions"
                  stateMachine="Default"
                  stateMachineInput="scrollPos"
                  className="sm:h-[50vh] sm:w-screen"
                  autoplay
                />
              </motion.div>
            </div>

            {/* MOBILE IMAGE */}
            <div className="flex flex-1 items-center sm:hidden">
              <motion.div style={{ opacity: distributionMobileOpacity }}>
                <Icon icon={DistributionIcon} className="container w-screen" />
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
        </div>
      </div>
    </div>
  );
};

export default EmissionsDistribution;
