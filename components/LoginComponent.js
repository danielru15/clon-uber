import React,{ useState , useContext} from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router'
import { UberContext } from "../context/uberContext"

const LoginComponent = () => {
    const router = useRouter()
    const {usuario , setUsuario, setToken} = useContext(UberContext)
    const [userData, setUserData] = useState({
        identifier: '',
        password: '',
      })
    
      const handleSubmit = async (e) => {
        e.preventDefault();
          await axios.post('https://clone-uber-esqui.herokuapp.com/auth/local', userData)
          .then(response => {
                const jwt = response.data.jwt;
                const username = response.data.user;
            //console.log('User profile', response.data.user);
            //console.log('User token', response.data.jwt);
            setToken(jwt)
            document.cookie = "barealtoken" + encodeURIComponent( jwt )
            setUsuario(username)
            router.push('/ride');
            }
          )
          .catch(error => console.log(error.response) )
        
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
      }
  return (
    <>
      <h1 className='text-center mt-4 text-2xl'>Login</h1>
    <form  onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-[60%] my-20 mx-auto">
      <label className="block text-grey-darker text-sm font-bold mb-2">
        Email:
        <input type="email" name="identifier" onChange={e => handleChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
      </label>
      <br />
      <label className="block text-grey-darker text-sm font-bold mb-2">
        Password:
        <input type="password" name="password"  onChange={e => handleChange(e)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"/>
      </label>
      <br />
      
      <Link href="/register">
            <p>No tienes cuenta ? Registrate</p>
        </Link>
      <br />
      <button className="bg-blue-700  text-white font-bold py-2 px-4 rounded">Ingresar</button>
    </form>
      </>
  )
}

export default LoginComponent