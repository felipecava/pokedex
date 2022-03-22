import Headersite from './_Headersite'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Headersite {...pageProps}/>
      <Component {...pageProps} />
    </div>
    
  )
}

export default MyApp
