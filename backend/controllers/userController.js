import { catchAsyncError } from '../middlewares/catchAsyncErrors.js';
import errorHandler from '../middlewares/error.js';
import { User } from '../models/userModel.js';
import { sendToken } from '../utils/jwtToken.js';
import bcrypt from 'bcrypt'

// Register User
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        return next(new errorHandler('Please fill the complete registration form', 400));
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return next(new errorHandler('User already registered with this email', 400));
    }

    const user = await User.create({ name, email: email.toLowerCase(), phone, role, password });
    sendToken(user, 200, res, 'User Registered Successfully');
});

// Login User
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new errorHandler('Please provide email, password, and role', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');
    const ismat=await bcrypt.compare(user.password,password)
    console.log(ismat)
    if (!user) {
        return next(new errorHandler('Invalid Email or Password', 400));
    }


    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched)
    if (!isPasswordMatched) {
        return next(new errorHandler('Invalid Email or Password', 400));
    }

    if (user.role !== role) {
        return next(new errorHandler('User with this role not found', 400));
    }

    sendToken(user, 200, res, 'User Logged in Successfully!');
});

// Delete User
export const delUser = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return next(new errorHandler('You are not allowed to delete any user', 403));
    }

    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        return next(new errorHandler('User not found', 404));
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
});

// Validate User
export const valUser = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return next(new errorHandler('You are not allowed to validate any user', 403));
    }

    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isvalidated: true }, { new: true, runValidators: true });

    res.status(200).json({ success: true, message: 'User validated successfully' });
});

// Get Unverified Users
export const getUsers = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return next(new errorHandler('You are not allowed to view users', 403));
    }

    const users = await User.find({ isvalidated: false });
    res.status(200).json({ success: true, message: "Users fetched successfully", users });
});

// Get Verified Users
export const getVerUsers = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return next(new errorHandler('You are not allowed to view users', 403));
    }

    const users = await User.find({ isvalidated: true });
    res.status(200).json({ success: true, message: "Verified users fetched successfully", users });
});

// Get Logged-in User
export const getUser = catchAsyncError((req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

// Logout User
export const logout = catchAsyncError(async (req, res) => {
    res.status(200).cookie('token', '', { httpOnly: true, expires: new Date(Date.now()) }).json({
        success: true,
        message: 'User logged out successfully',
    });
});
