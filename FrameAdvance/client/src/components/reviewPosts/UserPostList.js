import React, { useContext, useEffect, useState } from "react"
import { ReviewPostContext } from "../../providers/ReviewPostProvider"
import ReviewPost from "./ReviewPost"
import { useParams } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"

const UserPostList = () => {

    const { reviewPosts, getUserReviewPosts } = useContext(ReviewPostContext);
    const { id } = useParams();
    const { getUserProfileById } = useContext(UserProfileContext)
    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        getUserReviewPosts(id)
    }, []);

    useEffect(() => {
        getUserProfileById(id).then(setUserProfile);
    }, []);

    if (!reviewPosts) {
        return null;
    }

    if (!userProfile) {
        return null;
    }

    return (
        <>
            <h3>{userProfile.username}'s Reviews</h3>
            {
                reviewPosts.map(post => {
                    return <ReviewPost key={post.id} reviewPost={post} />
                })
            }
        </>
    )
}

export default UserPostList;