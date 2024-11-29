import { NextResponse } from "next/server"
import PaymentDeadline from '@models/paymentdeadline'
import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'PaymentDeadline'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const paymentdeadline = await PaymentDeadline.findById(id)
        if (!paymentdeadline) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(paymentdeadline), { status: 200 })
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
        const paymentdeadline = await PaymentDeadline.findByIdAndDelete(id)
        if (!paymentdeadline) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(paymentdeadline), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}