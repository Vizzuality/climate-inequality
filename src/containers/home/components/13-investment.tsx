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
  const x = useTransform(scrollYProgress, [0.2, 0.5], ['0vw', '100vw']);
  const chartOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <div ref={target} className="flex h-[150vh] w-full overflow-hidden bg-500 sm:h-screen">
      <div className="flex w-full flex-col justify-between py-14 text-black 2xl:py-20">
        <motion.div style={{ y, opacity }} className="container">
          <div className="sm:w-3/5">
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
        <motion.div style={{ opacity: chartOpacity }} className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center">
            <div className="container absolute z-10">
              <Icon
                className="w-full sm:hidden lg:ml-[-5%] lg:w-[110%]"
                icon={InvestmentsIconMobile}
              />
              <Icon
                className="hidden w-full sm:block lg:ml-[-5%] lg:w-[110%]"
                icon={InvestmentsIcon}
              />
            </div>
            <div className="container flex h-full items-center justify-end overflow-hidden">
              <motion.div style={{ x }} className="z-20 h-full w-screen bg-500"></motion.div>
            </div>
          </div>
          <div className="container mt-7 flex w-full items-end sm:mt-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-0">
              <p className="flex-1 font-serif text-sm">
                The trend over time in total commitments and disbursements of finance for Nature
                Based solutions approaches to address climate change from 2016-2020
              </p>
              <p className="flex-1 text-sm sm:text-right">
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
        </motion.div>
      </div>
    </div>
  );
};

export default Investment;
