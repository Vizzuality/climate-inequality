import Icon from 'components/icon';

import ArrowDown from 'svgs/ui/arrow-down.svg';

const Title = () => {
  return (
    <div className="container">
      <div className="items-center justify-start pb-2 text-left text-sm font-semibold text-500">
        Vizzuality&lsquo;s look at climate action and equality.
      </div>
      <div className="flex items-center justify-start pb-6 text-left font-serif text-[40px] font-normal leading-tight text-white sm:text-4xl lg:w-5/6 lg:text-5xl lg:leading-[90px]">
        We believe in a sustainable and just future for all, where equality is core.
      </div>
      <div className="pb-16 text-left text-base font-light leading-tight text-white sm:text-xl sm:leading-8 lg:w-9/12">
        The climate crisis threatens that reality. To create the world <br /> we believe in, we need
        to understand these dynamics.
      </div>
      <div>
        <Icon className="h-12 w-6 fill-500" icon={ArrowDown} />
      </div>
    </div>
  );
};

export default Title;