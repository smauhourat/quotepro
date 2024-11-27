import { NextResponse } from "next/server"
import Supplier from '@models/supplier'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'Supplier'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const supplier = await Supplier.findById(id)
        if (!supplier) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(supplier), { status: 200 })
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
        const supplier = await Supplier.findByIdAndDelete(id)
        if (!supplier) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(supplier), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}