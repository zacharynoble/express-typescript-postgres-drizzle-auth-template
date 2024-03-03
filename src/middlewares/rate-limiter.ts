import rateLimit from 'express-rate-limit';

const config = {
    message: "Sorry, you've sent too many requests. Please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false },
};

/* 100 requests per 5 seconds */
export const rateLimiter = rateLimit({
    windowMs: 5 * 1000,
    max: 100,
    ...config,
});

/* 3 requests per 10 seconds */
export const rateLimiterStrict = rateLimit({
    windowMs: 10 * 1000,
    max: 3,
    ...config,
});
