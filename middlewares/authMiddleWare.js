const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log('token: ', token);
     
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized Access",
          success: false,
        });
      } else {
        req.body.UserId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
