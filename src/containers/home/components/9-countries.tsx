import { useRef } from 'react';

import classNames from 'classnames';

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
    image: '/images/map-vulnerability.png',
    legend: 'Vulnerability',
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
    image: '/images/map-readiness.png',
    legend: 'Readiness',
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
    <div className="container mt-3 w-full -translate-y-1/2 items-end justify-between bg-black text-2xs sm:flex sm:-translate-y-full">
      <div></div>
      <div className="mb-5 w-full sm:mb-0 sm:w-auto">
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
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

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
            className={classNames('countries-text absolute h-[50vh] sm:w-[50vw]', {
              'mt-[75vh]': index === 1,
            })}
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

  const map1opacity = useTransform(scrollYProgress, [0, 0.33, 0.45, 0.6], [0, 1, 1, 0]);
  const map2opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="flex h-[200vh] flex-col">
      <Text className="flex-0 container z-20" scrollYProgress={scrollYProgress} />
      <div className="absolute h-[200vh] w-full flex-1">
        <div className="sticky top-0 h-screen">
          <div>
            {contents.map(({ image, legend }, index) => (
              <motion.div
                key={legend}
                style={{
                  opacity: index === 0 ? map1opacity : map2opacity,
                }}
                className={classNames(
                  'z-10 mx-auto flex h-screen w-full flex-1 flex-col items-center justify-end',
                  {
                    'mt-[-100vh]': index === 1,
                  }
                )}
              >
                <div
                  style={{
                    backgroundImage: `url('${image}')`,
                  }}
                  className="h-[50vh] w-screen bg-cover bg-center bg-no-repeat sm:h-[34.77vw] sm:w-[80vw]"
                ></div>
                <Legend text={legend} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
