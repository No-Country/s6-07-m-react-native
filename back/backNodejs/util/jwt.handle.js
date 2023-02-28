const { verify } = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;
const verifytoken = (jwt) => {
  const isOk = verify(jwt, JWT_SECRET);
  console.log(isOk, "is ok");
  return isOk;
};

module.exports = { verifytoken };
