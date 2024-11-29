import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    brand: {
        type: String
    },
    packaging: {
        type: Schema.Types.ObjectId,
        ref: 'packaging'
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
        ref: 'freighttype'
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
        ref: 'iibbtreatment'
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