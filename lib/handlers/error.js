// https://github.com/riyons/nextjs-centralized-error-handler/blob/main/src/errorHandler.js
import { NextResponse } from "next/server"
import { RequestError, ValidationError } from "../http-error";
//import logger from "../logger";

// const formatResponse = (responseType, status, message, errors) => {
//     const responseContent = {
//         success: false,
//         error: {
//             message,
//             details: errors,
//         },
//     }

//     return responseType === "api"
//         ? NextResponse.json(responseContent, null, 2)
//         : { status, ...responseContent };
// }

// const handleErrorX = (error, responseType = "server") => {
//     if (error instanceof RequestError) {
//         logger.error(
//             { err: error },
//             `${responseType.toUpperCase()} Error: ${error.message}`
//         );

//         return formatResponse(
//             responseType,
//             error.statusCode,
//             error.message,
//             error.errors
//         );
//     }

//     if (error instanceof ZodError) {
//         const validationError = new ValidationError(
//             error.flatten().fieldErrors
//         );

//         // logger.error(
//         //     { err: error },
//         //     `Validation Error: ${validationError.message}`
//         // );

//         return formatResponse(
//             responseType,
//             validationError.statusCode,
//             validationError.message,
//             validationError.errors
//         );
//     }

//     if (error instanceof Error) {
//         logger.error(error.message);
//         return formatResponse(responseType, 500, error.message);
//     }

//     logger.error({ err: error }, "An unexpected error occurred");
//     return formatResponse(responseType, 500, "An unexpected error occurred");
// };

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
    console.log('error =>', error)

    if (error instanceof RequestError) {
        return formatResponse(error.statusCode, error.message, error.errors)
    }

    if (error instanceof Error) {
        return formatResponse(500, error.message)
    }

    return formatResponse(500, "An unexpected error occurred")
}

