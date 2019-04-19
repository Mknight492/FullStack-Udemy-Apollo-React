import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RecipieSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  instructions: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Recipe", RecipieSchema);
