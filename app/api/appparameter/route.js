import { NextResponse } from "next/server"
import AppParameter from '@models/appparameter'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { storageCost,
        inoutCost,
        financialCost,
        debitCreditTax,
        fixedCost,
        exchangeRatio,
        storageCostFactor } = await request.json();

    try {
        await connectToDB();

        await AppParameter.deleteMany({})

        const newAppParameter = new AppParameter({
            storageCost,
            inoutCost,
            financialCost,
            debitCreditTax,
            fixedCost,
            exchangeRatio,
            storageCostFactor
        });

        await newAppParameter.save();

        return NextResponse.json(ResponseOk(newAppParameter), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const appparameter = await AppParameter.find({})

        return NextResponse.json(ResponseOk(appparameter), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
