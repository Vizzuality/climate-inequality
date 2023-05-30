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
      <MetaTags title="Climate Inequality Quiz" description={SEODescription} />
      <main className="container">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center justify-center gap-x-2">
            <Logo />
            <button className="flex h-8 items-center justify-center bg-500 p-2.5">
              <h1 className="text-center text-base font-bold text-black">Inequality quiz</h1>
            </button>
          </div>
          <LinkAnchor size="xl" className="hover:bg-opacity-0" theme="primary-alt" href="/">
            <Icon
              icon={CLOSE_SVG as string}
              className="inline-block h-14 w-14 rounded-full text-white transition-all duration-500 hover:bg-500 hover:bg-opacity-20"
            />
          </LinkAnchor>
        </div>
        <Quiz />
      </main>
    </div>
  );
};
export default QuizPage;
