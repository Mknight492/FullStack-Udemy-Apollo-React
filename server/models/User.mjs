import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  category: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  favourites: {
    type: [Schema.Types.ObjectId],
    ref: "Recipie"
  }
});

export default UserSchema;
