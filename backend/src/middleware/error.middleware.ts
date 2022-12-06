import { HttpErrorException } from "exceptions/HttpErrorException";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (error: HttpErrorException, req: Request, res: Response, next: NextFunction) => {

    let status: number = 500;

    let data = {
        message: "Internal server error",
        ...(process.env.NODE_ENV === "development" && { originalError: error.message }),
    }

    if (error instanceof HttpErrorException) {
        status = error.status;
        data.message = error.message;
    }

    /* Catch Zod Errros */
    if (error instanceof ZodError) {
        status = 400;
        let message = '';

        for (const value of error.issues.values()) {
            message += value.message.replaceAll('"', '');
        }

        data.message = message;

        next();
    }

    /* Bad JSON format in the request */
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        status = 400;
        data.message = "Input validation failed";
        next();
    }

    return res.status(status).json(data);

}