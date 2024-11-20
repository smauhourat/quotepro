import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({

    company: {
        type: String,
        required: true
    },
    taxId: {
        type: String,
        required: true
    }
})

const Customer = models.Customer || model('Customer', CustomerSchema);

module.exports = Customer