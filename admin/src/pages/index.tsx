import React, { useRef, useContext } from 'react';
import { Flex } from '@chakra-ui/react'
import * as yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import { Form } from '@unform/web';
import InputForm from '../components/InputForm';

type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef(null);
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: SignInFormData) {
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
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >

      <Flex
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
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
        </Form>
      </Flex>

    </Flex>
  )
}
