import { useRef, useState } from 'react';

import { motion, useMotionValueEvent, useInView } from 'framer-motion';

import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import FinalDiagram from 'svgs/ui/diagram.svg';

import RiveScrollAnimation from '../rive-components/rive-scroll';
import { useScrollY } from '../utils';

const contents = {
  intersectional: {
    title: 'Inequality is intersectional.',
    subtitle:
      'Multiple dimensions of inequality interact with one another and create distinct     experiences and outcomes.',
    p1: 'A person born into a low-income, rural family, with little political representation and access to health care, will face many more obstacles to coping with climate impacts than a wealthy person born in the same country.',
    p2: (
      <>
        Inequality theory, first introduced by{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.researchgate.net/publication/292413493_Demarginalising_the_intersection_of_race_and_sex_A_black_feminist_critique_of_anti-discrimination_doctrine_feminist_theory_and_anti-racist_politics#:~:text=Black%20feminist%20legal%20scholar%20Kimberl%C3%A9%20Crenshaw%20coined%20the,on%20the%20separated%20grounds%20of%20race%20or%20sex."
          className="underline"
        >
          Kimberlé Williams Crenshaw
        </a>{' '}
        , offers us a more holistic lens to understanding climate inequality, than solely the place
        and class a person was born into.
      </>
    ),
    image: '/images/inequality-diagram.svg',
  },
  wealth: {
    title: 'Wealth & income inequality.',
    subtitle: 'Income is a significant driver of other inequalities.',
    p1: (
      <>
        By analysing <span className="font-semibold">specific realms of inequality</span>, we can
        work to develop a data informed understanding of{' '}
        <span className="font-semibold">intersectionality</span>.
      </>
    ),
    p2: (
      <>
        Although inequality is much more than just wealth or income, it plays a big part and greatly
        impacts other dimensions of inequality. Income significantly affects individuals&apos;{' '}
        <span className="font-semibold">ability to make the most of their lives and talents</span>.
      </>
    ),
    image: '/images/wealth-diagram.svg',
  },
};

const Inequality = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScrollY({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const isInView = useInView(ref);

  const [y, setY] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const progress = latest * 100;
    setY(progress);
  });

  const animationScroll = y;

  const opacity = y / 50;

  return (
    <div ref={ref} className="flex h-[200vh]">
      <motion.div
        className="absoloute flex-1"
        animate={{
          opacity,
        }}
      >
        <motion.div className="container flex min-h-screen w-full flex-col-reverse items-center justify-between gap-5 sm:mt-0 sm:flex-row sm:gap-10">
          <div className="max-w-lg flex-1">
            <SectionTitle>{contents.intersectional.title}</SectionTitle>
            <SectionSubtitle className="mt-2 mb-6" size="small">
              {contents.intersectional.subtitle}
            </SectionSubtitle>
            <div className="mt-4 text-sm sm:text-base">
              <p>{contents.intersectional.p1}</p>
              <p className="mt-4 text-sm sm:text-base">{contents.intersectional.p2}</p>
            </div>
          </div>
        </motion.div>
        <motion.div className="container flex min-h-screen w-full flex-col-reverse items-center justify-between gap-5 sm:mt-0 sm:flex-row sm:gap-10">
          <div className="max-w-lg flex-1">
            <SectionTitle>{contents.wealth.title}</SectionTitle>
            <SectionSubtitle className="mt-2 mb-6" size="small">
              {contents.wealth.subtitle}
            </SectionSubtitle>
            <div className="mt-4 text-sm sm:text-base">
              <p>{contents.wealth.p1}</p>
              <p className="mt-4 text-sm sm:text-base">{contents.wealth.p2}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="z-50 flex-1 items-center justify-center overflow-hidden">
        {isInView && (
          <motion.div
            // animate={{ opacity: 1 }}
            animate={{ opacity: y > 0 && y < 100 ? 1 : 0 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              top: y < 43 ? 'auto' : `calc(100vh/2 - 45vw/2)`,
              position: y > 43 ? 'fixed' : 'relative',
            }}
          >
            <RiveScrollAnimation
              scrollY={animationScroll}
              fileName="diagram"
              stateMachine="Default"
              stateMachineInput="scrollPos"
              className="diagram-animation h-[45vw] w-[45vw]"
              autoplay
            />
          </motion.div>
        )}
        <motion.div
          className="mt-[100vh] w-full items-center justify-center"
          animate={{ opacity: y >= 100 ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            display: y < 80 ? 'none' : 'flex',
          }}
        >
          <div className="translate-x-[34.5%] translate-y-[26%]">
            <Icon icon={FinalDiagram} className="h-[45vw] w-[45vw]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Inequality;
