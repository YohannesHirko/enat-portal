export class HTTPError extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.name = "HTTPError";
        this.statusCode = statusCode;
        this.data = data;
    }
}
const ERROR_MESSAGES = {
    AUTH001: "Account not found. Please check your email or register.",
    AUTH002: "Incorrect password. Please try again.",
    AUTH003: "Your account is locked. Please contact support.",
    AUTH004: "Invalid token. Please log in again.",
    AUTH005: "Session expired. Please log in again.",
    AUTH006: "Unauthorized access. Please log in to continue.",
    AUTH007:
        "An account with this email already exists. Please log in or use a different email.",
    AUTH008: "Your password is too weak. Please use a stronger password.",
};

export const getErrorMessage = (errorCode) => {
    if (ERROR_MESSAGES[errorCode]) {
        return ERROR_MESSAGES[errorCode];
    }
    return "Unidentified error code";
};
