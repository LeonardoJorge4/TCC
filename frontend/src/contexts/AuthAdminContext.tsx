import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import Swal from 'sweetalert2'

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthAdminContext = createContext({} as AuthContextType)

export function AuthAdminProvider({ children }) {
  const [admin, setUser] = useState(null);

  const isAuthenticated = !!admin;

  useEffect(() => {
    const { 'tecnoblog.tokenAdmin': token } = parseCookies();

    if(token) {
      api.get('admin/login').then(
        response => console.log(response)
      ).catch(error => console.log(error))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {

    const response = await api.post('admin-login', {
      email, password
    })

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
    
    setUser(admin);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login efetuado com sucesso',
      showConfirmButton: false,
      timer: 2000
    })

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    //Router.push('admin/dashboard');
  }

  return (
    <AuthAdminContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthAdminContext.Provider>
  )
}
