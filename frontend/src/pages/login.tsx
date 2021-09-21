import Head from "next/head";
import styles from './styles.module.scss';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const signInFormSchema = yup.object().shape({
  email: yup.string().required().email('E-mail inválido'),
  password: yup.string().required().min(8)
})

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Tecnoblog | Login</title>
      </Head>
      <section className="py-4 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light fs-1">Login</h1>
            <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
          </div>
        </div>
      </section>
      <div>
      <div className="container">
        <div className="p-3">
          <form method="post" onSubmit={handleSubmit(handleSignIn)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input 
                type="email"
                id="exampleInputEmail1"
                name="email"
                className="form-control form-control-lg"
                aria-describedby="emailHelp"
                {...register('email')}
              />
              {errors.email && (
                <div className="text-danger">E-mail inválido</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
              <input 
                type="password"
                id="exampleInputPassword1"
                className="form-control form-control-lg"
                name="password"
                {...register('password')}
              />
              {errors.password && (
                <div className="text-danger">Senha inválida</div>
              )}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Lembrar de mim</label>
            </div>
            <button type="submit" className="btn btn-lg btn-primary w-100">Entrar</button>
            <a className="btn btn-lg btn-success w-100 mt-3" href="/cadastro">Cadastre-se</a>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}