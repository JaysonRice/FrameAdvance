import React, { useContext, useEffect } from "react"
import { ReviewPostContext } from "../../providers/ReviewPostProvider"
import ReviewPost from "./ReviewPost"
import { useParams } from "react-router-dom"

const UserPostList = () => {

    const { reviewPosts, getUserReviewPosts } = useContext(ReviewPostContext);
    const { id } = useParams();

    useEffect(() => {
        getUserReviewPosts(id)
    }, []);

    if (!reviewPosts) {
        return null;
    }

    return (
        <>
            {
                reviewPosts.map(post => {
                    return <ReviewPost key={post.id} reviewPost={post} />
                })
            }
        </>
    )
}

export default UserPostList;