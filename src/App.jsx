import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {

  const [displayEdit, setdisplayEdit] = useState("hidden");
  const [oldTask, setoldTask] = useState("")
  const [editInput, seteditInput] = useState("")
  const [input, setinput] = useState("");
  const [todos, setTodos] = useState(()=>{
    let savedData = JSON.parse(localStorage.getItem("todo"));

    return savedData ? savedData : [];
  });

  const handleInput = (e) => {
    setinput(e.target.value);
  }

  const handleeditInput = (e) => {
    seteditInput(e.target.value);
  }

  const handleAddtask = (e) => {
    console.log(input)
    setTodos([...todos, {
      "id":uuidv4(),
      "task": input,
      "isCompleted": false
    }])
    setinput("");
  }

  const handleEdit = (id) => {
    setdisplayEdit("flex");
    let editableData = todos.filter(todos => todos.id === id);
    seteditInput(editableData[0].task);
    setoldTask(editableData[0].id);
  }

  const handleDelete = (id) => {
    setTodos((todos)=>{
      return todos.filter(todos => todos.id !== id)
    })
  }
  
  const handleCheckBox = (id) => {
    setTodos((todos)=>{
      return todos.map(todo=> todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    })
  }

  const saveEditChanges = () => {
    setTodos((todos)=>{
      return todos.map(todo => todo.id === oldTask ? {...todo, task: editInput} : todo)
    })

    setdisplayEdit("hidden");
  }

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
        <div className="container w-1/2 bg-purple-300 h-[70vh] rounded-md">
          <div className="inputContainer flex flex-col gap-3 items-center">
            <h1 className='text-3xl font-bold text-white'>To-Do-App</h1>
            <input onChange={handleInput} value={input} className='w-[calc(100%-40px)] bg-purple-400 rounded-md px-4 py-3 outline-none' type="text" placeholder='Enter Your task' />
            <button onClick={handleAddtask} className='px-5 py-3 bg-blue-500 text-white font-bold rounded-full cursor-pointer'>Add Task</button>
          </div>
          <h2 className='px-5 text-2xl text-white font-bold'>Your Tasks</h2>
          <div className="infoContainer flex flex-col gap-3 w-[calc(100%-40px)]">
            {todos.map((todo)=>{

            
            return <div key={todo.id} className="item flex items-center justify-around w-full mt-2">
              <input onChange={()=>{handleCheckBox(todo.id)}} className='w-1/4' type="checkbox" name="" id="" checked={todo.isCompleted} />
              <p>{todo.task}</p>
              <div className="actions w-1/3 flex items-center justify-around">
                <button onClick={()=>{handleEdit(todo.id)}} className='px-4 py-2 rounded-full bg-yellow-400 text-white cursor-pointer'>Edit</button>
                <button onClick={()=>{handleDelete(todo.id)}} className='px-4 py-2 rounded-full bg-red-400 text-white cursor-pointer'>Delete</button>
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
      <div className={`editMode w-1/2 h-[70vh] bg-purple-300 rounded-md ${displayEdit} flex-col justify-around items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      <input onChange={handleeditInput} value={editInput} className='w-[calc(100%-40px)] bg-purple-400 rounded-md px-4 py-3 outline-none' type="text" placeholder='Enter Your task' />
      <div className="actions w-1/3 flex items-center justify-around">
                <button onClick={()=>{saveEditChanges()}} className='px-4 py-2 rounded-full bg-yellow-400 text-white cursor-pointer'>Save Changes</button>
                <button onClick={()=>{cancelEdit()}} className='px-4 py-2 rounded-full bg-red-400 text-white cursor-pointer'>Cancel Edit</button>
              </div>
      </div>
    </>
  )
}

export default App
