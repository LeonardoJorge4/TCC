import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { FiCalendar } from "react-icons/fi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { api } from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [adminName, setAdminName] = useState([]);

  useEffect(() => {
    const response = api.get('posts/last-five-posts')
    .then(response => setPosts(response.data))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const response = api.get('posts/admin-name')
    .then(response => console.log(response.data))
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <h1>Últimos posts</h1>
          {
            posts.map(post => {
              return (
                <div className={styles.containerPost}>
                  <div className={styles.gridPost}>
                    <div className={styles.contentPost}>
                      <h2><a href={`/posts/${post.slug}`}>{post.title}</a></h2>
                      <h3><a href={`/posts/${post.slug}`}>{post.subtitle}</a></h3>
                      <div className={styles.author}>
                        <span>por <b>Leonardo Jorge</b></span>
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
      </div>
    </>
  )
}
