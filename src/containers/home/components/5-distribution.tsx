import { useRef } from 'react';

import classNames from 'classnames';

import { motion, useScroll, useTransform } from 'framer-motion';

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

  const opacityText1 = useTransform(containerScrollProgress, [0, 0.2, 0.35, 0.5], [0, 1, 1, 0]);
  const opacityText2 = useTransform(containerScrollProgress, [0.4, 0.5, 0.7, 1], [0, 1, 1, 0]);

  const animationY = useTransform(animationScrollProgress, (v) => {
    if (v > 0.7 && v <= 1) {
      const variation = scaleRange(v, [0.7, 0.9], [50, 0]);
      return `${variation}vh`;
    }
    if (v >= 0.5 && v <= 0.7) {
      const variation = scaleRange(v, [0.5, 0.7], [0, 50]);
      return `${variation}vh`;
    }
    return 0;
  });

  const animationOpacity = useTransform(animationScrollProgress, (v) => {
    return v > 0 ? 1 : 0;
  });

  return (
    <div ref={target} className="flex h-[300vh] flex-col items-center">
      {/* TEXTS */}
      <div className="flex-0 absolute z-10 flex flex-col items-center justify-center">
        {texts.map((text, index) => {
          return (
            <div key={text} className="h-[125vh] last:h-[100vh]">
              <motion.div
                className={classNames('sticky top-0 z-10 pt-12 text-center sm:pt-28', {
                  'pb-28': index === 1,
                })}
                style={{
                  opacity: index === 0 ? opacityText1 : opacityText2,
                }}
              >
                <div className="container sm:max-w-3xl">
                  <SectionTitle>Distribution of global wealth.</SectionTitle>
                  <SectionSubtitle className="mt-2 mb-6">{text}</SectionSubtitle>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      {/* DESKTOP */}
      <motion.div
        className="absolute -z-10 mb-6 hidden h-[300vh] w-screen lg:flex"
        style={{
          y: animationY,
          opacity: animationOpacity,
        }}
      >
        <div className="sticky top-0 h-screen">
          <div className="flex h-[calc(100vh-96px)] items-end">
            <RiveScrollAnimation
              scrollY={animationScrollProgress}
              fileName="chart"
              stateMachine="Default"
              stateMachineInput="scrollPos"
              className="h-[150vh] w-screen"
              autoplay
            />
          </div>
          <div className="container mt-6 w-full items-end justify-between text-sm text-middle-gray sm:flex">
            <p className="font-serif">
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
          </div>
        </div>
      </motion.div>

      {/* MOBILE */}
      <div className="absolute flex h-[300vh] w-screen lg:hidden">
        <div className="sticky top-0 h-screen">
          <div className="flex h-full flex-col justify-end">
            <RiveScrollAnimation
              scrollY={animationScrollProgress}
              fileName="chart"
              stateMachine="Default"
              stateMachineInput="scrollPos"
              className="h-[120vw] w-screen"
              autoplay
            />
            <div className="container mb-4 text-center text-xs  text-light-gray">
              <p className="mb-2 font-serif">
                Distribution of pre-tax national income by population group (2021).
              </p>
              <p className="text-2xs">
                Source:{' '}
                <a
                  className="underline"
                  href="https://www.figma.com/file/tfBBt7rL4Rt0NJs7swlZdE/V2---Vizz-branding?node-id=347-55549&t=jWrtaEw0X7czunMf-4"
                >
                  World Inequality Database, World Bank
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionDefault;
