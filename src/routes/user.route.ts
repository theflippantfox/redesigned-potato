import express, { type Response } from 'express'
import {
  loginController,
  registerController,
  addressController
} from '../controllers/user.controller'
import { type Request } from '../typings'

import protect from '../middlewares/protect'

const userRouter = express.Router()

// User auth routes
userRouter.post('/login', async (req: Request, res: Response) => {
  const response = await loginController(req)
  res.json(response).status(200)
})

userRouter.post('/register', async (req: Request, res: Response) => {
  const response = await registerController(req)
  res.json(response).status(200)
})

// User features routes
userRouter.post('/address', protect, async (req: Request, res: Response) => {
  const response = await addressController(req)
  res.json(response).status(200)
})

export default userRouter
