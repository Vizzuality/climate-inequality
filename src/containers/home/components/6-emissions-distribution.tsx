import { useRef } from 'react';

import { motion } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import RiveScrollAnimation from '../rive-components/rive-scroll';
import { useScrollY } from '../utils';

const EmissionsDistribution = () => {
  const target = useRef(null);

  const { scrollY: y } = useScrollY({ target, offset: ['start 0.25', 'end end'] });

  const animationY = y <= 2 ? 2 : y;

  return (
    <div
      ref={target}
      className="mt-14 flex h-[100vh] flex-col items-center  overflow-hidden pt-20 pb-10 sm:mt-[45vh]"
    >
      <motion.div
        className="container pb-8"
        style={{
          opacity: y / 50,
        }}
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
      <motion.div
        className="flex h-[50vh] w-full items-center"
        style={{
          height: y < 15 ? `${y * 2}vh` : y > 20 ? '40vh' : `calc(30vh + ${y - 15}vh)`,
        }}
      >
        <RiveScrollAnimation
          scrollY={animationY}
          fileName="chart_share_of_emissions"
          stateMachine="Default"
          stateMachineInput="scrollPos"
          className="diagram-animation container absolute h-[50vh] w-screen"
          autoplay
        />
      </motion.div>

      <motion.div
        className="container mt-auto place-items-end text-xs sm:self-end sm:text-sm"
        style={{
          opacity: y / 50,
        }}
      >
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
