import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

// protected routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).send({ message: "Token not present" });
    }
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decode.id);
    if (!user) res.status(404).send({ message: "Invalid Token" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Invalid Token" });
  }
};