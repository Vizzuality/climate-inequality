import React, { useEffect, useRef } from 'react';

// import { homeStore } from 'store/home';

// import { useInView } from 'framer-motion';

import { STEPS } from './constants';
// import Navigation from './navigation';
import ScrollSection from './scroll-section';
// import Skip from './skip';
import Steps from './steps';

const Intro = () => {
  const sectionRef = useRef();
  // const inViewSection = useInView(sectionRef, { margin: '-100% 0px 0px' });

  // const setSection = useHomeStore((state) => state.setSection);

  // useEffect(() => {
  //   if (inViewSection) {
  //     // setSection('intro');
  //   }
  // }, [inViewSection, setSection]);

  return (
    <section id="intro" ref={sectionRef} className="relative">
      <div className="sticky top-0 left-0 z-0 h-screen w-full">
        <Steps />
        {/* <Navigation /> */}
        {/* <Skip /> */}
        {/* <div className="absolute left-0 z-10 flex items-center justify-between w-full px-6 md:justify-end bottom-10">
        </div> */}
      </div>

      {/* Remove the same height as the sticky one by using the margin */}
      <div className="-mt-[99vh]">
        {STEPS.map(({ id, animationStep }) => (
          <ScrollSection key={id} step={id} animationStep={animationStep} />
        ))}
      </div>
    </section>
  );
};

export default Intro;
