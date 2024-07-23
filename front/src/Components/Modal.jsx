import React, { useEffect, useRef, useState } from 'react'
import tasksActions from '../Store/tasks_store/actions'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const { CreateTask, GetAllTasks } = tasksActions

const Modal = ({ showModal,  title}) => {

  const [textLength, setTextLength] = useState(0)
  const [active, setActive] = useState(true)
  const dispatch = useDispatch()
  const inpTitle = useRef(null)
  const inpDesc = useRef(null)
  const inpStartDate = useRef(null)

  const sendTask = async () => {

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

    const date = new Date(inpStartDate.current.value)

    data.day = date.getDate() + 1
    data.month = date.getMonth() + 1
    data.year = date.getFullYear()

    try {
      const res = await dispatch(CreateTask(data))
      if (res?.payload?.success) {
        toast.success('Tarea agregada con éxito :)')
        await dispatch(GetAllTasks())
        Close()
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const Close = () => {
    setActive(false)
    showModal(false)
  }


  return (
    <>
      {
        active
        ? <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-10 flex justify-center items-center px-3'>
            <div className='bg-[#0f2031] w-full max-w-[500px] flex justify-center items-center flex-col rounded-md p-3 py-10'>
              <p className='text-2xl'>{title}</p>
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
              </div>
              <div className='w-full flex justify-evenly mt-12'>
                <button onClick={sendTask} className='px-5 py-1 bg-green-700 rounded shadow-md hover:bg-green-500'>Aceptar</button>
                <button onClick={Close} className='px-5 py-1 bg-red-700 rounded shadow-md hover:bg-red-500'>Cancelar</button>
              </div>
            </div>
          </div>
          : null
      }
    </>
  )
}

export default Modal