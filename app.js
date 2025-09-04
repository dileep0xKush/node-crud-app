const express = require('express');
const { isAuthenticated } = require('./middleware/auth');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');

const session = require('express-session');
const attachUser = require('./utils/authUser');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(expressLayouts);

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

app.use(attachUser);

app.set('view engine', 'ejs');
app.set('layout', 'layout');


app.use('/', authRoutes);
app.use('/dashboard', isAuthenticated, dashboardRoutes);
app.use('/users', isAuthenticated, userRoutes);
app.use('/products', isAuthenticated, productRoutes);

app.use((req, res) => {
    res.status(404).render('error/404', {
        title: 'Page Not Found',
        layout: false
    });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();
