import Image from 'next/image';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title';

const ClimateCrisis = () => {
  return (
    <div className="min-h-[150vh] sm:min-h-screen">
      <div className="absolute left-0 h-full min-h-[150vh] w-full overflow-hidden bg-white sm:min-h-screen">
        <div className="container flex h-screen min-h-screen flex-col justify-between gap-6 pt-14 lg:mt-0 lg:justify-start lg:gap-0">
          <div className="flex-0">
            <SectionTitle className="mb-4" color="green">
              Climate crisis and inequality.
            </SectionTitle>
            <SectionSubtitle size="large" className="text-900">
              The climate crisis multiplies the threats of existing inequality.
            </SectionSubtitle>
          </div>
          <div className="flex flex-1 flex-col-reverse items-center justify-end gap-8 sm:gap-10 lg:mt-0 lg:flex-row lg:gap-[120px] xl:gap-[160px]">
            <div className="flex-1">
              <div className="left-0 bottom-0 w-screen sm:translate-x-0 lg:absolute lg:max-h-[55%] lg:max-w-[50%] lg:-translate-x-4 xl:max-h-[60%]">
                <Image
                  className="w-screen lg:hidden"
                  alt=""
                  src="/images/climate-crisis-sm.png"
                  width={672}
                  height={484}
                />
                <Image
                  className="hidden w-full lg:block"
                  alt=""
                  src="/images/climate-crisis.png"
                  width={360}
                  height={484}
                />
              </div>
            </div>
            <div className="flex-1 text-sm text-900 xl:text-base">
              <p>
                We are all affected by the climate crisis, but{' '}
                <span className="font-semibold">
                  the impacts are not felt equally or fairly across the globe
                </span>
                . The climate impacts - shifting weather patterns, droughts, flooding, and storms -
                disproportionately affect{' '}
                <span className="font-semibold">
                  people already experiencing inequality and injustice
                </span>
                .
              </p>
              <p className="my-2">
                People facing additional inequalities are more vulnerable to the risks and are in
                less resilient positions to cope and recover due to governance, finances and
                barriers of discrimination. People risk losing their homes and livelihoods to
                extreme weather events. Think of farmers, fishers and people near waterways. They
                risk health impacts from extreme conditions and pollution, war, and civil unrest
                over food and water shortages…
              </p>
              <p className="font-semibold">The list goes on.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateCrisis;
