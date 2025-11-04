import dotenv from "dotenv";
dotenv.config();
import express from 'express'

import cors from 'cors'
import Data from './data.model.js'
import Connection from './database.config.js'
Connection()
const app = express()
app.use(express.json())
app.use(cors({
     origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))


app.get('/test', async (req, res) => {
  try {
    const todos = await Data.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});


app.post('/post', async (req, res) => {
    try {
        const { todos } = req.body;

        const newTodo = await  Data.create({ todos });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

app.put('/update/:id', async (req, res) => {
  const dataid = req.params.id;
  const { todos } = req.body;

  const updatedata = await Data.findByIdAndUpdate(
    dataid,              
    { todos },            
    { new: true }         
  );

  res.json(updatedata);
});


app.delete('/delete/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});


app.delete('/delete-all', async (req, res) => {
  try {
    await Data.deleteMany({});
    res.json({ message: "All data deleted successfully" });
  } catch (err) {
    res.json({ error: err.message });
  }
});



app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
