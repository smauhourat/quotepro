import { NextResponse } from "next/server"
import Supplier from '@models/supplier'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { name } = await request.json();

    try {
        await connectToDB();
        const newSupplier = new Supplier({ name });

        await newSupplier.save();

        return NextResponse.json(ResponseOk(newSupplier), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const supplier = await Supplier.find({})

        return NextResponse.json(ResponseOk(supplier), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
