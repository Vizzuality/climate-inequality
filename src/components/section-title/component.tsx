import classNames from 'classnames';

import { SectionTitleProps } from './types';

const SectionTitle = ({ children, color = 'yellow', className }: SectionTitleProps) => {
  return (
    <h2
      className={classNames('text-sm font-semibold', {
        'text-500': color === 'yellow',
        'text-green': color === 'green',
        [className]: !!className,
      })}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
