import { Router } from 'express'
import Order from '../models/Order.js'
const router = Router()
router.post('/', async (req,res) => res.status(201).json(await Order.create(req.body)))
router.get('/:id', async (req,res) => res.json(await Order.findById(req.params.id).populate('items.product')))
export default router
