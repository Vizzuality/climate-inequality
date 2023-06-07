import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import CountriesChart from 'containers/countries-chart';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import FadeYScroll from '../animations/fade-y-scroll/component';

const Text = () => (
  <>
    <SectionTitle className="mb-2">Zooming in on internal inequality.</SectionTitle>
    <SectionSubtitle className="mb-6">
      Income inequality is integral to carbon inequality.
    </SectionSubtitle>
    <p className="text-sm lg:text-base">
      When changing the view from a country&apos;s{' '}
      <span className="font-semibold">total emissions to per capita</span>, the comparison between
      and within countries changes dramatically. This shows the challenge of striving for more equal
      societies without increasing global emissions.{' '}
      <span className="font-semibold">
        We need sustainable development while reducing the carbon intensity associated with
        high-income lives
      </span>
      .
    </p>
  </>
);

const ZoomingIn = () => {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 0.4], ['-75vh', '0vh']);

  const chartY = useTransform(scrollYProgress, [0, 0.5], ['50vh', '0vh']);

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <div ref={target} className="flex min-h-screen flex-col py-12 lg:py-16">
      <div className="container">
        <div className="pointer-events-none hidden sm:block">
          <motion.div style={{ y: textY, opacity }} className="lg:w-1/2">
            <Text />
          </motion.div>
        </div>
        <div className="sm:hidden">
          <FadeYScroll>
            <Text />
          </FadeYScroll>
        </div>
        <motion.div className="hidden sm:block" style={{ y: chartY, opacity }}>
          <CountriesChart />
        </motion.div>
        <div className="sm:hidden">
          <FadeYScroll>
            <CountriesChart />
          </FadeYScroll>
        </div>
      </div>
    </div>
  );
};

export default ZoomingIn;
