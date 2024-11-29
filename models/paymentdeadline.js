import { Schema, model, models } from 'mongoose';

const PaymentDeadlineSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    months: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const PaymentDeadline = models.PaymentDeadline || model('PaymentDeadline', PaymentDeadlineSchema);

module.exports = PaymentDeadline