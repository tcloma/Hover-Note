import { getAllUsers, addNewUser } from '../../apis/userApi'

const Homepage = () => {
   const { status, error, data: users } = getAllUsers()
   const { mutate: addUser } = addNewUser()

   console.log(users)

   interface IUserData {
      name: string,
      age: number,
      username: string
   }

   const formData: IUserData = {
      name: 'TestName',
      age: 21,
      username: 'TestUser'
   }

   const handleSubmit = () => {
      addUser(formData)
      console.log('Posted: ', formData)
   }

   return (
      <div className="App">
         <p> Content </p>
         <button onClick={() => handleSubmit()}> Post Test </button>
      </div>
   )
}
export default Homepage