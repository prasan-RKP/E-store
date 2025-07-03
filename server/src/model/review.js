import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    productId: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    reviewBox: {
        type: String,
        required: true,
        minLength: 8
    }
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;