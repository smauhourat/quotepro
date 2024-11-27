import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const clientDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const ret = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "quoteprodb",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log('MongoDB connected')
        return ret
    } catch (error) {
        console.log(error);
    }
}