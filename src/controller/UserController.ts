import UserDTO from '../model/UserDTO';
import {Request, Response} from "express";
import bcrypt from 'bcrypt';

const saveUser = (req: Request, res: Response) => {

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        // @ts-ignore
        const user = new UserDTO({
            username: req.body.username,
            password: hash
        });

        user.save().then((result: any) => {
            res.status(200).json({"isSaved": true, data: result});
        }).catch((err: any) => {
            res.status(500).json(err);
        });
    });


};

const deleteUser = (req: Request, res: Response) => {

    try {

        //findAndDelete,deleteOne,DeleteMany

        // @ts-ignore
        UserDTO.deleteOne({customerId: req.headers.id}).then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({isDeleted: true});
            } else {
                res.status(200).json({isDeleted: false});
            }
        }).catch((error: any) => {
            res.status(500).json(error);
        });
    } catch (e) {

    }

};

const getAllUsers = (req: Request, res: Response) => {

    // if you use find() method it will return a Array of selected Data,// result.length>0===
    // when you use findOne() it will return only one object/// result !=null
    try {

        // @ts-ignore
        UserDTO.find().then((result: any) => {
            res.status(200).json({data: result});
        }).catch((error: any) => {
            res.status(500).json(error);
        })

    } catch (e) {

    }
};


export default module.exports = {
    saveUser,
    deleteUser,
    getAllUsers
};
