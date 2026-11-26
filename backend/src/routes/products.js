import { Router } from 'express'
import Product from '../models/Product.js'
const router = Router()
router.get('/', async (req,res) => {
  const filter = {}
  if (req.query.category) filter.category = req.query.category
  if (req.query.search) filter.name = {$regex:req.query.search,$options:'i'}
  res.json(await Product.find(filter).sort({createdAt:-1}))
})
router.get('/:id', async (req,res) => res.json(await Product.findById(req.params.id)))
export default router
