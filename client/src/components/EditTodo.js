import React, { useState } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    const updateTodoDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.warn(todo.todo_id);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            {/* Button to Open the Modal */}
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/* The Modal */}
            <div className="modal" id={`id${todo.todo_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title"> Edit Todo </h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/* Modal body */}
                        <div className="modal-body">
                            <input
                                type="text"
                                className='form-control'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={(e) => updateTodoDescription(e)}>
                                Update
                            </button>
                            <button type="button" className="btn btn-success" data-dismiss="modal">
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;
