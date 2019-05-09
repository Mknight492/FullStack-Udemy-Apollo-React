import mongoose, { Schema } from "mongoose";

//encryption
import bcrpyt from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
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

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrpyt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrpyt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model("User", UserSchema);
