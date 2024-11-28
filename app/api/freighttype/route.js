import { NextResponse } from "next/server"
import FreightType from '@models/freighttype'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { description } = await request.json();

    try {
        await connectToDB();
        const newFreightType = new FreightType({ description });

        await newFreightType.save();

        return NextResponse.json(ResponseOk(newFreightType), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const freighttype = await FreightType.find({})

        return NextResponse.json(ResponseOk(freighttype), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
