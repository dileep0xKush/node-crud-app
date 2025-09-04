// middleware/auth.js
exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }

    res.status(401).render('error/401', {
        title: 'Unauthorized',
        layout: false
    });
};
