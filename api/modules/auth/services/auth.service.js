
import CommonService from "./common.service.js";
const commonService = CommonService.CommonServiceInstance;
import DBService from "./db.service.js";
const dbService = DBService.DBServiceInstance;
import bcrypt from 'bcryptjs';
import * as userAuthModel from './../models/user_auth.model.js';
const uam = userAuthModel.default;
import * as jwt from 'jsonwebtoken';
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
        const userAuthDataFromDB = await uam.find({ email: email }).exec();
        if (userAuthDataFromDB.length) {
          const passwordComparissonResult = await bcrypt.compare(password, userAuthDataFromDB[0].password); console.log('passwordComparissonResult', passwordComparissonResult);
          if (passwordComparissonResult) {
            // generating token as login credentials matched
            const token = jwt.default.sign(
              { email },
              'my_secret_private_key_which_should_not_be_provided_like_this',
              {
                algorithm: "HS512",
                expiresIn: "90h",
              }
            );

            responseObj.data = { token };
            return Promise.resolve(commonService.successResponse(responseObj, responseObj.status));
          }
        } else {
          throw ({ message: "user id or password mismatch" });
        }
        console.log('userAuthDataFromDB', userAuthDataFromDB);
      } else {
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

  async register({ email, password }) {
    try {
      if (this.#validate(email, password)) {
        const passwordHash = await bcrypt.hash(password, 5);
        await dbService.connect();
        const userData = new uam({ email, password: passwordHash });
        await userData.save();
        return Promise.resolve({ status: 201, message: "user registered succesfully" });
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(
        commonService.rejectResponse(error.message || "Unknown error", error.status || 405)
      );
    } finally {
      dbService.disConnect();
    }
  }
}

export default AuthService;