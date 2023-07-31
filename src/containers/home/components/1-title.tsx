import { useBreakpoint } from 'hooks/breakpoint';

import AI from 'components/ai';
import { Button } from 'components/button/component';

import FadeYScroll from '../animations/fade-y-scroll/component';
import RiveAnimation from '../rive-components/rive';

const Title = () => {
  const breakpoint = useBreakpoint();
  const handleScroll = () => {
    if (breakpoint('sm')) {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-18 container flex w-full flex-1 xl:pt-24">
      <FadeYScroll threshold={0.25} className="flex flex-col">
        <div className="absolute left-0 top-0 -z-10 h-screen w-screen overflow-hidden">
          {/* In mobile the size and positioning are calculated based on the HEIGHT, and in desktop are based on WIDTH */}
          <RiveAnimation
            className="h-[122vh] w-[122vh]
            translate-x-[-50vh] translate-y-[-40vh] opacity-40 sm:h-[122vw] sm:w-[122vw] sm:-translate-x-[35vw] sm:-translate-y-[25vh] lg:-translate-y-[95vh] lg:-translate-x-[45vw]"
            src="/animations/init_animation.riv"
            autoplay
          />
        </div>
        <div className="small-container flex flex-1 flex-col items-center justify-between sm:block sm:justify-start">
          <div className="flex flex-1 flex-col justify-center">
            <div className="items-center justify-start pb-2 text-left text-sm font-semibold text-500">
              Vizzuality&lsquo;s look at climate action and equality.
            </div>
            <div className="flex items-center justify-start pb-6 text-left font-serif text-[40px] font-normal leading-tight text-white sm:text-4xl lg:w-5/6 lg:text-5xl lg:leading-[90px]">
              We believe in a sustainable and just future for all, where equality is core.
            </div>
            <div className="pb-16 text-left text-base font-light leading-tight text-white sm:text-xl sm:leading-8 lg:w-9/12">
              The climate crisis threatens that reality. To create the world we believe in, we need
              to understand these dynamics.
            </div>
          </div>
          <AI />
          <div className="mb-14 flex justify-center sm:mb-0 sm:block">
            <Button
              onClick={handleScroll}
              theme="transparent"
              size="xs"
              className="pointer-events-none px-0 sm:pointer-events-auto lg:-translate-x-4"
            >
              <RiveAnimation
                className="h-10 w-10 lg:h-14 lg:w-14"
                src="/animations/scroll_down_arrow.riv"
                autoplay
              />
            </Button>
          </div>
        </div>
      </FadeYScroll>
    </div>
  );
};

export default Title;
