const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    property: {
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

const Review = model('review', reviewSchema);
module.exports = Review;
