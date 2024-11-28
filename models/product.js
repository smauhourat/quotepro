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
    brand: {
        type: String
    },
    packaging: {
        type: Schema.Types.ObjectId,
        ref: 'packagings'
    },
    positionKilogram: {
        type: Number,
        required: true
    },
    fclKilogram: {
        type: Number,
        required: true
    },
    validityOfPrice: {
        type: Date,
        required: true
    },
    minimumMarginPercentage: {
        type: Number,
    },
    minimumMarginUSD: {
        type: Number,
    },
    waste: {
        type: Number,
    },
    freightType: {
        type: Schema.Types.ObjectId,
        ref: 'freighttypes'
    },
    observations: {
        type: String
    },
    clientObservations: {
        type: String
    },
    buyAndSelldirect: {
        type: Boolean,
        default: false
    },
    iibbTreatment: {
        type: Schema.Types.ObjectId,
        ref: 'iibbtreatments'
    },
    inoutStorage: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    productCost: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Product = models.Product || model('Product', ProductSchema);

module.exports = Product