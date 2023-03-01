import Head from 'next/head';

import Header from 'containers/header';

export const Arrow = () => {
  return (
    <svg
      className="relative h-12 w-6"
      width="8"
      height="34"
      viewBox="0 0 8 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.64645 16.3536C3.84171 16.5488 4.15829 16.5488 4.35355 16.3536L7.53553 13.1716C7.7308 12.9763 7.7308 12.6597 7.53553 12.4645C7.34027 12.2692 7.02369 12.2692 6.82843 12.4645L4 15.2929L1.17157 12.4645C0.97631 12.2692 0.659728 12.2692 0.464466 12.4645C0.269203 12.6597 0.269203 12.9763 0.464466 13.1716L3.64645 16.3536ZM3.5 -2.18557e-08L3.5 16L4.5 16L4.5 2.18557e-08L3.5 -2.18557e-08Z"
        fill="#CCB420"
      />
    </svg>
  );
};

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Welcome</title>
    </Head>
    <main className="container">
      <Header />
      <div className="container py-20">
        <div className="items-center justify-start pb-2 text-left text-sm text-500">
          Vizzuality’s look at climate action and equality.
        </div>
        <div className="flex w-5/6 items-center justify-start pb-6 text-left font-serif text-4xl text-white">
          We believe in a sustainable and just future for all, where equality is core.
        </div>
        <div className="w-9/12 pb-16 text-left text-xl font-light leading-8 text-white">
          The climate crisis threatens that reality. To create the world <br /> we believe in, we
          need to understand these dynamics.
        </div>
        <Arrow />
      </div>
    </main>
  </div>
);

export default Home;
