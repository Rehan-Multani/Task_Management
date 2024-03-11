const Admin = require("../Models/AdminModel");
const User = require("../Models/UserModel");
const SuperAdmin = require("../Models/SuperAdminModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");


const getadmin = async (req, res) => {
  try {
    const result = await Admin.find();
    res.send(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getuser = async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getsuperadmin = async (req, res) => {
  try {
    const result = await SuperAdmin.find();
    res.send(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getbyid = async (req, res) => {
  try {
    const myUser = await User.findById({ _id: req.params.id });
    const myAdmin = await admin.findById({ _id: req.params.id });
    if (myAdmin) {
      res.json(myAdmin);
    } else if (myUser) {
      res.json(myUser);

    } else {
      res.json("Cannot find an account with this id");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createadmin = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await Admin.findOne({ email: email });
    if (!findUser) {
      const newUser = await Admin.create(req.body);
      res.json(newUser);
    } else {
      throw new Error("Admin already exist with this email");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error.message);
  }
});

const createsuperadmin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await SuperAdmin.findOne({ email: email });

  if (!findUser) {
    const newUser = await SuperAdmin.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("SuperAdmin already exist with this email");
  }
});

const createuser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exist with this email");
  }
});


const updateAdminPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await Admin.findById({ _id: req.params.id });
  if (!user) {
    res.json("doctor not found");
  }
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById({ _id: req.params.id });
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findAdmin = await Admin.findOne({ email, role: "admin" });
  const findUser = await User.findOne({ email, role: "user" });
  const findSuperAdmin = await SuperAdmin.findOne({ email, role: "superadmin" });

  let user;
  let role;

  if (findAdmin) {
    user = findAdmin;
    role = "admin";
  } else if (findUser) {
    user = findUser;
    role = "user";
  } else if (findSuperAdmin) {
    user = findSuperAdmin;
    role = "superadmin";
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  if (user && (await user.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(user._id);

    if (role === "admin") {
      await Admin.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
        },
        { new: true }
      );
    } else if (role === "user") {
      await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
        },
        { new: true }
      );
    } else if (role === "superadmin") {
      await SuperAdmin.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
        },
        { new: true }
      );
    }
    let responseData = {};

    if (role === "user") {
      responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
        token: generateToken(user._id),
      };
    } else if (role === "admin") {
      responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
        token: generateToken(user._id),
      };
    }
    else
      if (role === "superadmin") {
        responseData = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
          token: generateToken(user._id),
        };
      } else
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
    res.json(responseData);
  } else {
    res.json("Invalid Credentials")
  }
});

//show the message if drStatus is false

module.exports = {

  getsuperadmin,
  createsuperadmin,
  createadmin,
  createuser,
  getbyid,
  getadmin,
  getuser,
  loginAdmin,
  updateAdminPassword,
  updateUserPassword,
};
