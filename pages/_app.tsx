import '../styles/global.css'
import { AppProps } from 'next/app'

// _app.js の約束事？
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
