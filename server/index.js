const express = require("express");
const app = express();
const cors = require('cors');

//importing pool from db.js
const pool = require("./db");
const res = require("express/lib/response");

//middleware
app.use(cors());
app.use(express.json()); //request.body

//Routes

//Create a todo Route
app.post("/todos", async(req,res)=> {
    try{
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
});

//Get all todos
app.get("/todos", async(req,res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }
    catch(err){
        console.error(err.message);
    }
});

//Get a todo
app.get("/todos/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
});

//Update a todo
app.put("/todos/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("Todo Updated!");
    }
    catch(err){
        console.error(err.message);
    }
});


//Delete a todo
app.delete("/todos/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("Todo Deleted!");
    }
    catch(err){
        console.error(err.message);
    }
});


//Server
app.listen(5000, () => {
    console.log("Server started");
})