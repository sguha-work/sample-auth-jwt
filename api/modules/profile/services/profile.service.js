
import CommonService from "./common.service.js";
const commonService = CommonService.CommonServiceInstance;
import DBService from "./db.service.js";
const dbService = DBService.DBServiceInstance;
import * as userModel from '../models/user.model.js';
import * as mongoose from 'mongoose';
const um = userModel.default;

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

  async getProfileDetails({id}) {
    try {
      let responseObj = {
        status: 200
      };
      await dbService.connect();
      const userProfileData = await um.findById(id);
      responseObj.data = userProfileData;
      if(!userProfileData) {
        responseObj.status = 404;
      }
      return Promise.resolve(commonService.successResponse(responseObj, responseObj.status));
    } catch(error) {
      return Promise.reject(commonService.rejectResponse(error.message || "Unknown error", error.status || 405));
    }
  }
  async addProfileDetails({id, name, phoneNumber, age, address}) {
    try {
      let responseObj = {
        status: 201
      };
      await dbService.connect();
      const modelInstance = new um({_id:mongoose.Types.ObjectId(id), name, phoneNumber, age, address});
      await modelInstance.save();
      responseObj.data = {_id:id, name, phoneNumber, age, address};
      return Promise.resolve(commonService.successResponse(responseObj, responseObj.status));
    } catch(error) {
      if(error.message.indexOf('_id_ dup key')!=-1) {
        error.message = `Value already exists of the given id ${id}`;
      }
      return Promise.reject(commonService.rejectResponse(error.message || "Unknown error", error.status || 405));
    }
  }
}

export default ProfileService;