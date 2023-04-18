import classNames from 'classnames';

import Image from 'next/image';

const projects = [
  'Half Earth',
  'Global Forest Watch',
  'NGO Aid Map',
  'Environmental democracy index',
  'Climate Watch',
  'Care USA',
  'SDG16 Data initiative',
  'Marxan',
];

const Prioritising = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <div className="container flex h-full flex-col justify-between pt-14 pb-6 text-black md:pb-14">
        <div className="flex flex-col md:flex-row">
          <h2 className="mb-6 flex-1 font-serif text-2xl leading-tight md:mb-0 md:text-[56px]">
            Prioritising people and planet
          </h2>
          <div className="flex-1 text-sm md:text-base">
            <p>
              At Vizzuality, our purpose is to help{' '}
              <span className="font-semibold">
                ensure a better future for our planet and society
              </span>{' '}
              . We create engaging data-based knowledge platforms to inform{' '}
              <span className="font-semibold">solutions towards sustainability and equality</span>.
              Platforms that support the global shifts towards a society that puts people and the
              planet at the centre.
            </p>
            <p className="mt-4 font-semibold">
              We work with partner organisations that share this mission. Here are some of the
              projects we have designed and developed:
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-9">
        {projects.map((project, index) => {
          const isFirstOrLast = index === 0 || index === 7;
          return (
            <div
              key={project}
              className={classNames('max-h-[25vh] w-full md:max-h-80', {
                'col-span-1 md:col-span-3': isFirstOrLast,
                'col-span-1 md:col-span-2': !isFirstOrLast,
              })}
            >
              <p className="h-0 max-w-[calc(100%-36px)] translate-y-14 pl-9">{project}</p>
              <Image
                alt=""
                className="h-full w-full object-cover"
                width={isFirstOrLast ? 455 : 328}
                height={320}
                src={`/images/${project}.png`}
                sr-hidden
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prioritising;
