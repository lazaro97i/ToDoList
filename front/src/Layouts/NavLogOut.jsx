import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavLogOut = () => {

  const [nav, setNav] = useState(false)

  const toggleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='relative w-full flex justify-center h-[70px] bg-[#0f2031]'>
      <div className='flex justify-start lg:justify-between  w-full px-10 max-w-[1300px]'>
        <span onClick={toggleNav} className='flex lg:hidden cursor-pointer mr-5'>
          <svg className=' pointer-events-none z-20' viewBox="0 0 24 24" fill="none" width={'45px'} xmlns="http://www.w3.org/2000/svg"><g className=' pointer-events-none' id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g className=' pointer-events-none' id="SVGRepo_iconCarrier"> <path className=' pointer-events-none' d="M4 6H20M4 12H20M4 18H20" stroke="#f1f8fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </span>
        <p className='flex text-nowrap items-center text-2xl'>
          To<span className='text-green-500'>Do </span>-List
          <svg width={"30px"} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="ml-5 iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#166534" d="M35 26a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V6.313C1 4.104 6.791 0 9 0h20.625C32.719 0 35 2.312 35 5.375V26z"></path><path fill="#CCD6DD" d="M33 30a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6c0-4.119-.021-4 5-4h21a4 4 0 0 1 4 4v24z"></path><path fill="#E1E8ED" d="M31 31a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v24z"></path><path fill="#16a34a" d="M31 32a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h21a4 4 0 0 1 4 4v22z"></path><path fill="#22c55e" d="M29 32a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4h19.335C27.544 8 29 9.456 29 11.665V32z"></path><path fill="#166534" d="M6 6C4.312 6 4.269 4.078 5 3.25C5.832 2.309 7.125 2 9.438 2H11V0H8.281C4.312 0 1 2.5 1 5.375V32a4 4 0 0 0 4 4h2V6H6z"></path></g></svg>
        </p>
        <div className='justify-end items-center flex'>
          <ul className='hidden lg:flex justify-center gap-16 w-full relative px-2'>
            <div className='relative'>
              <Link to={'/'} className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
              <svg width={"25px"} fill="#22c55e" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"></path></g></svg>
                Ingresar
              </Link>
            </div>
            <div className='relative'>
              <Link to={'/signup'} className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
              <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                Registrarse
              </Link>
            </div>
          </ul>
        </div>
      </div>
      {
        nav
          ? <div className='fixed top-0 left-0 w-full max-w-[250px] bg-[#0f2031] border-r border-green-700 h-screen flex justify-center z-20'>
            <div onClick={() => { toggleNav() }} className='absolute w-screen h-screen bg-[#1d2535c6] top-0 left-[250px] [backdrop-filter:_blur(2px)]'></div>
            <ul className='flex flex-col mt-28 gap-5 relative w-full px-5'>
            <div className='relative'>
              <Link onClick={() => { toggleNav() }} to={'/signin'} className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
              <svg width={"25px"} fill="#22c55e" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"></path></g></svg>
                Ingresar
              </Link>
            </div>
            <div className='relative'>
              <Link onClick={() => { toggleNav() }} to={'/signup'} className='font-[500] text-[1rem] rounded-md transition-all duration-200 li-license p-2 cursor-pointer flex gap-1 items-center max-h-[40px]'>
              <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                Registrarse
              </Link>
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

export default NavLogOut