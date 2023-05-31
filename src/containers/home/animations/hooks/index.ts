import { useMemo, useRef, useState, useEffect } from 'react';

import { animate } from 'framer-motion';

import { useScrollDirection } from 'hooks/home';

import { STEP_DURATION } from 'containers/home/animations/constants';

const useAnimatedCounter = (
  from = 0,
  to = 100,
  duration = 1,
  format = (f) => f,
  enabled = true
) => {
  const controlsRef = useRef(null);
  const [counter, setCounter] = useState<number>(from);

  useEffect(() => {
    controlsRef.current = animate(from, to, {
      duration,
      onUpdate(value) {
        setCounter(value);
      },
    });

    return () => controlsRef.current.stop();
  }, [from, to, duration]);

  useEffect(() => {
    if (enabled) {
      controlsRef.current.play();
    } else {
      controlsRef.current.pause();
    }
  }, [enabled]);

  return format(counter);
};

export const useSoyCounter = (substep) => {
  const lastTo = useRef(0);
  const lastFrom = useRef(0);
  const { direction } = useScrollDirection();

  const from = useMemo(() => {
    switch (substep) {
      case 0:
        return direction === 1 ? 100 : 68;
      case 1:
        return direction === 1 ? 100 : 19;
      case 2:
        return direction === 1 ? 68 : 19;
      case 3:
        return direction === 1 ? 19 : 19;
      default:
        return lastFrom.current;
    }
  }, [substep, direction]);

  const to = useMemo(() => {
    switch (substep) {
      case 0:
        return 100;
      case 1:
        return 68;
      case 2:
        return 19;
      case 3:
        return 19;
      default:
        return lastTo.current;
    }
  }, [substep]);

  lastFrom.current = from;
  lastTo.current = to;

  const counter = useAnimatedCounter(from, to, STEP_DURATION * 2, (v) => parseInt(v.toFixed(0)));

  return counter;
};

export const useSoyFavoredCounter = (substep) => {
  const lastTo = useRef(0);
  const lastFrom = useRef(0);
  const { direction } = useScrollDirection();

  const from = useMemo(() => {
    switch (substep) {
      case 0:
        return direction === 1 ? 0 : 0;
      case 1:
        return direction === 1 ? 0 : 0;
      case 2:
        return direction === 1 ? 0 : 1.4;
      case 3:
        return direction === 1 ? 0 : 1.4;
      default:
        return lastFrom.current;
    }
  }, [substep, direction]);

  const to = useMemo(() => {
    switch (substep) {
      case 0:
        return 0;
      case 1:
        return 0;
      case 2:
        return direction === 1 ? 0 : 1.4;
      case 3:
        return 1.4;
      default:
        return lastTo.current;
    }
  }, [substep, direction]);

  lastFrom.current = from;
  lastTo.current = to;

  const counter = useAnimatedCounter(from, to, STEP_DURATION * 2, (v) => parseFloat(v.toFixed(1)));

  return counter;
};
