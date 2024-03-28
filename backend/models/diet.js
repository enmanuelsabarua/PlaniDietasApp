const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    meals: [
        {
            id: Number,
            imageType: String,
            title: String,
            readyInMinutes: Number,
            servings: Number,
            sourceUrl: String
        }
    ],
    nutrients: {
        calories: Number,
        protein: Number,
        fat: Number,
        carbohydrates: Number,
    }
});

dietSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Diet', dietSchema);