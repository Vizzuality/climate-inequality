import { useRef } from 'react';

import classNames from 'classnames';

import { useScroll, useTransform, motion } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import FadeYScroll from '../animations/fade-y-scroll/component';
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

const Text = ({ title, subtitle, p1, p2 }: Omit<(typeof contents)[0], 'image'>) => {
  return (
    <div className="container flex flex-col-reverse items-center justify-between gap-5 pt-10 sm:mt-0 sm:h-screen sm:flex-row sm:gap-10">
      <div className="">
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
  );
};

const Inequality = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

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

  const text1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [0, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  return (
    <div ref={ref} className="flex h-[200vh] w-full flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          {contents.map(({ p1, p2, subtitle, title }, index) => {
            return (
              <>
                <motion.div
                  style={{
                    opacity: index === 0 ? text1Opacity : text2Opacity,
                  }}
                  className={classNames('absolute h-screen  sm:hidden', {
                    // 'mt-[50vh]': index === 0,
                    'mt-[50vh]': index === 1,
                    // 'bg-900 bg-opacity-50': index === 1,
                  })}
                  key={title}
                >
                  <div
                    className={classNames('sticky top-0 h-[50vh]', {
                      // 'mt-[50vh]': index === 1,
                    })}
                  >
                    <Text p1={p1} p2={p2} subtitle={subtitle} title={title} />
                  </div>
                </motion.div>
                <div className="hidden sm:block">
                  <FadeYScroll threshold={0.5} key={title}>
                    <Text key={title} p1={p1} p2={p2} subtitle={subtitle} title={title} />
                  </FadeYScroll>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="absolute h-[200vh] w-screen sm:mt-[-25vh] sm:h-[225vh]">
        <div className="sticky top-0 h-[100vh] w-full pt-[50vh] sm:flex sm:pt-0">
          <div className="flex-1"></div>
          <div className="container flex flex-1 items-center justify-center sm:justify-end">
            <RiveScrollAnimation
              scrollY={animationYProgress}
              fileName="diagram"
              stateMachine="Default"
              stateMachineInput="scrollPos"
              className="diagram-animation pointer-events-none h-[100vw] w-[100vw] sm:h-[40vh] sm:w-[40vh] xl:h-[45vw] xl:w-[45vw]"
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inequality;
