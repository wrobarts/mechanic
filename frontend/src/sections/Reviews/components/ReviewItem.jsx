import './ReviewItem.css';

const ReviewItem = props => {
    return (
        <div className="review-container">
            <div className="review-front">
                <p className="review-text">{props.review.review}</p>
                <p className="review-author">- {props.review.author}</p>
            </div>
        </div>
    );
};

export default ReviewItem;