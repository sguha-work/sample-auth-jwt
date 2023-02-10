import * as mongoose from 'mongoose';
import patcher from 'mongoose-patcher'; 
let Schema = mongoose.Schema;

let schema = new Schema({
  email: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ["admin", "user"],
    required: true
  }
},
  { timestamps: true, optimisticConcurrency: true }
);

// If no path is given, all date fields will be applied
schema.plugin(patcher);
export default mongoose.model("user_auth", schema);