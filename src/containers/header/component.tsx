import { FC } from 'react';

import { LinkAnchor } from 'components/button/component';
import Logo from 'components/logo';

export const Header: FC = () => (
  <header>
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="relative flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2">
          <Logo />
        </div>
        <LinkAnchor
          size="xl"
          theme="primary-alt"
          className="flex-shrink-0 flex-grow-0 text-center text-lg font-semibold transition-all duration-500"
          href="/quiz"
        >
          Take the quiz.
        </LinkAnchor>
      </div>
    </div>
  </header>
);

export default Header;
