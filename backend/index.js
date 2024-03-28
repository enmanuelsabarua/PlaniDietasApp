const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
require('dotenv').config();
const Diet = require('./models/diet');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/diets', async (req, res) => {
    const diets = await Diet.find({});
    res.json(diets);
});

app.get('/api/diets/:id', async (req, res, next) => {
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

app.delete('/api/diets/:id', async (req, res, next) => {
    try {
        await Diet.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

app.post('/api/diets', async (req, res, next) => {
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

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    next(error);
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});