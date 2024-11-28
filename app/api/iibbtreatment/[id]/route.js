import { NextResponse } from "next/server"
import IIBBTreatment from '@models/iibbtreatment'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'IIBBTreatment'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const iibbtreatment = await IIBBTreatment.findById(id)
        if (!iibbtreatment) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(iibbtreatment), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }
}

export const DELETE = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB()
        const iibbtreatment = await IIBBTreatment.findByIdAndDelete(id)
        if (!iibbtreatment) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(iibbtreatment), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}