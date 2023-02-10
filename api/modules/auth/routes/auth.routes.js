import express from 'express';
import AuthController from '../controllers/auth.controller.js';
const router = express.Router();
const authController = AuthController.AuthControllerInstance;

router.post('/login', async (request, response) => {
  console.log("Login invoked")
  console.time();
  await authController.login(request, response);
  console.log('Time to complete the request->');
  console.timeEnd();
});

router.post('/register', async (request, response) => {
  console.log("register invoked")
  console.time();
  await authController.register(request, response);
  console.log('Time to complete the request->');
  console.timeEnd();
});

export default router;