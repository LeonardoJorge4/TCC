import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import Swal from 'sweetalert2'

type Admin = {
  id: number;
  name: string;
  email: string;
  image: string;
  role: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: Admin;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<Admin | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'tecnoblog.tokenAdmin': token } = parseCookies();

    async function getDataUser() {
      if(token) {
        await api.get('auth/data').then(
          response => {
            const { id, name, email, image, role } = response.data;
  
            setUser({ id, name, email, image, role })
          }
        );

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login efetuado com sucesso',
          showConfirmButton: false,
          timer: 2000
        })

        Router.push('/dashboard');
      } else {
        Router.push('/')
      }
    }

    getDataUser();
  }, [])

  async function signIn({ email, password }: SignInData) {

    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)

    const response = await api.post('/auth/login', formData)
    .catch(error => console.log(error));

    if(response.data.error) {
      Swal.fire({
        icon: 'error',
        title: response.data.message,
        showConfirmButton: true,
        confirmButtonColor: '#0d6efd',
        timer: 2000
      })

      return;
    }

    setCookie(undefined, 'tecnoblog.tokenAdmin', response.data.access_token, {
      maxAge: 60 * 60 * 1, //1 hour
      //maxAge: 5, //5 sec
    })

    setCookie(undefined, 'tecnoblog.refreshTokenAdmin', response.data.access_token, {
      maxAge: 60 * 60 * 1, //1 hour
      //maxAge: 5, //5 sec
    })
    
    setUser(user);

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    const { 'tecnoblog.tokenAdmin': token } = parseCookies();

    if(token) {
      await api.get('auth/data').then(
        response => {
          const { id, name, email, image, role } = response.data;

          setUser({ id, name, email, image, role })
        }
      );

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login efetuado com sucesso',
        showConfirmButton: false,
        timer: 2000
      })

      Router.push('/dashboard');
    } else {
      Router.push('/')
    }

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
