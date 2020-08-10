const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const { headers } = req;
  const authHeader = headers.authorization;

  console.log({ headers, authHeader });
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log({ token });

    jwt.verify(token, accessTokenSecret, (err, user) => {
      console.log({ err, user });
      if (err) {
        return res.status(403).json({ err });
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
