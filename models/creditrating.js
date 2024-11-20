import { Schema, model, models } from 'mongoose';

const CreditRatingSchema = new Schema({

    description: {
        type: String,
        required: true
    },
})

const CreditRating = models.CreditRating || model('CreditRating', CreditRatingSchema);

module.exports = CreditRating