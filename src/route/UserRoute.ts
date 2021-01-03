import express from 'express';
import UserController from '../controller/UserController';
const passport = require('passport');
const jwt = require('jsonwebtoken');
import * as dotenv from "dotenv";
dotenv.config();


const router = express.Router();

router.post('/saveUser', UserController.saveUser);

router.get('/', passport.authenticate('jwt', {session: false}), UserController.getAllUsers);
router.delete('/deleteuser', UserController.deleteUser);

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if (req.isAuthenticated()) {
        // @ts-ignore
        const {_id, username} = req.user;

        const token = signToken(_id);
        res.cookie('qid', token, {httpOnly: true, sameSite: true});
        console.log(token);
        res.status(200).json({
            isAuthenticated: true,
            user: {
                username: username
            }
        });
    }
});


const signToken = (userID: any) => {
    return jwt.sign({
        iss: process.env.JWT_SECRET,
        sub: userID
    }, process.env.JWT_SECRET, {expiresIn: "1h"});
}


export default module.exports = router;
