import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useBreakpoint } from 'hooks/breakpoint';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title';

const ClimateCrisis = () => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({ target, offset: ['start 0.75', 'end end'] });

  const translateY = useTransform(scrollYProgress, (v) => {
    return v < 0.5 ? `${v * 200 - 100}%` : 0;
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const translateX = useTransform(scrollYProgress, (v) => {
    return v < 0.666 ? `calc(100% - ${v * 150}%)` : 0;
  });

  const opacity2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);

  const isDesktop = useBreakpoint()('sm');

  return (
    <div ref={target} className="min-h-[150vh] sm:min-h-screen">
      <div className="absolute left-0 h-full min-h-[150vh] w-full overflow-hidden bg-white sm:min-h-screen">
        <div className="container flex h-full min-h-screen flex-col justify-between gap-6 pt-14 lg:mt-0 lg:justify-start lg:gap-0">
          <motion.div
            style={{
              translateY: isDesktop ? translateY : 0,
              opacity: isDesktop ? opacity1 : 1,
            }}
            className="flex-0 small-container"
          >
            <SectionTitle className="mb-4" color="green">
              Climate crisis and inequality.
            </SectionTitle>
            <SectionSubtitle size="large" className="text-900">
              The climate crisis multiplies the threats of existing inequality.
            </SectionSubtitle>
          </motion.div>
          <div className="flex flex-1 flex-col-reverse items-center justify-end gap-8 sm:gap-10 lg:mt-0 lg:flex-row lg:gap-[120px] xl:gap-[160px]">
            <div className="flex-1">
              <div className="left-0 bottom-0 w-screen sm:translate-x-0 lg:absolute lg:max-h-[55%] lg:max-w-[50%] lg:-translate-x-4 xl:max-h-[60%]">
                <img
                  className="w-screen lg:hidden"
                  alt="Climate crisis"
                  src="/images/climate-crisis-sm.png"
                  width={672}
                  height={484}
                />
                <img
                  className="hidden w-full lg:block"
                  alt="Climate crisis"
                  src="/images/climate-crisis.png"
                  width={360}
                  height={484}
                />
              </div>
            </div>
            <motion.div
              className="flex-1 text-sm text-900 xl:text-base"
              style={{
                translateX: isDesktop ? translateX : 0,
                opacity: isDesktop ? opacity2 : 1,
              }}
            >
              <p>
                We are all affected by the climate crisis, but{' '}
                <span className="font-semibold">
                  the impacts are not felt equally or fairly across the globe
                </span>
                . The climate impacts - shifting weather patterns, droughts, flooding, and storms -
                disproportionately affect{' '}
                <span className="font-semibold">
                  people already experiencing inequality and injustice
                </span>
                .
              </p>
              <p className="my-2">
                People facing additional inequalities are more vulnerable to the risks and are in
                less resilient positions to cope and recover due to governance, finances and
                barriers of discrimination. People risk losing their homes and livelihoods to
                extreme weather events. Think of farmers, fishers and people near waterways. They
                risk health impacts from extreme conditions and pollution, war, and civil unrest
                over food and water shortages…
              </p>
              <p className="font-semibold">The list goes on.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateCrisis;
