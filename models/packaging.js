import { Schema, model, models } from 'mongoose';

const PackagingSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    stackable: {
        type: Boolean,
        default: false
    }
})

const Packaging = models.Packaging || model('Packaging', PackagingSchema);

module.exports = Packaging