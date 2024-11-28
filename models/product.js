import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'suppliers'
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
}, { timestamps: true });

const Product = models.Product || model('Product', ProductSchema);

module.exports = Product