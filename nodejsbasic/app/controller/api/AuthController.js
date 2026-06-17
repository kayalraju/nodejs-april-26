const User = require("../../models/user");
const brctpyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

      const data = await userdata.save();
      return res.status(200).json({
        status: true,
        message: "User registered successfully",
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
}

module.exports = new AuthController();
