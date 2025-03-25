require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to database'))
.catch(err => console.error('Error connecting to database:', err));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 1 }
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /api/users to interact.');
});


app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));