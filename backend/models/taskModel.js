









import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  taskName: {
    type: String,
    required: true,
  },  

  description: {
    type: String,
    required: true,
  },  

  startTime: {
    type: Number,
    required: true,
  },

  endTime: {
    type: Number,
    required: true,
  },


  days: {
    type: [String],
    required: true,
  },

  voiceMessageUrl: { type: String },

  textToSpeechUrl: { type: String },
});

const Task = mongoose.model("Task", taskSchema)

export default Task;