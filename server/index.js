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

//Get all todo
app.get("/todos", async(req,res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }
    catch(err){
        console.error(err.message);
    }
});

//Server
app.listen(5000, () => {
    console.log("Server started");
})