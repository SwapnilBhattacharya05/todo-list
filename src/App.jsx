import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// !CREATE UNIQUE IDS
import { v4 as uuidv4 } from 'uuid';

function App() {

  // ?INPUT TEXT
  const [todo, setTodo] = useState("")

  // ?AN ARRAY THAT HOLDS ALL THE TODOS
  const [todos, setTodos] = useState([])

  // ?HIDE ALL THE FINISHED TODOS
  const [showFinished, setShowFinished] = useState(true)

  // *HANDLE LOCAL STORAGE
  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {

    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  // *TOGGLE FINISHED 
  const toggleFinished = (params) => {
    setShowFinished(!showFinished)
  }

  //  *HANDLE EDIT
  const handleEdit = (e, id) => {
    let newTodo = todos.filter((item) => {
      return item.id === id
    })

    handleDelete(e, id)
    setTodo(newTodo[0].todo)
    saveToLs()
  }

  //  *HANDLE DELETE
  const handleDelete = (e, id) => {

    // ?Filters out the deleted todo so in `id 1` and `id 2` 
    //* If `id 1` is clicked it will remove `id 1` and keep `id 2`
    let newTodo = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodo)
    saveToLs()
  }

  //  *HANDLE ADD
  const handleAdd = () => {
    // ?CREATE AN OBJECT IN THIS CASE A TODO
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    // ?EMPTY THE INPUT FIELD
    setTodo("")
    saveToLs()
  }

  // *HANDLE CHANGE
  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  // *HANDLE CHECKBOX
  const handleCheckBox = (e) => {
    // ?CHANGE THE TODO BY FETCHING THE ID
    let id = e.target.name

    // ?FINDING THE INDEX OF THE TODO THAT WAS CLICKED
    let index = todos.findIndex((item) => {
      return item.id === id
    })

    // TODO: MAKE A COPY OF THE ARRAY
    let newTodo = [...todos]
    newTodo[index].isCompleted = !newTodo[index].isCompleted
    setTodos(newTodo)
    saveToLs()
  }

  return (
    <>
      <Navbar />
      <div className=' mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-[#e9dbc996] min-h-[80vh] md:w-[50vw]'>
        <h1 className='font-bold text-center text-3xl'>Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">

            <input
              type="text"
              className='w-full rounded-xl px-5 py-1'
              name=""
              id=""
              onChange={handleChange}
              value={todo}
            />
            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className='bg-[#f35363] hover:bg-[#e75664] p-4 py-2 text-white text-sm font-bold transition-all delay-100 ease-in-out disabled:bg-[#695456] disabled:opacity-50 md:mx-2 rounded-full'>
              Save
            </button>
          </div>
        </div>

        <input
          checked={showFinished}
          type="checkbox"
          id="show"
          onChange={toggleFinished}
          className='my-4'
        />
        <label className='mx-2' htmlFor='show'>Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[95%]mx-auto my-2"></div>
        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0
            &&
            <div className='m-5'>No Todos to Display</div>
          }
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id}
                className="todo flex w-full my-3 justify-between">
                <div className='flex gap-5'>
                  <input type="checkbox"
                    name={item.id}
                    id=""
                    defaultChecked={item.isCompleted}
                    onClick={handleCheckBox}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className='bg-[#f35363] hover:bg-[#e75664] transition-all delay-100 ease-in-out p-3 py-1 text-white text-sm font-bold rounded-md mx-1'>
                    <FaEdit />
                  </button>

                  {/* GIVE THE handleDelete() AN ID */}
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className='bg-[#f35363] hover:bg-[#e75664] transition-all delay-100 ease-linear p-3 py-1 text-white text-sm font-bold rounded-md mx-1'>
                    <FaTrash />
                  </button>
                </div>
              </div>)
          })}

        </div>
      </div >
    </>
  )
}

export default App
