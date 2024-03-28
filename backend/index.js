const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
require('dotenv').config();
const Diet = require('./models/diet');

app.use(express.json());
app.use(cors());


let diets = [
    {
        "id": "c4e7",
        "meals": [
            {
                "id": 634882,
                "imageType": "jpg",
                "title": "Best Breakfast Burrito",
                "readyInMinutes": 45,
                "servings": 4,
                "sourceUrl": "https://spoonacular.com/best-breakfast-burrito-634882"
            },
            {
                "id": 650119,
                "imageType": "jpg",
                "title": "Linguine Alla Carbonara",
                "readyInMinutes": 30,
                "servings": 4,
                "sourceUrl": "https://spoonacular.com/linguine-alla-carbonara-650119"
            },
            {
                "id": 1697535,
                "imageType": "jpg",
                "title": "Panera Spicy Thai Salad",
                "readyInMinutes": 20,
                "servings": 4,
                "sourceUrl": "https://spoonacular.com/panera-spicy-thai-salad-1697535"
            }
        ],
        "nutrients": {
            "calories": 2953.32,
            "protein": 175.21,
            "fat": 116.39,
            "carbohydrates": 305.77
        }
    }
]

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

app.delete('/api/diets/:id', (req, res) => {
    const id = req.params.id;
    diets = diets.filter(diet => diet.id != id);

    res.status(204).end()
});

const generateId = () => {
    const maxId = diets.length > 0
        ? Math.max(...diets.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/diets', (req, res) => {
    const { body } = req;
    console.log(body);

    if (!body.nutrients) {
        return res.status(400).json({
            error: 'content missing',
        });
    }

    const diet = {
        id: generateId(),
        ...body,
    }

    diets = diets.concat(diet);

    res.json(diet);
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