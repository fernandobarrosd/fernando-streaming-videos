export function getMessageFromCode(code: string) {
    const errors = {
        "auth/network-request-failed": "Internet error",
        "auth/invalid-credential": "Invalid email or password",
        "auth/missing-password": "Password is invalid",
        "auth/invalid-email": "E-mail is invalid"
    };
    type Message = keyof typeof errors;

    const message = errors[code as Message] || "Error";
    return message;
}