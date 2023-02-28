const { verify } = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;
const verifytoken = (jwt) => {
  console.log(JWT_SECRET, "clave")
  console.log(jwt, "jwt")
  const isOk = verify(jwt, JWT_SECRET);
  console.log(isOk, "is ok");
  return isOk;
};

module.exports = { verifytoken };
