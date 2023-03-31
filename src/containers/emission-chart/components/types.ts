import { MutableRefObject } from 'react';

import { SliderProps } from 'components/forms/slider/types';

export type YearSlideProps = Omit<SliderProps, 'value' | 'onChange'> & {
  /** Array of year options */
  years: number[];
  /** Selected year value */
  value: number;
  /** Callback on change year value */
  onChange: (v: number) => void;
  /** ref of label element */
  labelRef: MutableRefObject<HTMLLabelElement>;
  /** whether is a mobile size device */
  isMobile?: boolean;
};
