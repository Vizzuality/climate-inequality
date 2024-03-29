import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LinkAnchor } from 'components/button/component';
import Icon from 'components/icon';
import Logo from 'components/logo';
import MetaTags from 'components/meta-tags';

import CLOSE_SVG from 'svgs/close.svg?sprite';

const Quiz = dynamic(() => import('containers/quiz'), {
  ssr: false,
});

const SEODescription =
  'Discover how climate action and equality intersect for a sustainable future. Understand the dynamics of inequality and its impact on climate resilience. Take our quiz and learn how to make a positive difference. Explore data-driven solutions and join our mission for a just and equitable world. Contact Vizzuality to collaborate on tackling global challenges together.';

const QuizPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Climate Inequality Quiz</title>
      </Head>
      <main>
        <MetaTags title="The Climate Crisis & Inequality | Quiz" description={SEODescription} />
        <div className="fixed w-full lg:relative">
          <div className="container flex items-start justify-between">
            <div className="flex items-center justify-start gap-x-2 bg-black pt-9">
              <Logo />
              <button className="flex h-8 flex-shrink-0 items-center justify-center bg-500 p-2.5">
                <span className="text-center text-base font-bold text-black">Inequality quiz</span>
              </button>
            </div>
            <LinkAnchor
              size="xl"
              className="pr-0 pt-8 hover:bg-opacity-0 md:pt-6"
              theme="primary-alt"
              href="/"
            >
              <Icon
                icon={CLOSE_SVG as string}
                className="inline-block h-10 w-10 rounded-full bg-black text-white transition-all duration-500 hover:bg-500 hover:bg-opacity-20 sm:h-14 sm:w-14"
              />
            </LinkAnchor>
          </div>
        </div>
        <div className="container flex flex-col">
          <Quiz />
        </div>
      </main>
    </div>
  );
};
export default QuizPage;
