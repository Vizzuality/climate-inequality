import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

// import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

// import FinalDiagram from 'svgs/ui/diagram.svg';

import FadeYScroll from '../animations/FadeYScroll/component';
import RiveScrollAnimation from '../rive-components/rive-scroll';

const contents = [
  {
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
  {
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
];

const Inequality = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const animationOpacity = useTransform(scrollYProgress, (v) => {
    // if (!v || v === 1) return 0;
    return 1;
  });

  // const finalDiagramOpacity = useTransform(scrollYProgress, (v) => {
  //   return v > 0.99 ? 1 : 0;
  // });

  const animationYProgress = useTransform(scrollYProgress, (v) => {
    const threshold = 0.33;
    let y = 0.01;
    if (v > threshold) {
      // Transforms value from threshold-1 range to 0-1 range
      const normalized = (v - threshold) * (1 / (1 - threshold));
      if (normalized > y) {
        y = normalized;
      }
    }
    return y;
  });

  const y = useTransform(scrollYProgress, (v) => {
    const p = Math.min(Math.max((v + 0.1) / 0.33, 0), 1);
    return v < 1 ? `${(1 - p) * 100}%` : '-100vh';
  });

  const position = useTransform(scrollYProgress, (v) => {
    if (v < 1) {
      return 'fixed';
    }
    return 'absolute';
  });

  const top = useTransform(scrollYProgress, (v) => {
    if (v < 1) {
      return 0;
    }
    return 'auto';
  });

  return (
    <div ref={ref} className="container w-screen">
      <div className=" flex h-full">
        <div className="flex-1">
          {contents.map(({ p1, p2, subtitle, title }) => (
            <FadeYScroll threshold={0.5} key={title}>
              <div className="flex h-screen flex-col-reverse items-center justify-between gap-5 sm:mt-0 sm:flex-row sm:gap-10">
                <div className="max-w-lg flex-1">
                  <SectionTitle>{title}</SectionTitle>
                  <SectionSubtitle className="mt-2 mb-6" size="small">
                    {subtitle}
                  </SectionSubtitle>
                  <div className="mt-4 text-sm sm:text-base">
                    <p>{p1}</p>
                    <p className="mt-4 text-sm sm:text-base">{p2}</p>
                  </div>
                </div>
              </div>
            </FadeYScroll>
          ))}
        </div>

        {/* <motion.div
          className="FinalDiagram max-w-[50%] flex-1"
          style={{
            opacity: 1,
          }}
        >
        <div className="absolute  mt-[100vh] flex h-screen w-[50vw] items-center justify-end overflow-hidden bg-green pt-[6.66vw]">
            <Icon icon={FinalDiagram} className="h-[45vw] w-[45vw] flex-shrink-0" />
          </div>
        </motion.div> */}
      </div>

      <motion.div
        className="container pointer-events-none fixed right-0 flex h-screen w-screen items-center justify-end overflow-hidden"
        style={{
          opacity: animationOpacity,
          position,
          y,
          top,
        }}
      >
        <RiveScrollAnimation
          scrollY={animationYProgress}
          fileName="diagram"
          stateMachine="Default"
          stateMachineInput="scrollPos"
          className="diagram-animation h-[45vw] w-[45vw]"
          autoplay
        />
      </motion.div>
    </div>
    // </div>
  );
};

export default Inequality;
