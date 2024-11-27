// https://github.com/riyons/nextjs-centralized-error-handler/blob/main/src/errorHandler.js
import { NextResponse } from "next/server"
import { RequestError, ValidationError } from "../http-error";
import logger from '../logger'

const formatResponse = (status, message, errors) => {
    const responseContent = {
        success: false,
        error: {
            message,
            details: errors,
        },
    }

    return NextResponse.json(responseContent, { status })
}

export const handleError = (error, responseType = "server") => {
    //console.log('error =>', error)

    if (error instanceof RequestError) {
        logger.error(error.message)
        return formatResponse(error.statusCode, error.message, error.errors)
    }

    if (error instanceof Error) {
        return formatResponse(500, error.message)
    }

    return formatResponse(500, "An unexpected error occurred")
}

