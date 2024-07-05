// Import necessary modules from Mongoose and Moment
const { Schema, model } = require('mongoose');
const moment = require('moment');

// Define the UserSchema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/] // Validate email format using regex
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought' // Reference to the Thought model
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User' // Reference to other User documents (self-referencing)
        }
    ]
},
    {
        // Define JSON serialization options
        toJSON: {
            virtuals: true // Include virtual properties when converting to JSON
        },
        id: false // Disable the default 'id' virtual getter
    }
);

// Define a virtual property 'friendCount' to dynamically calculate the number of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length; // Returns the length of the friends array
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
