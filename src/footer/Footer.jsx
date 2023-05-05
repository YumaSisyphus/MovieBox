import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerLinks}>
        <li><a href="#">About</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Help</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <p className={styles.footerText}>© 2023 MovieBox Studios. All rights reserved.</p>
    </footer>
  );
}

export default Footer;