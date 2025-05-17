import crypto from "crypto";

export const getSalt = () => {
    return crypto
        .randomBytes(50)
        .toString("base64url")
        .substring(0, parseInt(process.env.SALT_SIZE || "16"));
};

export const hashPassword = (text, salt) => {
    const hashing = crypto.createHash("sha512");
    return hashing.update(salt + text).digest("base64url");
};

export const verifyPassword = (text, salt, hash) => {
    return hash === hashPassword(text, salt);
};
