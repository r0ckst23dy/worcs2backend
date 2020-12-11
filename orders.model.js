const mongoose = require('mongoose');
const Schema = mongoose.Schema


let orders = new Schema ({
    title: { 
        type: String
    },
    requesDate: {
        type: String
    },
    assignedDate: {
        type: String
    },
    completionDate: {
        type: String
    },
    requestedBy: {
        type: String
    },
    assignedBy: {
        type: String
    },
    completedBy: {
        type: String
    },
    assignedTo: {
        type: String
    },
    priority: {
        type: String
    },
    assignmentSummary: {
        type: String
    },
    completionSummary: {
        type: String
    },
    summary: { 
        type: String
    },
    image: {
        type: String
    },
    assignedImage: {
        type: String 
    },
    completedImage: {
        type: String
    },
    current: {
        type: Boolean
    },
    assigned: { 
        type: Boolean
    },
    completed: {
        type: Boolean
    },
    reviewed: { 
        type: Boolean
    }
})

module.exports = mongoose.model('orders', orders);