import createHttpError from 'http-errors';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshSessionController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session successfully refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await logoutUser(sessionId);

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    return res.status(204).send();
  }

  throw createHttpError(401, 'Session not found');
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.status(200).json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
