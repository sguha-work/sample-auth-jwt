import * as mongoose from 'mongoose';
import patcher from 'mongoose-patcher'; 
let Schema = mongoose.Schema;

let schema = new Schema({
  email: { type: String, required: true },
  phonenumber: { type: Number, required: false, default: 0 },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ["admin", "user"],
    required: false,
    default: "user"
  }
},
  { timestamps: true, optimisticConcurrency: true }
);

// If no path is given, all date fields will be applied
schema.plugin(patcher);
mongoose.set('strictQuery', true)
export default mongoose.model("user_auth", schema);