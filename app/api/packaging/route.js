import { NextResponse } from "next/server"
import Packaging from '@models/packaging'
import { connectToDB } from '@config/db';
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'

export const POST = async (request) => {
    const { description, stackable } = await request.json();

    try {
        await connectToDB();
        const newPackaging = new Packaging({ description, stackable });

        await newPackaging.save();

        return NextResponse.json(ResponseOk(newPackaging), { status: 201 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const GET = async (request) => {

    try {
        await connectToDB();
        const packaging = await Packaging.find({})

        return NextResponse.json(ResponseOk(packaging), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
