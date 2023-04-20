/* eslint-disable prettier/prettier */
import { FC } from 'react';

import classNames from 'classnames';

import { RadioGroup } from '@headlessui/react';

import { RadioButtonProps } from './types';

const { Option } = RadioGroup;

const RadioButton: FC<RadioButtonProps> = ({ value, onChange, options, name, id }) => {
  return (
    <RadioGroup id={id || name} onChange={onChange} name={name} value={value} className="flex items-center overflow-hidden border rounded-full cursor-pointer border-500 w-fit">
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {({ checked }) => (
            <div className={classNames("px-4 py-1 text-xs border-none transition-all duration-500 bg-500", {
              'bg-opacity-100 text-black rounded-full': checked,
              'bg-opacity-0 rounded-none border-none text-500': !checked,
            })}>{option.label}</div>
          )}
        </Option>
      ))}
    </RadioGroup>
  );
};

export default RadioButton;
