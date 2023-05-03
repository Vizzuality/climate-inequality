import classNames from 'classnames';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

const DistributionDefault = ({ isOnePercent = false }) => {
  const text = isOnePercent
    ? 'The 10 richest men in the world own more than the bottom 3.1 billion people.'
    : 'Globally, the median income is €7.20 per person per day. This is only 71c more than the poverty line for upper-middle income countries which is €6.49 per day.';

  return (
    <div
      className={classNames(
        'container flex min-h-screen w-full flex-col items-center justify-between py-20 sm:my-0',
        {
          'min-h-[150vh] sm:min-h-screen': isOnePercent,
        }
      )}
    >
      <div className="max-w-3xl">
        <SectionTitle>Distribution of global wealth.</SectionTitle>
        <SectionSubtitle className="mt-2 mb-6" size="small">
          {text}
        </SectionSubtitle>
      </div>
      <div>
        <p className="font-serif text-xs text-light-gray sm:hidden">
          Distribution of pre-tax national income by population group (2021).
        </p>
      </div>

      <div className="mt-5 flex w-full justify-between text-xs text-light-gray sm:text-sm">
        <p className="hidden font-serif sm:block">
          Distribution of pre-tax national income by population group (2021).
        </p>
        <p>
          Source:{' '}
          <a
            className="underline"
            href="https://www.figma.com/file/tfBBt7rL4Rt0NJs7swlZdE/V2---Vizz-branding?node-id=347-55549&t=jWrtaEw0X7czunMf-4"
          >
            World Inequality Database, World Bank
          </a>
        </p>
      </div>
    </div>
  );
};

export default DistributionDefault;
