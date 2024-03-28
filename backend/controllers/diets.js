const dietsRouter = require('express').Router();
const Diet = require('../models/diet');

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

dietsRouter.post('/', async (req, res, next) => {
    const { body } = req;

    if (!body.nutrients) {
        return res.status(400).json({
            error: 'content missing',
        });
    }

    const diet = new Diet({
        ...body,
    });

    try {
        const savedDiet = await diet.save();
        res.json(savedDiet);
    } catch (error) {
        next(error);
    }
});

module.exports = dietsRouter;