import { NextResponse } from "next/server"
import { ResponseOk } from '@lib/http-error'
import { handleError } from '@lib/handlers/error'
import { calculateQuote } from '../../../services/quoteService';

export const POST = async (request) => {
    const data = await request.json();
    //console.log(data)

    try {
        const calculatedQuote = await calculateQuote(data)

        return NextResponse.json(ResponseOk(calculatedQuote), { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}
