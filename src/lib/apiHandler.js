import { NextResponse } from "next/server";

/**
 * Higher-order function that wraps API route handlers with error handling
 * @param {Function} handler - The async handler function to wrap
 * @returns {Function} - Wrapped handler with error handling
 */
export function withErrorHandler(handler) {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error) {
            console.error("API Error:", error);

            // Handle Prisma errors
            if (error.code === "P2025") {
                return NextResponse.json(
                    { message: "Record not found" },
                    { status: 404 }
                );
            }

            if (error.code === "P2002") {
                return NextResponse.json(
                    { message: "A record with this value already exists" },
                    { status: 409 }
                );
            }

            // Handle JWT errors
            if (error.name === "JsonWebTokenError") {
                return NextResponse.json(
                    { message: "Invalid token" },
                    { status: 401 }
                );
            }

            if (error.name === "TokenExpiredError") {
                return NextResponse.json(
                    { message: "Token expired" },
                    { status: 401 }
                );
            }

            // Generic error response
            return NextResponse.json(
                { message: error.message || "Internal server error" },
                { status: 500 }
            );
        }
    };
}

/**
 * Validate required fields in request body
 * @param {Object} body - Request body
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object|null} - Error response or null if valid
 */
export function validateRequired(body, requiredFields) {
    const missing = requiredFields.filter(field => !body[field]);

    if (missing.length > 0) {
        return {
            error: true,
            message: `Missing required fields: ${missing.join(", ")}`,
            status: 400,
        };
    }

    return null;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length (default: 6)
 * @returns {Object|null} - Error object or null if valid
 */
export function validatePassword(password, minLength = 6) {
    if (!password || password.length < minLength) {
        return {
            error: true,
            message: `Password must be at least ${minLength} characters`,
            status: 400,
        };
    }
    return null;
}

// Valid roles for validation
export const VALID_ROLES = ["ADMIN", "USER", "MANAGER"];

/**
 * Validate role value
 * @param {string} role - Role to validate
 * @returns {boolean} - True if valid
 */
export function isValidRole(role) {
    return VALID_ROLES.includes(role);
}
