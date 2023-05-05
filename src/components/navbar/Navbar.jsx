import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import Logo from '../../images/logo.png'

function Navbar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [nav, setNav] = useState(false);

  const toggleSize = () => {
    setIsMinimized((prevState) => !prevState);
  };

  return (
    <header className={styles.Navbar}>
      <div>
        <img
          src={Logo}
          alt='/'
          className='logo-image'
          style={{ width: isMinimized ? '150px' : '150px', height: 'auto' }}
          onClick={toggleSize}
        ></img>
      </div>
      <nav>
        <ul
          className={
            nav ? [styles.menu, styles.active].join(' ') : [styles.menu]
          }
        >
          <li>
            <a href='/' className={styles.active}>
              Home
            </a>
          </li>
          <li>
            <a href='/'>Films</a>
          </li>
          <li>
            <a href='/'>Lists</a>
          </li>
          <li>
            <a href='/'>Journal</a>
          </li>
          <li>
            <AiOutlineSearch size={25} style={{ marginTop: '6px' }} />
          </li>
          <li>
            <AiOutlineUser size={25} style={{ marginTop: '6px' }} />
          </li>
        </ul>
      </nav>
      <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
    </header>
  );
}

export default Navbar;
