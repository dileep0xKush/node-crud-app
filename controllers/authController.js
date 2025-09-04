const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.showLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        layout: false
    });
};


exports.showRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Register',
        layout: false
    });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('auth/login', {
                title: 'Login',
                layout: false,
                error: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('auth/login', {
                title: 'Login',
                layout: false,
                error: 'Invalid email or password'
            });
        }

        req.session.userId = user._id;

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('auth/login', {
            title: 'Login',
            layout: false,
            error: 'Something went wrong. Please try again.'
        });
    }
};


exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', {
                title: 'Register',
                layout: false,
                error: 'User with this email already exists.'
            });
        }

        const user = new User({ name, email, password });
        await user.save();

        req.session.userId = user._id;
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('auth/register', {
            title: 'Register',
            layout: false,
            error: 'Registration failed. Please try again.'
        });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Logout failed.');
        }

        res.redirect('/');
    });
};
