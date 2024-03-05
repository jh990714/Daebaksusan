import React from 'react'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <h3>Contact Us</h3>
          <p>Email: abc@google.com</p>
          <p>Phone: +82 1234 5678</p>
          <p>Address: 전라남도</p>
        </div>
        <div className={styles.footerContent}>
          <h3>Quick Links</h3>
          <ul className={styles.footerContentList}>
            <li><a href="">일단</a></li>
            <li><a href="">아무거나</a></li>
            <li><a href="">넣어봐</a></li>
            <li><a href="">ㅋㅋㅋ</a></li>
          </ul>
        </div>
        <div className={styles.footerContent}>
          <h3>Follow Us</h3>
          <ul className={styles.socialIcons}>
            <li><a href=""><i className="fab fa-facebook"></i></a></li>
            <li><a href=""><i className="fab fa-twitter"></i></a></li>
            <li><a href=""><i className="fab fa-instagram"></i></a></li>
            <li><a href=""><i className="fab fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
      {/* <div className={styles.bottomBar}>
        <p>&copy; 2023 your company. All rights reserved</p>
      </div> */}
    </footer>
  );
};

export default Footer;

