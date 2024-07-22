import React, { useRef, useState } from 'react'
import userActios from '../Store/users_store/actions'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const {signIn} = userActios

const LoginForm = () => {

  const dispatch = useDispatch()
  const inpUsername = useRef("")
  const inpPass = useRef("")
  const [loading, setLoading] = useState(false)

  const signin = async ()=>{

    try{
      const data = {}
    if(inpUsername.current.value){
      data.username = inpUsername.current.value
    }else{
      toast.error("Debe ingresar nombre de usuario")
      return
    }
    if(inpPass.current.value){
      data.password = inpPass.current.value
    }else{
      toast.error("Debe ingresar contraseña")
      return
    }
    const res = await dispatch(signIn(data))

    if(res?.payload.success){
      toast.success(res?.payload.message)
    }else{
      toast.error(res?.payload.message)
    }

    }catch(ex){
      console.log(ex)
    }

  }

  return (
    <div className='w-full flex justify-center items-center mt-20'>
      <div className='w-full max-w-[500px] flex flex-col justify-center items-center py-10 px-10 mx-5 rounded-md border-4 border-green-500'>
        <h1 className='text-5xl font-[600]'>To<strong className='text-green-500'>Do</strong> List</h1>
        <h2 className='mt-10 text-3xl font-[800] self-start'>Ingresar</h2>
        <label htmlFor="username" className='flex flex-col self-start w-full mt-10'>
          Nombre de usuario: 
          <input ref={inpUsername} type="text" name='username' id='username' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese su nombre de usuario'/>
        </label>
        <label htmlFor="password" className='flex flex-col self-start w-full mt-10'>
          Contraseña: 
          <input ref={inpPass} type="password" name='password' id='password' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese su contraseña'/>
        </label>
        <button onClick={signin} className='flex items-center mt-20 bg-green-600 px-20 py-2 rounded-md gap-3 hover:bg-green-500 transition-all duration-200'>
        <svg width={"30px"} fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"></path></g></svg>
          <span className='text-xl'>Ingresar</span>
        </button>
      </div>
    </div>
  )
}

export default LoginForm