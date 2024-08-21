import e from 'express';
import cookieParser from 'cookie-parser';

const app = e();
app.use(cookieParser());

export const sendToken = (User, statusCode, res) => {
  try {
    // Generate the JWT token
    const token = User.getJwtToken();

    // Convert environment variable to number
    const cookieExpires = parseInt(process.env.COOKIE_EXPIRES_TIME, 10) || 7; // Default to 7 days if not set

    // Set the cookie options
    const options = {
      expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
      httpOnly: false, // Set to true if you don't need client-side access via JavaScript
      secure: false, // Ensure this is false for non-HTTPS
      sameSite: 'Lax', // Allows the cookie to be sent with normal cross-site requests
      path: '/', // Cookie will be valid for the entire domain
    };

    // Set the cookie and return the response
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      token,
      User,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
