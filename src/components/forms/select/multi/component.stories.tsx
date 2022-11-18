import { Story } from '@storybook/react/types-6-0';

import Select from './component';
import type { MultiSelectProps } from './types';

const StorySelect = {
  title: 'Components/Forms/Select/Multiple',
  component: Select,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    initialValues: {
      table: {
        disable: true,
      },
    },
  },
};

export default StorySelect;

const Template: Story<MultiSelectProps> = (args) => (
  <div className="relative text-white">
    <Select {...args} />
  </div>
);

export const Light = Template.bind({});
Light.args = {
  theme: 'light',
  size: 'base',
  placeholder: 'Select...',
  values: [],
  options: [
    {
      label: 'Wade Cooper',
      value: 'Wade Cooper',
    },
    {
      label: 'Arlene Mccoy',
      value: 'Arlene Mccoy',
    },
    {
      label: 'Devon Webb',
      value: 'Devon Webb',
    },
    {
      label: 'Tom Cook',
      value: 'Tom Cook',
    },
    {
      label: 'Tanya Fox',
      value: 'Tanya Fox',
    },
    {
      label: 'Hellen Schmidt',
      value: 'Hellen Schmidt',
    },

    {
      label: 'Caroline Schultz',
      value: 'Caroline Schultz',
    },
    {
      label: 'Mason Heaney',
      value: 'Mason Heaney',
    },
    {
      label: 'Claudie Smitham',
      value: 'Claudie Smitham',
    },
    {
      label: 'Emil Schaefer',
      value: 'Emil Schaefer',
    },
  ],
  clearSelectionActive: true,
  batchSelectionActive: true,
  loading: false,
  onSelect: (option) => console.info(option),
};

export const Dark = Template.bind({});
Dark.args = {
  theme: 'dark',
  size: 'base',
  placeholder: 'Select...',
  values: [],
  options: [
    {
      label: 'Wade Cooper',
      value: 'Wade Cooper',
    },
    {
      label: 'Arlene Mccoy',
      value: 'Arlene Mccoy',
    },
    {
      label: 'Devon Webb',
      value: 'Devon Webb',
    },
    {
      label: 'Tom Cook',
      value: 'Tom Cook',
    },
    {
      label: 'Tanya Fox',
      value: 'Tanya Fox',
    },
    {
      label: 'Hellen Schmidt',
      value: 'Hellen Schmidt',
    },

    {
      label: 'Caroline Schultz',
      value: 'Caroline Schultz',
    },
    {
      label: 'Mason Heaney',
      value: 'Mason Heaney',
    },
    {
      label: 'Claudie Smitham',
      value: 'Claudie Smitham',
    },
    {
      label: 'Emil Schaefer',
      value: 'Emil Schaefer',
    },
  ],
  clearSelectionActive: true,
  batchSelectionActive: true,
  onSelect: (option) => console.info(option),
};
