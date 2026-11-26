import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({ name:String, price:Number, mrp:Number, images:[String], category:String, stock:Number, rating:{type:Number,default:4.8}, description:String, isBestseller:Boolean }, {timestamps:true})
export default mongoose.model('Product', productSchema)
