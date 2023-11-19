import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es" className='has-background-grey-darker'>
      

      <Head>
        <title>Un forense en potencia: El blog de Aidon.</title>

        <meta charset="utf-8"></meta>
        <meta property="og:site_name" content="Aidon: Un forense en potencia."></meta>
        <meta property="og:title" content="Aidon: Un forense en potencia."></meta>
        <meta name="description" content="Digital forensics and incident response with an interesting view, writeups, challenges, CTFs and more!, by Aidoneo, https://forensics.ailabs.ar"></meta>
        <meta property="og:url" content="https://forensics.ailabs.ar/"></meta>
        <meta property="og:image" content="https://i.pinimg.com/originals/de/f5/5a/def55af21e80987d7474dfd367d31e7c.png"></meta>

        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="canonical" href="https://forensics.ailabs.ar/"></link>
        <link rel="shortcut icon" type="image/png" href="assets/favicon.jpg"></link>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Creepster&family=Rowdies&family=Share+Tech+Mono&display=swap" rel="stylesheet"></link>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
