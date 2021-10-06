import React, { useState } from "react";
import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Swal from 'sweetalert2'

import { useRouter } from "next/dist/client/router";
import Link from 'next/link'

import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header/index";
import { Sidebar } from "../../components/Sidebar/index";

import { api } from "../../services/api";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  image: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})


export default function CreateUser() {
  const router = useRouter()

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    const formData = new FormData();

    formData.append('image', values.image[0])
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('password', values.password)

    await api.post('admin/create', formData)
    .then(response => {
      reset()
      Swal.fire({
        icon: "success",
        title: response.data.success
      })
      setTimeout(() => {
        router.push('/admin')
      }, 1500)
    })
    .catch(err => console.log(err))
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form"
          encType="multipart/form-data"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Administrador</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input 
                name="name" 
                type="text"
                label="Nome completo" 
                error={errors.name}
                {...register('name')} 
              />
              <Input 
                name="email" 
                type="email" 
                label="E-mail" 
                error={errors.email}
                {...register('email')} 
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input 
                name="password" 
                type="password" 
                label="Senha" 
                error={errors.password}
                {...register('password')} 
              />
              <Input 
                name="password_confirmation" 
                type="password" 
                label="Confirmação da senha" 
                error={errors.password_confirmation}
                {...register('password_confirmation')} 
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input 
                name="image"
                type="file"
                label="Foto de perfil"
                error={errors.image}
                {...register('image')}
              />
            </SimpleGrid>

          </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/dashboard">
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button 
                type="submit" 
                colorScheme="pink" 
                isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
            
        </Box>
      </Flex>
    </Box>
  );
}