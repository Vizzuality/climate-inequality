import { FC } from 'react';

import Link from 'next/link';

import Logo from 'components/logo';

export const Header: FC = () => (
  <header>
    <div className="py-6">
      <div className="flex items-center justify-between">
        <div className="relative flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2">
          <Logo />
        </div>
        <Link
          className="flex-shrink-0 flex-grow-0 text-center text-lg font-semibold text-500 hover:text-100"
          href="/quiz"
        >
          Take the quiz.
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
