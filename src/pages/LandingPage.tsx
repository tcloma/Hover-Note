import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/LandingPage.module.scss';

type Props = {}

const LandingPage = (props: Props) => {
   // Defining hooks
   const navigate = useNavigate()

   return (
      <div className={styles.page}>
         <h1> Welcome to <span className={styles.titletext}>Hover</span> </h1>
         <h6 onClick={() => navigate('/home')}> Click to continue </h6>
      </div >
   )
}

export default LandingPage