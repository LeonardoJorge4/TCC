import { AppProps } from 'next/app';
import { Header } from "../components/Header";
import ScrollToTop from "react-scroll-to-top";

import { AuthProvider } from '../contexts/AuthContext'

import '../styles/global.scss';
import { Footer } from '../components/Footer';
import { PostsProvider } from '../contexts/PostsContext';
import { useRouter } from 'next/router';
import { AuthAdminProvider } from '../contexts/AuthAdminContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <AuthAdminProvider>
        <AuthProvider>
          <PostsProvider>
            <Header />
            <ScrollToTop smooth style={{ padding: 4, boxShadow: "rgba(0, 0, 0, 0.35)" }} />
            <Component {...pageProps} />
            {
              router.asPath !== '/admin/login' &&
              <Footer />
            }
          </PostsProvider>
        </AuthProvider>
      </AuthAdminProvider>
    </>
  )
}

export default MyApp
