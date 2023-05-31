import { useCallback, useEffect } from 'react';

import { MapProvider } from 'react-map-gl';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { OverlayProvider } from '@react-aria/overlays';

import ThirdParty from 'containers/third-party';

import { MediaContextProvider } from 'components/media-query';
import { GAPage } from 'lib/analytics/ga';

import 'styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // Never ever instantiate the client outside a component, hook or callback as it can leak data
  // between users

  const handleRouteChangeCompleted = useCallback((url: string) => {
    GAPage(url);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChangeCompleted);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeCompleted);
    };
  }, [router.events, handleRouteChangeCompleted]);

  return (
    <OverlayProvider>
      {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
      <MediaContextProvider>
        <MapProvider>
          <ThirdParty />
          <Component {...pageProps} />
        </MapProvider>
      </MediaContextProvider>
    </OverlayProvider>
  );
};

export default MyApp;
