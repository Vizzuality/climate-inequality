import { useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import RiveScrollAnimation from '../rive-components/rive-scroll';
import { useScrollY } from '../utils';

const texts = [
  'Globally, the median income is €7.20 per person per day. This is only 71c more than the poverty line for upper-middle income countries which is €6.49 per day.',
  'The 10 richest men in the world own more than the bottom 3.1 billion people.',
];

const DistributionDefault = () => {
  const target = useRef(null);
  const { scrollY: animationY } = useScrollY({ target, offset: ['start 0.25', 'end end'] });

  const { scrollY: y } = useScrollY({ target, offset: ['start 0.25', 'end start'] });

  const text2Absolute = 72;
  const animationFixed = 55.55;
  return (
    <div ref={target} className="h-[200vh]">
      <div className="flex h-screen flex-col items-center justify-between">
        <motion.div
          className="text1 top-0 z-50 py-[100px] text-center"
          style={{
            position: y < 11 || y > 44 ? 'relative' : 'fixed',
          }}
          animate={{ opacity: y > 0 && y < 43 ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
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
          className="z-50 py-[100px] text-center"
          style={{
            display: y < 43 ? 'none' : 'block',
            position: y < text2Absolute ? 'fixed' : 'absolute',
            top: y < text2Absolute ? 0 : 'auto',
            translateY: y < text2Absolute ? 0 : 'calc(100vh + 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: y > 43 ? 1 : 0 }}
          transition={{ duration: 1 }}
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
        <AnimatePresence>
          <motion.div
            className="-z-10 flex w-screen"
            style={{
              opacity: y > 0 ? 1 : 0,
              bottom: y > animationFixed ? 0 : y > 28 ? `calc(-${y - 28}vh + 90px)` : 90,
              marginTop: y > animationFixed ? 'calc(45vh - 90px)' : 0,
              position: y > animationFixed ? 'relative' : 'fixed',
            }}
          >
            <RiveScrollAnimation
              scrollY={animationY}
              fileName="chart"
              stateMachine="Default"
              stateMachineInput="scrollPos"
              className="diagram-animation h-[150vh] w-screen"
              autoplay
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          animate={{
            opacity: y > text2Absolute ? 1 : 0,
            translateY: y > text2Absolute ? 0 : 'calc(300%)',
          }}
          transition={{ duration: 1 }}
          className="container mt-5 flex w-full justify-between text-xs text-light-gray sm:text-sm"
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
    </div>
  );
};

export default DistributionDefault;
