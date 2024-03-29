const dietsRouter = require('express').Router();
const Diet = require('../models/diet');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

dietsRouter.get('/', async (req, res) => {
    const diets = await Diet.find({});
    res.json(diets);
});

dietsRouter.get('/:id', async (req, res, next) => {
    try {
        const diet = await Diet.findById(req.params.id);
        if (diet) {
            res.json(diet)
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

dietsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Diet.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

const getTokenFrom = (req) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}

dietsRouter.post('/', async (req, res, next) => {
    const { body } = req;

    if (!body.nutrients) {
        return res.status(400).json({
            error: 'content missing',
        });
    }

    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid',
        });
    }
    
    const user = await User.findById(decodedToken.id);

    const diet = new Diet({
        ...body,
    });

    user.diet = diet;
    await user.save();

    try {
        const savedDiet = await diet.save();
        res.json(savedDiet);
    } catch (error) {
        next(error);
    }
});

module.exports = dietsRouter;