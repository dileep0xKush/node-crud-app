const userService = require('../services/userService');

exports.listUsers = async (req, res) => {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const { users, total, totalPages } = await userService.getUsers({ search, page, limit });

        res.render('index', {
            title: 'User List',
            users,
            search,
            currentPage: page,
            totalPages
        });
    } catch (err) {
        console.error('Error listing users:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.showCreateForm = (req, res) => {
    res.render('create', { title: 'Create User' });
};

exports.createUser = async (req, res) => {
    try {
        const { name, email,password } = req.body;
        await userService.addUser(name, email, password);
        res.redirect('/users/');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.showEditForm = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit', { title: 'Edit User', user });
    } catch (err) {
        console.error('Error loading edit form:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const id = req.params.id;
        const updatedUser = await userService.updateUser(id, name, email);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.redirect('/users/');
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
};
