import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title';

const ClimateCrisis = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex min-h-screen flex-col justify-between gap-6 pt-14 lg:mt-0 lg:justify-start lg:gap-0 lg:pt-[104px]">
        <div className="flex-0 container mb-6 lg:mb-20">
          <SectionTitle className="mb-4" color="green">
            Climate crisis and inequality.
          </SectionTitle>
          <SectionSubtitle size="xlarge" className="text-900">
            The climate crisis multiplies the threats of existing inequality.
          </SectionSubtitle>
        </div>
        <div className="flex h-full w-full flex-1 flex-col-reverse items-center gap-8 lg:mt-0 lg:h-screen lg:flex-row lg:justify-end lg:gap-0">
          <div
            className="h-full min-h-[484px] w-full place-self-end lg:h-[50vh] lg:flex-[3] 2xl:h-[60vh]"
            style={{
              backgroundImage: 'url("/images/climate-crisis.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="container text-sm text-900 lg:flex-[2.5] xl:text-base">
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
              People facing additional inequalities are more vulnerable to the risks and are in less
              resilient positions to cope and recover due to governance, finances and barriers of
              discrimination. People risk losing their homes and livelihoods to extreme weather
              events. Think of farmers, fishers and people near waterways. They risk health impacts
              from extreme conditions and pollution, war, and civil unrest over food and water
              shortages…
            </p>
            <p className="font-semibold">The list goes on.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateCrisis;
