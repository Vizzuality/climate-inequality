import { useMemo } from 'react';

import Image from 'next/image';

import cn from 'classnames';

import Title from './components/1-title';
import OurVision from './components/2-our-vision';
import Inequality from './components/4-inequality';
import Distribution from './components/5-distribution';
import EmissionsDistribution from './components/6-emissions-distribution';
import ClimateCrisis from './components/7-climate-crisis';
import Multidimensional from './components/8-multidimensional';
import Countries from './components/9-countries';
import ClimateInjustice from './components/10-climate-injustice';
import ZoomingIn from './components/11-zooming-in';
import Understanding from './components/12-understanding';
import Investment from './components/13-investment';
import Prioritising from './components/14-prioritising';
import { lastStepAtom, stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import FadeY from './animations/fadeY';

import { Media } from 'components/media-query';

import ScrollItem from './scroll-list/item';
import RiveScrollAnimation from './rive-components/rive-scroll';

const Home = () => {
  const sectionStep = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const ANIMATE_GLOBE = useMemo(() => {
    if (sectionStep >= 10) {
      return 'animate';
    }

    return 'exit';
  }, [sectionStep]);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(sectionStep);
    console.log({ sectionStep: id });
    setStep(id);
  }, 100);

  return (
    <div
    // className={}
    >
      <div className="min-h-screen">
        <Title handleScrollToNext={() => console.log('next')} />
      </div>
      <OurVision />
      <Inequality />
      <Distribution />
      <EmissionsDistribution />
      <ClimateCrisis />
      <Multidimensional />
      <Countries />
      <ClimateInjustice />
      {/* <Media lessThan="sm" className="px-10">
        <ScrollItem sectionStep={2} onChange={onChange}>
          <LayersText1 />
          <LayersChart initialStep={2} currentStep={2} />
        </ScrollItem>
        <ScrollItem sectionStep={3} onChange={onChange}>
          <LayersText2 />
          <LayersChart initialStep={2} currentStep={3} />
        </ScrollItem>
        <ScrollItem sectionStep={4} onChange={onChange}>
          <LayersText3 />
          <LayersChart initialStep={2} currentStep={4} />
        </ScrollItem>
        <ScrollItem sectionStep={5} onChange={onChange}>
          <LayersText4 />
          <LayersChart initialStep={2} currentStep={5} />
        </ScrollItem>
        <ScrollItem sectionStep={6} onChange={onChange}>
          <CirclesText1 />
          <LayersChart initialStep={2} currentStep={6} />
        </ScrollItem>
        <ScrollItem sectionStep={7} onChange={onChange}>
          <CirclesText2 />
          <CirclesChart initialStep={6} currentStep={7} />
        </ScrollItem>
        <ScrollItem sectionStep={8} onChange={onChange}>
          <CirclesText3 />
          <CirclesChart initialStep={6} currentStep={8} />
        </ScrollItem>
        <ScrollItem sectionStep={9} onChange={onChange}>
          <CirclesText4 />
          <CirclesChart initialStep={6} currentStep={9} />
        </ScrollItem>
        <ScrollItem sectionStep={10} onChange={onChange}>
          <div className="flex flex-col">
            <GlobeText />
            <div className="-mx-10">
              <Image
                width={414}
                height={317}
                src="/images/globe/globe-mobile.jpg"
                alt="Globe with Foodscapes image"
                className="object-fill"
              />
            </div>
          </div>
        </ScrollItem>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Wrapper>
          <div className="grid grid-cols-12 gap-6">
            <div className="relative z-10 col-span-5 xl:col-span-4 xl:col-start-2">
              <ScrollItem sectionStep={2} onChange={onChange}>
                <LayersText1 />
              </ScrollItem>
              <ScrollItem sectionStep={3} onChange={onChange}>
                <LayersText2 />
              </ScrollItem>
              <ScrollItem sectionStep={4} onChange={onChange}>
                <LayersText3 />
              </ScrollItem>
              <ScrollItem sectionStep={5} onChange={onChange}>
                <LayersText4 />
              </ScrollItem>
              <ScrollItem sectionStep={6} onChange={onChange}>
                <CirclesText1 />
              </ScrollItem>
              <ScrollItem sectionStep={7} onChange={onChange}>
                <CirclesText2 />
              </ScrollItem>
              <ScrollItem sectionStep={8} onChange={onChange}>
                <CirclesText3 />
              </ScrollItem>
              <ScrollItem sectionStep={9} onChange={onChange}>
                <CirclesText4 />
              </ScrollItem>
              <ScrollItem sectionStep={10} onChange={onChange}>
                <GlobeText />
              </ScrollItem>
            </div>

            <div className="lg:h-small-screen sticky top-0 z-0 h-96 lg:col-span-5 lg:col-start-7">
              <AnimatePresence>
                {[2, 3, 4, 5, 6, 7, 8, 9].includes(sectionStep) && (
                  <FadeY key="layers-chart">
                    <div className="flex h-full flex-col items-center justify-center">
                      <LayersChart initialStep={2} />
                      <CirclesChart initialStep={6} />
                    </div>
                  </FadeY>
                )}

                <FadeY animate={ANIMATE_GLOBE}>
                  <GlobeMap currentId="desktop-globe" />
                </FadeY>
              </AnimatePresence>
            </div>
          </div>
        </Wrapper>
      </Media> */}

      {/* <ScrollItem sectionStep={11} onChange={onChange}>
        <Outro />
      </ScrollItem> */}
    </div>
  );
};

export default Home;
