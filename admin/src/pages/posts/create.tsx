import React, { useState, useEffect, useRef } from "react";
import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Link from 'next/link'
import { useRouter } from "next/dist/client/router";
import * as yup from 'yup';
import Swal from "sweetalert2";

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

import { api, apiPost } from "../../services/api";

interface CreatePostFormData {
  title: string;
  subtitle: string;
  slug: string;
  banner: string;
  content: string;
}

const createUserFormSchema = yup.object().shape({
  title: yup.string().required('Título obrigatório').min(6, 'Mínimo de 6 caracteres'),
  subtitle: yup.string().required('Subtítulo obrigatório').min(6, 'Mínimo de 6 caracteres'),
  slug: yup.string().required('Url do post obrigatório').min(6, 'No mínimo 6 caracteres'),
})

export default function CreatePosts() {
  const router = useRouter()
  const editorRef = useRef()
  const [content, setContent] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState;

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])

  const handleCreateUser: SubmitHandler<CreatePostFormData> = async (values) => {
    if(content.length >= 300) {
      const formData = new FormData();
      formData.append('banner', values.banner[0])
      formData.append('title', values.title)
      formData.append('subtitle', values.subtitle)
      formData.append('slug', values.slug)
      formData.append('content', content)

      const response = await apiPost.post('posts/create', formData)
      .then(response => {
        Swal.fire({
          icon: "success",
          title: `${response.data.success}`
        })
        setTimeout(() => {
          router.push('/posts')
        }, 2000)
      })
      .catch(err => console.log(err))
    } else {
      Swal.fire({
        icon: "error",
        title: "O conteúdo precisa ter pelo menos 300 caracteres!"
      })
    }
    
  }

  return editorLoaded && (
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
        <Heading size="lg" fontWeight="normal">Criar Post</Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
            <Input 
              name="title" 
              type="text"
              label="Título" 
              error={errors.title}
              {...register('title')} 
            />
            <Input 
              name="subtitle" 
              type="text" 
              label="Subtítulo" 
              error={errors.subtitle}
              {...register('subtitle')} 
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
            <Input 
              name="banner" 
              type="file" 
              label="Banner" 
              error={errors.banner}
              {...register('banner')} 
            />
            <Input 
              name="slug"
              type="text"
              label="Url do post"
              placeholder="url-do-post"
              error={errors.slug}
              {...register('slug')}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%" color="#000">
            <CKEditor
              editor={ ClassicEditor }
              data="<p>Digite o conteúdo do post aqui!</p>"
              config={{
                toolbar: ['heading', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable',
                  'tableColumn', 'tableRow', 'mergeTableCells', 'undo', 'redo'
                ]
              }}
              onChange={( event, editor ) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </SimpleGrid>

        </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/posts">
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
  )
}