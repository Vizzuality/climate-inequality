import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

const contents = [
  {
    title: 'Our vision.',
    subtitle:
      'Equality ensures everyone has an equal opportunity to make the most of their lives and talents.',
  },
  {
    title: 'Our reality.',
    subtitle:
      'Historic, institutional and cultural forces uphold systems of inequality and oppression.',
  },
];

const OurVision = ({ section = 0 }: { section?: 0 | 1 }) => {
  const { title, subtitle } = contents[section];
  return (
    <div className="container flex h-screen flex-col items-center justify-center py-14">
      <div className="absolute z-10 max-w-[60%] text-center lg:max-w-xl">
        <SectionTitle>{title}</SectionTitle>
        <SectionSubtitle className="mt-2">{subtitle}</SectionSubtitle>
      </div>
    </div>
  );
};

export default OurVision;
