import { useState, useEffect, useRef } from 'react'
import { FaClipboardList } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [todo, settodo] = useState({ title: "", description: "" });
  const [todos, setTodos] = useState([]); // This will be filtered list
  const [allTodos, setAllTodos] = useState([]); // This keeps master list

  const hiddenRef = useRef(null);
  const clickbtn = useRef(null);


  const handlechange = (e) => {
    const { name, value } = e.target;
    settodo(prev => ({ ...prev, [name]: value }));
  }

  const handleFilterChange = (e) => {
    const filter = e.target.id;
    if (filter === "show-all") {
      setTodos(allTodos);
    } else if (filter === "pending-task") {
      setTodos(allTodos.filter((todo) => !todo.completed));
    } else if (filter === "completed-task") {
      setTodos(allTodos.filter((todo) => todo.completed));
    }
  };


  const handleEdit = (todo) => {
    settodo({ title: todo.title, description: todo.description });
    if (hiddenRef.current) {
      hiddenRef.current.classList.remove('hidden');
    }

    // remove from both
    const updated = allTodos.filter(t => t.id !== todo.id);
    setAllTodos(updated); // 👈 fix
    setTodos(updated);
  };

  const handleDelete = (id) => {
    const updated = allTodos.filter(todo => todo.id !== id);
    setAllTodos(updated); // 👈 important
    setTodos(updated);    // 👈 refresh current view too
  };

  const handlesave = () => {
    if (todo.title && todo.description) {
      const newtodo = {
        ...todo,
        id: Date.now() + Math.random(),
        completed: false,
      };
      setTodos([...todos, newtodo]);
      setAllTodos([...allTodos, newtodo]); // save in master
      settodo({ title: "", description: "" });
      if (hiddenRef.current) {
        hiddenRef.current.classList.add("hidden");
      }
    } else {
      alert("Please fill in both title and description.");
    }
  };
  const handleCheck = (id) => {
    const updatedTodos = allTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setAllTodos(updatedTodos);
    setTodos(updatedTodos); // reset view
  };


  const handlehidden = () => {
    if (hiddenRef.current) {
      hiddenRef.current.classList.toggle('hidden');
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
    setAllTodos(storedTodos); // 👈 this was missing!
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(allTodos));
    }, 200); // debounce to avoid rapid updates

    return () => clearTimeout(timeout);
  }, [allTodos]);

  return (
    <>
      <Navbar />
      <div className="container w-[80vw] sm:w-[90vw] md:w-[80vw] min-h-[50vh] sm:min-h-[85vh] md:min-h-[85vh] bg-violet-400 mx-auto my-2 sm:my-3 md:my-3 rounded-xl p-1 sm:p-2.5 md:p-4 border-[10px] border-violet-300 shadow-lg shadow-violet-500">
        <h1 className="text-[16px] sm:text-2xl md:text-3xl font-bold text-center text-white mt-2.5">Welcome to KnowTodo </h1>
        <p className="text-[9px] sm:text-[14px] md:text-[16px] text-center text-white">Your personal task management app</p>
        <button onClick={handlehidden} className=" w-full h-6 sm:h-10 md:h-14  bg-violet-600 hover:bg-violet-800 py-2 text-[12px] sm:text-xl md:text-2xl font-semibold text-white mt-5 flex items-center justify-center rounded-2xl border-[4px] border-violet-300 shadow-lg shadow-violet-200"  >Add your task <FaClipboardList className='text-[10px] sm:text-[16px] md:text-[20px] mx-2.5' /></button>
        <div className='w-[95vw] sm:w-[80vw] md:w-[60vw] bg-[rgb(231,216,244)] p-1 sm:p-3 md:p-3 rounded-xl hidden flex-col gap-1.5 absolute top-[20%] left-1/2 -translate-x-1/2 z-50 ' ref={hiddenRef}>
          <div className='h-5 w-5 md:h-8 md:w-8 flex justify-center items-center rounded-tr-[8px] rounded-bl-[8px] hover:bg-[#343333] bg-black absolute top-2 right-2 cursor-pointer'><RxCross2 className=' text-white font-semibold text-2xl' onClick={handlehidden} /></div>
          <div className='flex flex-col gap-1 border-[1.5px] rounded-[8px] p-2 sm:p-2.5 md:p-2.5 border-[white]  '>
            <h2 className='font-bold text-xl sm:text-2xl md:text-2xl'>Title:</h2>
            <div className="h-auto border-[2px] rounded-[8px] pl-0.5 border-[white] text-2xl font-medium">
              <textarea name="title" onChange={handlechange} value={todo.title} className='w-full min-h-[5vh]  sm:min-h-[10vh] md:min-h-[10vh] border-none outline-none rounded-[8px] p-1 resize-none field-sizing-content overflow-hidden whitespace-pre-wrap break-words text-[14px] sm:text-xl md:text-3xl font-medium' id=""></textarea>
            </div>
          </div>
          <div className='flex flex-col gap-1 border-[1.5px] rounded-[8px] p-2.5 border-[white]'>
            <h2 className='font-bold text-xl sm:text-2xl md:text-2xl'>Description:</h2>
            <div className="min-h-[10vh] sm:min-h-[20vh] md:min-h-[20vh] border-[2px] rounded-[8px] p-1 border-[white] font-medium">
              <textarea name="description" onChange={handlechange} value={todo.description} className='w-full min-h-[10vh]  sm:min-h-[20vh] md:min-h-[20vh]   border-none outline-none rounded-[8px] p-1 resize-none field-sizing-content overflow-hidden whitespace-pre-wrap break-words text-[12px] sm:text-xl md:text-2xl font-medium' id=""></textarea>
            </div>
          </div>
          <button className="w-full h-8 sm:h-10 md:h-10 bg-violet-600 hover:bg-violet-800 py-2 text-[16px] sm:text-2xl md:text-2xl font-semibold text-white mt-1 sm:mt-3 md:mt-3 flex items-center justify-center rounded-2xl border-[4px] border-violet-300 shadow-lg shadow-violet-200" onClick={handlesave} >Save Task</button>
        </div>
        <div className="flex flex-wrap items-start justify-between sm:justify-around md:justify-around sm:gap-[10vw] my-4 mx-auto px-[10px] mb-2">
          <div className='flex items-center justify-center gap-0.5 md:gap-2'>
            <input type="radio" className='flex items-center justify-center h-2.5 w-3 sm:h-6 sm:w-6 md:h-6 md:w-6 accent-violet-800' name='filter' onChange={handleFilterChange} defaultChecked id='show-all' />
            <label className="text-white text-[7px] sm:text-[18px] md:text-[18px] font-medium" htmlFor="show-all">show all</label>
          </div>
          <div className='flex items-center justify-center gap-0.5 md:gap-2'>
            <input type="radio" className='flex items-center justify-center h-2.5 w-3 sm:h-6 sm:w-6 md:h-6 md:w-6 accent-violet-800' name='filter' onChange={handleFilterChange} id='pending-task' />
            <label className="text-white text-[7px] sm:text-[18px] md:text-[18px] font-medium" htmlFor="pending-task">pending task</label>
          </div>
          <div className='flex items-center justify-center gap-0.5 md:gap-2'>
            <input type="radio" className='flex items-baseline h-2.5 w-3 sm:h-6 sm:w-6 md:h-6 md:w-6 accent-violet-800' name='filter' onChange={handleFilterChange} id='completed-task' />
            <label className="text-white text-[7px] sm:text-[18px] md:text-[18px] font-medium" htmlFor="completed-task">completed task</label>
          </div>
        </div>
        <div className='w-[60vw] sm:w-[60vw] md:w-[60vw] h-[0.5px] sm:h-[1.5px] md:h-[1.5px] bg-[rgba(215,213,213,0.87)] mt-2 sm:mt-4 md:mt-4 mx-auto '></div>
        <div className='  backdrop-blur-xl p-1 md:p-2.5 my-1 md:my-4 min-h-[25vh] sm:min-h-[40vh] md:min-h-[40vh] rounded-lg shadow-lg shadow-violet-500'>
          {todos.length === 0 ? <div className='min-h-[25vh] sm:min-h-[40vh] md:min-h-[40vh]  flex justify-center items-center ' > <p className="text-white text-center text-[14px] sm:text-xl md:text-2xl">No tasks available</p></div> : todos.map((todo) => {
            return (
              <div key={todo.id} className='flex items-center justify-between px-1 py-1.5 '>
                <div className='flex flex-col gap-0.5 md:gap-2 border-[2px] p-1 md:p-2 mr-1  rounded-[10px] border-[white] ' >
                  <div className='flex items-center w-full'>
                    <input type="checkbox" className='flex items-center justify-center h-4 w-4 sm:h-10 sm:w-10 md:h-10 md:w-10 accent-violet-800 mx-1 md:mx-2.5' onChange={() => handleCheck(todo.id)} checked={todo.completed} id='done-task' />
                    <p className='title text-[10px] sm:text-2xl md:text-2xl font-semibold w-3/4 border-[1.5px] rounded-[8px] border-[white] p-1 md:p-2 '><strong>Title:</strong> {todo.title}</p>
                  </div>
                  <p className='dics text-[8px] sm:text-[16px] md:text-[16px] font-medium w-[50vw] md:w-[65vw] border-[1.5px] rounded-[8px] border-[white] p-1 md:p-2  break-words h-auto'><strong>Description:</strong> {todo.description}</p>
                </div>
                <div className='flex items-center flex-col justify-center gap-2'>
                  <button className='w-[35px] h-[25px] md:w-[90px] md:h-[50px] flex justify-center items-center rounded-[10px] bg-violet-500 hover:bg-violet-700 md:hover:bg-violet-700  ' onClick={() => handleEdit(todo)}><FaEdit className='w-[16px] pl-1 h-[16px] md:w-[28px] md:h-[28px]  text-white' /></button>
                  <button className='w-[35px] h-[25px] md:w-[90px] md:h-[50px] flex justify-center items-center rounded-[10px] bg-violet-500 hover:bg-violet-700 md:hover:bg-violet-700  ' onClick={() => handleDelete(todo.id)}><RiDeleteBack2Fill className='w-[15px] h-[15px] md:w-[24px] md:h-[28px] text-white' /></button>
                </div>
              </div>
            )
          })}

        </div>
      </div>

    </>
  )
}

export default App
