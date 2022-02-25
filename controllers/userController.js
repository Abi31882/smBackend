const User = require("../models/userModel.js.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (doc, statusCode, req, res) => {
  const token = signToken(doc._id);

  // res.cookie('jwt', token, {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  // });
  // remove the password from the output
  doc.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    doc,
  });
};

exports.singup = async function (req, res) {
  const user = await User.findOne({ userName: req.body.userName });
  if (user) {
    return res.json("username already exists");
  }
  const newUser = await User.create({
    userName: req.body.userName,
    password: req.body.password,
  });

  createSendToken(newUser, 200, req, res);
};

exports.login = async function (req, res, next) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.json({
      message: "You must provide username and password",
    });
  }

  const user = await User.findOne({ userName }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.json({
      message: "Incorrect username or password",
    });
  }

  createSendToken(user, 200, req, res);
};

exports.protect = async (req, res, next) => {
  // 1) getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in.Please login to get Access",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "the user belonging to this token does no longer exists",
        401
      )
    );
  }

  // grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = async (req, res, next) => {
  let query = User.findById(req.params.id);
  const doc = await query;

  res.status(200).json({
    status: "success",
    doc,
  });
};
