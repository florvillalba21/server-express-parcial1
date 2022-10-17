const User = require('../models/Users');

const generateT = require('../helpers/generateJWT');
const bcrypt = require('bcrypt');

const ctrlLoguear = {};

ctrlLoguear.auth = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Ha ocurrido un error :c" - "Usuario no encontrado",
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        ok: false,
        msg: "ha ocurrido un error fatal :o" - "Usuario inactivo",
      });
    }

    const validarPassword = bcrypt.compareSync(password, user.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "ha ocurrido un error fatal :o" - "Contraseña incorrecta",
      });
    }

    const token = await generateT({ uid: user._id });
    return res.json({ token });
    

  } catch (error) {
    console.log(error)
    return res.json({ msg: 'Error al iniciar sesión' });
  }
};

module.exports = ctrlLoguear;
