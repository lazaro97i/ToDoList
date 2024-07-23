import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userActions from '../Store/users_store/actions'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const { getOne, updateOne, getAllUsers} = userActions

const ModalEditUser = ({activeModal, id}) => {

  const [active, setActive] = useState(true)
  const userStore = useSelector(store=>store.user)
  const [data,setData] = useState(null)
  const [role, setRole] = useState('USER_ROLE')
  const inpUserName = useRef(null)
  const inpEmail = useRef(null)
  const inpPass = useRef(null)
  const inpPassRepeat = useRef(null)
  const inpPhoto = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userStore?.sucecss || userStore?.user == null) {
      getUser()
    }
  }, [])

  useEffect(() => {
    completarForm()
  }, [data])

  const getUser = async () => {

    try {
      const res = await dispatch(getOne({ id: id }))
      setData(res.payload.response)
      if (data !== null) {
        completarForm()
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const completarForm = () => {
    console.log(data)

    const user = document?.getElementById('username')
    const email = document?.getElementById('email')
    const pass = document?.getElementById('password')
    const repeatPass = document?.getElementById('repeatPassword')
    const photo = document?.getElementById('photo')
    const adm = document?.getElementById('adminRole')
    const usr = document?.getElementById('userRole')

    user.value = data?.username
    email.value = data?.email
    pass.value = data?.password
    repeatPass.value = data?.password
    photo.value = data?.photo

    if (data?.role === 'ADMIN_ROLE') {
      adm.checked = true
    } else {
      usr.checked = true
    }
  }

  const handlerUpdate = async () => {

    const data = {}

    if(inpUserName.current.value === null || inpUserName.current.value === ""){
      toast.error('Debe ingresar un nombre de usuario')
      return
    }
    if(inpEmail.current.value === null || inpEmail.current.value === ""){
      toast.error('Debe ingresar un correo electrónico')
      return
    }
    if(inpPass.current.value === null || inpPass.current.value === ""){
      toast.error('Debe ingresar una contraseña')
      return
    }
    if(inpPassRepeat.current.value === null || inpPassRepeat.current.value === ""){
      toast.error('Debe repetir la contraseña')
      return
    }
    if(inpPassRepeat.current.value.length < 6 || inpPass.current.value.length < 6){
      toast.error('La contraseña debe contener al menos 6 caracteres')
      return
    }

    if(inpPass.current.value != inpPassRepeat.current.value){
      toast.error('Las contraseñas ingresadas no coinciden')
      return
    }
    if(inpPhoto.current.value !== null && inpPhoto.current.value !== ""){
      data.photo=inpPhoto.current.value
    }

    data.username=inpUserName.current.value
    data.email=inpEmail.current.value
    data.password=inpPass.current.value
    data.role = role

    try{
      const res = await dispatch(updateOne({data: data, id: id}))
      console.log(res)
      if(res?.payload?.success){
        toast.success(res?.payload?.message)
        await dispatch(getAllUsers())
        Close()
      }else{
        toast.error(res?.payload?.message)
      }
    }catch(ex){
      console.log(ex)
    }
  }

  const Close = () => {
    setActive(false)
    activeModal(false)
  }

  return (
    <>
      {
        active
          ? <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-10 flex justify-center items-center px-3'>
            <div className='bg-[#0f2031] w-full max-w-[500px] px-10 py-10 flex flex-col items-center overflow-y-auto  max-h-[800px] rounded-md'>
              <h2 className='mt-10 text-3xl font-[800] self-start'>Editar usuario</h2>
              <label htmlFor="username" className='flex flex-col self-start w-full mt-10'>
                Nombre de usuario:
                <input ref={inpUserName} type="text" name='username' id='username' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese nombre de usuario' />
              </label>
              <label className='flex flex-col self-start w-full mt-10'>
                Email:
                <input ref={inpEmail} type="email" name='email' id='email' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese email' />
              </label>
              <label htmlFor="password" className='flex flex-col self-start w-full mt-10'>
                Contraseña:
                <input ref={inpPass} type="password" min={6} name='password' id='password' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese contraseña' />
              </label>
              <label  className='flex flex-col self-start w-full mt-10'>
                Repetir contraseña:
                <input ref={inpPassRepeat} type="password" min={6} name='repeatPassword' id='repeatPassword' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese contraseña' />
              </label>
              <label className='flex flex-col self-start w-full mt-10'>
                URL Foto:
                <input ref={inpPhoto} type="url" name='photo' id='photo' className='bg-transparent border border-green-500 rounded-md h-[40px] pl-4 outline-none mt-3' placeholder='Ingrese url de foto' />
              </label>
              <label className='flex flex-col self-start w-full mt-10'>
                <span className='flex w-4/5 max-w-[270px] md:max-w-[350px] mb-5'>Rol de usuario:</span>
                <div className='flex gap-10 justify-center'>
                  <label>
                    <input onClick={(e) => { setRole(e.target.value) }} className='peer hidden' type="radio" value='ADMIN_ROLE' name='role' id='adminRole'/>
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Admin</p>
                  </label>
                  <label>
                    <input onClick={(e) => { setRole(e.target.value) }} className='peer hidden' type="radio" value='USER_ROLE' name='role' id='userRole' />
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Usuario</p>
                  </label>
                </div>
              </label>
              <div className='mt-10 flex justify-around w-full'>
                <button onClick={handlerUpdate} className='px-5 py-1 bg-green-700 rounded shadow-md hover:bg-green-500'>Aceptar</button>
                <button onClick={Close} className='px-5 py-1 bg-red-700 rounded shadow-md hover:bg-red-500'>Cancelar</button>
              </div>
            </div>
            {/* {activeConfirmation ? <ConfirmationModal /> : null} */}
          </div>
          : null
      }
    </>
  )
}

export default ModalEditUser