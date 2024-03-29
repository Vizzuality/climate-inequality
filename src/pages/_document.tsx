/* eslint-disable react/no-danger */
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { mediaStyles } from 'components/media-query';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
        </Head>
        <body className="h-small-screen w-full overflow-x-hidden bg-black text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
