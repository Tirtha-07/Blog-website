const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const salt = bcrypt.genSaltSync(10);
const secret = 'edfsdf4534513536ewdfsdfsd';



exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.json(userDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Registration failed' });
  }
};




  

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('Wrong credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '').json('OK');
};
