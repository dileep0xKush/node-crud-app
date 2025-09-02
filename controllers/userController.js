const User = require('../models/userModel');

exports.listUsers = (req, res) => {
    const users = User.getAllUsers();
    res.render('index', { title: 'User List', users });
};

exports.showCreateForm = (req, res) => {
    res.render('create', { title: 'Create User' });
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    User.addUser(name, email);
    res.redirect('/');
};

exports.showEditForm = (req, res) => {
    const user = User.getUserById(parseInt(req.params.id));
    res.render('edit', { title: 'Edit User', user });
};

exports.updateUser = (req, res) => {
    const { name, email } = req.body;
    const id = parseInt(req.params.id);
    User.updateUser(id, name, email);
    res.redirect('/');
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    User.deleteUser(id);
    res.redirect('/');
};
