import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing or Invalid Token!" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const userFromDB = await User.findOne({ email });
        if (!userFromDB) {
            return res.status(404).json({ message: "User does not exist!" });
        }
        
        delete userFromDB.password;
        req.user = userFromDB;
        next();

    } catch (err) {
        console.error("Authentication Error:", err);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

export default authenticate;
