import { useNavigate } from "react-router-dom"
import Note from "../sub-components/Note"
import styles from '../../styles/components/HomePage.module.scss'

type Props = {
   user?: string
}

const HomePage = ({ user = 'Ty' }: Props) => {
   const navigate = useNavigate()

   return (
      <div className={styles.page}>
         <h1>Welcome back, {user}</h1>
         <button onClick={() => navigate('/')}> Go to landing </button>
         <h3>Recent Notes</h3>
         <main className={styles.noteContainer}>
            <Note
               title="Test"
               content="This is a test note"
            />
            <Note
               title="Test2"
               content="This is a test note"
            />
            <Note
               title="Test3"
               content="This is a test note"
            />
            <Note
               title="Test4"
               content="This is a test note"
            />
         </main>
      </div>
   )
}

export default HomePage