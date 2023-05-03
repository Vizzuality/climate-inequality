import classNames from 'classnames';

const projects = [
  { name: 'Half Earth', url: 'https://www.half-earthproject.org/' },
  { name: 'Global Forest Watch', url: 'https://www.globalforestwatch.org/' },
  { name: 'NGO Aid Map', url: 'https://ngoaidmap.org/' },
  { name: 'Environmental democracy index', url: 'https://www.environmentaldemocracyindex.org/' },
  { name: 'Climate Watch', url: 'https://www.climatewatchdata.org/' },
  { name: 'Care USA', url: 'https://www.care.org/' },
  { name: 'SDG16 Data initiative', url: 'https://www.sdg16.org/' },
  { name: 'Marxan', url: 'https://marxanplanning.org/' },
];

const Prioritising = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <div className="container flex h-full flex-col justify-between pt-14 pb-6  text-black md:pt-24 md:pb-14 xl:pt-28">
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
          const { name, url } = project;
          const isFirstOrLast = index === 0 || index === 7;
          return (
            <a
              href={url}
              target="_blank"
              key={name}
              className={classNames('h-[30vh] w-full bg-cover bg-center xl:h-[35vh]', {
                'col-span-1 md:col-span-3': isFirstOrLast,
                'col-span-1 md:col-span-2': !isFirstOrLast,
              })}
              style={{ backgroundImage: `url('/images/projects/${name}.png')` }}
              rel="noreferrer"
            >
              <p className="h-0 max-w-[calc(100%-36px)] translate-y-14 pl-9">{name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Prioritising;
