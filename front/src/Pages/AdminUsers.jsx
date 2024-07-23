import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import { useDispatch, useSelector, useStore } from 'react-redux'
import userActions from '../Store/users_store/actions'
import ModalEditUser from '../Components/ModalEditUser'
import toast from 'react-hot-toast'

const {getAllUsers, getOne, deleteOne} = userActions

const AdminUsers = () => {

  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [modal, setModalEdit] = useState(false)
  const [confirmationDelete, setCloseConfirmation] = useState(false)
  const [filterSearch, setFilterSearch] = useState("")
  const userStore = useSelector(store=>store.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(!userStore?.users || userStore?.users?.length <= 0){
      getUsers()
    }
  },[])

  const getUsers = async()=>{
    try{
      setLoading(true)
      const res = await dispatch(getAllUsers())
    }catch(ex){
      console.log(ex)
    }finally{
      setLoading(false)
    }
  }

  const handleDelete = async()=>{

    try{
      setLoading(true)
      const res = await dispatch(deleteOne(userId))
      console.log(res)
      if(res?.payload?.success){
        toast.success(res?.payload?.message)
        await dispatch(getAllUsers())
        setCloseConfirmation(false)
      }
    }catch(ex){
      console.log(ex)
    }finally{
      setLoading(true)
    }
  }

  const ModalConfirmationDelete = ()=>{

    const [userData, setUserData] = useState(null)

    useEffect(()=>{
      if (!userStore?.sucecss && userStore?.user == null  && userData == null){
        getUser()
      }
    },[])

    useEffect(()=>{
      setUserData(userStore?.user)
    },[userData])

    const getUser = async () => {
      try {
        setLoading(true)
        const res = await dispatch(getOne({ id: userId }))
        setUserData(res?.payload?.response)
      } catch (ex) {
        console.log(ex)
      }finally{
        setLoading(false)
      }
    }

    return (

      <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-10 flex justify-center items-center px-3'>
        <div className='bg-[#0f2031] w-full max-w-[500px] flex justify-around gap-20 items-center flex-col rounded-md p-3 py-20 relative'>
          <p className='text-2xl'>Desea eliminar el usuario {userData?.username}?</p>
          <div>
            <div className='w-full flex justify-evenly gap-10'>
              <button onClick={()=>{setCloseConfirmation(false)}}  className='px-5 py-1 bg-sky-700 rounded shadow-md hover:bg-sky-500'>Cancelar</button>
              <button onClick={handleDelete} className='px-5 py-1 bg-red-700 rounded shadow-md hover:bg-red-500'>Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <div className="py-20 w-full h-auto">
      <div className="w-full flex justify-center flex-col items-center px-5">
        <p className="w-full max-w-[500px] font-[700] text-3xl">Lista de usuarios</p>
        <input onInput={(e)=>{setFilterSearch(e.target.value)}} className="bg-transparent border border-green-500 px-2 w-full max-w-[500px] mt-4 h-[40px] rounded-md outline-none" type="search" name="searchTasks" id="searchTasks" placeholder="Buscar usuarios" />
        <div className="w-full max-w-[500px] mt-3 flex justify-between gap-5 flex-wrap">
          <div className="flex gap-5 flex-col justify-start flex-wrap w-full">
          </div>
        </div>
        <div className="w-full max-w-[500px] mt-2 bg-[#0f2031] px-5 pb-10 pt-5 rounded-md max-h-[560px] overflow-y-auto">
          {
            loading
              ? <div className="w-full flex justify-center"><Loader /></div>
              : userStore?.users?.filter(t => t.username.includes(filterSearch)).map((t, i) => {
                return (
                    <div id={`task${i}`} key={i} className="border-b border-green-500 mt-5 transition-all duration-150 p-3 rounded-t  flex items-center gap-10 justify-between">
                      <div className='flex items-center gap-10'>
                      <div>
                        <img className='w-[80px] min-w-[60px]' src={t.photo} alt="" />
                      </div>
                      <div className='flex flex-col'>
                      <strong id={`title${i}`} className="text-xl">{t.username}</strong>
                      <p id={`desc${i}`} className=" opacity-60">{t.role}</p>
                      </div>
                      </div>
                      <div className='flex gap-7 flex-col sm:flex-row h-full justify-start'>
                        <span onClick={()=>{setModalEdit(true),setUserId(t._id)}}>
                        <svg  className=' cursor-pointer' width={"30px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </span>
                        <span onClick={()=>{setCloseConfirmation(true),setUserId(t._id)}} className='cursor-pointer'>
                        <svg width={"30px"} fill="#b91c1c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
                        </span>
                      </div>
                    </div>
                )
              })
          }
        </div>
        <p className="w-full max-w-[500px] text-end mt-2 text-xl"><span className="font-[700] text-green-500 pr-2">{userStore?.users?.length}</span>usuarios encontradas</p>
      </div>
      {confirmationDelete ? <ModalConfirmationDelete /> : null}
      {modal ? <ModalEditUser activeModal={setModalEdit} id={userId}/> : null}
    </div>
  )
}

export default AdminUsers