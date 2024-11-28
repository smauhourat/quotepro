import { NextResponse } from "next/server"
import Packaging from '@models/packaging'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'Packaging'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const packaging = await Packaging.findById(id)
        if (!packaging) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(packaging), { status: 200 })
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
        const packaging = await Packaging.findByIdAndDelete(id)
        if (!packaging) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(packaging), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}