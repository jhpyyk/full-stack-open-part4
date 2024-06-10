import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    switch (error.name) {
        case "ValidationError":
            response.status(400).json({ error: "Validation error" });
            break;
        default:
            response
                .status(500)
                .send({ errors: [{ message: "Something went srong" }] });
    }

    next(error);
};
