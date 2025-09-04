const dashboardService = require('../services/dashboardService');

const getDashboard = async (req, res) => {
    try {
        const data = await dashboardService.getDashboardData();

        res.render('dashboard/index', {
            title: 'Dashboard',
            authUser: res.locals.authUser,
            ...data
        });
    } catch (error) {
        console.error('Dashboard controller error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getDashboard
};
