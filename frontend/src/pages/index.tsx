import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { FiCalendar } from "react-icons/fi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { api, apiAdmin } from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [adminName, setAdminName] = useState([]);

  useEffect(() => {
    async function getFivePosts() {
      await api.get('posts/last-five-posts')
      .then(response => setPosts(response.data))
      .catch(error => console.log(error))
    }

    getFivePosts()
  }, [])

  useEffect(() => {
    async function getAdminNames() {
      const formData = new FormData();

      for (var i = 0; i < posts.length; i++) {
        formData.append('id[]', posts[i].admin_id);
      }
      await apiAdmin.post('admin/get-admin-name', formData)
      .then(response => {
        setAdminName(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    getAdminNames()
  }, [posts]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <h1>Últimos posts</h1>
          <div className="d-flex">
            <div style={{ flex: 'auto' }}>
            {
              posts.map(post => {
                return (
                  <div key={post.id} className={styles.containerPost}>
                    <div className={styles.gridPost}>
                      <div className={styles.contentPost}>
                        <h2><a href={`/posts/${post.slug}`}>{post.title}</a></h2>
                        <h3><a href={`/posts/${post.slug}`}>{post.subtitle}</a></h3>
                        <div className={styles.author}>
                          <span>
                            <FiCalendar className={styles.calendarIcon}/>
                            {
                              new Date(post.created_at).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })
                            }
                          </span>
                        </div>
                      </div>
                      <div className={styles.containerArrow}>
                        <a href={`/posts/${post.slug}`}>
                          <IoArrowForwardCircleOutline className={styles.arrowIcon}/>
                        </a>
                      </div>
                    </div>
                    <div className={styles.line}></div>
                  </div>
                )   
              })
            }
            </div>
            <div className="d-flex">

              <div className="d-flex flex-column justify-content-around align-items-center">
              {
                adminName && adminName.map((admin, index) => (
                  <span key={index} className="d-flex">por <b className="ms-1">{admin.name}</b></span>
                ))
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
