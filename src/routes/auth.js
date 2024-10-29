import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { loginUserSchema, registerUsersSchema } from '../validation/auth.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';

const userRouter = Router();

userRouter.post(
  '/register',
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUserController),
);

userRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

export default userRouter;
