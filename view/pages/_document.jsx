import React from 'react';
import NextDocument, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class Document extends NextDocument {
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return {...page, styleTags};
  }

  render() {
    return (
      <html lang="ja">
        <Head>
          <title>calculate subnet</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta
            name="msapplication-config"
            content="/static/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          {/* <link
            href="https://fonts.googleapis.com/css?family=Karla"
            rel="stylesheet"
          /> */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/terminal.css@0.6.6/dist/terminal.min.css"
          />
          {this.props.styleTags}
          <meta
            property="og:url"
            content="https://bcrypt--hash-generator.glitch.me/"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="calculate subnet" />
          <meta property="og:description" content="Site to get network address and host address" />
          <meta property="og:site_name" content="calculate subnet" />
          <meta
            property="og:image"
            content="https://og-image.now.sh/calculate%20subnet.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fglitch--calculate-subnet.glitch.me%2Fstatic%2Ffavicons%2Fandroid-chrome-512x512.png"
          />
          <meta name="twitter:card" content="summary" />
          {/* <meta name="twitter:site" content="@nju33" /> */}
          <meta name="twitter:title" content="bcrypt hash generator" />
          <meta name="twitter:description" content="Site to get bcrypt hash" />
          <meta
            name="twitter:image"
            content="https://og-image.now.sh/calculate%20subnet.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fglitch--calculate-subnet.glitch.me%2Fstatic%2Ffavicons%2Fandroid-chrome-512x512.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
