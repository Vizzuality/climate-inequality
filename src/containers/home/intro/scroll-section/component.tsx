import React, { useEffect, useRef } from 'react';

import { stepAtom } from 'store/home';

import { useInView } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export interface ScrollSectionProps {
  step: number;
  animationStep: number;
}

const ScrollSection = ({ animationStep }: ScrollSectionProps) => {
  const ref = useRef();
  const isInView = useInView(ref, { amount: 0.5 });
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setAnimationStep = (step) => 0; // useHomeStore((state) => state.setAnimationStep);

  useEffect(() => {
    if (isInView) {
      setStep(step);
      setAnimationStep(animationStep);
    }
  }, [step, animationStep, setStep, setAnimationStep, isInView]);

  return (
    <div
      id={`scroll-${step}`}
      ref={ref}
      className="pointer-events-none relative h-screen w-full snap-start snap-always"
    />
  );
};

export default ScrollSection;
