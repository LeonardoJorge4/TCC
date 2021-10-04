import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:8001/api',
  headers: {
    Authorization: `Bearer ${cookies['tecnoblog.tokenAdmin']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if(error.response.status === 401) {
    if(error.response.data?.code === 'token.expired') {
      cookies = parseCookies();

      const { 'tecnoblog.refreshTokenAdmin': refreshToken } = cookies;

      api.post('/auth/refresh', {
        refreshToken,
      }).then(response => {
        const { token } = response.data

        setCookie(undefined, 'tecnoblog.tokenAdmin', token, {
          maxAge: 60 * 60 * 1, //1 hour
          path: '/'
        })

        setCookie(undefined, 'tecnoblog.refreshTokenAdmin', token, {
          maxAge: 60 * 60 * 1, //1 hour
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`
      })
    } else {
      
    }
  }
})