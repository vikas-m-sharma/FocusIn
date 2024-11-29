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
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },


  days: {
    type: [String],
    required: true,
  },

  notificationEnabled: {
    type: Boolean,
    default: false,  // Default to false if not specified
  },

  mode: {
    type: String,
    enum: ['Normal', 'Alarm'],  // Either 'Normal' or 'Alarm'
    default: 'Normal',  // Default mode is 'Normal'
  },

  voiceMessageUrl: { type: String },

  textToSpeechUrl: { type: String },
});

const Task = mongoose.model("Task", taskSchema)

export default Task;