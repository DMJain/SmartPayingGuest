const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        required: true,
    },
});

// Index for property and user fields
reviewSchema.index({ property: 1, user: 1 }); //--> // user can add multiple reviews per property without adding {unique:true}
//If you want each user to post only one review per property,add {unique:true}

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
