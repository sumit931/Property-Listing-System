const queries = require("./auth.queries");
const jwt = require("jsonwebtoken")
const {jwtSecret,jwtExpiry} = require("../../config");

exports.register = async (req, res, next) => {
    const createQuery = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        role: "user"
    };

    if (req.body.password !== req.body.confirmPassword) {
        console.log('Password mismatch');
        return res.status(400).json({ message: "Password and confirm password do not match" });
    }
    try {
        const result = await queries.createUser(createQuery);
        const payload = {
            id: result._id,
            email: result.email,
            role: result.role
        }
        const token = jwt.sign(payload,jwtSecret,{expiresIn:jwtExpiry})
        console.log('User created successfully:', result);
        return res.status(201).json({ message: "User created successfully", result, token });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        next(error);
    }
}

exports.login = async (req, res, next) => {
    console.log('Login request received:', req.body);
    try {
        const loginQuery = {
            email: req.body.email
        };

        console.log('Finding user with query:', loginQuery);
        const user = await queries.findUser(loginQuery);
        
        if (!user || user.length === 0) {
            console.log('User not found');
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log('User found, comparing password...');
        const isPasswordValid = await user[0].comparePassword(req.body.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const payload = {
            id: user[0]._id,
            email: user[0].email,
            role: user[0].role
        }
        const token = jwt.sign(payload,jwtSecret,{expiresIn:jwtExpiry})
        // const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
        console.log('Login successful');
        return res.status(200).json({ message: "User logged in successfully", user: user[0], token });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
}