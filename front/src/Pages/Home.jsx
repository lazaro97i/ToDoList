import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import tasksActions from '../Store/tasks_store/actions.js'
import Modal from "../Components/Modal.jsx"

const {GetAllTasks} = tasksActions

const Home = () => {

  const tasksStore = useSelector(store => store.tasks)
  const dispatch = useDispatch()
  let [modal, setModal] = useState(false)

  useEffect(()=>{
    dispatch(GetAllTasks())
  },[])

  console.log(tasksStore);

  return (
    <div className="py-20 w-full h-auto">
      <div className="w-full flex justify-center flex-col items-center px-5">
        <p className="w-full max-w-[500px] font-[700] text-3xl">Lista de tareas</p>
        <input className="bg-transparent border border-green-500 px-2 w-full max-w-[500px] mt-4 h-[40px] rounded-md outline-none" type="search" name="searchTasks" id="searchTasks" placeholder="Buscar tareas"/>
        <div className="w-full max-w-[500px] mt-3 flex justify-between gap-5 flex-wrap">
          <div className="flex gap-5 justify-center">
            <label>
              <input className='peer hidden' type="radio" value='pending' name='status' checked/>
              <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Pendientes</p>
            </label>
            <label>
              <input className='peer hidden' type="radio" value='done' name='status'/>
              <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Completas</p>
            </label>
          </div>
            <p onClick={()=>setModal(true)} className="flex items-center gap-2 underline text-xl cursor-pointer">
            <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#fff"></path> </g></svg>
              Nueva tarea
              </p>
        </div>
        <div className="w-full max-w-[500px] mt-5 bg-[#0f2031] p-5 rounded-md">
          <div className="border-b border-green-500">
            <strong className="text-xl underline">Titulo</strong>
            <p className=" opacity-60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quos facere pariatur voluptatibus minima officiis accusamus temporibus minus </p>
          </div>
          <div className="border-b border-white mt-3">
            <strong className="text-xl underline">Titulo</strong>
            <p className=" opacity-60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quos facere pariatur voluptatibus minima officiis accusamus temporibus minus </p>
          </div>
          <div className="border-b border-white mt-3">
            <strong className="text-xl underline">Titulo</strong>
            <p className=" opacity-60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quos facere pariatur voluptatibus minima officiis accusamus temporibus minus </p>
          </div>
        </div>
      </div>
      {modal ? <Modal showModal={setModal} title={"Nueva tarea"}/> : null}
    </div>
  )
}

export default Home