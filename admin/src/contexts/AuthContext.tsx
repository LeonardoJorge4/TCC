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

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'tecnoblog.tokenAdmin': token } = parseCookies();

    // if(token) {
    //   api.get('users/data').then(
    //     response => {
    //       const { name, email, image, receive_email } = response.data;

    //       setUser({ name, email, image, receive_email })
    //     }
    //   );
    // }
  }, [])

  async function signIn({ email, password }: SignInData) {

    const response = await api.post('admin/login', {
      email, password
    }).then(res => console.log(res)).catch(error => console.log(error));

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
    
    setUser(user);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login efetuado com sucesso',
      showConfirmButton: false,
      timer: 2000
    })

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
