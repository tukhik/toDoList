import React from "react";
import styles from './footerStyle.module.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';


const FooterPage = () => {
  return (
 <div  className = {styles.footer}>
  <footer className="mr-auto container" >
  <a href="https://www.linkedin.com/in/tukhik-gharagyozyan-634136207/"><FaLinkedinIn />  My linkedin   </a><a href="https://github.com/tukhik"><FaGithub/>  My github</a> 
  </footer>
</div>
  );
}

export default FooterPage;