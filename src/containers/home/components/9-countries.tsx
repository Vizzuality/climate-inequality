import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle';
import SectionTitle from 'components/section-title';

import MapVulnerabilityLegend from 'svgs/ui/map-vulnerability-legend.svg';
import MapReadnessLegend from 'svgs/ui/map-readness-legend.svg';
import { useScrollY } from '../utils';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

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

const Legend = ({ text = 'Vulnerability', y = 0 }) => {
  const isVuln = text === 'Vulnerability';
  const text1 = isVuln ? 'Worse' : 'Better';
  const text2 = isVuln ? 'Better' : 'Worse';
  console.log(y);
  // translate-y-[16px]
  return (
    <div
      className={classNames('mt-3 mb-9 flex w-full items-end justify-between text-2xs', {
        'translate-y-[200%]': isVuln,
        'translate-y-[calc(200%-8px)]': !isVuln,
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

const Text = ({ scrollY = 0 }) => {
  return (
    <div className="flex-0 z-20">
      {contents.map(({ title, subtitle, p }, index) => {
        const opacity =
          index === 0
            ? scrollY < 33
              ? (scrollY / 100) * 3
              : (100 - scrollY) / 100 / 3
            : scrollY > 40
            ? (scrollY - 20) / 33
            : 0;

        const position = index === 0 ? 'relative' : 'absolute';
        const translateY =
          index === 0 ? (scrollY < 33 ? `calc(${scrollY * 4 - 200}% + 96px)` : 0) : 0;

        return (
          <motion.div
            style={{
              position,
              opacity,
              translateY,
              paddingTop: index === 1 ? 96 : 0,
            }}
            key={title}
            className="w-[50vw]"
          >
            <SectionTitle>{title}</SectionTitle>
            <SectionSubtitle className="mt-2 mb-6" size="small">
              {subtitle}
            </SectionSubtitle>
            <p className="sm:text-base">{p}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

const Countries = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScrollY({ target: ref, offset: ['start end', 'end start'] });
  console.log(scrollY);
  return (
    <div ref={ref} className="container flex h-[200vh] flex-col py-14 sm:py-24">
      <Text scrollY={scrollY} />
      <div className="w-full flex-1">
        <motion.div
          animate={{
            opacity: scrollY <= 55 ? 1 : 0,
          }}
          style={{
            position: scrollY > 33 ? 'fixed' : scrollY > 50 ? 'relative' : 'absolute',
            bottom: scrollY > 33 ? '12vh' : 'auto',
            backgroundImage: 'url(/images/map-1.png)',
          }}
          transition={{ duration: 3 }}
          className="z-10 mx-auto flex h-[34.77vw] w-[80vw] items-end bg-cover bg-center bg-no-repeat"
        >
          <Legend y={scrollY} text="Vulnerability" />
        </motion.div>
        <motion.div
          className="z-10 mx-auto flex h-[34.77vw] w-[80vw] translate-y-[7px] items-end bg-cover bg-center bg-no-repeat"
          animate={{
            opacity: scrollY > 40 ? 1 : 0,
          }}
          style={{
            position: scrollY > 33 && scrollY < 50 ? 'fixed' : 'absolute',
            bottom: scrollY > 3 ? '12vh' : 'auto',
            backgroundImage: 'url(/images/map-2.png)',
          }}
          transition={{ duration: 3 }}
        >
          <Legend y={scrollY} text="Readness" />
        </motion.div>
      </div>
    </div>
  );
};

export default Countries;
