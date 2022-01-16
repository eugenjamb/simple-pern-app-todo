const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db")


//middleware
app.use(cors())
app.use(express.json())


//Routes

app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0])
    } catch(err) {
        console.log(err.message)
    }
})


app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    }catch(err) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
    console.log('server is running on port 5000')
})