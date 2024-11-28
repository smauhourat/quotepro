import { NextResponse } from "next/server"
import Product from '@models/product'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const {
        name,
        supplier,
        brand,
        packaging,
        positionKilogram,
        fclKilogram,
        validityOfPrice,
        minimumMarginPercentage,
        minimumMarginUSD,
        waste,
        freightType,
        observations,
        clientObservations,
        buyAndSelldirect,
        iibbTreatment,
        inoutStorage,
        active,
        productCost
    } = await request.json();

    try {
        await connectToDB();
        const newProduct = new Product({
            name,
            supplier,
            brand,
            packaging,
            positionKilogram,
            fclKilogram,
            validityOfPrice,
            minimumMarginPercentage,
            minimumMarginUSD,
            waste,
            freightType,
            observations,
            clientObservations,
            buyAndSelldirect,
            iibbTreatment,
            inoutStorage,
            active,
            productCost
        });

        await newProduct.save();

        return NextResponse.json(ResponseOk(newProduct), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const product = await Product.find({})

        return NextResponse.json(ResponseOk(product), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
