import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <meta name="application-name" content="Corona OHZ" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Corona OHZ" />
          <meta
            name="description"
            content="Corona-Übersicht für Osterholzer Schüler*innen"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/static/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#1D3557" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#1D3557" />

          <link
            rel="apple-touch-icon"
            href="/static/icons/touch-icon-iphone.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/static/icons/touch-icon-ipad-retina.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://corona-ohz.de" />
          <meta name="twitter:title" content="Corona OHZ" />
          <meta
            name="twitter:description"
            content="Corona-Übersicht für Osterholzer Schüler*innen"
          />
          <meta
            name="twitter:image"
            content="https://corona-ohz.de/static/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@Hauke_Schnau" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Corona OHZ" />
          <meta
            property="og:description"
            content="Corona-Übersicht für Osterholzer Schüler*innen"
          />
          <meta property="og:site_name" content="Corona OHZ" />
          <meta property="og:url" content="https://corona-ohz.de" />
          <meta
            property="og:image"
            content="https://corona-ohz.de/static/icons/apple-touch-icon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
