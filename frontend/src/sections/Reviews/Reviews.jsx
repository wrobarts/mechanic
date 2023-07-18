import ReviewItem from './components/ReviewItem';
import reviews from './util/reviews';
import './Reviews.css';

const Reviews = props => {
    return (
        <article ref={props.innerRef} className="reviews-section">
            <h3>Reviews</h3>
            <section className="reviews-container">
                {reviews.map((review, index) =>
                    <ReviewItem
                        key={index}
                        review={review}
                    />
                )}
            </section>
        </article>
    );
};

export default Reviews;