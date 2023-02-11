import CommonController from './common.controller.js';
import ProfileService from '../services/profile.service.js';

const profileService = ProfileService.ProfileServiceInstance;
const commonController = CommonController.CommonControllerInstance;

class ProfileController {
  instance = null;

  static get ProfileControllerInstance() {
    if (this.instance == null) {
      this.instance = new ProfileController();
    }
    return this.instance;
  }
  async addProfileDetails(request, response) {
    await commonController.handleRequest(request, response, profileService.addProfileDetails,true);
  }

  async getProfileDetails(request, response) {
    await commonController.handleRequest(request, response, profileService.getProfileDetails, true);
  }

  
}
export default ProfileController;
