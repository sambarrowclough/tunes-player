import 'tailwindcss/tailwind.css'
import './style.css'
import { UserContextProvider } from '@/utils/useApp'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
