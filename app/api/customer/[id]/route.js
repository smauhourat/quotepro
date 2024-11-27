import { NextResponse } from "next/server"
import Customer from '@models/customer'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'Customer'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const customer = await Customer.findById(id)
        if (!customer) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(customer), { status: 200 })
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
        const customer = await Customer.findByIdAndDelete(id)
        if (!customer) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(customer), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}