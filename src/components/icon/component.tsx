import { FC } from 'react';

import cx from 'classnames';

import type { IconProps } from './types';

export const Icon: FC<IconProps> = ({ icon, className = 'w-5 h-5', style, ...rest }: IconProps) => {
  const viewBox = typeof icon === 'string' ? rest.viewBox || '0 0 32 32' : icon.viewBox;
  const id = typeof icon === 'string' ? icon : icon.id;
  return (
    <svg
      className={cx({
        'fill-current': true,
        [className]: className,
      })}
      viewBox={viewBox}
      style={style}
      {...rest}
    >
      <use xlinkHref={`#${id}`} />
    </svg>
  );
};

export default Icon;
