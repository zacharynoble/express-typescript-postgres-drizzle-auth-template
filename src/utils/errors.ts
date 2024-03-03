export class CustomError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, 409);
    }
}
