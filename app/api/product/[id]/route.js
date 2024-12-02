import { NextResponse } from "next/server"
import Product from '@models/product'
import Packaging from '@models/packaging'
import IIBBTreatment from '@models/iibbtreatment'
import FreightType from '@models/freighttype'

import { connectToDB } from '@config/db'
import { NotFoundError, ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

const RESOURCE = 'Product'

export const GET = async (request, { params }) => {

    const { id } = await params

    try {
        if (!id) throw new NotFoundError(RESOURCE)

        await connectToDB();
        const product = await Product.findById(id)
            .populate("supplier")
            .populate("packaging")
            .populate("iibbTreatment")
            .populate("freightType")
        if (!product) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(product), { status: 200 })
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
        const product = await Product.findByIdAndDelete(id)
        if (!product) throw new NotFoundError(RESOURCE)

        return NextResponse.json(ResponseOk(product), { status: 200 })
    } catch (error) {
        //console.log(error)
        return handleError(error)
    }

}