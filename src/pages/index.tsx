import Head from 'next/head';

import { Home } from 'containers/home';

import MetaTags from 'components/meta-tags/meta-tags-component';

const SEODescription = `Discover Vizzuality's insights on climate action and equality, emphasizing social and climate justice. Explore quizzes, data, and analyses on climate and social inequalities. Empower vulnerable groups, prioritize sustainable development.`;

const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Climate inequality</title>
      </Head>
      <MetaTags
        title="The Climate Crisis & Inequality | A Data-Driven Perspective"
        description={SEODescription}
      />
      <main>
        <Home />
      </main>
    </div>
  );
};

export default HomePage;
