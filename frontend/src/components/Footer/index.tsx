import React from 'react';

export function Footer() {
  return (
    <footer className="footer bg-dark text-center text-white navbar-fixed-bottom w-100">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="https://www.facebook.com/leonardo.conrrado.9/" role="button">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="https://www.instagram.com/leoojorge_/" role="button">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="https://www.linkedin.com/in/leonardo-conrrado-a88a561b6/" role="button">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="https://github.com/LeonardoJorge4" role="button">
            <i className="fab fa-github"></i>
          </a>
        </section>
      </div>
      <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2021 Copyright: Leonardo Conrrado Jorge
      </div>
    </footer>
  )
}