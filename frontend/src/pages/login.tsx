import React, { useRef, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { Form } from '@unform/web'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import * as yup from 'yup';
import InputForm from '../components/InputForm';

interface FormProps {
  email: string;
  password: string;
}

export default function Login() {
  const formRef = useRef(null);
  const [remember, setRemember] = useState<boolean>(false);
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: FormProps) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      
      const schema = yup.object().shape({
        email: yup.string()
          .required('email é um campo obrigatório')
          .email('email inválido'),
        password: yup.string()
          .required('senha é um campo obrigatório')
          .min(8, 'senha precisa ter no mínimo 8 caracteres')
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await signIn(data);

    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Tecnoblog | Login</title>
      </Head>
      <main className="mbLogin">
        <section className="py-4 text-center container">
          <div className="row py-lg-4">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light fs-1">Faça o Login</h1>
            </div>
          </div>
        </section>

        <div>
          <div className="container">
            <div>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <InputForm
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                  <InputForm
                    id="password"
                    name="password"
                    type="password"
                    className="form-control form-control-lg"
                  />
                </div>
                <button type="submit" className="btn btn-lg btn-primary w-100">Entrar</button>
                <Link href="/cadastro">
                  <a className="btn btn-lg btn-success w-100 mt-3">Cadastre-se</a>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}