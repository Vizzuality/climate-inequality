import { useRef } from 'react';

import { motion, useTransform, useScroll } from 'framer-motion';

import FadeYScroll from 'containers/home/animations/FadeYScroll/component';

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

  const opacity = useTransform(scrollYProgress, (v) => {
    return Math.min(Math.max(v / 0.15, 0), 1);
  });

  const y = useTransform(scrollYProgress, (v) => {
    if (v >= 0.7) {
      return `${(v - 0.66) * 100}%`;
    }
    const p = Math.min(Math.max(v / 0.33, 0), 1);
    return `${(1 - p) * 100}%`;
  });

  const animationY = useTransform(scrollYProgress, (v) => {
    const threshold = 0.74;
    const y = threshold + (v - threshold) * 0.5;
    if (v > threshold) return y;
    return v;
  });

  return (
    <div className="flex flex-col items-center" ref={sectionRef}>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden opacity-0"
        style={{ y, opacity }}
      >
        <RiveScrollAnimation
          scrollY={animationY}
          fileName="circle"
          stateMachine="Circle"
          stateMachineInput="scrollPos"
          className="h-[105vw] w-[105vw] "
          autoplay
        />
      </motion.div>

      <div className="flex h-screen items-center justify-center">
        <FadeYScroll
          className="flex max-w-[60%] flex-col justify-center text-center lg:max-w-xl"
          threshold={0.5}
        >
          <SectionTitle>{contents[0].title}</SectionTitle>
          <SectionSubtitle className="mt-2">{contents[0].subtitle}</SectionSubtitle>
        </FadeYScroll>
      </div>

      <div className="flex h-screen items-center justify-center">
        <FadeYScroll
          threshold={0.5}
          className="flex max-w-[60%] flex-col justify-center text-center lg:max-w-xl"
        >
          <SectionTitle>{contents[1].title}</SectionTitle>
          <SectionSubtitle className="mt-2">{contents[1].subtitle}</SectionSubtitle>
        </FadeYScroll>
      </div>
    </div>
  );
};

export default OurVision;
