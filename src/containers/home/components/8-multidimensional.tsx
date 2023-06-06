import { useRef } from 'react';

import classNames from 'classnames';

import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

import Icon from 'components/icon';
import SectionSubtitle from 'components/section-subtitle';

import ArrowRigth from 'svgs/ui/arrow-right-3.svg';

const content = [
  {
    classname: '',
    text: 'Multidimensional Inequality',
    arrowClassname: 'rotate-90 lg:rotate-0 translate-y-3 lg:translate-y-0 justify-end',
  },
  {
    classname: 'z-0 translate-y-6 lg:translate-y-0 lg:translate-x-[10%]',
    text: 'Greater exposure to climate hazards',
  },
  {
    classname: 'z-10',
    text: 'Less ability to cope with and recover from the damages caused by climate hazards',
  },
  {
    classname: 'z-20 lg:-translate-x-[10%] -translate-y-6 lg:translate-y-0',
    text: 'Greater susceptibility to damages caused by climate hazards',
    arrowClassname: 'rotate-90 lg:rotate-0 -translate-y-3 lg:translate-y-0',
  },
  {
    classname: 'bg-black text-500',
    text: 'Disproportionate loss of assets and income and greater inequality',
  },
];

type Bubble = {
  text: string;
  classname: string;
  arrowClassname?: string;
  index: number;
  scrollYProgress: MotionValue<number>;
};

const Bubble = ({ text, classname, arrowClassname, index, scrollYProgress }: Bubble) => {
  const opacity = useTransform(scrollYProgress, [0, (index + 1) / 10], [0, 1]);

  return (
    <>
      <motion.div
        style={{
          opacity,
        }}
        className={classNames(
          'flex aspect-square h-44 w-44 flex-[2.5] flex-shrink-0 items-center justify-center rounded-full border-4 border-500 bg-white p-4 lg:h-full lg:w-full lg:p-5',
          { [classname]: true }
        )}
      >
        <p className="text-center text-sm font-semibold leading-tight xl:text-base">{text}</p>
      </motion.div>
      {arrowClassname && (
        <motion.div
          style={{
            opacity,
          }}
          className={classNames('flex w-8 flex-1 flex-shrink-0 fill-white', {
            [arrowClassname]: true,
          })}
        >
          <Icon className="h-[38px] w-[38px]" icon={ArrowRigth} />
        </motion.div>
      )}
    </>
  );
};

const Multidimensional = () => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });

  const x = useTransform(scrollYProgress, [0, 0.25], ['-100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const bubblesX = useTransform(scrollYProgress, [0, 0.5], ['-100%', '0%']);

  return (
    <div ref={target} className="min-h-screen bg-500 text-900">
      <div className="container flex min-h-screen flex-col items-end justify-around gap-8 py-20 lg:gap-4">
        <motion.div
          style={{
            x,
            opacity,
          }}
        >
          {' '}
          <SectionSubtitle className=" text-900" size="large">
            3.3 to 3.6 billion people live in areas highly vulnerable to climate impacts yet are the
            least responsible for the crisis.
          </SectionSubtitle>
        </motion.div>
        {/* DESKTOP ANIMATION */}
        <motion.div
          className="hidden h-full w-full flex-col items-center justify-between sm:flex lg:flex-row"
          style={{
            translateX: bubblesX,
          }}
        >
          {content.map(({ text, classname, arrowClassname }, index) => {
            return (
              <Bubble
                key={index}
                text={text}
                classname={classname}
                arrowClassname={arrowClassname}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </motion.div>
        {/* MOBILE WITHOUT ANIMATION */}
        <div className="flex h-full w-full flex-col items-center justify-between sm:hidden">
          {content.map(({ text, classname, arrowClassname }, index) => {
            return (
              <Bubble
                key={index}
                text={text}
                classname={classname}
                arrowClassname={arrowClassname}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>

        <div className="lg:w-1/2">
          <p>
            As per the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://www.ipcc.ch/report/ar6/wg2/"
            >
              2022 IPCC report
            </a>
            , <span className="font-semibold">climate vulnerability</span> is driven by patterns of
            socioeconomic development, unsustainable ocean and land use, inequity, marginalisation,
            historical and ongoing patterns of inequity such as colonialism, and governance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Multidimensional;
