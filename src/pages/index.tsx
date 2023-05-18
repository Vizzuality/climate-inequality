import { RecoilRoot } from 'recoil';

import { Home } from 'containers/home';

const HomePage: React.FC = () => {
  return (
    <RecoilRoot override={false}>
      <Home />
    </RecoilRoot>
  );
};

export default HomePage;
