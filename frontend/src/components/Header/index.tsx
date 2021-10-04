import React, { useContext } from 'react';
import Link from 'next/link';

import { FiLogIn, FiLogOut, FiUser, FiUserPlus } from "react-icons/fi";
import { BsFilePost } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import Swal from 'sweetalert2';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

export function Header() {

  const { user, setUser } = useContext(AuthContext);
  const router = useRouter()

  async function logout() {
    
    try {
      const response = await api.post('logout');
      setUser(null)
      destroyCookie(undefined, 'tecnoblog.token')
      router.push('/')
      
      Swal.fire({
        icon: 'success',
        title: response.data.message,
        showConfirmButton: true,
        confirmButtonColor: '#0d6efd',
        timer: 2000
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error,
        showConfirmButton: true,
        confirmButtonColor: '#0d6efd',
        timer: 2000
      })
    }
  }

  if(!user) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light h-100 bg-dark containerHeader">
        <div className="container-fluid">
          <h1 className="m-0">
            <Link href="/">
              <a className="text-white fs-1 fw-bold">TECNOBLOG</a>
            </Link>
          </h1>
          <button className="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <GiHamburgerMenu className="text-white" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex containerNavbar">
              <li className="nav-item me-3">
                <Link href="/posts">
                  <a className="nav-link text-white fs-5 d-flex align-items-center">
                    <span className="me-1">POSTAGENS</span> <BsFilePost />
                  </a>
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link href="/cadastro">
                  <a className="nav-link text-white fs-5 d-flex align-items-center">
                    <span className="me-1">CADASTRO</span> <FiUserPlus />
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link text-white fs-5 d-flex align-items-center">
                    <span className="me-1">ENTRAR</span> <FiLogIn />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light h-100 bg-dark containerHeader">
      <div className="container-fluid">
        <h1 className="m-0">
          <Link href="/">
            <a className="text-white fs-1 fw-bold">TECNOBLOG</a>
          </Link>
        </h1>
        <button className="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <GiHamburgerMenu className="text-white" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex containerNavbar">
            <li className="nav-item me-3">
              <Link href="/posts">
                <a className="nav-link text-white fs-5 d-flex align-items-center">
                  <span className="me-1">POSTAGENS</span> <BsFilePost />
                </a>
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/cadastro">
                <a className="nav-link text-white fs-5 d-flex align-items-center">
                  <span className="me-1">CADASTRO</span> <FiUserPlus />
                </a>
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/perfil">
                <a className="nav-link text-white fs-5 d-flex align-items-center">
                  <span className="me-1">PERFIL</span> <FiUser />
                </a>
              </Link>
            </li>
            <li className="nav-item me-3">
              <button className="nav-link btn text-white fs-5 d-flex align-items-center bg-danger" onClick={logout} >
                <span className="me-1">SAIR</span> <FiLogOut />
              </button>
            </li>
            <span className="text-white me-3 fs-5 separatorHeader">|</span>
            <li className="nav-item">
              <div className="nav-link text-white d-flex align-items-center">
                <div className="d-flex flex-column text-end me-2">
                  <span className="fs-6">{user.name}</span>
                  <span className="fs-7">{user.email}</span>
                </div>
                <img 
                  src={user.image !== null ? `/images/avatar/${user.image}` : '/images/avatar/defaultAvatar.png'} 
                  className="rounded-circle" 
                  alt={user.name} 
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
  
}