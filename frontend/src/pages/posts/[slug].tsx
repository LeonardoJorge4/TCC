import React, { useRef, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { api, apiAdmin } from "../../services/api";
import * as yup from 'yup';
import { Form } from '@unform/web';
import { TextAreaForm } from '../../components/TextAreaForm';
import renderHTML from 'react-render-html';
import { AiOutlineClockCircle, AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai'
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
interface PostProps {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  banner: string;
  created_at: string;
  updated_at: string;
}

interface FormProps {
  comment: string;
}

export default function Post({ id, slug, title, subtitle, banner, content, created_at, updated_at }: PostProps) {
  const main = useRef(null);
  const formRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [commentsQuantity, setCommentsQuantity] = useState(0);
  const [commentContent, setCommentContent] = useState([]);
  const [usersComments, setUsersComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminName, setAdminName] = useState('');

  // let readingRateInSeconds = 0;
  // // Recuperando elemento HTML
  // const textContainer = main.current;
  // // Pegando todos os textos
  // const item = textContainer.innerText;
  // // Quantidade de palavras do texto
  // const wordCount = item.split(" ").length;
  // // Processando o tempo de leitura
  // readingRateInSeconds = (wordCount*60)/200;

  console.log(main.current)

  useEffect(() => {
    async function getQuantityComment() {
      const formData = new FormData();

      formData.append('id', id);
      await api.post('comments/quantity', formData)
      .then(response => {
        setCommentsQuantity(response.data)
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar comentários'
        })
      })
    }

    getQuantityComment();
  }, [])

  useEffect(() => {
    async function getComments() {
      setLoading(true);
      const formData = new FormData();

      formData.append('id', id);
      await api.post('comments/content', formData)
      .then(response => {
        setCommentContent(response.data.comment)
        setUsersComments(response.data.users)
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar comentários'
        })
      })
    }

    getComments()
  }, [])

  useEffect(() => {
    async function getAdminNames() {
      setLoading(true);
      const formData = new FormData();

      formData.append('id', id);
      await api.post('posts/get-admin-id', formData)
      .then(response => {
        setAdminId(response.data[0].admin_id)
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar dados'
        })
      })
    }

    getAdminNames()
  }, [])

  useEffect(() => {
    setLoading(true);
    async function getAdminName() {
      const formData = new FormData();

      formData.append('id', adminId);
      await apiAdmin.post('admin/get-admin-name', formData)
      .then(response => {
        setLoading(false);
        setAdminName(response.data[0].name)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      })
    }

    getAdminName()
  }, [adminId])

  async function handleSubmit(data: FormProps) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      
      const schema = yup.object().shape({
        comment: yup.string()
          .required('para comentar preencha o campo')
          .min(6, 'mínimo de 6 caracteres para comentar')
          .max(255, 'máximo de 255 caracteres')
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setIsSubmitting(true)

      // Validation passed
      const formData = new FormData();

      formData.append('id', id);
      formData.append('userId', user.id);
      formData.append('comment', data.comment);

      await api.post('posts/comment', formData)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: response.data.success,
        })
        setIsSubmitting(false)
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      })
      .catch((error) => {
        console.log(error)
      })
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
      <title>Tecnoblog | {slug}</title>
    </Head>
      <main>
        <section className="pt-2 pb-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div 
                  className="card bg-dark-overlay-5 overflow-hidden card-bg-scale h-400 text-center"
                  style={{ 
                    backgroundImage: banner ? `url(/images/posts/${banner})` : '/images/bannerDefault.jpg', 
                    backgroundPosition: "center left", 
                    backgroundSize: "cover",
                    height: "400px"
                  }}
                >
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <h2 className="display-5 text-center">{title}</h2>
          <h3 className="display-6 text-center">{subtitle}</h3>
          <ul className="nav nav-divider text-white-force align-items-center justify-content-center py-2 pb-3">
            <li className="nav-item">
              <div className="nav-link">
                <div className="d-flex align-items-center position-relative">
                  <AiOutlineUser size={22} />
                  <span className="ms-1">{adminName && adminName}</span>
                </div>
              </div>
            </li>
            <li className="nav-item text-white">
              <div className="nav-link">
                <div className="d-flex align-items-center position-relative">
                  <AiOutlineCalendar className="me-1" size={22} />
                  <span>
                  {
                    new Date(updated_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  }
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <div className="d-flex align-items-center position-relative">
                  <AiOutlineClockCircle className="me-1" size={22} />
                  <span>{Math.ceil(content.split(' ').length / 200)} min</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <section className="pt-0">
          <div className="container position-relative" data-sticky-container="">
            <div className="row">
              <div className="col-lg-12 contentData">
                {renderHTML(content)}
              </div>

              <div className="mt-5">
                <h3>
                  {
                    commentsQuantity <= 1
                    ? `${commentsQuantity} Comentário`
                    : `${commentsQuantity} Comentários`
                  } 
                </h3>
                <div className="d-flex align-items-center">
                  <div>
                    {usersComments.map((user) => {
                      return (
                        <div className="my-4" key={user.id}>
                          <div className="d-flex me-4">
                            <img 
                              className="avatar avatar-md rounded-circle float-start me-3" 
                              src={!user.image ? '/images/avatar/defaultAvatar.png' : `/images/avatar/${user.image}`}
                              alt="avatar"
                              style={{ width: "48px", height: "48px" }}
                            />
                            <div>
                              <div className="mb-2">
                                <h5 className="m-0">{user.name}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                
                  <div>
                    {!loading &&
                      commentContent.map((comment) => {
                        return (
                          <div key={comment.id} className="my-4">
                            <div>
                              <div className="mb-2">
                                <span className="me-3 small">
                                  {
                                    new Date(comment.created_at).toLocaleDateString('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    })
                                  }
                                </span>
                              </div>
                              <div id="main" ref={main} className="m-0">{comment.content}</div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>

              {
              !!user === true &&
              <div className="mb-4">
                <Form ref={formRef} onSubmit={handleSubmit} className="row g-3 mt-2">
                  <div className="col-12">
                    <label className="form-label">Deixe seu comentário</label>
                    <TextAreaForm className="form-control" name="comment" rows={3} />
                  </div>
                  <div className="col-12">
                    <button disabled={isSubmitting ? true : false} type="submit" className="btn btn-primary">Postar comentário</button>
                  </div>
                </Form>
              </div>
              }
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await api.get(`posts/all-posts`)
  const data = response.data.find((item) => item.slug === params.slug)

  return {
    props: data
  }
}

export async function getStaticPaths() {
  const response = await api.get(`posts/all-posts`)

  return {
    paths: response.data.map((item) => ({
      params: {
        slug: item.slug,
      }
    })),
    fallback: false
  };
}