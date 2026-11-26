import { Router } from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
const router = Router()
router.get('/dashboard', async (_,res) => res.json({ products:await Product.countDocuments(), orders:await Order.countDocuments(), revenue:(await Order.aggregate([{$match:{'payment.status':'paid'}},{$group:{_id:null,total:{$sum:'$total'}}}]))[0]?.total || 0 }))
router.post('/products', async (req,res) => res.status(201).json(await Product.create(req.body)))
router.patch('/orders/:id/status', async (req,res) => res.json(await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})))
export default router
