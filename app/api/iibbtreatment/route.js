import { NextResponse } from "next/server"
import IIBBTreatment from '@models/iibbtreatment'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { description, percentage } = await request.json();

    try {
        await connectToDB();
        const newIIBBTreatment = new IIBBTreatment({ description, percentage });

        await newIIBBTreatment.save();

        return NextResponse.json(ResponseOk(newIIBBTreatment), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const iibbtreatment = await IIBBTreatment.find({})

        return NextResponse.json(ResponseOk(iibbtreatment), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
