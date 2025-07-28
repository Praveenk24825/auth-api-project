const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.find({ email });
    if (userExists.length > 0){
       return res.status(400).json({ message: 'Email already exists' });
  }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.find({ email });

  if(user.length === 0){
     return res.status(400).json({ message: 'Invalid credentials' });
}

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user[0].id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
  
};

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
