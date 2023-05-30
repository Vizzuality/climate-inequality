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
  imageURL,
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
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
      <link rel="manifest" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/manifest.json`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${process.env.NEXT_PUBLIC_BASE_PATH}/ms-tile-150x150.png`}
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/${imageURL}`} />
      <meta name="twitter:domain" content="https://www.climate-inequality.vizzuality.com" />
      <meta name="twitter:site" content="@vizzuality" />
      <meta name="twitter:creator" content="@vizzuality" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content={type} />
      <meta name="og:url" content={`${BASE_URL}${asPath}`} />
      <meta property="og:locale" content="en_US" />
      <meta name="og:image" content={`${BASE_URL}/${imageURL}`} />
      <meta property="og:site_name" content="Climate Inequality" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default MetaTags;
