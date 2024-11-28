import { Schema, model, models } from 'mongoose';

const AppParameterSchema = new Schema({

    storageCost: {
        type: Number,
        default: 0,
        required: true
    },
    inoutCost: {
        type: Number,
        default: 0,
        required: true
    },
    financialCost: {
        type: Number,
        default: 0,
        required: true
    },
    debitCreditTax: {
        type: Number,
        default: 0,
        required: true
    },
    fixedCost: {
        type: Number,
        default: 0,
        required: true
    },
    exchangeRatio: {
        type: Number,
        default: 0,
        required: true
    },
    storageCostFactor: {
        type: Number,
        default: 0,
        required: true
    },
}, { timestamps: true })

const AppParameter = models.AppParameter || model('AppParameter', AppParameterSchema);

module.exports = AppParameter