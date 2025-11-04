
import mongoose from "mongoose";

const dataschema = new mongoose.Schema({
  todos: String,
}, { timestamps: true });

const Data = mongoose.model('Data', dataschema);

export default Data;
