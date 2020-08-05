import React, { useContext, useEffect, useState } from "react"
import { ReviewPostContext } from "../../providers/ReviewPostProvider"
import ReviewPost from "./ReviewPost"
import { FilterReviewPosts } from './FilterReviewPostList';

const ReviewPostList = () => {

    const { reviewPosts, getAllPostList } = useContext(ReviewPostContext);
    const [filteredGameId, setFilteredGameId] = useState("0");
    const [filteredCharacterId, setFilteredCharacterId] = useState("0");

    useEffect(() => {
        getAllPostList()
    }, []);

    let postsToDisplay = []

    if (filteredGameId === "0") {
        postsToDisplay = reviewPosts

    } else if (filteredGameId !== "0") {

        postsToDisplay = reviewPosts.filter(post => post.gameId === parseInt(filteredGameId))
    }

    if (filteredCharacterId !== "0") {
        postsToDisplay = reviewPosts.filter(post => post.reviewPostCharacters.some(char =>
            char.characterId === parseInt(filteredCharacterId)))
    }

    if (!reviewPosts) {
        return null;
    }

    return (
        <>
            <h3>All Reviews</h3>

            <FilterReviewPosts filteredGameId={filteredGameId} setFilteredGameId={setFilteredGameId}
                setFilteredCharacterId={setFilteredCharacterId} />
            {
                postsToDisplay.map(post => {
                    return <ReviewPost key={post.id} reviewPost={post} />
                })
            }
        </>
    )
}

export default ReviewPostList;