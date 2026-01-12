const { Router } = require("express");
const {
  register,
  login,
  verify,
  logout,
  resendOTP,
  forgotPassword,
} = require("../controller/auth.controller");
const registerValidatorMiddleware = require("../middleware/register-validator.middleware");
const loginValidationMiddleware = require("../middleware/login-validation.middleware");
const verifyValidationMiddleware = require("../middleware/verify-validation.middleware");
const refreshTokenMiddleware = require("../middleware/refresh-token.middleware");
const resendOtpValidationMiddleware = require("../middleware/resend-otp-validation.middleware");
const forgotPasswordValidationMiddleware = require("../middleware/forgot-password-validation.middleware");
const authorization = require("../middleware/authorization");

const authRouter = Router();

authRouter.post("/register", registerValidatorMiddleware, register);
authRouter.post("/verify", verifyValidationMiddleware, verify);
authRouter.post("/login", loginValidationMiddleware, login);
authRouter.get("/refresh_token", refreshTokenMiddleware);
authRouter.get("/logout", logout);
authRouter.post("/resend_otp", resendOtpValidationMiddleware, resendOTP);
authRouter.post(
  "/forgot_password",
  authorization,
  forgotPasswordValidationMiddleware,
  forgotPassword
);

module.exports = authRouter;
