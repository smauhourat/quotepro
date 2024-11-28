import { Schema, model, models } from 'mongoose';

const FreightTypeSchema = new Schema({

    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const FreightType = models.FreightType || model('FreightType', FreightTypeSchema);

module.exports = FreightType