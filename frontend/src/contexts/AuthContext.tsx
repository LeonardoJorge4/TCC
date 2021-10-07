import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import Swal from 'sweetalert2'
import { error } from "console";

type User = {
  id: string;
  name: string;
  email: string;
  image?: File;
  receive_email: boolean;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  setUser: (value: string) => void;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function signOut() {
  destroyCookie(undefined, 'tecnoblog.token')

  Router.push('/')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'tecnoblog.token': token } = parseCookies();

    if(token) {
      setLoading(true)
      api.get('users/data').then(
        response => {
          const { id, name, email, image, receive_email } = response.data;

          setUser({ id, name, email, image, receive_email })
          setLoading(false)
        }
      )
      .catch(() => {
        setLoading(false)
        destroyCookie(undefined, 'tecnoblog.token')

        Router.push('/')
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    setLoading(true)
    const response = await api.post('login', {
      email, password
    })
    .catch(err => console.log(err));

    if(response.data.error) {
      Swal.fire({
        icon: 'error',
        title: response.data.message,
        showConfirmButton: true,
        confirmButtonColor: '#0d6efd',
        timer: 2000
      })
      setLoading(false)
      return;
    }

    setCookie(undefined, 'tecnoblog.token', response.data.access_token, {
      maxAge: 60 * 60 * 1, //1 hour
      //maxAge: 5, //5 sec
    })
    
    setUser(user);

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    setTimeout(() => {
      window.location.reload();
    }, 1000)

    setLoading(false)
    Router.push('/');

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Login efetuado com sucesso',
      showConfirmButton: false,
      timer: 2000
    })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
