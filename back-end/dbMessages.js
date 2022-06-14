import mongoose from "mongoose";

const whatsappSechma = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  recived: Boolean,
});

export default mongoose.model("messageContent", whatsappSechma);
