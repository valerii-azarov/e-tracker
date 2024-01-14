import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Некоректний або закінчився токен.",
      });
    }
    req.user = decoded;
    next();
  });
};

export default auth;
