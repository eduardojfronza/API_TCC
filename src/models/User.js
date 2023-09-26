const mongoose = require('mongoose');

// Modula para a criação do database
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    confirmpassword: String
})

module.exports = User