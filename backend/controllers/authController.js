let userModal = require("../models/userModal");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const { secretKey } = require("../config/authConfig");


let signUp = async (req, res) => {
    
    let { username, firstName, lastName, password } = req.body;

    try { 
    let salt = await bcrypt.genSalt(8);
    let hashedPassword = await bcrypt.hashSync(password, salt);
   
    let createUser = await userModal.create({ username, firstName, lastName, password: hashedPassword }
    )
    
    res.status(200).send(createUser)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
    
}

let login = async (req, res) => {
    let {username,password}=req.body;
    
    try { 
        let user = await userModal.findOne({ username: username });

        if (!user) {
            return res.status(404).send({
                message:"User not found"
            })
        }

        let validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(403).send({message:"Invalid password"});
        }
        
        let token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 85554 });

      

        {
            let { _doc: { password, ...otherDetails } } = user;
            otherDetails.accessToken = token;
       
            res.status(200).send(otherDetails);
        }


    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports = {
    signUp,
    login
}