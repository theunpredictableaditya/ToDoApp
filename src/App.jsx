import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {

  const [displayEdit, setdisplayEdit] = useState("hidden");
  const [oldTask, setoldTask] = useState("")
  const [editInput, seteditInput] = useState("")
  const [input, setinput] = useState("");
  const [todos, setTodos] = useState(()=>{
    try{
      let savedData = localStorage.getItem("todo");
      return savedData ? JSON.parse(savedData) : [];
    }catch{ 
      return [];
    }
  });

  const handleInput = (e) => {
    setinput(e.target.value);
  }

  const handleeditInput = (e) => {
    seteditInput(e.target.value);
  }

  //function that handles the add task button
  const handleAddtask = (e) => {
    console.log(input)
    setTodos([...todos, {
      "id":uuidv4(),
      "task": input,
      "isCompleted": false
    }])
    setinput("");
  }

  //function that opens up the editing modal and setups the modal for editing
  const handleEdit = (id) => {
    setdisplayEdit("flex");
    let editableData = todos.filter(todos => todos.id === id);
    seteditInput(editableData[0].task);
    setoldTask(editableData[0].id);
  }

  //function that filters out the deletable todo and delete it
  const handleDelete = (id) => {
    setTodos((todos)=>{
      return todos.filter(todos => todos.id !== id)
    })
  }
  
  //function that marks out whether the task is complete or incomplete
  const handleCheckBox = (id) => {
    setTodos((todos)=>{
      return todos.map(todo=> todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    })
  }

  //function that saves the edit changes in any todo done by the user
  const saveEditChanges = () => {
    setTodos((todos)=>{
      return todos.map(todo => todo.id === oldTask ? {...todo, task: editInput} : todo)
    })

    setdisplayEdit("hidden");
  }

  //function that hides out the editing modal
  const cancelEdit = () => {
    setdisplayEdit("hidden");
  }

  //use effect that runs whenever the todos is changed
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos])
  
  


  return (
    <>
      <div className="main flex items-center justify-center w-full h-screen bg-purple-200">
        <div className="container w-[90vw] lg:w-1/2 bg-purple-300 h-[70vh] md:w-[70vw] sm:w-[80vw] rounded-md flex flex-col items-center shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          <div className="inputContainer flex flex-col gap-3 items-center w-full">
            <h1 className='text-3xl font-bold text-white'>To-Do-App</h1>
            <input onChange={handleInput} value={input} className='w-[calc(100%-40px)] bg-purple-400 rounded-md px-4 py-3 outline-none' type="text" placeholder='Enter Your task' />
            <button onClick={handleAddtask} className='px-5 py-3 bg-blue-500 text-white font-bold rounded-full cursor-pointer'>Add Task</button>
          </div>
          <h2 className='px-5 text-2xl text-white font-bold w-full text-left'>Your Tasks</h2>
          <div className="infoContainer flex flex-col gap-1 w-[calc(100%-40px)] overflow-y-scroll h-96">
            {todos.map((todo)=>{

            
            return <div key={todo.id} className="item flex items-center justify-around w-full mt-2">
              <input onChange={()=>{handleCheckBox(todo.id)}} className='w-[33%]' type="checkbox" name="" id="" checked={todo.isCompleted} />
              <p className='w-[33%] text-center'>{todo.task}</p>
              <div className="actions w-[33%] flex items-center justify-around">
                <button onClick={()=>{handleEdit(todo.id)}} className='px-2 text-sm lg:px-4 py-2 rounded-full bg-yellow-400 text-white cursor-pointer sm:text-sm sm:px-3'>Edit</button>
                <button onClick={()=>{handleDelete(todo.id)}} className='px-2 text-sm lg:px-4 py-2 rounded-full bg-red-400 text-white cursor-pointer sm:text-sm sm:px-3'>Delete</button>
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
      <div className={`editMode h-[70vh] bg-purple-300 rounded-md ${displayEdit} flex-col gap-20 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-[70vw] sm:w-[80vw] w-[90vw] shadow-[0_0_20px_rgba(255,255,255,0.5)]`}>
      <h1 className='text-3xl font-bold text-white mt-5'>To-Do-App</h1>
      <h1 className='text-3xl font-bold text-white'>Edit - Task</h1>
      <input onChange={handleeditInput} value={editInput} className='w-[calc(100%-40px)] bg-purple-400 rounded-md px-4 py-3 outline-none' type="text" placeholder='Enter Your task' />
      <div className="actions flex items-center justify-around gap-7">
                <button onClick={()=>{saveEditChanges()}} className='lg:px-4 py-2 px-2 rounded-full bg-yellow-400 text-white cursor-pointer sm:text-sm sm:px-3'>Save Changes</button>
                <button onClick={()=>{cancelEdit()}} className='lg:px-4 py-2 px-2 rounded-full bg-red-400 text-white cursor-pointer sm:text-sm sm:px-3'>Cancel Edit</button>
              </div>
      </div>
    </>
  )
}

export default App
