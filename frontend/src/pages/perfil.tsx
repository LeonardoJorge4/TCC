import React, { useContext, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { Form } from '@unform/web'
import InputForm from '../components/InputForm';
import { api } from '../services/api';
import Swal from 'sweetalert2';
import InputFormFile from '../components/InputFormFile';
interface FormProps {
  name: string;
  email: string;
  picture: string;
  password: string;
  receivePosts: boolean;
}

export default function Perfil() {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const formRef = useRef(null);
  const [checked, setChecked] = useState<boolean>(user?.receive_email);

  console.log(user)

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
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      const formData = new FormData();

      formData.append('id', user.id);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('image', data.picture);
      formData.append('receiveEmailPosts', checked ? 'true' : 'false');

      await api.post('/users/update', formData)
      .then(response => {
        setTimeout(() => {
          router.push('/')
        }, 1500)
        Swal.fire({
          icon: "success",
          title: response.data.success
        })
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

  if(!user) {
    router.push('/')
  } else {
    return (
      <div style={{ marginBottom: 27 }}>
        <section className="py-4 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light fs-1">Perfil</h1>
              <p className="lead text-muted">Seus dados de usuário.</p>
            </div>
          </div>
        </section>
        <div>
          <div className="container">
            <Form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="row g-3"
              initialData={{
                name: user.name,
                email: user.email,
                receivePosts: user.receive_email ? true : false
              }}
            >
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
              <div className="col-12 mt-5 d-flex justify-content-center mb-4">
                <button type="submit" className="btn-lg btn-primary">Atualizar</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}