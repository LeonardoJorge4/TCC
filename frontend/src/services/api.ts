import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Authorization: `Bearer ${cookies['tecnoblog.token']}`
  }
})

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  console.log(error);
  // if(error.response.status === 401) {
  //   if(error.response.data?.code === 'token.expired') {
  //     //renovar token
  //     cookies = parseCookies();
  //   } else {
  //     //deslogar usuario
  //   }
  // }
})