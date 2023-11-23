let jwt = require("jsonwebtoken");
const { secretKey } = require("../config/authConfig");


module.exports.validateSignup = async (req, res, next) => {
    
    if (!req.body.username) {
        return res.status(400).send({
            message:"please enter a username"
        })
    }
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "please enter your first name"
        })
    }
    if (!req.body.lastName) {
        return res.status(400).send({
            message: "please enter your last name"
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "please enter password"
        })
    }

    next();
    
}

module.exports.verifyToken = ( req,res,next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send({ message: 'please pass the token along with request' })
    }
 
    jwt.verify(token, secretKey, (err, decoder) => {
        if (err) {
            return res.status(401).send({
                message:"invalid token"
            })
        }

        req._id = decoder.id;
    })

   next();
}