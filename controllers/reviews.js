const Review = require('../models/review');
const Listing = require('../models/listing');


module.exports.createReview = async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    newReview.author = req.user._id; // Associate the review with the logged-in user

    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully created a review");

    res.redirect(`/listings/${listing._id}`); // Redirect to the listing's show page after adding the review
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;


    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted a review");



    res.redirect(`/listings/${id}`);
}