interface Options {
    detail?: string;
    field?: string;
}

export class AppError extends Error {
    public status: number;
    public detail?: string;
    public field?: string;

    constructor(status: number, message: string, options?: Options) {
        super(message);
        this.status = status;
        this.detail = options?.detail;
        this.field = options?.field;

        Error.captureStackTrace(this, this.constructor);
    }
}

const createErrorClass = (status: number) => {
    return class extends AppError {
        constructor(message: string, options?: Options) {
            super(status, message, options);
        }
    };
};

export const BadRequestError = createErrorClass(400);
export const UnauthorizedError = createErrorClass(401);
export const ForbiddenError = createErrorClass(403);
export const NotFoundError = createErrorClass(404);
export const ConflictError = createErrorClass(409);
