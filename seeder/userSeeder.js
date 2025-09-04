// seeder/userSeeder.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDB = require('../config/db');
const User = require('../models/userModel');

async function seedUsers() {
    try {
        await connectDB();
        const users = Array.from({ length: 1000 }, () => ({
            name: faker.person.fullName(),
            email: faker.internet.email(),
        }));

        await User.insertMany(users);
        console.log('1000 dummy users inserted successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
}

seedUsers();
