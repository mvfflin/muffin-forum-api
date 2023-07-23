import mongoose from "mongoose";

const schema = mongoose.Schema;
const userSchema = new schema({
  id: {
    type: Number,
    unique: true,
  },
  avatarUrl: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  desc: {
    type: String,
  },
  registered: {
    type: String,
  },
  badges: [
    {
      badgename: {
        type: String,
      },
      badgedesc: {
        type: String,
      },
    },
  ],
});

export const user = mongoose.model("user", userSchema);
