import Image from 'next/image';

import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

const contents = {
  intersectional: {
    title: 'Inequality is intersectional.',
    subtitle:
      'Multiple dimensions of inequality interact with one another and create distinct     experiences and outcomes.',
    p: 'A person born into a low-income, rural family, with little political representation and access to health care, will face many more obstacles to coping with climate impacts than a wealthy person born in the same country.',
    image: '/images/inequality-diagram.svg',
  },
  wealth: {
    title: 'Wealth & income inequality.',
    subtitle:
      'Multiple dimensions of inequality interact with one another and create distinct     experiences and outcomes.',
    p: 'A person born into a low-income, rural family, with little political representation and access to health care, will face many more obstacles to coping with climate impacts than a wealthy person born in the same country.',
    image: '/images/wealth-diagram.svg',
  },
};

const Inequality = ({ type = 'intersectional' }: { type?: 'intersectional' | 'wealth' }) => {
  const content = contents[type];

  return (
    <div className="container mt-14 flex min-h-screen w-full flex-col-reverse items-center justify-between gap-5 sm:mt-0 sm:flex-row sm:gap-10">
      <div className="max-w-lg flex-1">
        <SectionTitle>{content.title}</SectionTitle>
        <SectionSubtitle className="mt-2 mb-6" size="small">
          {content.subtitle}
        </SectionSubtitle>
        <div className="mt-4 text-sm sm:text-base">
          <p>{content.p}</p>
          <p className="mt-4 text-sm sm:text-base">
            {type === 'intersectional' ? (
              <>
                Inequality theory, first introduced by{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.researchgate.net/publication/292413493_Demarginalising_the_intersection_of_race_and_sex_A_black_feminist_critique_of_anti-discrimination_doctrine_feminist_theory_and_anti-racist_politics#:~:text=Black%20feminist%20legal%20scholar%20Kimberl%C3%A9%20Crenshaw%20coined%20the,on%20the%20separated%20grounds%20of%20race%20or%20sex."
                  className="underline"
                >
                  Kimberlé Williams Crenshaw
                </a>{' '}
                , offers us a more holistic lens to understanding climate inequality, than solely
                the place and class a person was born into.
              </>
            ) : (
              <>
                Although inequality is much more than just wealth or income, it plays a big part and
                greatly impacts other dimensions of inequality. Income significantly affects
                individuals&apos;{' '}
                <span className="font-semibold">
                  ability to make the most of their lives and talents
                </span>
                .
              </>
            )}
          </p>
        </div>
      </div>
      <div className="sm:flex-1">
        <Image
          alt="inequality diagram"
          src={content.image}
          className="w-full"
          width={625}
          height={509}
        />
      </div>
    </div>
  );
};

export default Inequality;
