const User = require("../../models/user");
const brctpyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");
const OtpModel = require("../../models/otpmodel");
class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          status: false,
          message: "User already exists",
        });
      }

      const salt = await brctpyjs.genSalt(10);
      const hashPassword = await brctpyjs.hash(password, salt);

      const userdata = new User({
        name,
        email,
        phone,
        password: hashPassword,
      });

      const user = await userdata.save();
      // Send OTP email
      await sendEmail(req, user);
      return res.status(200).json({
        status: true,
        message: "User registered successfully and OTP sent to email for verification",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: error,
      });
    }
  }


  async verifyOtp(req, res) {

     try {
            const { email, otp } = req.body;
        
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.isVerified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await OtpModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.isVerified) {
                    // console.log(existingUser);
                    await sendEmail(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmail(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.isVerified = true;
            await existingUser.save();

            // Delete email verification document
            await OtpModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
        }
    
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
      });
    }
    //console.log(userExist);

    const isMatch = await brctpyjs.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    if(userExist.isVerified==false){
      return res.status(400).json({
        status: false,
        message: "User is not verified",
      });
    }

    const token = await jwt.sign({ 
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        phone: userExist.phone,
        role: userExist.role, 
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user:{
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        phone: userExist.phone,
        role: userExist.role,
      },
      token: token,
    });
  }


  async dashboard(req, res) {

      return res.status(200).json({
        status: true,
        message: "Dashboard",
        user: req.user,
      });

  }

  async updateProfile(req, res) {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      const userExist = await User.findById(req.user.id);
      if (!userExist) {
        return res.status(400).json({
          status: false,
          message: "User does not exist",
        });
      }

      userExist.name = name;
      userExist.email = email;
      userExist.phone = phone;
      userExist.password = userExist.password;
      //hash password
      const salt = await brctpyjs.genSalt(10);
      const hashPassword = await brctpyjs.hash(userExist.password, salt);
      userExist.password = hashPassword;  
      const data = await userExist.save();
      return res.status(200).json({
        status: true,
        message: "Profile updated successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: error,
      });
    }
  }
}

module.exports = new AuthController();
