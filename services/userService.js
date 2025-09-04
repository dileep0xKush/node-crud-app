// services/userService.js
const User = require('../models/userModel');

/**
 * Fetch users with search and pagination
 */
const getUsers = async ({ search = '', page = 1, limit = 10 }) => {
    const query = {};

    if (search && search.trim() !== '') {
        query.$or = [
            { name: { $regex: search.trim(), $options: 'i' } },
            { email: { $regex: search.trim(), $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        User.countDocuments(query)
    ]);

    return {
        users,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
    };
};

/**
 * Get single user by ID
 */
const getUserById = async (id) => {
    return await User.findById(id).lean();
};

/**
 * Add new user
 */
const addUser = async (name, email, password) => {
    const user = new User({ name, email, password });
    return await user.save();
};

/**
 * Update user by ID
 */
const updateUser = async (id, name, email) => {
    return await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true, runValidators: true }
    );
};

/**
 * Delete user by ID
 */
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
