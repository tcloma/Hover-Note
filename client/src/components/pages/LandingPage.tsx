import { useState } from 'react';
import { getAllUsers, addNewUser } from '../../apis/userApi';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/LandingPage.module.scss';
import React from 'react';

type Props = {

}

const LandingPage = (props: Props) => {
   // Defining hooks
   const navigate = useNavigate()

   // GET and POST methods for use signups
   // const { status, error, data: users } = getAllUsers()
   // const { mutate: addUser } = addNewUser()

   // States
   const [whichForm, setWhichForm] = useState('signup')
   const [displayForm, setDisplayForm] = useState(false)

   // Data Interaces
   interface IUserData {
      name: string,
      age: number,
      username: string
   }

   const handleSubmit = (e: any) => {
      e.preventDefault()
      const formData: IUserData = {
         name: 'Electron',
         age: 27,
         username: 'Here'
      }
      // addUser(formData)
      navigate('/home')
      // console.log('Posted: ', formData)
   }

   const handleLoginButtonClick = (e: any) => {
      e.preventDefault()
      setWhichForm('login')
   }

   const handleSignupButtonClick = (e: any) => {
      e.preventDefault()
      setWhichForm('signup')
   }

   return (
      <div className={styles.page}>
         <h1> Welcome to <span className={styles.titletext}>Hover</span> </h1>
         {!displayForm ? <h6 onClick={() => setDisplayForm(true)}> Click to continue </h6>
            : 
            <form className={styles.form}>
               <div className={styles.formButtons}>
                  <button onClick={(e) => handleLoginButtonClick(e)}> Login </button>
                  <button onClick={(e) => handleSignupButtonClick(e)}> Singup </button>
               </div>

               {whichForm === 'login' ? null
                  :
                  <div className={styles.nameInput}>
                     <input type='text' placeholder='First name' />
                     <input type='text' placeholder='Last name' />
                  </div>
               }
               <input type='text' placeholder='Email' />
               <input type='password' placeholder='Password' />
               <button onClick={(e) => handleSubmit(e)}> Submit </button>
            </form >
         }
      </div >
   )
}
export default LandingPage