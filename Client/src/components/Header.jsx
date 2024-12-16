import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); 
  return (
    <div className={styles.containerNav}>
        <nav className={styles.nav}>
          <Link to={'/'}><h1>Blog Axios</h1></Link>
            <ul>
                    {location.pathname === '/newPost' ? (
                    <Link to={'/newPost'}>
                      <li style={{ display: 'none' }}>New Posts</li>
                    </Link>
                  ) : (
                    <Link to={'/newPost'}>
                      <li>New Posts</li>
                    </Link>
                  )}
            </ul>
        </nav>
    </div>
  )
}

export default Header