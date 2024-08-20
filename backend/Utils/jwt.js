import e from 'express'
import cookieParser from "cookie-parser";

const app=e()
app.use(cookieParser())


export const sendToken = (User, statusCode, res) => {
  // Generate the JWT token
  const token = User.getJwtToken();

  

  // Set the cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: 'Strict', // Ensures the cookie is only sent in first-party contexts
  };

  // Set the cookie and return the response
  
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    User,
  });
};
