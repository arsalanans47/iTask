import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinshed, setshowfinshed] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const togglefinshed = (e) => {
    setshowfinshed(!showfinshed)
  }
  
  

  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos))
    
  }
  

  const handleedit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newtodos);
    saveToLS();
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newtodos);
    saveToLS();
  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    saveToLS();
  }

  const handlechange = (e) => {

    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos);
    saveToLS();
  }


  return (
    <>
      <Navbar />
      <div className=" mx-3 border-4 border-white md:container md:mx-auto bg-[#f4e8ff] my-5 p-5 rounded-xl   md:min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-3xl text-center'>iTask - Manage your todos at one place</h1>
        <div className="addtodo w-full my-5">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='py-0.5 bg-white w-[88%] rounded-lg' />
          <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-500  hover:bg-violet-950 px-5 py-1 text-sm font-bold text-white rounded-md mx-1'>Save</button>
        </div>
        <input className='my-4' id="show" onChange={togglefinshed} type="checkbox" checked={showfinshed} />
        <label htmlFor="show">Show Finished</label>
        <hr className=' w-[90%] mx-auto opacity-40 my-2' />
        <h1 className='text-2xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.map(item => {


            return (showfinshed || !item.iscompleted) && <div key={item.id} className="todo flex  justify-between my-2">
              <div className='flex gap-5'>

                <input onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} name={item.id} id="" />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              </div >
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleedit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button  onClick={(e) => { handledelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
