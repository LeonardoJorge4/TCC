import React, { useRef } from 'react';
import Head from 'next/head';
import { api } from "../../services/api";
import * as yup from 'yup';
import { Form } from '@unform/web';
import { TextAreaForm } from '../../components/TextAreaForm';
import renderHTML from 'react-render-html';
import { AiOutlineClockCircle, AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai'
interface PostProps {
  id: number;
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
  const formRef = useRef(null);

  async function handleSubmit(data: FormProps) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      
      const schema = yup.object().shape({
        comment: yup.string()
          .required('para comentar preencha o campo')
          .min(6, 'mínimo de 6 caracteres para comentar')
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const commentary = data.comment
      // Validation passed
      const response = await api.post('posts/comment', { 
        id, commentary
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
                    backgroundImage: `url(/images/posts/${banner})`, 
                    backgroundPosition: "center left", 
                    backgroundSize: "cover",
                    height: "400px"
                  }}
                >
                  <div className="card-img-overlay d-flex align-items-center p-3 p-sm-4"> 
                    <div className="w-100 my-auto">
                      <h2 className="text-white display-5">{title}</h2>
                      <h3 className="text-white display-6">{subtitle}</h3>
                      <ul className="nav nav-divider text-white-force align-items-center justify-content-center">
                        <li className="nav-item">
                          <div className="nav-link">
                            <div className="d-flex align-items-center text-white position-relative">
                              <AiOutlineUser size={22} />
                              <span className="ms-1">Leonardo Jorge</span>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item text-white">
                          <div className="nav-link">
                            <div className="d-flex align-items-center text-white position-relative">
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
                        <li className="nav-item text-white">
                          <div className="nav-link">
                            <div className="d-flex align-items-center text-white position-relative">
                              <AiOutlineClockCircle className="me-1" size={22} />
                              <span>5 min</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0">
          <div className="container position-relative" data-sticky-container="">
            <div className="row">
              <div className="col-lg-12">
                {renderHTML(content)}
              </div>

              <div className="mt-5">
                <h3>5 comments</h3>
                <div className="my-4 d-flex">
                  <img 
                    className="avatar avatar-md rounded-circle float-start me-3" 
                    src="https://github.com/LeonardoJorge4.png" 
                    alt="avatar"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="mb-2">
                      <h5 className="m-0">Allen Smith</h5>
                      <span className="me-3 small">June 11, 2021 at 6:01 am </span>
                      <a href="#" className="text-body fw-normal">Responder</a>
                    </div>
                    <p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. </p>
                  </div>
                </div>
                <hr />
                <div className="my-4 d-flex ps-2 ps-md-3">
                  <img 
                    className="avatar avatar-md rounded-circle float-start me-3" 
                    src="https://github.com/LeonardoJorge4.png" 
                    alt="avatar"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="mb-2">
                      <h5 className="m-0">Louis Ferguson</h5>
                      <span className="me-3 small">June 11, 2021 at 6:55 am </span>
                      <a href="#" className="text-body fw-normal">Responder</a>
                    </div>
                    <p>Water timed folly right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything. </p>
                  </div>
                </div>
                <div className="my-4 d-flex ps-3 ps-md-5">
                  <img 
                    className="avatar avatar-md rounded-circle float-start me-3" 
                    src="https://github.com/LeonardoJorge4.png" 
                    alt="avatar"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="mb-2">
                      <h5 className="m-0">Allen Smith</h5>
                      <span className="me-3 small">June 11, 2021 at 7:10 am </span>
                      <a href="#" className="text-body fw-normal">Responder</a>
                    </div>
                    <p>Meant balls it if up doubt small purse. </p>
                  </div>
                </div>
                <hr />
                <div className="my-4 d-flex ps-2 ps-md-3">
                  <img 
                    className="avatar avatar-md rounded-circle float-start me-3" 
                    src="https://github.com/LeonardoJorge4.png" 
                    alt="avatar"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="mb-2">
                      <h5 className="m-0">Frances Guerrero</h5>
                      <span className="me-3 small">June 14, 2021 at 12:35 pm </span>
                      <a href="#" className="text-body fw-normal">Responder</a>
                    </div>
                    <p>Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. </p>
                  </div>
                </div>
                <hr />
                <div className="my-4 d-flex">
                  <img 
                    className="avatar avatar-md rounded-circle float-start me-3" 
                    src="https://github.com/LeonardoJorge4.png" 
                    alt="avatar"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="mb-2">
                      <h5 className="m-0">Judy Nguyen</h5>
                      <span className="me-3 small">June 18, 2021 at 11:55 am </span>
                      <a href="#" className="text-body fw-normal">Responder</a>
                    </div>
                    <p>Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. </p>
                  </div>
                </div>
                <hr />
              </div>

              <div className="mb-4">
                <Form ref={formRef} onSubmit={handleSubmit} className="row g-3 mt-2">
                  <div className="col-12">
                    <label className="form-label">Deixe seu comentário</label>
                    <TextAreaForm className="form-control" name="comment" rows={3} />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">Postar comentário</button>
                  </div>
                </Form>
              </div>
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