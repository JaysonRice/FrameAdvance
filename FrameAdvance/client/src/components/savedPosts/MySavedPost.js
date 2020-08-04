import React from 'react';
import { CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

function MySavedPost({ savedReview }) {

    return (
        <Link to={`/reviewpost/${savedReview.reviewPost.id}`} style={{ textDecoration: 'none' }}>
            <Card className="savedReviewCard">
                <CardBody>
                    <div className="savedReviewBody">
                        <h6>{savedReview.reviewPost.title}</h6>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}

export default MySavedPost;