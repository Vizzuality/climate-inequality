import dynamic from 'next/dynamic';
import Head from 'next/head';

const Quiz = dynamic(() => import('containers/quiz'), {
  ssr: false,
});
import { LinkAnchor } from 'components/button/component';
import Icon from 'components/icon';
import Logo from 'components/logo';

import CLOSE_SVG from 'svgs/close.svg?sprite';

const QuizPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Quiz</title>
      </Head>
      <main className="container flex h-screen flex-col">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center justify-center gap-x-2">
            <Logo />
            <button className="flex h-8 items-center justify-center bg-500 p-2.5">
              <span className="text-center text-base font-bold text-black">Inequality quiz</span>
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
