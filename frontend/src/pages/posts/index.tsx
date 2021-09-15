import React, { useContext } from 'react';
import Pagination from "react-js-pagination";
import Link from 'next/link';
import { PostsContext } from '../../contexts/PostsContext';

export default function Posts() {
  const { getAllPosts, posts } = useContext(PostsContext);

  console.log(posts)

  return (
    <main>

      <section className="py-4 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light fs-1">Postagens</h1>
            <p className="lead text-muted">Acompanhe todas as postagens do blog.</p>
          </div>
        </div>
      </section>

      <div className="album bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {
              posts && posts.data.map(post => {
                return (
                  <div className="col" key={post.id}>
                    <div className="card shadow-sm">
                      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: banner" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">banner</text></svg>
                      <img src={`${post.banner}`} alt="" />
    
                      <Link href={`/posts/${post.slug}`}>
                        <a className="card-body">
                          <p className="card-text">
                            {post.title}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="btn-group">
                              <div className="btn btn-sm btn-outline-secondary">Leonardo</div>
                              <div className="btn btn-sm btn-outline-secondary">
                                {
                                  new Date(post.created_at).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                  })
                                }
                              </div>
                            </div>
                            <small className="text-muted">3 minutos</small>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="pt-5 pb-5 d-flex justify-content-center">
            <Pagination 
              activePage={posts && posts.current_page}
              totalItemsCount={posts && posts.total}
              itemsCountPerPage={posts && posts.per_page}
              onChange={(pageNumber) => getAllPosts(pageNumber)}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </div>

    </main>
  )
}