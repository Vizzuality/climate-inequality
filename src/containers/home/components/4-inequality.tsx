import { useRef } from 'react';

import classNames from 'classnames';

import { useScroll, useTransform, motion } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

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

  const animationYProgress = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, 1]);

  const text1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.65], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const text2OpacityMobile = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  return (
    <div ref={ref} className="h-[300vh] w-full">
      <div className="container flex-1">
        {contents.map(({ p1, p2, subtitle, title }, index) => {
          return (
            <div
              key={title}
              className={classNames('absolute sm:h-[150vh]', {
                'mt-[150vh] h-[145vh] sm:mt-[150vh]': index === 1,
                'mt-[45vh] h-[100vh] sm:mt-0': index === 0,
              })}
            >
              <div className="sticky top-[45vh] h-[50vh] sm:top-0 sm:h-screen">
                <div className="flex h-full flex-col items-center justify-center sm:flex-row">
                  <motion.div
                    className="hidden flex-1 sm:block"
                    style={{ opacity: index === 0 ? text1Opacity : text2Opacity }}
                  >
                    <SectionTitle>{title}</SectionTitle>
                    <SectionSubtitle className="mt-2 mb-6">{subtitle}</SectionSubtitle>
                    <div className="mt-4 text-base">
                      <p>{p1}</p>
                      <p className="mt-4 text-base">{p2}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="sm:hidden"
                    style={{ opacity: index === 0 ? text1Opacity : text2OpacityMobile }}
                  >
                    <SectionTitle>{title}</SectionTitle>
                    <SectionSubtitle className="mt-2 mb-6">{subtitle}</SectionSubtitle>
                    <div className="mt-4 text-sm">
                      <p>{p1}</p>
                      <p className="mt-4 text-sm">{p2}</p>
                    </div>
                  </motion.div>

                  <div className="sm:flex-1"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute h-[300vh] w-full sm:mt-[-50vh] sm:h-[350vh]">
        <div className="pointer-events-none sticky top-0 h-[100vh] w-full sm:flex sm:pt-0">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-end">
            <RiveScrollAnimation
              scrollY={animationYProgress}
              fileName="diagram"
              stateMachine="Default"
              stateMachineInput="scrollPos"
              className="pointer-events-none mt-[-5vh] h-[50vh] w-[100vw] sm:mt-0 sm:h-[45vw] sm:w-[45vw]"
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inequality;
