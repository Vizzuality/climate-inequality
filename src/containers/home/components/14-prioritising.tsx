import { useRef } from 'react';

import classNames from 'classnames';

import { useScroll, motion, useTransform } from 'framer-motion';

const projects = [
  [
    { name: 'Half Earth', url: 'https://www.half-earthproject.org/' },
    { name: 'Global Forest Watch', url: 'https://www.globalforestwatch.org/' },
    { name: 'NGO Aid Map', url: 'https://ngoaidmap.org/' },
    { name: 'Environmental democracy index', url: 'https://www.environmentaldemocracyindex.org/' },
  ],
  [
    { name: 'Climate Watch', url: 'https://www.climatewatchdata.org/' },
    { name: 'Care USA', url: 'https://www.care.org/' },
    { name: 'SDG16 Data initiative', url: 'https://www.sdg16.org/' },
    { name: 'Marxan', url: 'https://marxanplanning.org/' },
  ],
];

const Prioritising = () => {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const translateX1 = useTransform(scrollYProgress, [0, 0.25], ['-50%', '0%']);
  const translateX2 = useTransform(scrollYProgress, [0, 0.25], ['50%', '0%']);
  const translateX3 = useTransform(scrollYProgress, [0.25, 0.5], ['-100%', '0%']);
  const translateX4 = useTransform(scrollYProgress, [0.25, 0.5], ['100%', '0%']);

  return (
    <div ref={target} className="flex min-h-screen w-full flex-col justify-between bg-white">
      <div className="container flex h-full flex-col justify-between overflow-hidden pt-14 pb-6 text-black md:pt-24 md:pb-14 xl:pt-28">
        <div className="flex flex-col md:flex-row">
          <motion.h2
            style={{ x: translateX1 }}
            className="mb-6 flex-1 font-serif text-2xl leading-tight md:mb-0 md:text-[56px]"
          >
            Prioritising people and planet
          </motion.h2>
          <motion.div style={{ x: translateX2 }} className="flex-1 text-sm md:text-base">
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
          </motion.div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:hidden">
        {projects.flat().map((project, index) => {
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
      <div className="hidden flex-1 md:block">
        {projects.map((projectRow, i) => {
          return (
            <motion.div
              style={{ x: i === 0 ? translateX3 : translateX4 }}
              key={i}
              className="grid grid-cols-9"
            >
              {projectRow.map(({ name, url }, index) => {
                const isFirstOrLast = (i === 0 && index === 0) || (i === 1 && index === 3);
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Prioritising;
