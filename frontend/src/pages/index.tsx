import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { FiCalendar } from "react-icons/fi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { api } from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const response = api.get('posts')
    .then(response => setPosts(response.data))
    .catch(error => console.log(error))
  }, [])

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
                      <h2><a href="">{post.title}</a></h2>
                      <h3><a href="">{post.subtitle}</a></h3>
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
