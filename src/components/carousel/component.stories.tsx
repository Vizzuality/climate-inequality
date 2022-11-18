import { Story } from '@storybook/react/types-6-0';

import Carousel from './component';
import { CarouselProps } from './types';

const StoryCarousel = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {},
};

export default StoryCarousel;

const Template: Story<CarouselProps> = ({ ...args }: CarouselProps) => <Carousel {...args} />;

export const Default = Template.bind({});
Default.args = {
  slides: [
    {
      id: 1,
      content: (
        <div
          className="relative w-full"
          style={{
            paddingBottom: '56.25%',
          }}
        >
          <div
            className="absolute h-full w-full rounded-3xl bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://dummyimage.com/866x565/000/fff.png&text=01)',
            }}
          />
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div
          className="relative w-full"
          style={{
            paddingBottom: '56.25%',
          }}
        >
          <div
            className="absolute h-full w-full rounded-3xl bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://dummyimage.com/866x565/000/fff.png&text=02)',
            }}
          />
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div
          className="relative w-full"
          style={{
            paddingBottom: '56.25%',
          }}
        >
          <div
            className="absolute h-full w-full rounded-3xl bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://dummyimage.com/866x565/000/fff.png&text=03)',
            }}
          />
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div
          className="relative w-full"
          style={{
            paddingBottom: '56.25%',
          }}
        >
          <div
            className="absolute h-full w-full rounded-3xl bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://dummyimage.com/866x565/000/fff.png&text=04)',
            }}
          />
        </div>
      ),
    },
  ],
  options: {
    duration: 500,
    circular: true,
    bound: false,
  },
};
