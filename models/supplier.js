import { Schema, model, models } from 'mongoose';

const SupplierSchema = new Schema({

    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Supplier = models.Supplier || model('Supplier', SupplierSchema);

module.exports = Supplier
