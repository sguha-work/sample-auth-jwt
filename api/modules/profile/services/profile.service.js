
import CommonService from "./common.service.js";
const commonService = CommonService.CommonServiceInstance;
import DBService from "./db.service.js";
const dbService = DBService.DBServiceInstance;
import bcrypt from 'bcryptjs';
import * as userModel from '../models/user.model.js';
const uam = userAuthModel.default;
import * as jwt from 'jsonwebtoken';
class ProfileService {
  instance = null;

  constructor() {
    
  }

  static get ProfileServiceInstance() {
    if (this.instance == null) {
      this.instance = new ProfileService();
    }
    return this.instance;
  }

 
}

export default ProfileService;