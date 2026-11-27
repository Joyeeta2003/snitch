import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorList = errors.array();
        return res.status(400).json({
            message: errorList[0]?.msg || "Validation error",
            errors: errorList
        });
    }
    next();
}

export const validateRegisterUser = [
    body("email")
      .isEmail().withMessage("Invalid Email format")
      .normalizeEmail(),
    body("contact")
      .notEmpty().withMessage("Contact is required")
      .customSanitizer(val => (typeof val === "string" ? val.replace(/\s+/g, "") : val))
      .matches(/^(\+\d{1,3})?\d{10}$/).withMessage("Contact must be a valid 10-digit number (e.g. 9876543210 or +919876543210)"),
    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("fullname")
      .notEmpty().withMessage("Full name is required")
      .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("isSeller")
      .optional()
      .isBoolean().withMessage("isSeller must be a boolean value"),

    validateRequest
];
