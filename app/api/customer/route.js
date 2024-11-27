import { NextResponse } from "next/server"
import Customer from '@models/customer'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

// const body = await request.json();

// const validatedData = UserSchema.safeParse(body);

// if (!validatedData.success) {
//     throw new ValidationError(validatedData.error.flatten().fieldErrors);
// }

// const { email, username } = validatedData.data;

export const POST = async (request) => {
    const {
        company,
        creditRating,
        minimumMarginPercentage,
        minimumMarginUSD,
        sellerCommission,
        observation,
        delayAverageDays,
        contactName,
        contactPhone,
        contactEmail,
        taxId
    } = await request.json()

    try {
        await connectToDB();
        const newCustomer = new Customer({
            company,
            creditRating,
            minimumMarginPercentage,
            minimumMarginUSD,
            sellerCommission,
            observation,
            delayAverageDays,
            contactName,
            contactPhone,
            contactEmail,
            taxId
        })

        await newCustomer.save()

        return NextResponse.json(ResponseOk(newCustomer), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {
    try {
        await connectToDB();
        const customers = await Customer.find({})

        return NextResponse.json(ResponseOk(customers), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
