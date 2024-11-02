import mongoose from 'mongoose';

// Define a schema for the nested objects
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String
});

const preferencesSchema = new mongoose.Schema({
  newsletter: Boolean,
  notifications: Boolean
});

// Define the main schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: addressSchema, // Nested address object
  preferences: preferencesSchema // Nested preferences object
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;



import mongoose from 'mongoose';
import User from './models/User.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect', err));

// Create and save a new user with nested objects
const newUser = new User({
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  },
  preferences: {
    newsletter: true,
    notifications: false
  }
});

// Save the document to the database
newUser.save()
  .then(user => console.log('User saved:', user))
  .catch(err => console.log('Error saving user:', err));
