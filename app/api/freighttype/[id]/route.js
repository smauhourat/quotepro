import { NextResponse } from "next/server"
import FreightType from '@models/freighttype'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'FreightType'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const freighttype = await FreightType.findById(id)
        if (!freighttype) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(freighttype), { status: 200 })
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
        const freighttype = await FreightType.findByIdAndDelete(id)
        if (!freighttype) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(freighttype), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}