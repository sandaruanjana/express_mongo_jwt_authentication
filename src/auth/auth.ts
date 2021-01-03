import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import UserDTO from '../model/UserDTO';


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username:any, password:any, cb:any) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        // @ts-ignore
        return UserDTO.findOne({username, password})
            .then((user: any) => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch((err: any) => cb(err));
    }
));
