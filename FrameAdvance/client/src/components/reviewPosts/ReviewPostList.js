import React, { useContext, useEffect } from "react"
import { ReviewPostContext } from "../../providers/ReviewPostProvider"
import ReviewPost from "./ReviewPost"

const ReviewPostList = () => {

    const { reviewPosts, getAllPostList } = useContext(ReviewPostContext);

    useEffect(() => {
        getAllPostList()
    }, []);

    if (!reviewPosts) {
        return null;
    }

    return (
        <>
            <h3>My Reviews</h3>
            {
                reviewPosts.map(post => {
                    return <ReviewPost key={post.id} reviewPost={post} />
                })
            }
        </>
    )
}

export default ReviewPostList;