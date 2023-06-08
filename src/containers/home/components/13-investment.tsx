import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useBreakpoint } from 'hooks/breakpoint';

import Icon from 'components/icon/component';
import { IconProps } from 'components/icon/types';
import SectionSubtitle from 'components/section-subtitle/component';

import InvestmentsIconMobile from 'svgs/ui/investments-mobile.svg';
import InvestmentsIcon from 'svgs/ui/investments.svg';

import FadeYScroll from '../animations/fade-y-scroll/component';

const Text = () => (
  <div className="small-container">
    <SectionSubtitle className="mb-6">When needs and investment do not align.</SectionSubtitle>
    <p className="text-sm sm:text-base">
      According to estimates by the{' '}
      <a
        href="https://www.worldbank.org/en/news/feature/2022/05/19/what-you-need-to-know-about-nature-based-solutions-to-climate-change"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        World Bank
      </a>
      , nature-based solutions can provide 37% of the mitigation needed to reach the Paris Agreement
      targets. Yet what we see today tells a story that priorities are going elsewhere.
    </p>
  </div>
);

const Investment = () => {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.25], ['-100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const x = useTransform(scrollYProgress, [0.3, 0.55], ['0vw', '100vw']);
  const chartOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  const isDesktop = useBreakpoint()('sm');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ChartIcon: IconProps['icon'] = isDesktop ? InvestmentsIcon : InvestmentsIconMobile;

  return (
    <div ref={target} className="min-h-screen bg-500">
      <div className="flex h-[150vh] flex-col justify-between text-black sm:py-14 2xl:py-20">
        <div className="sticky top-0 flex min-h-screen flex-col justify-between">
          {/* DESKTOP TEXT */}
          <motion.div
            style={{ y, opacity }}
            className="flex-0 container mb-16 mt-14 hidden sm:block"
          >
            <div className="sm:w-1/2">
              <Text />
            </div>
          </motion.div>
          {/* MOBILE TEXT */}
          <FadeYScroll threshold={0.1} className="container mb-6 mt-10 sm:hidden">
            <Text />
          </FadeYScroll>
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ opacity: chartOpacity }}
              className="flex-1 flex-col xl:pl-4 xl:pr-4"
            >
              <div className="flex w-full flex-col items-center justify-center">
                <div className="container absolute z-10 w-full">
                  <Icon className="w-full" icon={ChartIcon} />
                </div>
                <motion.div style={{ x }} className="container z-20 w-full bg-500">
                  <Icon className="w-full opacity-0" icon={ChartIcon} />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="container mt-6 flex flex-col gap-8 pb-10 sm:mt-0.5 sm:flex-row sm:gap-0 sm:pb-12">
            <p className="flex-1 font-serif text-sm">
              The trend over time in total commitments and disbursements of finance for Nature Based
              solutions approaches to address climate change from 2016-2020
            </p>
            <p className="w-full flex-1 text-sm sm:text-right">
              Source:{' '}
              <a
                href="https://www.sei.org/wp-content/uploads/2022/11/sei-wp-assessing-finance-nature-based-solutions-2022.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Stockholm Environment Institute
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
