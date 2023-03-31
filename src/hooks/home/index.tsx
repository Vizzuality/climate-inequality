import { useMemo } from 'react';

import { lastStepAtom, stepAtom } from 'store/home';

import { useRecoilValue } from 'recoil';

import type { UseScrollDirectionReturnProps } from './types';

export function useScrollDirection(): UseScrollDirectionReturnProps {
  const step = useRecoilValue(stepAtom);
  const lastStep = useRecoilValue(lastStepAtom);

  const direction = useMemo(() => {
    if (step < lastStep) {
      return -1;
    }

    if (step > lastStep) {
      return 1;
    }

    return 0;
  }, [step, lastStep]);

  return {
    direction,
  };
}
