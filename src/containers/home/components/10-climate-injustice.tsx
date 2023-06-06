import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import EmissionChart from 'containers/emission-chart/component';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title';

const ClimateInjustice = () => {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });

  const titleX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <div
      ref={target}
      className="flex min-h-screen w-full flex-col justify-around space-y-20 overflow-x-hidden py-24"
    >
      <div>
        <div className="container flex flex-col items-end gap-6 sm:flex-row sm:gap-14">
          <motion.div
            style={{
              x: titleX,
              opacity: titleOpacity,
            }}
            className="flex-1"
          >
            <SectionTitle className="mb-2">Climate injustice.</SectionTitle>
            <SectionSubtitle size="small">
              The wealthiest regions are fortunate to face fewer and less intense climate impacts
            </SectionSubtitle>
          </motion.div>
          <motion.div
            style={{
              x: textX,
              opacity: titleOpacity,
            }}
            className="flex-1 "
          >
            <p>
              These regions built their wealth on historical emissions and continue to develop at a
              costly emission rate. There is a strong case for wealthier nations to take more
              responsibility in keeping the{' '}
              <a
                className="underline"
                href="https://unfccc.int/news/cop27-reaches-breakthrough-agreement-on-new-loss-and-damage-fund-for-vulnerable-countries"
                target="_blank"
                rel="noopener noreferrer"
              >
                1.5°C
              </a>{' '}
              target alive, and to support the more impacted countries to cope and develop, as seen
              in the{' '}
              <a
                className="underline"
                href="https://unfccc.int/news/cop27-reaches-breakthrough-agreement-on-new-loss-and-damage-fund-for-vulnerable-countries"
                target="_blank"
                rel="noopener noreferrer"
              >
                Loss and Damages Fund
              </a>{' '}
              agreed at COP27.
            </p>
          </motion.div>
        </div>
      </div>
      <EmissionChart />
    </div>
  );
};

export default ClimateInjustice;
