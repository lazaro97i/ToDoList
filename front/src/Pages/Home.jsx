import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import tasksActions from '../Store/tasks_store/actions.js'
import Modal from "../Components/Modal.jsx"
import Loader from "../Components/Loader.jsx"
import ModalEdit from "../Components/ModalEdit.jsx"
import toast from "react-hot-toast"

const { GetAllTasks, SetDone, GetOneTask } = tasksActions

const Home = () => {

  const tasksStore = useSelector(store => store.tasks)
  const authStore = useSelector(store => store.auth)
  const dispatch = useDispatch()
  let [modalNewTask, setModal] = useState(false)
  let [modalEdit, setModalEdit] = useState(false)
  const [taskId, setTaskId] = useState(false)
  const [statusTask, setStatusTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState(null)
  const [filterSearch, setFilterSearch] = useState("")
  const [viewTasks, setViewTasks] = useState('my')
  const [data, setData] = useState([])

  useEffect(() => {
    if (tasksStore?.tasks?.length <= 0 || !tasksStore?.tasks) {
      getInfo()
    }
  }, [tasksStore?.task])

  useEffect(() => {
    if (filter === null) {
      const stt = document.getElementsByName('status')
      stt.forEach(s => {
        s.checked = false
      })
    }
  }, [filter])

  const allTasks = tasksStore?.tasks?.filter((t) => filter === null ? t : t.isActive === filter).reverse()
  const myTasks = tasksStore?.tasks?.filter((t) => t.user_id === authStore?.auth?.id).filter((t) => filter === null ? t : t.isActive === filter).reverse()

  const getInfo = async (id) => {

    if (id === undefined) {
      try {
        setLoading(true)
        await dispatch(GetAllTasks())
        const res = tasksStore?.tasks
        setData(res)
      } catch (ex) {
        console.log(ex)
      } finally {
        setLoading(false)
      }
    }
  }

  const setStatus = async (id, status) => {

    console.log({ id, status })
    if (status == null) {
      status = true
    }
    try {
      setLoading(true)
      const res = await dispatch(SetDone({ data: id, status: status }))
      res
      if (res?.payload?.success) {
        await dispatch(GetAllTasks())
        toast.success("Cambio de estado en tarea")
      }
    } catch (ex) {
      console.log(ex)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="py-20 w-full h-auto">
      <div className="w-full flex justify-center flex-col items-center px-5">
        <p className="w-full max-w-[500px] font-[700] text-3xl">Lista de tareas</p>
        <input onInput={(e) => { setFilterSearch(e.target.value) }} className="bg-transparent border border-green-500 px-2 w-full max-w-[500px] mt-4 h-[40px] rounded-md outline-none" type="search" name="searchTasks" id="searchTasks" placeholder="Buscar tareas" />
        <div className="w-full max-w-[500px] mt-3 flex justify-between gap-5 flex-wrap">
          <div className="flex gap-5 flex-col justify-start flex-wrap w-full">
            <div className="flex justify-start gap-10">
              <label>
                <input onClick={() => { setFilter(true) }} className='peer hidden' type="radio" value='pending' name='status' />
                <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Pendientes</p>
              </label>
              <label>
                <input onClick={() => { setFilter(false) }} className='peer hidden' type="radio" value='done' name='status' />
                <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[100px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe]'>Completas</p>
              </label>
            </div>
            {
              authStore?.auth?.role === "ADMIN_ROLE"
                ? <div className="flex gap-2 gap-y-5 justify-start sm:justify-between w-full flex-wrap">
                  <label>
                    <input onClick={() => { setViewTasks('my'), setFilter(null) }} className='peer hidden' type="radio" value='done' name='tasks' defaultChecked />
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[140px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe] text-nowrap'>Mis tareas</p>
                  </label>
                  <label>
                    <input onClick={() => { setViewTasks('all'), setFilter(null) }} className='peer hidden' type="radio" value='done' name='tasks' />
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[140px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe] text-nowrap'>Todas las tareas</p>
                  </label>
                  <p onClick={() => setModal(true)} className="flex justify-start items-center gap-2 underline text-xl cursor-pointer">
                    <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#fff"></path> </g></svg>
                    Nueva tarea
                  </p>
                </div>
                : <div className="flex justify-between">
                  <label>
                    <input onClick={() => { setViewTasks('my'), setFilter(null) }} className='peer hidden' type="radio" value='done' name='tasks' defaultChecked />
                    <p className='peer-checked:bg-green-600 peer-checked:text-white cursor-pointer bg-transparent py-1 w-[140px] text-center rounded-md border border-green-600 peer-checked:border-[#f1f8fe] text-nowrap'>Mis tareas</p>
                  </label>
                  <p onClick={() => setModal(true)} className="flex justify-start items-center gap-2 underline text-xl cursor-pointer">
                    <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#fff"></path> </g></svg>
                    Nueva tarea
                  </p>
                </div>
            }
          </div>
        </div>
        <div className="w-full max-w-[500px] mt-2 bg-[#0f2031] px-5 pb-10 pt-5 rounded-md max-h-[560px] overflow-y-auto">
          {
            loading
              ? <div className="w-full flex justify-center"><Loader /></div>
              : (viewTasks === 'my' ? myTasks : allTasks)?.filter(t => t.title.includes(filterSearch)).map((t, i) => {
                return (
                  t.isActive
                    ? <div id={`task${i}`} key={i} className="border-b border-green-500 mt-5 hover:bg-[#184b48] transition-all duration-150 p-3 rounded-t  relative">
                      <strong onClick={() => { setModalEdit(true), setTaskId(t._id) }} id={`title${i}`} className="text-xl cursor-pointer hover:underline transition-all duration-300">{t.title}</strong>
                      <p id={`desc${i}`} className=" opacity-60">{t.description}</p>
                      <div className="w-full mt-3 flex justify-between">
                        <p id={`date${i}`}>Inicio: {t.day}/{t.month}/{t.year}</p>
                        <p onClick={() => { setStatus(t._id, !t.isActive) }} id={`status${i}`} className={`font-[600] ${t.isActive ? 'text-yellow-500' : 'text-green-500'} no-underline z-10 hover:bg-green-700 cursor-pointer hover:text-white px-1 rounded transition-all duration-300`}>Pendiente</p>
                      </div>
                    </div>
                    : <div id={`task${i}`} key={i} className="border-b border-green-500 mt-5 bg-[#184b48] transition-all duration-150 p-3 rounded-t ">
                      <strong onClick={() => { setModalEdit(true), setTaskId(t._id) }} id={`title${i}`} className="text-xl cursor-pointer transition-all duration-300 line-through">{t.title}</strong>
                      <p id={`desc${i}`} className=" opacity-60 line-through">{t.description}</p>
                      <div className="w-full mt-3 flex justify-between">
                        <p id={`date${i}`} className="line-through">Inicio: {t.day}/{t.month}/{t.year}</p>
                        <p id={`status${i}`} onClick={() => { setStatus(t._id, !t.isActive) }} className={`font-[600] text-green-500 cursor-pointer px-1 rounded hover:bg-yellow-500 hover:text-black transition-all duration-300`}>Completa</p>
                      </div>
                    </div>
                )
              })
          }
        </div>
        <p className="w-full max-w-[500px] text-end mt-2 text-xl"><span className="font-[700] text-green-500 pr-2">{viewTasks === 'my' ? myTasks?.length : allTasks?.length}</span>tareas encontradas</p>
      </div>
      {modalNewTask ? <Modal showModal={setModal} title={'Nueva tarea'} /> : null}
      {modalEdit ? <ModalEdit showModal={setModalEdit} idTask={taskId} data={tasksStore?.task} /> : null}
    </div>
  )
}

export default Home