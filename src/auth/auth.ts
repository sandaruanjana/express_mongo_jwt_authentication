import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import UserDTO from '../model/UserDTO';


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username:any, password:any, cb:any) {
        // @ts-ignore
        return UserDTO.findOne({username, password})
            .then((user: any) => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect username or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch((err: any) => cb(err));
    }
));
