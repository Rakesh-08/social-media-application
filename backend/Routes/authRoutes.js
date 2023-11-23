const { signUp, login } = require("../controllers/authController")
const { validateSignup } = require("../middlewares/authMiddleware")


module.exports = (app) => {
    
    app.post("/auth/signup",validateSignup,signUp)
    app.post("/auth/login",login)
}