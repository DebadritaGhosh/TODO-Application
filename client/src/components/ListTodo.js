import React,{useState,useEffect} from 'react';

const ListTodo = () => {

    const [allTodos,setAllTodos] = useState([]);
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
<table class="table mt-5 text-center">
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
            <tr>
            <td>{todo.description}</td>
            <td><button className='btn btn-warning'>Edit</button></td>
            <td><button className='btn btn-danger'>Delete</button></td>
          </tr>
        ))
        }
    </tbody>
  </table>
  </div>
  );
};

export default ListTodo;
