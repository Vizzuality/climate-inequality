import EmissionChart from 'containers/emission-chart/component';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title';

const ClimateInjustice = () => {
  return (
    <div className="container mt-24 flex min-h-screen flex-col justify-around space-y-20">
      <div>
        <SectionTitle>Climate injustice.</SectionTitle>
        <div className="mt-2 flex flex-col gap-6 sm:flex-row sm:gap-14">
          <div className="flex-1">
            <SectionSubtitle size="small">
              The wealthiest regions are fortunate to face fewer and less intense climate impacts
            </SectionSubtitle>
          </div>
          <div className="flex-1">
            <p>
              These regions built their wealth on historical emissions and continue to develop at a
              costly emission rate. There is a strong case for wealthier nations to take more
              responsibility in keeping the{' '}
              <a
                className="underline"
                href="https://unfccc.int/news/cop27-reaches-breakthrough-agreement-on-new-loss-and-damage-fund-for-vulnerable-countries"
                target="_blank"
                rel="noopener noreferrer"
              >
                1.5°C
              </a>{' '}
              target alive, and to support the more impacted countries to cope and develop, as seen
              in the{' '}
              <a
                className="underline"
                href="https://unfccc.int/news/cop27-reaches-breakthrough-agreement-on-new-loss-and-damage-fund-for-vulnerable-countries"
                target="_blank"
                rel="noopener noreferrer"
              >
                Loss and Damages Fund
              </a>{' '}
              agreed at COP27.
            </p>
          </div>
        </div>
      </div>
      <EmissionChart />
    </div>
  );
};

export default ClimateInjustice;
