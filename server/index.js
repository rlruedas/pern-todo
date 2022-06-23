require('dotenv').config({ path: './.env' });
const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db");

app.use(cors())
app.use(express.json())

//ROUTES

//CREATE a TODO
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        const isDone  = false;
        const newTodo = await pool.query("INSERT INTO todo (description, isDone) VALUES ($1, $2) ", [description, isDone])

        res.json(newTodo)
    } catch (error) {
        console.log(error.message);
    }
})

//GET all todos
app.get("/todos", async(req, res) => {
    try {
        
        const allTodo = await pool.query("SELECT * FROM todo")
        res.json(allTodo.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//GET a todo

app.get('/todos/:id', async(req, res) => {
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [req.params.id])
        console.log(req.params.id)
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})  

//UPDATE a todo
app.patch("/todos/:id", async(req, res) => {
    try {
        await pool.query("UPDATE todo SET description = $1, isDone = $2 WHERE id = $3", [req.body.description, req.body.isdone, req.params.id])
        res.json("Item was updated")

    } catch (error) {
        console.log(error.message);
    }
})

//DELETE a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1",[req.params.id])
        res.json(`Item no.${req.params.id} was deleted`)
    } catch (error) {
        console.log(error.message)
    }
})




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to Port ${port}...`)
});