import Footer from 'containers/footer/component';
import Header from 'containers/header/component';

import Title from './components/1-title';
import ClimateInjustice from './components/10-climate-injustice';
import ZoomingIn from './components/11-zooming-in';
import Understanding from './components/12-understanding';
import Investment from './components/13-investment';
import Prioritising from './components/14-prioritising';
import OurVision from './components/2-our-vision';
import Inequality from './components/4-inequality';
import Distribution from './components/5-distribution';
import EmissionsDistribution from './components/6-emissions-distribution';
import ClimateCrisis from './components/7-climate-crisis';
import Multidimensional from './components/8-multidimensional';
import Countries from './components/9-countries';

const Home = () => {
  return (
    <div>
      <Header />
      <Title />
      <OurVision />
      <Inequality />
      <Distribution />
      <EmissionsDistribution />
      <ClimateCrisis />
      <Multidimensional />
      <Countries />
      <ClimateInjustice />
      <ZoomingIn />
      <Understanding />
      <Investment />
      <Prioritising />
      <Footer />
    </div>
  );
};

export default Home;
