import Icon from 'components/icon/component';
import SectionSubtitle from 'components/section-subtitle';
import SectionTitle from 'components/section-title';

import MapLegend from 'svgs/ui/map-legend.svg';

const contents = [
  {
    title: 'Vulnerability to climate impacts.',
    subtitle: 'Which countries are most at risk?',
  },
  {
    title: 'Readiness to adapt to climate impacts.',
    subtitle: 'Readiness to adapt to climate impacts.',
  },
];

const Countries = ({ isReadness = false }) => {
  const content = isReadness ? contents[1] : contents[0];
  return (
    <div className="container flex min-h-screen flex-col justify-between py-14 sm:py-24 xl:justify-around">
      <div className="sm:w-1/2">
        <SectionTitle>{content.title}</SectionTitle>
        <SectionSubtitle className="mt-2 mb-6" size="small">
          {content.subtitle}
        </SectionSubtitle>
        <p className="sm:text-base">
          {isReadness ? (
            <>
              Vulnerability measures a country&apos;s exposure, sensitivity and ability to adapt to
              negative climate impacts. This{' '}
              <a
                className="underline"
                href="https://gain.nd.edu/our-work/country-index/"
                target="_blank"
                rel="noopener noreferrer"
              >
                dataset
              </a>{' '}
              considers vulnerability in six life-supporting sectors -{' '}
              <span className="font-semibold">
                food, water, health, ecosystem service, human habitat and infrastructure
              </span>
              .
            </>
          ) : (
            <>
              Readiness measures a country&apos;s ability to leverage investments and convert them
              to adaptation actions. This{' '}
              <a
                className="underline"
                href="https://gain.nd.edu/our-work/country-index/"
                target="_blank"
                rel="noopener noreferrer"
              >
                dataset
              </a>{' '}
              considers readiness by three components -{' '}
              <span className="font-semibold">
                economic readiness, governance readiness and social readiness
              </span>
              .
            </>
          )}
        </p>
      </div>
      <div className="w-full">
        <img alt="map" width={1217} height={529} src="/images/map.png" />
        <div className="mt-3 flex justify-center text-2xs">
          <div className="w-full sm:w-auto">
            <span className="text-xs">{isReadness ? 'Readness' : 'Vulnerability'}</span>
            <Icon className="mt-1 mb-0.5 w-full sm:w-[228px]" icon={MapLegend} />
            <div className="flex justify-between">
              <span>Worse</span>
              <span>Better</span>
            </div>
          </div>
        </div>
        <div className="mt-9 w-full text-sm text-ligth-gray sm:mt-0 sm:-translate-y-full sm:text-end">
          <p>
            Source:{' '}
            <a
              className="underline"
              href="https://gain.nd.edu/our-work/country-index/methodology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ND-GAIN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countries;
