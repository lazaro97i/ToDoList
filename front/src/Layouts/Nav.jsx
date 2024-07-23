import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userActions from '../Store/users_store/actions'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const {signOut} = userActions

const routesAdmin = [
  {
    name: 'Agregar usuario',
    path: 'addUser',
    svg: <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  },
  {
    name: 'Administrar usuarios',
    path: 'adminUsers',
    svg: <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V8C21 8.55228 20.5523 9 20 9C19.4477 9 19 8.55228 19 8V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H10C10.5523 21 11 21.4477 11 22C11 22.5523 10.5523 23 10 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM20.1716 18.7574C20.6951 17.967 21 17.0191 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21C17.0191 21 17.967 20.6951 18.7574 20.1716L21.2929 22.7071C21.6834 23.0976 22.3166 23.0976 22.7071 22.7071C23.0976 22.3166 23.0976 21.6834 22.7071 21.2929L20.1716 18.7574ZM13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19C14.3431 19 13 17.6569 13 16Z" fill="#22c55e"></path> </g></svg>
  }
]

const Nav = (user) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nav, setNav] = useState(false)

  const toggleNav = (e) => {
    setNav(!nav)
  }
  
  const signout = async()=>{

    try{
      const res = await dispatch(signOut())
      console.log(res)
      if(res?.payload?.success){
        toast.success('Sesión teminada')
        localStorage.removeItem('userToken')
        navigate('/')
      }
    }catch(ex){
      console.log(ex)
    }
  }

  return (
    <div className='relative w-full flex justify-center h-[70px] bg-[#0f2031]'>
      <div className='flex justify-start lg:justify-between  w-full px-10 max-w-[1300px]'>
        <span onClick={toggleNav} className='flex lg:hidden cursor-pointer mr-5'>
          <svg className=' pointer-events-none z-20' viewBox="0 0 24 24" fill="none" width={'45px'} xmlns="http://www.w3.org/2000/svg"><g className=' pointer-events-none' id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g className=' pointer-events-none' id="SVGRepo_iconCarrier"> <path className=' pointer-events-none' d="M4 6H20M4 12H20M4 18H20" stroke="#f1f8fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </span>
        <Link to={"/home"} className='flex text-nowrap items-center text-2xl'>
        To<span className='text-green-500'>Do </span>-List
          <svg width={"30px"} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="ml-5 iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#166534" d="M35 26a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V6.313C1 4.104 6.791 0 9 0h20.625C32.719 0 35 2.312 35 5.375V26z"></path><path fill="#CCD6DD" d="M33 30a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6c0-4.119-.021-4 5-4h21a4 4 0 0 1 4 4v24z"></path><path fill="#E1E8ED" d="M31 31a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v24z"></path><path fill="#16a34a" d="M31 32a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h21a4 4 0 0 1 4 4v22z"></path><path fill="#22c55e" d="M29 32a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4h19.335C27.544 8 29 9.456 29 11.665V32z"></path><path fill="#166534" d="M6 6C4.312 6 4.269 4.078 5 3.25C5.832 2.309 7.125 2 9.438 2H11V0H8.281C4.312 0 1 2.5 1 5.375V32a4 4 0 0 0 4 4h2V6H6z"></path></g></svg>
        </Link>
        <div className='justify-center items-center flex flex-grow'>
          <ul className='hidden lg:flex justify-center gap-16 w-full relative px-2'>
            {/* <div className='relative'>
              <li className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
                <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 11C14.2386 11 12 13.2386 12 16C12 18.7614 14.2386 21 17 21C19.7614 21 22 18.7614 22 16C22 13.2386 19.7614 11 17 11ZM17 11V9M2 9V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H13M2 9V8.2C2 7.0799 2 6.51984 2.21799 6.09202C2.40973 5.71569 2.71569 5.40973 3.09202 5.21799C3.51984 5 4.0799 5 5.2 5H13.8C14.9201 5 15.4802 5 15.908 5.21799C16.2843 5.40973 16.5903 5.71569 16.782 6.09202C17 6.51984 17 7.0799 17 8.2V9M2 9H17M5 3V5M14 3V5M15 16H17M17 16H19M17 16V14M17 16V18" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                Agregar tarea
              </li>
            </div>
            <div className='relative'>
              <li className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
                <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V8C21 8.55228 20.5523 9 20 9C19.4477 9 19 8.55228 19 8V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H10C10.5523 21 11 21.4477 11 22C11 22.5523 10.5523 23 10 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM20.1716 18.7574C20.6951 17.967 21 17.0191 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21C17.0191 21 17.967 20.6951 18.7574 20.1716L21.2929 22.7071C21.6834 23.0976 22.3166 23.0976 22.7071 22.7071C23.0976 22.3166 23.0976 21.6834 22.7071 21.2929L20.1716 18.7574ZM13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19C14.3431 19 13 17.6569 13 16Z" fill="#22c55e"></path> </g></svg>
                Ver tareas
              </li>
            </div> */}
            {
              user?.user?.auth?.role === 'ADMIN_ROLE' ?
              routesAdmin.map((r,i)=>{
                return (
                  <div key={i} className='relative'>
                  <Link to={r.path} className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
                    {r.svg}
                    {r.name}
                  </Link>
                </div>
                )
              })
              :null
            }
          </ul>
        </div>
        <div className='hidden sm:flex items-center justify-center gap-4'>
          <img className='w-[55px]' src={user?.user?.auth?.photo} alt="" />
          <div>
            <p className=' font-[400] text-[1rem]'>{user?.user?.auth?.username}</p>
            <p onClick={signout} className='text-nowrap text-green-500 cursor-pointer hover:text-green-400 duration-300 hover:underline'>Cerrar sesión</p>
          </div>
        </div>
      </div>
      {
        nav
          ? <div className='fixed top-0 left-0 w-full max-w-[250px] bg-[#0f2031] border-r border-green-700 h-screen flex justify-center z-20'>
            <div onClick={() => { toggleNav() }} className='absolute w-screen h-screen bg-[#1d2535c6] top-0 left-[250px] [backdrop-filter:_blur(2px)]'></div>
            <ul className='flex flex-col mt-28 gap-5 relative w-full px-5'>
              <div className='flex sm:hidden items-center justify-center flex-col gap-5 absolute bottom-20 left-11'>
                <div className='flex justify-center items-center gap-2'>
                  <img className='w-[55px]' src={user?.user?.auth?.photo} alt="" />
                  <p className=' font-[400] text-[1rem]'>{user?.user?.auth?.username}</p>
                </div>
                <p onClick={signout} className='text-nowrap text-green-400 border px-5 py-1 border-green-500 rounded text-xl cursor-pointer'>Cerrar sesión</p>
              </div>
            </ul>
            <span onClick={toggleNav} className='absolute top-5 right-5 cursor-pointer'>
              <svg fill="#22c55e" width={'45px'} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>
            </span>
          </div>
          : null
      }
    </div>
  )
}

export default Nav