import { FC } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

export interface MetaTagsProps {
  title: string;
  description: string;
  type?: string;
}

const MetaTags: FC<MetaTagsProps> = ({ title, description, type = 'website' }: MetaTagsProps) => {
  const { pathname } = useRouter();

  return (
    <Head>
      <meta
        name="keywords"
        content="climate change, environmental justice, inequality, social justice, global warming, carbon emissions, renewable energy, fossil fuels, sustainability, climate policy, climate adaptation, climate mitigation, intersectionality"
      />
      <meta name="author" content="Vizzuality" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`https://climate-inequality.vizzuality.com${pathname}`} />
      <meta property="og:locale" content="en_US" />
      <meta
        property="og:image"
        content="https://climate-inequality.vizzuality.com/meta-image.jpeg"
      />
      <meta property="og:site_name" content="Climate Inequality" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content="https://climate-inequality.vizzuality.com/meta-image.jpeg"
      />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:image:alt" content="Climate Inequality" />
      <meta name="twitter:title" property="twitter:title" content={title} />
      <meta name="twitter:description" property="twitter:description" content={description} />
      <meta
        name="twitter:domain"
        property="twitter:domain"
        content={`https://climate-inequality.vizzuality.com${pathname}`}
      />
      <meta name="twitter:site" property="twitter:site" content="@vizzuality" />
      <meta name="twitter:creator" property="twitter:creator" content="@vizzuality" />
      <meta
        name="twitter:url"
        property="twitter:url"
        content={`https://climate-inequality.vizzuality.com${pathname}`}
      />
      <meta property="msapplication-config" content="/browserconfig.xml" />
      <meta property="msapplication-TileColor" content="#ffffff" />
      <meta
        property="msapplication-TileImage"
        content="https://climate-inequality.vizzuality.com//ms-tile-150x150.png"
      />
      <meta property="theme-color" content="#ffffff" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
      <link rel="manifest" href="https://climate-inequality.vizzuality.com/manifest.json" />
    </Head>
  );
};

export default MetaTags;
