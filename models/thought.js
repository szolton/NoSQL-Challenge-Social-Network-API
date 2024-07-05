const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Reaction Schema for individual reaction details
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId() // Default value for reactionId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280 // Max length for reaction body
    },
    username: {
        type: String,
        required: true // Username of the reaction creator
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default timestamp for reaction creation
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') // Custom getter for formatted date
    }
},
    {
        // JSON serialization options for ReactionSchema
        toJSON: {
            virtuals: true, // Include virtual properties when converting to JSON
            getters: true // Apply getters to JSON output
        },
        id: false // Disable the default 'id' virtual getter
    }
);

// Thought Schema for main thought details
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280 // Limits for thought text length
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default timestamp for thought creation
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') // Custom getter for formatted date
    },
    username: {
        type: String,
        required: true // Username of the thought creator
    },
    reactions: [ReactionSchema] // Array of ReactionSchema objects for associated reactions
},

    {
        // JSON serialization options for ThoughtSchema
        toJSON: {
            virtuals: true, // Include virtual properties when converting to JSON
            getters: true // Apply getters to JSON output
        },
        id: false // Disable the default 'id' virtual getter
    }
);

// Virtual getter to compute the number of reactions associated with a thought
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Export the Thought model to be used in other parts of the application
module.exports = Thought;
