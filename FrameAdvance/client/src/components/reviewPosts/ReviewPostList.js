import React, { useContext, useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { ReviewPostContext } from "../../providers/ReviewPostProvider"
import ReviewPost from "./ReviewPost"

const ReviewPostList = () => {

    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const { reviewPosts, getAllReviewPosts } = useContext(ReviewPostContext);

    useEffect(() => {
        getAllReviewPosts()
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

export default ReviewPostList;