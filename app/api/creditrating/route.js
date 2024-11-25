import CreditRating from '@models/creditrating'
import { connectToDB } from '@config/db';

export const POST = async (request) => {
    const { description } = await request.json();

    try {
        await connectToDB();
        const newCreditRating = new CreditRating({ description });

        await newCreditRating.save();
        return new Response(JSON.stringify(newCreditRating), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Credit Rating", { status: 500 });
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const creditRatings = await CreditRating.find({})
        return new Response(JSON.stringify(creditRatings), { status: 200 })
    } catch (error) {
        return new Response("Failed to get a Credit Rating", { status: 500 });
    }
}