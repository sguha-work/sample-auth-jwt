import * as mongoose from 'mongoose';
import patcher from 'mongoose-patcher'; 
let Schema = mongoose.Schema;

let schema = new Schema({
  name: { type: String, required: true },
  phonenumber: { type: Number, required: false, default: 0 },
  age: { type: Number, required: true },
  address: {
    type: String,
    required: false
  }
},
  { timestamps: true, optimisticConcurrency: true }
);

// If no path is given, all date fields will be applied
schema.plugin(patcher);
mongoose.set('strictQuery', true)
export default mongoose.model("user", schema);