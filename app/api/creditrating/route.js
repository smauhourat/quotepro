import { NextResponse } from "next/server"
import CreditRating from '@models/creditrating'
import { connectToDB } from '@config/db';
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { description } = await request.json();

    try {
        await connectToDB();
        const newCreditRating = new CreditRating({ description });

        await newCreditRating.save();

        return NextResponse.json(ResponseOk(newCreditRating), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const creditRating = await CreditRating.find({})

        return NextResponse.json(ResponseOk(creditRating), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
