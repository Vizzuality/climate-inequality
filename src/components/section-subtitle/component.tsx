import classNames from 'classnames';

import { SectionSubtitleProps } from './types';

const SectionSubtitle = ({ children, size = 'medium', className }: SectionSubtitleProps) => {
  return (
    <h3
      className={classNames('font-serif font-normal leading-tight', {
        'text-xl sm:text-2xl': size === 'medium',
        'text-2xl sm:text-3xl lg:text-[56px]': size === 'large',
        'text-[40px] sm:text-4xl lg:text-5xl': size === 'xlarge',
        [className]: !!className,
      })}
    >
      {children}
    </h3>
  );
};

export default SectionSubtitle;
