import { UberProvider } from '../context/uberContext'
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'


function MyApp({ Component, pageProps }) {
  return (
    <UberProvider>
      <Component {...pageProps} />
    </UberProvider>
  )
}

export default MyApp
