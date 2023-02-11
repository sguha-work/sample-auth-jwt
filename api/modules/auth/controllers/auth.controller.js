import CommonController from './common.controller.js';
import AuthService from '../services/auth.service.js';

const authService = AuthService.AuthServiceInstance;
const commonController = CommonController.CommonControllerInstance;

class AuthController {
  instance = null;

  static get AuthControllerInstance() {
    if (this.instance == null) {
      this.instance = new AuthController();
    }
    return this.instance;
  }

  async login(request, response) {
    await commonController.handleRequest(request, response, authService.login);
  };

  async register(request, response) {
    await commonController.handleRequest(request, response, authService.register);
  };
}
export default AuthController;
