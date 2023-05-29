import { useRef } from 'react';

import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle';
import SectionTitle from 'components/section-title';

import MapReadnessLegend from 'svgs/ui/map-readness-legend.svg';
import MapVulnerabilityLegend from 'svgs/ui/map-vulnerability-legend.svg';

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

  return (
    <div className="container mt-3 flex w-full -translate-y-full items-end justify-between bg-black text-2xs">
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
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

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
            className="h-[66.66vh] w-[50vw]"
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

  const map1opacity = useTransform(scrollYProgress, [0, 0.1, 0.45, 0.6], [0, 0, 1, 0]);
  const map2opacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

  const mapPosition = useTransform(scrollYProgress, (v) => {
    if (v > 0.333 && v < 0.666) {
      return 'fixed';
    }
    return 'absolute';
  });

  const mapTop = useTransform(scrollYProgress, (v) => {
    console.log(v);
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
    <div ref={ref} className="flex h-[200vh] flex-col">
      <Text className="container z-20" scrollYProgress={scrollYProgress} />
      <motion.div
        style={{
          opacity: map1opacity,
          position: mapPosition,
          top: mapTop,
        }}
        className="map-1 z-10 mx-auto flex h-screen w-full flex-1 flex-col items-center justify-end"
      >
        <div
          style={{
            backgroundImage: 'url(/images/map-vulnerability.png)',
          }}
          className="h-[34.77vw] w-[80vw] bg-cover bg-center bg-no-repeat"
        ></div>
        <Legend text="Vulnerability" />
      </motion.div>
      <motion.div
        className="map-2 z-10 mx-auto flex h-screen w-full flex-1 flex-col items-center justify-end"
        style={{
          opacity: map2opacity,
          position: mapPosition,
          top: mapTop,
          y: map2y,
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/images/map-readiness.png)',
          }}
          className="h-[34.77vw] w-[80vw] bg-cover bg-center bg-no-repeat"
        ></div>
        <Legend text="Readness" />
      </motion.div>
    </div>
  );
};

export default Countries;
