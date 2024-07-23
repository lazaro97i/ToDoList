import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tasksActions from '../Store/tasks_store/actions'
import toast from 'react-hot-toast'

const { GetOneTask, UpdateTask, GetAllTasks, DeleteOne} = tasksActions

const ModalEdit = ({ showModal, idTask }) => {

  const taskStore = useSelector(store => store.tasks)
  const authStore = useSelector(store => store.auth)

  const [textLength, setTextLength] = useState(0)
  const [active, setActive] = useState(true)
  const [activeConfirmation, setActiveConfirmation] = useState(false)
  const [status, setStatus] = useState(null)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const inpTitle = useRef(null)
  const inpDesc = useRef(null)
  const inpStartDate = useRef(null)

  useEffect(() => {
    if (!taskStore?.sucecss || taskStore?.task == null) {
      getTask()
    }
  }, [])

  useEffect(() => {
    completarForm()
  }, [data])

  const getTask = async () => {

    try {
      const res = await dispatch(GetOneTask({ taskId: idTask }))
      console.log(res);
      setData(res.payload.response.task)
      if (data !== null) {
        completarForm()
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const completarForm = () => {
    console.log(data)

    const title = document?.getElementById('title')
    const description = document?.getElementById('description')
    const date = document?.getElementById('startDate')
    const statusDone = document?.getElementById('statusDone')
    const statusPend = document?.getElementById('statusPending')

    let fecha = new Date(data?.year, data?.month, data?.day).toLocaleDateString().split('/').reverse()
    console.log(fecha);
    fecha[0] = parseInt(fecha[0])
    fecha[1] = parseInt(fecha[1] - 1) < 10 ? (`0${fecha[1] - 1}`) : fecha[1] - 1
    fecha[2] = parseInt(fecha[2]) < 10 ? (`0${fecha[2]}`) : fecha[2]

    title.value = data?.title
    description.value = data?.description
    setTextLength(data?.description?.length)
    setStatus(data?.isActive)
    if (data?.isActive) {
      statusPend.checked = true
    } else {
      statusDone.checked = true
    }
    date.value = fecha.join('-')

  }

  const updateTask = async () => {

    const data = {}

    if (!inpTitle.current.value || inpTitle.current.value === "") {
      toast.error("Debe ingresar un titulo")
      return
    }
    if (!inpDesc.current.value || inpDesc.current.value === "") {
      toast.error("Debe ingresar una descripción")
      return
    }
    if (!inpStartDate.current.value || inpStartDate.current.value === "") {
      toast.error("Debe ingresar una fecha de inicio")
      return
    }

    data.title = inpTitle.current.value
    data.description = inpDesc.current.value
    data.isActive = status

    const date = new Date(inpStartDate.current.value)
    data.day = date.getDate() + 1
    data.month = date.getMonth() + 1
    data.year = date.getFullYear()

    try {
      const res = await dispatch(UpdateTask({ data: data, taskId: idTask }))
      if (res?.payload?.success) {
        toast.success('Tarea editada con éxito :)')
        await dispatch(GetAllTasks())
        Close()
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleDelete = async()=>{

    try{
      const res = await dispatch(DeleteOne(idTask))
      if(res?.payload?.success){
        toast.success('Tarea eliminada con éxito :)')
        await dispatch(GetAllTasks())
        closeConfirmation()
        Close()
      }
    }catch(ex){
      console.log(ex)
    }
  }

  const Close = () => {
    setActive(false)
    showModal(false)
  }

  const closeConfirmation = ()=>{
    setActiveConfirmation(!activeConfirmation)
  }

  const ConfirmationModal = () => {

    return (

      <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-10 flex justify-center items-center px-3'>
        <div className='bg-[#0f2031] w-full max-w-[500px] flex justify-around gap-20 items-center flex-col rounded-md p-3 py-20 relative'>
          <p className='text-2xl'>Desea eliminar la tarea?</p>
          <div>
            <div className='w-full flex justify-evenly gap-10'>
              <button onClick={closeConfirmation}  className='px-5 py-1 bg-sky-700 rounded shadow-md hover:bg-sky-500'>Cancelar</button>
              <button onClick={handleDelete} className='px-5 py-1 bg-red-700 rounded shadow-md hover:bg-red-500'>Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <>
      {
        active
          ? <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-10 flex justify-center items-center px-3'>
            <div className='bg-[#0f2031] w-full max-w-[500px] flex justify-center items-center flex-col rounded-md p-3 pt-10 pb-20 relative'>
              {
                authStore?.auth?.role === "ADMIN_ROLE"
                ?<p onClick={closeConfirmation} className='hover:underline cursor-pointer hover:text-red-400 transition-all duration-200 text-red-500 absolute bottom-5 left-50 text-xl'>Eliminar tarea</p>
                : null
              }
              <p className='text-2xl'>Editar tarea</p>
              <div>
                <label className='flex flex-col mt-6 w-full'>
                  Titulo:
                  <input ref={inpTitle} type="text" name="title" id="title" placeholder='Titulo de tarea' className='bg-transparent border-b border-green-500 outline-none px-2' />
                </label>
                <label className='flex flex-col mt-5 w-full'>
                  Descripción:
                  <textarea ref={inpDesc} onInput={(e) => setTextLength(e.target.value.length)} name="description" id="description" placeholder='Descripción de tarea' className='bg-[#21364b] outline-none px-2 resize-none' rows={5} cols={33} maxLength={200}></textarea>
                  <div className='self-end'>{textLength}/200</div>
                </label>
                <label className='flex flex-col mt-5 w-full'>
                  Fecha vencimiento:
                  <input ref={inpStartDate} type="date" name="startDate" id="startDate" className='mt-2 bg-transparent border border-green-500 px-5 py-2 rounded outline-none' />
                </label>
                <div className="flex gap-5 justify-evenly w-full flex-wrap">
                  <p className='w-full mt-5'>Estado:</p>
                  <label>
                    <input onClick={() => setStatus(true)} className='peer hidden' type="radio" value='pending' name='status' id='statusPending' />
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Pendiente</p>
                  </label>
                  <label>
                    <input onClick={() => setStatus(false)} className='peer hidden' type="radio" value='done' name='status' id='statusDone' />
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Completa</p>
                  </label>
                </div>
              </div>
              <div className='w-full flex justify-evenly mt-12'>
                <button onClick={updateTask} className='px-5 py-1 bg-green-700 rounded shadow-md hover:bg-green-500'>Aceptar</button>
                <button onClick={Close} className='px-5 py-1 bg-red-700 rounded shadow-md hover:bg-red-500'>Cancelar</button>
              </div>
            </div>
            {activeConfirmation ? <ConfirmationModal /> : null}
          </div>
          : null
      }
    </>
  )
}

export default ModalEdit