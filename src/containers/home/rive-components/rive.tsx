import { useRive } from '@rive-app/react-canvas';

export type RiveAnimationProps = {
  className: string;
  src: string;
  animations?: string[];
  stateMachines?: string[];
  autoplay?: boolean;
};

/** This component isolates the useRive function preventing dev errors  */
const RiveAnimation = ({
  className,
  src,
  autoplay = false,
  animations,
  stateMachines,
}: RiveAnimationProps) => {
  const { RiveComponent } = useRive({
    src,
    autoplay,
    animations,
    stateMachines,
  });
  return <RiveComponent className={className} />;
};
export default RiveAnimation;
