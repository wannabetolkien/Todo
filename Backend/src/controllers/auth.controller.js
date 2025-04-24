import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";


import userValidatorZod from "../validators/userValidators.js";
import loginValidatorZod from "../validators/loginValidator.js";
import userModel from "../models/UserModel.js";




dotenv.config();
 export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const zodCheckForSignup = userValidatorZod.safeParse({ name, email, password });

        if (!zodCheckForSignup.success) {
            console.log("Input Invalid !");
            return res.status(400).json({ message: "Invalid Input !", error: zodCheckForSignup.error.errors });
        }

        const user = await userModel .findOne({ email });

        if (user) return res.json({ message: "User already exists !" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: "User Created !" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error !" });
    }
}

 export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const zodCheckForLogin = loginValidatorZod.safeParse({ email, password });

        if (!zodCheckForLogin.success) {
            console.log("Input Invalid !");
            return res.status(400).json({ message: "Invalid Input !", error: zodCheckForLogin.error.errors });
        }

        const userDetailFromDB = await userModel.findOne({ email });

        if (!userDetailFromDB) {
            console.log("User doesn't exist !");
            return res.status(400).json({ message: "User doesn't exist !" });
        }

        const isMatch = await bcrypt.compare(password, userDetailFromDB.password);

        if (!isMatch) return res.status(404).json({ message: "Invalid User Name or Password !" });

        const token = jwt.sign({ email, id: userDetailFromDB._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login Successful", token });
        
    } catch (err) {
        console.error("Internal Server Error", err);
        return res.status(500).json({ message: "Internal Server Error !" });
    }
}


