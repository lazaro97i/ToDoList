import React, { useState } from 'react'

const Modal = ({ showModal, action, title, alert, content }) => {

  const [textLength, setTextLength] = useState(0)
  const [active, setActive] = useState(true)

  const Close = () => {
    setActive(false)
    showModal(false)
  }

  return (
    <>
      {
        active
          ? alert != true
            ? <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen absolute top-0 left-0 z-10 flex justify-center items-center px-3'>
              <div className='bg-[#0f2031] w-full max-w-[500px] flex justify-center items-center flex-col rounded-md p-3'>
                <p className='text-2xl'>{title}</p>
                <label className='flex flex-col mt-6'>
                  Titulo:
                  <input type="text" name="title" id="title" placeholder='Titulo de tarea' className='bg-transparent border-b outline-none px-2' />
                </label>
                <label className='flex flex-col mt-5'>
                  Descripción:
                  <textarea onInput={(e) => setTextLength(e.target.value.length)} name="description" id="description" placeholder='Descripción de tarea' className='bg-[#21364b] outline-none px-2 resize-none' rows={5} cols={33} maxLength={200}></textarea>
                  <div className='self-end'>{textLength}/200</div>
                </label>
                <div className='w-full flex justify-evenly mt-5'>
                  <button onClick={action} className='px-5 py-1 bg-green-700 rounded shadow-md hover:bg-green-500'>Aceptar</button>
                  <button onClick={Close} className='px-5 py-1 bg-red-700 rounded shadow-md hover:bg-red-500'>Cancelar</button>
                </div>
              </div>
            </div>
            : <div className='bg-black bg-opacity-45 backdrop-blur-sm w-full h-screen absolute top-0 left-0 z-10 flex justify-center items-center px-3'>
              <div className='bg-green-700 w-full max-w-[500px] h-auto flex justify-center items-center flex-col rounded-md p-3 overflow'>
                <p className='text-2xl'>{title}</p>
                  <span className='max-w-[400px] mt-5'>{content}</span>
                <div className='w-full flex justify-evenly mt-5'>
                  <button onClick={action} className='px-5 py-1 bg-green-700 rounded shadow-md hover:bg-green-500'>Aceptar</button>
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