const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/UserDTO');
import * as dotenv from "dotenv";


dotenv.config();

// @ts-ignore
const cookieFromExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["qid"];
    }
    return token;
}

// local
passport.use(new LocalStrategy((username: any, password: any, done: any) => {
    User.findOne({username}).exec((err: any, user: { password: any; }) => {
        if (err) return done(err);

        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err: any, isMatch: any) => {
            if (err) {          // hashed password
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        })
    })
}));


passport.use(new JWTStrategy({
    jwtFromRequest: cookieFromExtractor,
    passReqToCallback: true,
    secretOrKey: process.env.JWT_SECRET // maybe wanna use environment variables here
}, (req: any, payload: any, done: any) => {
    // console.log(payload.sub)
    User.findOne({_id: payload.sub}, (err: any, user: any) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false);
        } else {
            req.user = user;
            return done(null, user);
        }
    })
}))
