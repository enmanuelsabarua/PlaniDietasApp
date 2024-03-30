const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('diet');
    res.json(users);
});

userRouter.post('/', async (req, res, next) => {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        name,
        email,
        passwordHash,
    });

    const userForToken = {
        email: user.email,
        id: user._id,
    }

    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

    try {
        const savedUser = await user.save();
        res.status(201).json({savedUser, token});
    } catch (error) {
        next(error);
    }
});

module.exports = userRouter;