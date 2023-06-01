import Head from 'next/head';

import MetaTags from 'components/meta-tags';

const SEODescription =
  'Discover how climate action and equality intersect for a sustainable future. Understand the dynamics of inequality and its impact on climate resilience. Take our quiz and learn how to make a positive difference. Explore data-driven solutions and join our mission for a just and equitable world. Contact Vizzuality to collaborate on tackling global challenges together.';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Climate Inequality Privacy policy</title>
    </Head>
    <MetaTags title="Climate Inequality Privacy Policy" description={SEODescription} />
    <h1>Privacy policy</h1>
  </div>
);

export default Home;
