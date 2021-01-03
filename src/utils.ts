const jwt = require('jsonwebtoken')

// @ts-ignore
const createMessage = (msg, err) => ({ msg, err });

// function createMessage(msg, err) {
//     return {
//         msg,
//         err
//     }
// }

// @ts-ignore
const signToken = userID => {
    return jwt.sign({
        iss: "keyboard cat",
        sub: userID
    }, "keyboard cat", { expiresIn: "1hr" });
}

export default module.exports = {
    signToken
}
