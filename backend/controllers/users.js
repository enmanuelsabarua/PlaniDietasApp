const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('diet');
    res.json(users);
});

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('diet');
    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
});

userRouter.put('/:id', async (req, res, next) => {
    const { objective } = req.body;

    try {
        // Objetive is not being updated
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { objective: { description: objective.description, weight: objective.weight } }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/', async (req, res, next) => {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        name,
        email,
        passwordHash,
        diet: null,
        objective: {
            description: null,
            weight: null,
        }
    });

    const userForToken = {
        email: user.email,
        id: user._id,
    }

    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

    try {
        const savedUser = await user.save();
        console.log(savedUser);
        res.status(201).json({ ...savedUser.toJSON(), token });
    } catch (error) {
        next(error);
    }
});

module.exports = userRouter;