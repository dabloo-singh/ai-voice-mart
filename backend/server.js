import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './src/routes/auth.js'
import productRoutes from './src/routes/products.js'
import orderRoutes from './src/routes/orders.js'
import adminRoutes from './src/routes/admin.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-voice-mart')
  .then(() => { console.log('MongoDB Connected'); app.listen(port, () => console.log(`Server on ${port}`)) })
  .catch((error) => { console.error(error); process.exit(1) })
