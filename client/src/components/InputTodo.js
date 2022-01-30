import React,{useState} from 'react';

const InputTodo = () => {
    const [description,setDescription] = useState("");

    const onFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(body)
            });
            // setDescription("");
            window.location = "/";
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
          <h1 className='text-center mt-5'>PERN TODO LIST</h1>
          <form className='d-flex mt-5' onSubmit={onFormSubmit}>
              <input type="text" className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
              <button className='btn btn-success'>Add</button>
          </form>
        </>
      );
};

export default InputTodo;
