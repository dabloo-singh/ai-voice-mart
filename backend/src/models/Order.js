import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  items:[{ product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'}, qty:Number, price:Number }],
  total:Number,
  status:{type:String,default:'Placed'},
  payment:{method:String,status:String},
  address:{name:String,phone:String,city:String,pincode:String}
},{timestamps:true})
export default mongoose.model('Order', orderSchema)
