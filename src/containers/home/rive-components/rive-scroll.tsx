// @refresh reset
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

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
  scrollY: MotionValue<number>;
  playTrigger?: number;
}) => {
  const { rive, RiveComponent } = useRive({
    src: `/animations/${fileName}.riv`,
    autoplay,
    animations,
    stateMachines: [stateMachine],
  });

  const levelInput = useStateMachineInput(rive, stateMachine, stateMachineInput);

  useMotionValueEvent(scrollY, 'change', (v) => {
    if (!levelInput) return;
    levelInput.value = v * 100;
  });

  return <RiveComponent id={`animation-${fileName}`} className={className} />;
};

export default RiveScrollAnimation;
