import CommonController from './common.controller.js';
import AuthService from '../services/profile.service.js';
import { passport, JWTStrategy, ExtractJWT } from './../services/passport.service.js';

const profileService = AuthService.AuthServiceInstance;
const commonController = CommonController.CommonControllerInstance;

class ProfileController {
  instance = null;

  static get ProfileControllerInstance() {
    if (this.instance == null) {
      this.instance = new ProfileController();
    }
    return this.instance;
  }
  async addProfileDetails() {

  }

  
}
export default ProfileController;
