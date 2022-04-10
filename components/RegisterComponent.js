import { useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router'

const RegisterComponent = () => {
  const router = useRouter()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post('https://clone-uber-esqui.herokuapp.com/auth/local/register', userData)
      .then(response => {
        console.log(response)
        router.push('/');
      })
      .catch(error => console.log(error) )
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
  }

  return (
      <>
      <h1 className='text-center mt-4 text-2xl'>Registro</h1>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-[60%] my-20 mx-auto">
      <label className="block text-grey-darker text-sm font-bold mb-2">
        Username:
        <input type="text" name="username"  onChange={e => handleChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" />
      </label>
      <br />
      <label className="block text-grey-darker text-sm font-bold mb-2">
        Email:
        <input type="text" name="email" onChange={e => handleChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
      </label>
      <br />
      <label className="block text-grey-darker text-sm font-bold mb-2">
        Password:
        <input type="password" name="password"  onChange={e => handleChange(e)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
      </label>
      <br />
      <Link href="/">
            <p>tienes cuenta? Ingresa</p>
        </Link>
      <br />
      <button className="bg-blue-700  text-white font-bold py-2 px-4 rounded">Register</button>
    </form>
      </>
  )
}

export default RegisterComponent;
