import Image from 'next/image';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

const EmissionsDistribution = () => {
  return (
    <div
      className="container my-14 flex
    h-screen flex-col justify-evenly sm:my-0"
    >
      <div className="max-w-lg">
        <SectionTitle>Distribution of emissions.</SectionTitle>
        <SectionSubtitle className="mt-2 mb-6" size="small">
          The top 10% are responsible for nearly 50% of emissions.
        </SectionSubtitle>
        <p className="text-base">
          The wealthiest people are better positioned to deal with the impacts and adaptations to
          the climate crisis. Meanwhile, the people who contribute least to the crisis also have the
          least financial resources to react to its impacts.
        </p>
      </div>
      <div>
        <div className="w-full text-xs sm:text-sm">
          <div className="flex items-end justify-end">
            <div className="w-full">
              <div className="mb-5 text-end">Top 0.1%</div>
              <div className="mb-4 mr-[1%] text-end">Top 1%</div>
              <div className="mb-3 flex sm:text-center">
                <p className="flex-[5]">Bottom 50%</p>
                <p className="flex-[4]">Middle 40%</p>
                <p className="flex-1 whitespace-nowrap text-white text-opacity-50 sm:text-500 sm:text-opacity-100">
                  Top 10%
                </p>
              </div>
            </div>
            <div className="flex items-end">
              <div className="absolute h-[50px] w-[1%] -translate-x-[calc(100%-1px)] border-l border-dashed border-white"></div>
              <div className="h-[90px] w-0 -translate-x-[1px] border-r border-dashed border-white"></div>
            </div>
          </div>
          <div>
            <Image
              className="hidden w-full sm:block"
              alt=""
              src="/images/emission-distribution.svg"
              height={240}
              width={1230}
            />
            <Image
              className="w-full sm:hidden"
              alt=""
              src="/images/emission-distribution-sm.svg"
              width={322}
              height={141}
            />
          </div>
          <div className="mt-1 flex w-full text-center text-xs sm:text-sm">
            <p className="w-[12%]">12%</p>
            <p className="w-[40%]">40.4%</p>
            <p className="w-[48%] text-500">47.6%</p>
          </div>
        </div>
        <p className="mt-4 text-center font-serif text-xs sm:text-sm">Share of emissions</p>
      </div>
      <div className="place-items-end text-xs sm:self-end sm:text-sm">
        <p className="sm:text-end">
          Source:{' '}
          <a
            className="underline"
            href="https://wid.world/data/"
            target="_blank"
            rel="noopener noreferrer"
          >
            World Inequality Database
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmissionsDistribution;
