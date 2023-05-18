// @refresh reset
import { useEffect } from 'react';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const RiveScrollAnimation = ({
  className,
  fileName,
  animations,
  stateMachine,
  stateMachineInput,
  autoplay = false,
  scrollY,
}: {
  className?: string;
  fileName: string;
  autoplay?: boolean;
  animations?: string[];
  stateMachine: string;
  stateMachineInput: string;
  scrollY: number;
  playTrigger?: number;
}) => {
  const { rive, RiveComponent } = useRive({
    src: `/animations/${fileName}.riv`,
    autoplay,
    animations,
    stateMachines: [stateMachine],
  });

  const levelInput = useStateMachineInput(rive, stateMachine, stateMachineInput);

  useEffect(() => {
    if (levelInput) {
      levelInput.value = scrollY;
    }
  }, [scrollY]);

  return <RiveComponent id={`animation-${fileName}`} className={className} />;
};

export default RiveScrollAnimation;
