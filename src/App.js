import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [message, setMessage] = useState(''); // State to store deletion message

  const handleClick = (todo) => {
    // Send a request to add a new todo to your server
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: todo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]); // Update the state with the new todo
        setMessage('Todo added successfully'); // Set an addition message
        setTimeout(() => {
          setMessage(''); // Clear the message after 3 seconds
        }, 3000); // Clear the message after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        setMessage('Failed to add todo'); // Set an error message
        setTimeout(() => {
          setMessage(''); // Clear the message after 3 seconds
        }, 3000); // Clear the message after 3 seconds
      });
  };

  const handleDelete = (todoId) => {
    // Send a request to delete the todo by its ID
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the todos state by filtering out the deleted todo
        setTodos(todos.filter((todo) => todo.id !== todoId));
        setMessage('Item has been deleted.'); // Set deletion message
        setTimeout(() => {
          setMessage(''); // Clear the message after a delay
        }, 3000); // Clear the message after 3 seconds
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // ... (Your existing code to fetch todos)
  }, []);

  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center bg-gray-100">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-3xl">Todo List</h1>

        <div className="flex mt-4 gap-2">
          <TodoForm handleClick={handleClick} />
        </div>

        <ol className="mt-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex mb-4 items-center">
              {todo.name}
              <button
                onClick={() => handleDelete(todo.id)} // Handle delete on button click
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
        {message && <p className="text-green-600">{message}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {dogs.map((dog, index) => {
          return (
            <div key={index} className="h-[200px] w-[250px]">
              <img
                src={dog}
                alt="dog"
                className="h-full w-full object-cover rounded"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
