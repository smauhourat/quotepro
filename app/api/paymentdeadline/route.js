import { NextResponse } from "next/server"
import PaymentDeadline from '@models/paymentdeadline'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { description, days, months } = await request.json();

    try {
        await connectToDB();
        const newPaymentDeadline = new PaymentDeadline({ description, days, months });

        await newPaymentDeadline.save();

        return NextResponse.json(ResponseOk(newPaymentDeadline), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const paymentdeadline = await PaymentDeadline.find({})

        return NextResponse.json(ResponseOk(paymentdeadline), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
