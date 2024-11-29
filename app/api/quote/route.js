import { NextResponse } from "next/server"
import Quote from '@models/quote'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { } = await request.json();

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
