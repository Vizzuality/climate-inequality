import { Button } from 'components/button/component';

import FadeYScroll from '../animations/fade-y-scroll/component';
import RiveAnimation from '../rive-components/rive';

const Title = () => {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="h-[calc(100vh-78px)] w-full pt-24">
      <FadeYScroll threshold={0.25}>
        <div className="absolute top-[-25%] left-[-75%] -z-10 h-screen w-full sm:-top-[85%] sm:-left-[33.33%]">
          <RiveAnimation
            className="h-[100vh] w-[100vh] opacity-30 sm:h-[122vw] sm:w-[122vw]"
            src="/animations/init_animation.riv"
            autoplay
          />
        </div>
        <div className="container">
          <h1 className="items-center justify-start pb-2 text-left text-sm font-semibold text-500">
            Vizzuality&lsquo;s look at climate action and equality.
          </h1>
          <div className="flex items-center justify-start pb-6 text-left font-serif text-[40px] font-normal leading-tight text-white sm:text-4xl lg:w-5/6 lg:text-5xl lg:leading-[90px]">
            We believe in a sustainable and just future for all, where equality is core.
          </div>
          <div className="pb-16 text-left text-base font-light leading-tight text-white sm:text-xl sm:leading-8 lg:w-9/12">
            The climate crisis threatens that reality. To create the world <br /> we believe in, we
            need to understand these dynamics.
          </div>
          <div>
            <Button onClick={handleScroll} theme="transparent" size="xs" className="px-0">
              <RiveAnimation
                className="h-10 w-10"
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
