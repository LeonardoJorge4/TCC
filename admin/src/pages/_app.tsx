import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { AuthProvider } from '../contexts/AuthContext'
import { PostsProvider } from '../contexts/PostsContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SidebarDrawerProvider>
          <PostsProvider>
            <Component {...pageProps} />
          </PostsProvider>
        </SidebarDrawerProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
