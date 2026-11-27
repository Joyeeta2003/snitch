import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
    });

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    });
}

export const register = async (req, res) => {
    const { email, contact, fullname, password, isSeller } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email: email.toLowerCase().trim() },
                { contact: contact.trim() }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or contact already exists"
            });
        }

        const user = await userModel.create({
            email: email.toLowerCase().trim(),
            contact: contact.trim(),
            password,
            fullname: fullname.trim(),
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse(user, res, "User registered successfully");
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email/contact and password are required"
            });
        }

        const cleanIdentifier = email.trim();

        // Search by either email or contact number
        const user = await userModel.findOne({
            $or: [
                { email: cleanIdentifier.toLowerCase() },
                { contact: cleanIdentifier }
            ]
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email/contact or password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email/contact or password"
            });
        }

        await sendTokenResponse(user, res, "User logged in successfully");
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
