import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
export { reportWebVitals } from 'next-axiom';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
