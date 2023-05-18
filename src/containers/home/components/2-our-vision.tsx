import { useRef, useState } from 'react';

import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import RiveScrollAnimation from '../rive-components/rive-scroll';
import { useScrollY } from '../utils';

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
  const [y, setY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setY(value * 100);
  });

  const isInView = useInView(sectionRef);
  // const { scrollY: y } = useScrollY({
  //   target: sectionRef,
  //   offset: ['start end', 'end end'],
  // });

  return (
    <div className="flex h-[300vh] flex-col items-center" ref={sectionRef}>
      {isInView && (
        <motion.div
          className="h-screen w-full overflow-hidden"
          animate={['opacity']}
          style={{
            top: y > 33.33 ? 0 : 'auto',
            position: y > 33.33 ? 'fixed' : 'absolute',
          }}
          variants={{
            opacity: {
              opacity: y > 30 ? 1 : 0,
              transition: { delay: 300 },
            },
          }}
          initial={{ opacity: 0 }}
        >
          <RiveScrollAnimation
            scrollY={y}
            fileName="circle"
            stateMachine="Circle"
            stateMachineInput="scrollPos"
            className="h-[110vw] w-[110vw] translate-y-[-21.5%] translate-x-[-5%]"
            autoplay={true}
          />
        </motion.div>
      )}

      <motion.div
        animate={{
          opacity: y > 30 && y < 45 ? 1 : 0,
        }}
        transition={{ duration: 1 }}
        className="absolute z-10 flex h-screen max-w-[60%] flex-col justify-center text-center lg:max-w-xl"
      >
        <SectionTitle>{contents[0].title}</SectionTitle>
        <SectionSubtitle className="mt-2">{contents[0].subtitle}</SectionSubtitle>
      </motion.div>
      <motion.div
        animate={{
          opacity: y > 60 && y < 75 ? 1 : 0,
        }}
        className="absolute z-10 mt-[100vh] flex h-screen max-w-[60%] flex-col justify-center text-center lg:max-w-xl"
      >
        <SectionTitle>{contents[1].title}</SectionTitle>
        <SectionSubtitle className="mt-2">{contents[1].subtitle}</SectionSubtitle>
      </motion.div>
    </div>
  );
};

export default OurVision;
