// Import the required modules
const express = require("express")
const router = express.Router()

const {
  login,
  signUp,
  sendOTP,
  changePassword,
  logout,
  me,

} = require("../controllers/Auth")
// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/ResetPassword")

// const { auth } = require("../middleware/auth")

const { isLoggedIn } = require("../middleware/auth");

router.get("/me", isLoggedIn, me);
router.post("/login", login)


router.post("/signup", signUp)

router.post("/sendotp", sendOTP)
router.post("/logout" , logout)
// router.post("/changepassword", auth, changePassword)


// router.post("/reset-password-token", resetPasswordToken)

// router.post("/reset-password", resetPassword)

module.exports = router