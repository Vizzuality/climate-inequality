import Header from 'containers/header';

import { Button } from 'components/button/component';

import FadeYScroll from '../animations/FadeYScroll/component';
import RiveAnimation from '../rive-components/rive';

type TitleProps = {
  handleScrollToNext: () => void;
};

const Title = ({ handleScrollToNext }: TitleProps) => {
  return (
    <FadeYScroll className="container" threshold={0.25}>
      <Header />
      <RiveAnimation
        className="absolute -top-[87%] -left-[40%] -z-10 h-[122vw] w-[122vw] opacity-30"
        src="/animations/init_animation.riv"
        autoplay
      />
      <>
        <div className="items-center justify-start pb-2 text-left text-sm font-semibold text-500">
          Vizzuality&lsquo;s look at climate action and equality.
        </div>
        <div className="flex items-center justify-start pb-6 text-left font-serif text-[40px] font-normal leading-tight text-white sm:text-4xl lg:w-5/6 lg:text-5xl lg:leading-[90px]">
          We believe in a sustainable and just future for all, where equality is core.
        </div>
        <div className="pb-16 text-left text-base font-light leading-tight text-white sm:text-xl sm:leading-8 lg:w-9/12">
          The climate crisis threatens that reality. To create the world <br /> we believe in, we
          need to understand these dynamics.
        </div>
        <div>
          <Button theme="transparent" size="xs" className="w-24" onClick={handleScrollToNext}>
            <RiveAnimation className="h-10 w-10" src="/animations/scroll_down_arrow.riv" autoplay />
          </Button>
        </div>
      </>
    </FadeYScroll>
  );
};

export default Title;
