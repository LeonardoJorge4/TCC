import React, { useRef } from 'react'
import { Form } from '@unform/web'
import InputForm from '../components/InputForm';
import * as yup from 'yup';

interface FormProps {
  name: string;
  email: string;
  picture: string;
  password: string;
  receivePosts: boolean;
}

export default function Cadastro() {
  const formRef = useRef(null);

  async function handleSubmit(data: FormProps) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        name: yup.string()
          .required(),

        email: yup.string()
          .email()
          .required(),

        picture: yup.mixed()
          .required(),

        password: yup.string()
          .min(6)
          .required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.log(data);
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
      <section className="py-4 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light fs-1">Cadastro</h1>
            <p className="lead text-muted">Cadastre-se para comentar nas postagens.</p>
          </div>
        </div>
      </section>
      <div className="bg-light">
      <div className="container">
        <Form ref={formRef} onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-12">
            <label htmlFor="name" className="form-label">Nome completo</label>
            <InputForm 
              id="name"
              name="name"
              type="text"
              className="form-control form-control-lg"
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="email" className="form-label">Email</label>
            <InputForm 
              id="email"
              name="email"
              type="email"
              className="form-control form-control-lg"
            />
          </div>

          <div className="col-12">
            <label htmlFor="picture" className="form-label">Foto de perfil</label>
            <InputForm 
              id="picture"
              name="picture"
              type="file"
              className="form-control form-control-lg"
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="password" className="form-label">Senha</label>
            <InputForm
              id="password"
              name="password"
              type="password"
              className="form-control form-control-lg"
            />
            <div className="form-check form-switch mt-2">
              <InputForm
                id="receivePosts"
                name="receivePosts"
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="receivePosts">Receber email de novas postagens?</label>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="btn-lg btn-success">Cadastrar-se</button>
          </div>
        </Form>
      </div>
      </div>
    </>
  )
}