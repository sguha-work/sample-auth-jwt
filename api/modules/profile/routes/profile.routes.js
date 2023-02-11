import express from 'express';
import ProfileController from '../controllers/profile.controller.js';
const router = express.Router();
const profileController = ProfileController.ProfileControllerInstance;

router.get('/profile', async (request, response) => {
  console.log("Fetch profile data invoked")
  console.time();
  await profileController.get(request, response);
  console.log('Time to complete the request->');
  console.timeEnd();
});

router.post('/profile', async (request, response) => {
  console.log("Create profile invoked")
  console.time();
  await profileController.addProfileDetails(request, response);
  console.log('Time to complete the request->');
  console.timeEnd();
});

export default router;