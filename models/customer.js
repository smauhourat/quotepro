import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({

    company: {
        type: String,
        required: true
    },
    creditRating: {
        type: Schema.Types.ObjectId,
        ref: 'creditratings'
    },
    minimumMarginPercentage: {
        type: Number,
    },
    minimumMarginUSD: {
        type: Number,
    },
    sellerCommission: {
        type: Number,
    },
    observation: {
        type: String
    },
    delayAverageDays: {
        type: Number
    },
    contactName: {
        type: String
    },
    contactPhone: {
        type: String
    },
    contactEmail: {
        type: String
    },
    taxId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Customer = models.Customer || model('Customer', CustomerSchema);

module.exports = Customer