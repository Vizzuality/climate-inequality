import classNames from 'classnames';

import Icon from 'components/icon';
import SectionSubtitle from 'components/section-subtitle';

import ArrowRigth from 'svgs/ui/arrow-right-3.svg';

const content = [
  'Multidimensional Inequality',
  'Greater exposure to climate hazards',
  'Less ability to cope with and recover from the damages caused by climate hazards',
  'Greater susceptibility to damages caused by climate hazards',
  'Disproportionate loss of assets and income and greater inequality',
];

const Multidimensional = () => {
  const Circle = ({ classname = '', text = '' }) => {
    return (
      <div
        className={classNames(
          'flex aspect-square h-44 w-44 flex-[2.5] flex-shrink-0 items-center justify-center rounded-full border-4 border-500 bg-white p-4 lg:h-full lg:w-full lg:p-5',
          { [classname]: true }
        )}
      >
        <p className="text-center text-sm font-semibold leading-tight xl:text-base">{text}</p>
      </div>
    );
  };

  const Arrow = ({ classname = '' }) => {
    return (
      <div
        className={classNames('flex w-8 flex-1  flex-shrink-0 fill-white', {
          [classname]: true,
        })}
      >
        <Icon className="h-[38px] w-[38px]" icon={ArrowRigth} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-500 text-900 lg:h-screen">
      <div className="container flex min-h-screen flex-col items-end justify-around gap-8 py-20 lg:gap-4">
        <SectionSubtitle className=" text-900" size="large">
          3.3 to 3.6 billion people live in areas highly vulnerable to climate impacts yet are the
          least responsible for the crisis.
        </SectionSubtitle>
        <div className="flex h-full w-full flex-col items-center justify-between lg:flex-row">
          <Circle text={content[0]} />
          <Arrow classname="rotate-90 lg:rotate-0 translate-y-3 lg:translate-y-0 justify-end" />
          <Circle
            text={content[1]}
            classname="z-0 translate-y-6 lg:translate-y-0 lg:translate-x-[10%]"
          />
          <Circle text={content[2]} classname="z-10" />
          <Circle
            text={content[3]}
            classname="z-20 lg:-translate-x-[10%] -translate-y-6 lg:translate-y-0"
          />
          <Arrow classname="rotate-90 lg:rotate-0 -translate-y-3 lg:translate-y-0 justify-start" />
          <Circle text={content[4]} classname="bg-black text-500" />
        </div>
        <div className="lg:w-1/2">
          <p>
            As per the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://www.ipcc.ch/report/ar6/wg2/"
            >
              2022 IPCC report
            </a>
            , <span className="font-semibold">climate vulnerability</span> is driven by patterns of
            socioeconomic development, unsustainable ocean and land use, inequity, marginalisation,
            historical and ongoing patterns of inequity such as colonialism, and governance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Multidimensional;
