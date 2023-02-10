
import CommonService from "./common.service.js";
const commonService = CommonService.CommonServiceInstance;
import DBService from "./db.service.js";
const dbService = DBService.DBServiceInstance;
import bcrypt from 'bcryptjs';
import * as userAuthModel from './../models/user_auth.model.js';
const uam = userAuthModel.default;
class AuthService {
  instance = null;

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  static get AuthServiceInstance() {
    if (this.instance == null) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  #validate(email, password) {
    return email && password && email.toString().trim() != "" && password.trim() != '';
  }

  async login({ email, password }) {
    let responseObj = {};
    try {
      responseObj.status = 201;
      responseObj.data = {};
      if (this.#validate(email, password)) {
        await dbService.connect();
        const userAuthDataFromDB = uam.find({ email: email });
        
        console.log('userAuthDataFromDB',userAuthDataFromDB)
        const passwordHashFromDB = userDataFromDB[0]["password"];
        const match = await bcrypt.compare(password.trim(), passwordHashFromDB);
        if (match) {
          // making session entry
          dbService.query(`INSERT INTO ${userSessionDBName} (user_id, login_time) VALUES ('${userDataFromDB[0]['user_id']}', ${Date.now()});`)
          const userData = userDataFromDB[0];
          responseObj.data = userData;
          responseObj.data.success = true;
          responseObj.data.mobile = mobile;
          // enterring division names
          let divisionIdString = '';

        } else {
          throw ({ message: "User id and or password is wrong", status: 403 });
        }
      }
      else {
        throw ({ message: "User id and or password is invalid", status: 403 });
      }
      return Promise.resolve(commonService.successResponse(responseObj, responseObj.status));
    } catch (e) {
      console.log(e);
      return Promise.reject(
        commonService.rejectResponse(e.message || "Unknown error", e.status || 405)
      );
    } finally {
      dbService.disConnect();
    }
  }

  async register({ email, mobile, password }) {
    try {
      if (this.#validate(email, password)) {
        const passwordHash = await bcrypt.hash(password, 5);
        await this.dbService.connect();
        const userData = new uam({email, password});
        await userData.save();
        return Promise.resolve({status:201,message:"user registered succesfully"});
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(
        commonService.rejectResponse(error.message || "Unknown error", error.status || 405)
      );
    } finally{
      this.dbService.disConnect();
    }
  }
}

export default AuthService;