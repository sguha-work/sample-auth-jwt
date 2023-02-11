import passport from 'passport';
import * as passportJWT from "passport-jwt";
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
export {passport, JWTStrategy, ExtractJWT};