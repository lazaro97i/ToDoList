import React from 'react'
import { useLocation } from 'react-router-dom'

const AddNewUserForm = () => {

  const path = useLocation()

  return (
    <div className='w-full flex justify-center items-center pt-20 px-5'>
      <div className='w-full max-w-[500px] flex flex-col justify-center items-center py-10 px-10 mx-5 rounded-md border-4 border-green-500'>
        <h2 className='mt-10 text-3xl font-[800] self-start'>{path.pathname == '/addUser' ? "Nuevo usuario" : "Registrarse"}</h2>
        <label htmlFor="username" className='flex flex-col self-start w-full mt-10'>
          Nombre de usuario: 
          <input type="text" name='username' id='username' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese nombre de usuario'/>
        </label>
        <label htmlFor="username" className='flex flex-col self-start w-full mt-10'>
          Email: 
          <input type="email" name='email' id='email' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese email'/>
        </label>
        <label htmlFor="password" className='flex flex-col self-start w-full mt-10'>
          Contraseña: 
          <input type="password" name='password' id='password' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese contraseña'/>
        </label>
        <label htmlFor="username" className='flex flex-col self-start w-full mt-10'>
          URL Foto: 
          <input type="url" name='photo' id='photo' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese url de foto'/>
        </label>
        {
          path.pathname == '/addUser'
          ?<label className='flex flex-col self-start w-full mt-10'>
          <span className='flex w-4/5 max-w-[270px] md:max-w-[350px] mb-5'>Rol de usuario:</span>
          <div className='flex gap-10 justify-center'>
            <label>
              <input className='peer hidden' type="radio" value='ADMIN_ROLE' name='role' />
              <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Admin</p>
            </label>
            <label>
              <input className='peer hidden' type="radio" value='USER_ROLE' name='role' />
              <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Usuario</p>
            </label>
          </div>
        </label>
        :null
        }
        <button className='flex items-center mt-20 bg-green-600 px-20 py-2 rounded-md gap-3 hover:bg-green-500 transition-all duration-200'>
        <svg width={"30px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus_Circle"> <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
          <span className='text-xl'>{path.pathname == '/addUser' ? "Agregar" : "Registrarse"}</span>
        </button>
      </div>
    </div>
  )
}

export default AddNewUserForm