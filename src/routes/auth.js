import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUserSchema,
  registerUsersSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
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

userRouter.post('/refresh', ctrlWrapper(refreshSessionController));

userRouter.post('/logout', ctrlWrapper(logoutUserController));

userRouter.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

userRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default userRouter;
