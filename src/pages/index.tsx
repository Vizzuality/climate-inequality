import Head from 'next/head';

import Footer from 'containers/footer';
import Header from 'containers/header';
import {
  Title,
  OurVision,
  Distribution,
  Inequality,
  EmissionsDistribution,
  ClimateCrisis,
  Multidimensional,
  Countries,
  ClimateInjustice,
  ZoomingIn,
  Understanding,
  Investment,
  Prioritising,
} from 'containers/home';

import MetaTags from 'components/meta-tags/meta-tags-component';

const SEODescription = `Discover Vizzuality's insights on climate action and equality, emphasizing social and climate justice. Explore quizzes, data, and analyses on climate and social inequalities. Empower vulnerable groups, prioritize sustainable development.`;

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Climate inequality</title>
      </Head>
      <MetaTags title="Climate Inequality" description={SEODescription} />
      <main>
        <div className="container">
          <Header />
        </div>
        <div className="py-20">
          <Title />
          <OurVision />
          <OurVision section={1} />
          <Inequality />
          <Inequality type="wealth" />
          <Distribution />
          <Distribution isOnePercent={false} />
          <EmissionsDistribution />
          <ClimateCrisis />
          <Multidimensional />
          <Countries />
          <Countries isReadness />
          <ClimateInjustice />
          <ZoomingIn />
          <Understanding />
          <Investment />
          <Prioritising />
        </div>
        <div className="container">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
