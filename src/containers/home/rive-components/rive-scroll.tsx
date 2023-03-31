// @refresh reset
import { useRef } from 'react';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const RiveScrollAnimation = ({ fileName }: { fileName: string }) => {
  const { rive, RiveComponent } = useRive({
    src: `/animations/${fileName}`,
    autoplay: true,
    animations: ['Circle'],
  });
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 300%'],
  });

  const threshold = 0.1;
  const clamp = (v) => {
    if (v < threshold) {
      const p = (threshold - v) * (1 / threshold) * 2;

      // clamp value between 0 and 1
      return 1 - Math.min(Math.max(p, 0), 1);
    }

    if (v > 1 - threshold) {
      const p = (threshold - (1 - v)) * (1 / threshold) * 2;
      return 1 - Math.min(Math.max(p, 0), 1);
    }

    return 1;
  };
  const levelInput = useStateMachineInput(rive, 'Circle', 'scrollPos');
  const progress = useTransform(scrollYProgress, (v) => clamp(v));
  useMotionValueEvent(progress, 'change', (latest) => {
    if (levelInput) {
      levelInput.value = latest * 100;
    }
  });
  return (
    <>
      <RiveComponent ref={ref} id="animation" className="abolute top-0 h-[300vh] w-screen" />
    </>
  );
};
export default RiveScrollAnimation;
