import { useRef, useState } from 'react';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import RiveScrollAnimation from '../rive-components/rive-scroll';
import { scaleRange } from '../utils';

const texts = [
  'Globally, the median income is €7.20 per person per day. This is only 71c more than the poverty line for upper-middle income countries which is €6.49 per day.',
  'The 10 richest men in the world own more than the bottom 3.1 billion people.',
];

const DistributionDefault = () => {
  const target = useRef(null);
  const { scrollYProgress: animationScrollProgress } = useScroll({
    target,
    offset: ['start 0.25', 'end end'],
  });

  const { scrollYProgress: containerScrollProgress } = useScroll({
    target,
    offset: ['start center', 'end start'],
  });

  const [scrollY, setScrollY] = useState(0);

  useMotionValueEvent(containerScrollProgress, 'change', (latest) => {
    const progress = latest * 100;
    setScrollY(progress);
  });

  const textY = useTransform(containerScrollProgress, (v) => {
    if (v >= 0.4) {
      const variation = scaleRange(v, [0.4, 0.5], [0, -25]);
      return `${variation}vh`;
    }
    const p = Math.min(Math.max(v / 0.2, 0), 1);
    return `${(1 - p) * 100}%`;
  });

  const text2Y = useTransform(containerScrollProgress, (v) => {
    if (v >= 0 && v <= 0.5) {
      const variation = scaleRange(v, [0, 0.5], [100, 0]);
      return `${variation}vh`;
    }
    if (v > 0.6) {
      const variation = scaleRange(v, [0.6, 1], [0, -100]);
      return `${variation}vh`;
    }

    const p = Math.min(Math.max(v / 0.2, 0), 1);
    return `${(1 - p) * 100}%`;
  });

  const opacityText1 = useTransform(containerScrollProgress, (v) => {
    if (v > 0.4) {
      return scaleRange(v, [0.4, 0.5], [1, 0]);
    }
    if (v >= 0 && v <= 0.2) {
      return scaleRange(v, [0, 0.2], [0, 1]);
    }
    if (v === 0 || v === 1) return 0;
    return 1;
  });

  const opacityText2 = useTransform(containerScrollProgress, (v) => {
    return v > 0.4 && v < 1 ? scaleRange(v, [0.4, 0.5], [0, 1]) : 0;
  });

  const animationY = useTransform(
    [animationScrollProgress, containerScrollProgress],
    ([v, c]: [number, number]) => {
      if (v === 1) {
        const variation = scaleRange(c, [0.6, 1], [-10, -105]);
        return `${variation}vh`;
      }
      if (v > 0.8 && v < 1) {
        const variation = scaleRange(v, [0.8, 1], [20, -10]);
        return `${variation}vh`;
      }
      if (v > 0.6 && v <= 0.8) {
        const variation = scaleRange(v, [0.6, 0.8], [10, 20]);
        return `${variation}vh`;
      }
      if (v >= 0.5 && v <= 0.6) {
        const variation = scaleRange(v, [0.5, 0.6], [-10, 10]);
        return `${variation}vh`;
      }
      if (v >= 0) {
        return '-10vh';
      }
    }
  );

  const animationOpacity = useTransform(animationScrollProgress, (v) => {
    return v > 0 ? 1 : 0;
  });

  return (
    <div ref={target} className="h-[200vh]">
      <div className="flex h-[200vh] flex-col items-center justify-between">
        <motion.div
          className="text1 fixed top-0 z-10 pt-28 text-center"
          style={{
            y: textY,
            opacity: opacityText1,
          }}
        >
          <div className="max-w-3xl">
            <SectionTitle>Distribution of global wealth.</SectionTitle>
            <SectionSubtitle className="mt-2 mb-6" size="small">
              {texts[0]}
            </SectionSubtitle>
          </div>
          <div>
            <p className="font-serif text-xs text-light-gray sm:hidden">
              Distribution of pre-tax national income by population group (2021).
            </p>
          </div>
        </motion.div>
        <motion.div
          className="fixed top-0 z-20 pt-28 text-center"
          style={{
            y: text2Y,
            opacity: opacityText2,
          }}
        >
          <div className="max-w-3xl">
            <SectionTitle>Distribution of global wealth.</SectionTitle>
            <SectionSubtitle className="mt-2 mb-6" size="small">
              {texts[1]}
            </SectionSubtitle>
          </div>
          <div>
            <p className="font-serif text-xs text-light-gray sm:hidden">
              Distribution of pre-tax national income by population group (2021).
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="fixed bottom-0 -z-10 flex h-[50vh] w-screen items-end"
        style={{
          y: animationY,
          opacity: animationOpacity,
        }}
      >
        <RiveScrollAnimation
          scrollY={animationScrollProgress}
          fileName="chart"
          stateMachine="Default"
          stateMachineInput="scrollPos"
          className="diagram-animation h-[150vh] w-screen"
          autoplay
        />
      </motion.div>

      <motion.div
        // animate={{
        //   opacity: containerScrollY > text2Absolute ? 1 : 0,
        //   translateY: containerScrollY > text2Absolute ? 0 : 'calc(300%)',
        // }}
        // transition={{ duration: 1 }}
        // style={{ y: animationY }}
        className="container flex w-full justify-between text-xs text-light-gray sm:text-sm"
      >
        <p className="hidden font-serif sm:block">
          Distribution of pre-tax national income by population group (2021).
        </p>
        <p>
          Source:{' '}
          <a
            className="underline"
            href="https://www.figma.com/file/tfBBt7rL4Rt0NJs7swlZdE/V2---Vizz-branding?node-id=347-55549&t=jWrtaEw0X7czunMf-4"
          >
            World Inequality Database, World Bank
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default DistributionDefault;
