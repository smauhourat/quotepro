import { Schema, model, models } from 'mongoose';

const IIBBTreatmentSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
})

const IIBBTreatment = models.IIBBTreatment || model('IIBBTreatment', IIBBTreatmentSchema);

module.exports = IIBBTreatment