import { useRef } from 'react';

import classNames from 'classnames';

import { motion, useTransform, useScroll } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import RiveScrollAnimation from '../rive-components/rive-scroll';

const contents = [
  {
    title: 'Our vision.',
    subtitle:
      'Equality ensures everyone has an equal opportunity to make the most of their lives and talents.',
  },
  {
    title: 'Our reality.',
    subtitle:
      'Historic, institutional and cultural forces uphold systems of inequality and oppression.',
  },
];

const OurVision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0.74, 1], ['0vh', '150vh']);

  const textOpacity = useTransform(
    scrollYProgress,
    [0.23, 0.25, 0.38, 0.45, 0.6, 0.65],
    [0, 1, 1, 0, 0, 1]
  );

  const scrollYProgress2 = useTransform(scrollYProgress, [0, 0.7, 0.85], [0, 0.7, 0.8]);

  return (
    <div
      className="flex min-h-[300vh] w-full flex-col items-center overflow-x-hidden"
      ref={sectionRef}
    >
      <div className="absolute h-[300vh]">
        <motion.div
          className="pointer-events-none sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden"
          style={{ y }}
        >
          <RiveScrollAnimation
            scrollY={scrollYProgress2}
            fileName="circle"
            stateMachine="Circle"
            stateMachineInput="scrollPos"
            className="h-[105vw] w-[105vw] scale-[190%] sm:scale-[150%] lg:scale-100"
            autoplay
          />
        </motion.div>
      </div>
      {contents.map(({ subtitle, title }, index) => (
        <div
          key={title}
          className={classNames('absolute h-[150vh]', {
            'mt-[150vh]': index === 1,
          })}
        >
          <div className="sticky top-0 h-screen">
            <div className="container flex h-full items-center justify-center">
              <motion.div
                className="flex max-w-[85%] flex-col justify-center text-center sm:max-w-[75%] lg:max-w-[40%]"
                style={{ opacity: textOpacity }}
              >
                <SectionTitle>{title}</SectionTitle>
                <SectionSubtitle className="mt-2">{subtitle}</SectionSubtitle>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurVision;
