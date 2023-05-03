/* eslint-disable prettier/prettier */
import { FC } from 'react';

import classNames from 'classnames';

import { RadioGroup } from '@headlessui/react';

import { RadioButtonProps } from './types';

const { Option } = RadioGroup;

const RadioButton: FC<RadioButtonProps> = ({ value, onChange, options, name, id, size = 'md' }) => {
  return (
    <RadioGroup id={id || name} onChange={onChange} name={name} value={value} className="flex border rounded-full cursor-pointer border-500 w-fit">
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {({ checked }) => (
            <div className={classNames("px-4 text-xs transition-all duration-500 bg-500 font-semibold", {
              'bg-opacity-100 text-black rounded-full': checked,
              'bg-opacity-0 rounded-none  text-600': !checked,
              'py-1.5': size === 'md',
            })}>{option.label}</div>
          )}
        </Option>
      ))}
    </RadioGroup>
  );
};

export default RadioButton;
