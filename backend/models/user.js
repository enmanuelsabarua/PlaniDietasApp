const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passwordHash: String,
    diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet'
    },
    objective: {
        description: String,
        weight: String
    }
});

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);