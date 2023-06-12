import { FC } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

export interface MetaTagsProps {
  title: string;
  description: string;
  type?: string;
  imageURL?: string;
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  }

  return 'http://localhost:3000';
};

const MetaTags: FC<MetaTagsProps> = ({
  title,
  description,
  type = 'website',
  imageURL = 'meta-image.jpeg',
}: MetaTagsProps) => {
  const { asPath } = useRouter();

  const BASE_URL = getBaseUrl();

  return (
    <Head>
      <meta
        name="keywords"
        content="climate change, environmental justice, inequality, social justice, global warming, carbon emissions, renewable energy, fossil fuels, sustainability, climate policy, climate adaptation, climate mitigation, intersectionality"
      />
      <meta name="author" content="Vizzuality" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" property="og:title" content={title} />
      <meta name="description" property="og:description" content={description} />
      <meta name="type" property="og:type" content={type} />
      <meta name="url" property="og:url" content={`${BASE_URL}`} />
      <meta name="locale" property="og:locale" content="en_US" />
      <meta name="image" property="og:image" content={`${BASE_URL}/${imageURL}`} />
      <meta name="site_name" property="og:site_name" content="Climate Inequality" />
      <meta name="twitter:card" property="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" property="twitter:title" content={title} />
      <meta name="twitter:description" property="twitter:description" content={description} />
      <meta name="twitter:image" property="twitter:image" content={`${BASE_URL}/${imageURL}`} />
      <meta
        name="twitter:domain"
        property="twitter:domain"
        content="https://www.climate-inequality.vizzuality.com"
      />
      <meta name="twitter:site" property="twitter:site" content="@vizzuality" />
      <meta name="twitter:creator" property="twitter:creator" content="@vizzuality" />
      <meta name="twitter:url" property="twitter:url" content={`${BASE_URL}`} />
      <meta property="msapplication-config" content="/browserconfig.xml" />
      <meta property="msapplication-TileColor" content="#ffffff" />
      <meta property="msapplication-TileImage" content={`${BASE_URL}/ms-tile-150x150.png`} />
      <meta property="theme-color" content="#ffffff" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
      <link rel="manifest" href={`${BASE_URL}/manifest.json`} />
    </Head>
  );
};

export default MetaTags;
