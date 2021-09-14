import { AppProps } from 'next/app';
import { Header } from "../components/Header";
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from '../styles/theme';

import { AuthProvider } from '../contexts/AuthContext'

import '../styles/global.scss';
import { Footer } from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
