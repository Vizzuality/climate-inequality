import { useRef } from 'react';

import classNames from 'classnames';

import { useScroll, motion, useTransform } from 'framer-motion';

import FadeYScroll from '../animations/fade-y-scroll/component';

const projects = [
  [
    { name: 'Half Earth', url: 'https://www.vizzuality.com/project/half-earth/' },
    { name: 'Global Forest Watch', url: 'https://www.vizzuality.com/project/global-forest-watch/' },
    { name: 'Aqueduct', url: 'https://www.vizzuality.com/project/aqueduct/' },
  ],
  [
    { name: 'Climate Watch', url: 'https://www.vizzuality.com/project/climate-watch/' },
    {
      name: 'IISD SDG knowledge hub',
      url: 'https://www.vizzuality.com/project/iisd-sdg-knowledge-hub/',
    },
    { name: 'Resource Watch', url: 'https://www.vizzuality.com/project/resource-watch/' },
    { name: 'Marxan', url: 'https://www.vizzuality.com/project/marxan/' },
  ],
];

const Text = () => (
  <>
    <p>
      At Vizzuality, our purpose is to help{' '}
      <span className="font-semibold">ensure a better future for our planet and society.</span> We
      create engaging data-based knowledge platforms to inform{' '}
      <span className="font-semibold">solutions towards sustainability and equality</span>.
      Platforms that support the global shifts towards a society that puts people and the planet at
      the centre.
    </p>
    <p className="mt-4 font-semibold">
      We work with partner organisations that share this mission. Here are some of the projects we
      have designed and developed:
    </p>
  </>
);

const Prioritising = () => {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const translateX1 = useTransform(scrollYProgress, [0, 0.25], ['-50%', '0%']);
  const translateX2 = useTransform(scrollYProgress, [0, 0.25], ['50%', '0%']);
  const translateX3 = useTransform(scrollYProgress, [0.25, 0.5], ['-100%', '0%']);
  const translateX4 = useTransform(scrollYProgress, [0.25, 0.5], ['100%', '0%']);

  return (
    <div ref={target} className="flex min-h-screen w-full flex-col justify-between bg-white">
      <div className="flex h-full w-full flex-col justify-between overflow-x-hidden pt-14 pb-6 text-black md:pt-24 md:pb-14 xl:pt-28">
        <div className="container flex flex-col md:flex-row md:gap-8">
          {/* DESKTOP */}
          <motion.h2
            style={{ x: translateX1 }}
            className="mb-6 hidden flex-1 font-serif text-2xl leading-tight sm:block md:mb-0 md:text-[56px]"
          >
            Prioritising people and planet
          </motion.h2>
          <motion.div
            style={{ x: translateX2 }}
            className="hidden flex-1 text-sm sm:block md:text-base"
          >
            <Text />
          </motion.div>
          {/* MOBILE */}
          <FadeYScroll threshold={0.2}>
            <h2 className="mb-6 flex-1 font-serif text-2xl leading-tight sm:hidden md:mb-0 md:text-[56px]">
              Prioritising people and planet
            </h2>
            <div className="flex-1 text-sm sm:hidden md:text-base">
              <Text />
            </div>
          </FadeYScroll>
        </div>
      </div>
      <div className="grid w-full grid-cols-2  overflow-x-hidden md:hidden">
        {projects.flat().map((project, index) => {
          const { name, url } = project;
          const isFirstOrLast = index === 0 || index === 6;
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
      <div className="hidden w-full flex-1 items-end overflow-x-hidden md:flex">
        <div className="w-full">
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
    </div>
  );
};

export default Prioritising;
