import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import InputForm from '../components/InputForm';
import * as yup from 'yup';
import { api } from '../services/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import InputFormFile from '../components/InputFormFile';
interface FormProps {
  name: string;
  email: string;
  picture: string;
  password: string;
  receivePosts: any;
}

export default function Cadastro() {
  const formRef = useRef(null);
  const router = useRouter()
  const [checked, setChecked] = useState<boolean>(false);

  async function handleSubmit(data: FormProps, { reset }) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      
      const schema = yup.object().shape({
        name: yup.string()
          .required('nome é um campo obrigatório'),
        email: yup.string()
          .email('e-mail inválido')
          .required('e-mail é um campo obrigatório'),
        password: yup.string()
          .min(8, 'senha precisa ter no mínimo 8 caracteres')
          .required('senha é um campo obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('image', data.picture);
      formData.append('receiveEmailPosts', checked ? 'true' : 'false');

      await api.post('/users/create', formData)
      .then(response => {
        reset()
        Swal.fire({
          icon: "success",
          title: response.data.success
        })
        setTimeout(() => {
          router.push('/')
        }, 1500)
      })
      .catch(err => console.log(err))

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
    <div style={{ marginBottom: 27 }}>
      <section className="py-4 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light fs-1">Cadastro</h1>
            <p className="lead text-muted">Cadastre-se para comentar nas postagens.</p>
          </div>
        </div>
      </section>
      <div>
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
                className="form-control form-control-lg"
              />
            </div>

            <div className="col-12">
              <label htmlFor="picture" className="form-label">Foto de perfil</label>
              <InputFormFile 
                name="picture"
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
              <div className="form-check form-switch mt-3">
                <InputForm
                  id="receivePosts"
                  name="receivePosts"
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => setChecked(!checked)}
                  value={checked ? "true" : "false"}
                />
                <label className="form-check-label" htmlFor="receivePosts">Receber email de novas postagens?</label>
              </div>
            </div>
            <div className="col-12 mt-5 d-flex justify-content-center">
              <button type="submit" className="btn-lg btn-primary">Cadastrar-se</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}