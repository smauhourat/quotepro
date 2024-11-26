import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-error";
//import logger from "../logger";

const formatResponse = () => {
    // Implementation of formatResponse function
};

const handleError = (error, responseType = "server") => {
    if (error instanceof RequestError) {
        // logger.error(
        //     { err: error },
        //     `${responseType.toUpperCase()} Error: ${error.message}`
        // );

        return formatResponse(
            responseType,
            error.statusCode,
            error.message,
            error.errors
        );
    }

    if (error instanceof Error) {
        //logger.error(error.message);

        return formatResponse(responseType, 500, error.message);
    }

    //logger.error({ err: error }, "An unexpected error occurred");
    return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;

