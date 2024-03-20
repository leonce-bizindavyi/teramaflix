import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="6a97888e-site-verification" content="2278ea106cccdf69801561234d523f7d" />
        <link rel="shortcut icon" href="/logo/TeramaFlixpic.ico" />
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097044169349946"
        ></script> */}
      </Head>
      <body className='dark:bg-medium'>
        <Script src="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}