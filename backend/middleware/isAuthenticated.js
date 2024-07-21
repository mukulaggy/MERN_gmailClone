import jwt from "jsonwebtoken";


const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(400).json({ message: "User is not Authenticated" });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      res.status(400).json({ message: "Invalid token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;