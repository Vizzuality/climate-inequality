import Icon from 'components/icon/component';
import SectionTitle from 'components/section-title/component';

import InvestmentsIcon from 'svgs/ui/investments.svg';

const Investment = () => {
  return (
    <div className="flex min-h-screen bg-500 sm:h-screen sm:min-h-fit">
      <div className="container flex flex-col justify-between py-14 text-black sm:h-full">
        <div className="sm:w-1/2">
          <SectionTitle className="mb-6">When needs and investment do not align.</SectionTitle>
          <p className="text-sm sm:text-base">
            According to estimates by the{' '}
            <a
              href="https://www.worldbank.org/en/news/feature/2022/05/19/what-you-need-to-know-about-nature-based-solutions-to-climate-change"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              World Bank
            </a>
            , nature-based solutions can provide 37% of the mitigation needed to reach the Paris
            Agreement targets. Yet what we see today tells a story that priorities are going
            elsewhere.
          </p>
        </div>
        <div className="mt-16 sm:mt-0">
          <Icon className="w-full" icon={InvestmentsIcon} />
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-0">
          <p className="flex-1 font-serif text-sm">
            The trend over time in total commitments and disbursements of finance for Nature Based
            solutions approaches to address climate change from 2016-2020
          </p>
          <p className="flex-1 text-sm sm:text-right">
            Source:{' '}
            <a
              href="https://www.sei.org/wp-content/uploads/2022/11/sei-wp-assessing-finance-nature-based-solutions-2022.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Stockholm Environment Institute
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
