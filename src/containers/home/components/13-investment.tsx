import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle/component';

import InvestmentsIconMobile from 'svgs/ui/investments-mobile.svg';
import InvestmentsIcon from 'svgs/ui/investments.svg';

const Investment = () => {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.25], ['-100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const x = useTransform(scrollYProgress, [0.3, 0.55], ['0vw', '100vw']);
  const chartOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <div ref={target} className="sm:min-h-[150vh]">
      <div className="top-0 flex min-h-[100vh] w-full flex-col overflow-x-hidden bg-500 sm:sticky sm:h-screen">
        <div className="flex h-full w-full flex-col justify-between py-14 text-black 2xl:py-20">
          <motion.div style={{ y, opacity }} className="flex-0 container mb-6 sm:mb-16">
            <div className="sm:w-1/2">
              <SectionSubtitle className="mb-6">
                When needs and investment do not align.
              </SectionSubtitle>
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
                , nature-based solutions can provide 37% of the mitigation needed to reach the Paris
                Agreement targets. Yet what we see today tells a story that priorities are going
                elsewhere.
              </p>
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: chartOpacity }}
            className="container hidden w-screen flex-1 flex-col sm:flex xl:pl-4 xl:pr-4"
          >
            <div className="flex w-full flex-col items-center justify-center">
              <div className="z-10 w-full">
                <Icon className="hidden w-full sm:block" icon={InvestmentsIcon} />
              </div>
              <motion.div style={{ x, y: '-120%' }} className="z-20 w-full bg-500">
                <Icon className="hidden w-[80%] opacity-0 sm:block" icon={InvestmentsIcon} />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="px-4 sm:hidden">
          <Icon className="w-full" icon={InvestmentsIconMobile} />
        </div>
        <div className="container flex w-screen items-end justify-between text-black sm:h-screen">
          <div className="mt-6 flex flex-col gap-8 pb-10 sm:absolute sm:mt-0.5 sm:flex-row sm:gap-0 sm:pb-12">
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
