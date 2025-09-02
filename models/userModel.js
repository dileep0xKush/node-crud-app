let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];

const getAllUsers = () => users;

const getUserById = id => users.find(u => u.id === id);

const addUser = (name, email) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({ id, name, email });
};

const updateUser = (id, name, email) => {
    users = users.map(user =>
        user.id === id ? { id, name, email } : user
    );
};

const deleteUser = id => {
    users = users.filter(user => user.id !== id);
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
