import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    //console.error(error.message);
    console.error("pfff");

    if (error.name === "ValidationError") {
        response.status(400).json({ error: "Validation error" });
    } else {
        response
            .status(500)
            .send({ errors: [{ message: "Something went srong" }] });
    }

    next(error);
};
