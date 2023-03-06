import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

const Quiz = dynamic(() => import('containers/quiz'), {
  ssr: false,
});
import Icon from 'components/icon';
import Logo from 'components/logo';

import CLOSE_SVG from 'svgs/close.svg?sprite';

const renderButton = () => (
  <Link href={'/'}>
    <Icon icon={CLOSE_SVG as string} className="inline-block h-14 w-14 text-white" />
  </Link>
);
const QuizPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Quiz</title>
      </Head>
      <main className="container">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center justify-center gap-x-2">
            <Logo />
            <button className="flex h-8 items-center justify-center bg-500 p-2.5">
              <span className="text-center text-base font-bold text-black">Inequality quiz</span>
            </button>
          </div>
          {renderButton()}
        </div>
        <Quiz />
      </main>
    </div>
  );
};
export default QuizPage;
