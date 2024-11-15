import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Signup route  - POST /api/auth/signup
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
if (!username ||!email ||!password || username === "" || email === "" || password === "")
     {
return next(errorHandler(400, 'Please provide all the required fields in next errorHandler'));
}
else {
    
// Hashing the password before saving it to the database
const hashPassword = await bcryptjs.hashSync(password, 10);

const newUser = new User({ 
    username, 
    email, 
    password: hashPassword  
});

try {
    await newUser.save();
res.status(201).json({ message: 'User registered successfully' });

} catch (error) { 

    next(error);
 }   
} 
};

export const signin = async (req, res, next) => {

const {email, password } = req.body;

if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, 'Please provide all fields'));
}

try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
       return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
       return next(errorHandler(401, 'Invalid password'));
    }

const token = jwt.sign (
    { id: validUser._id },
    process.env.JWT_SECRET,
   // { expiresIn: '1h' }
)

const {password: pass, ...rest } = validUser._doc;

res
.status(200)
.cookie('access_token', token, {
    httpOnly: true,
})
.json(rest);

} 
catch(error) {
next(error);
}


} 