const jwt = require("jsonwebtoken");

const generateJWT = (iud) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      iud,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 *24,
      },
      (err, token) => {
        if (err) {
            console.log(err)
          reject("no se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
module.exports = generateJWT;
