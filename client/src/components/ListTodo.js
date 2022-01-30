import React,{useState,useEffect} from 'react';
//Importing Components
import EditTodo from './EditTodo';



const ListTodo = () => {

    const [allTodos,setAllTodos] = useState([]);

    //Delete todo
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method : "DELETE"
            })
            setAllTodos(allTodos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    //Get all todo
    const getAllTodo = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setAllTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getAllTodo();
    },[])

  return (
  <div>
<table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
        allTodos.map((todo) => (
            <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}  /></td>
            <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
          </tr>
        ))
        }
    </tbody>
  </table>
  </div>
  );
};

export default ListTodo;
