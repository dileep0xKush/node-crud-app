const User = require('../models/userModel');

const getDashboardData = async () => {
    try {
        const totalUsers = await User.countDocuments();

        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const newRegistrations = await User.countDocuments({
            createdAt: { $gte: oneDayAgo }
        });

        // Static for now, replace with real session tracking logic later
        const activeSessions = 34;

        return {
            totalUsers,
            newRegistrations,
            activeSessions
        };
    } catch (err) {
        throw new Error('Error fetching dashboard data: ' + err.message);
    }
};

module.exports = {
    getDashboardData
};
