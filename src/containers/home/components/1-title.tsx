import { useBreakpoint } from 'hooks/breakpoint';

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
    <div className="pt-18 w-full xl:pt-24">
      <FadeYScroll threshold={0.25}>
        <div className="absolute top-0 -z-10 h-screen w-screen overflow-hidden ">
          <RiveAnimation
            className="h-[122vh] w-[122vh]
            translate-x-[-75vw] translate-y-[-40vh] opacity-40 sm:h-[122vw] sm:w-[122vw] sm:-translate-x-[45vw] sm:-translate-y-[95vh]"
            src="/animations/init_animation.riv"
            autoplay
          />
        </div>
        <div className="container flex h-full flex-col">
          <div>
            <div className="items-center justify-start pb-2 text-left text-sm font-semibold text-500">
              Vizzuality&lsquo;s look at climate action and equality.
            </div>
            <div className="flex items-center justify-start pb-6 text-left font-serif text-[40px] font-normal leading-tight text-white sm:text-4xl lg:w-5/6 lg:text-5xl lg:leading-[90px]">
              We believe in a sustainable and just future for all, where equality is core.
            </div>
            <div className="pb-16 text-left text-base font-light leading-tight text-white sm:text-xl sm:leading-8 lg:w-9/12">
              The climate crisis threatens that reality. To create the world <br /> we believe in,
              we need to understand these dynamics.
            </div>
          </div>
          <div className="flex justify-center sm:block">
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
