import { useRef } from 'react';

import classNames from 'classnames';

import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle';
import SectionTitle from 'components/section-title';

import MapReadnessLegend from 'svgs/ui/map-readness-legend.svg';
import MapVulnerabilityLegend from 'svgs/ui/map-vulnerability-legend.svg';

import { scaleRange, useScrollY } from '../utils';

const contents = [
  {
    title: 'Vulnerability to climate impacts.',
    subtitle: 'Which countries are most at risk?',
    image: '/images/map-1.png',
    p: (
      <>
        Vulnerability measures a country&apos;s exposure, sensitivity and ability to adapt to
        negative climate impacts. This{' '}
        <a
          className="underline"
          href="https://gain.nd.edu/our-work/country-index/"
          target="_blank"
          rel="noopener noreferrer"
        >
          dataset
        </a>{' '}
        considers vulnerability in six life-supporting sectors -{' '}
        <span className="font-semibold">
          food, water, health, ecosystem service, human habitat and infrastructure
        </span>
        .
      </>
    ),
  },
  {
    title: 'Readiness to adapt to climate impacts.',
    subtitle: 'Readiness to adapt to climate impacts.',
    image: '/images/map-2.png',
    p: (
      <>
        Readiness measures a country&apos;s ability to leverage investments and convert them to
        adaptation actions. This{' '}
        <a
          className="underline"
          href="https://gain.nd.edu/our-work/country-index/"
          target="_blank"
          rel="noopener noreferrer"
        >
          dataset
        </a>{' '}
        considers readiness by three components -{' '}
        <span className="font-semibold">
          economic readiness, governance readiness and social readiness
        </span>
        .
      </>
    ),
  },
];

const Legend = ({ text = 'Vulnerability' }) => {
  const isVuln = text === 'Vulnerability';
  const text1 = isVuln ? 'Worse' : 'Better';
  const text2 = isVuln ? 'Better' : 'Worse';

  // translate-y-[16px]
  return (
    <div
      className={classNames('mt-3 mb-9 flex w-full items-end justify-between text-2xs', {
        // 'translate-y-[200%]': isVuln,
        // 'translate-y-[calc(200%-8px)]': !isVuln,
      })}
    >
      <div></div>
      <div className="w-full sm:w-auto">
        <span className="text-xs">{text}</span>
        <Icon
          className="mt-1 mb-0.5 w-full sm:w-[228px]"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          icon={text === 'Vulnerability' ? MapVulnerabilityLegend : MapReadnessLegend}
        />
        <div className="flex justify-between">
          <span>{text1}</span>
          <span>{text2}</span>
        </div>
      </div>
      <p>
        Source:{' '}
        <a
          className="underline"
          href="https://gain.nd.edu/our-work/country-index/methodology/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ND-GAIN
        </a>
      </p>
    </div>
  );
};

const Text = ({
  scrollYProgress,
  className,
}: {
  scrollYProgress: MotionValue<number>;
  className: string;
}) => {
  const translateY1 = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.33, 0.4], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.43], [0, 1]);

  return (
    <div className={className}>
      {contents.map(({ title, subtitle, p }, index) => {
        const opacity = index === 0 ? opacity1 : opacity2;
        const translateY = index === 0 ? translateY1 : 0;

        return (
          <motion.div
            style={{
              opacity,
              translateY,
            }}
            key={title}
            className="h-[50vh] w-[50vw]"
          >
            <div className="sticky top-0 pt-24">
              <SectionTitle>{title}</SectionTitle>
              <SectionSubtitle className="mt-2 mb-6" size="small">
                {subtitle}
              </SectionSubtitle>
              <p className="sm:text-base">{p}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const Countries = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const map1opacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5], [0, 0, 1, 0]);
  const map2opacity = useTransform(scrollYProgress, [0.33, 0.4], [0, 1]);

  const mapPosition = useTransform(scrollYProgress, (v) => {
    console.log(v);
    if (v > 0.333 && v < 0.666) {
      return 'fixed';
    }
    return 'absolute';
  });

  const mapBottom = useTransform(scrollYProgress, (v) => {
    if (v > 0.333 && v < 0.666) {
      return '0';
    }
    return 'auto';
  });

  const map2y = useTransform(scrollYProgress, (v) => {
    if (v > 0.666) {
      return '100vh';
    }
    return '0';
  });

  return (
    <div ref={ref} className="flex h-[200vh] flex-col overflow-visible ">
      <Text className="container z-20" scrollYProgress={scrollYProgress} />
      <motion.div
        style={{
          opacity: map1opacity,
          position: mapPosition,
          top: mapBottom,
        }}
        className="map-1 z-10 mx-auto mb-20 flex h-screen w-full flex-1 flex-col items-center justify-end"
      >
        <div
          style={{
            backgroundImage: 'url(/images/map-1.png)',
          }}
          className="h-[34.77vw] w-[80vw] bg-cover bg-center bg-no-repeat"
        ></div>
        <Legend text="Vulnerability" />
      </motion.div>
      <motion.div
        className="map-2 z-10 mx-auto mb-[70px] flex h-screen w-full flex-1 flex-col items-center justify-end"
        style={{
          opacity: map2opacity,
          position: mapPosition,
          top: mapBottom,
          y: map2y,
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/images/map-2.png)',
          }}
          className="h-[34.77vw] w-[80vw] bg-cover bg-center bg-no-repeat"
        ></div>
        <Legend text="Readness" />
      </motion.div>
    </div>
  );
};

export default Countries;

// const map1Y = useTransform(scrollYProgress, (v) => {
//   if (v >= 0.66) {
//     const p = scaleRange(v, [0.66, 1], [0, -100]);
//     return `${p}vh`;
//   }
//   if (v >= 0.33 && v < 0.66) {
//     return 0;
//   }
//   const p = scaleRange(v, [0, 0.33], [100, 0]);
//   // return `${(1 - p) * 100}vh`;
//   return `${p}vh`;
// });

// const map2Y = useTransform(scrollYProgress, (v) => {
//   console.log(v);
//   if (v > 0.4) {
//     const p = scaleRange(v, [0.4, 1], [0, -100]);
//     return `${p}vh`;
//   }
//   const p = Math.min(Math.max(v / 0.33, 0), 1);
//   return `${(p - 1) * 100}%`;
// });
