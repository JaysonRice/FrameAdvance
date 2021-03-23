import React, { useContext, useEffect } from "react";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";
import MySavedPost from "./MySavedPost";

const MySavedPostList = () => {
  const { getSavedReviewsByUserId, savedReviewPosts } = useContext(
    ReviewPostContext
  );
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

  useEffect(() => {
    getSavedReviewsByUserId(userProfileId);
  }, []);

  if (!savedReviewPosts) {
    return null;
  }
  return (
    <>
      <h4>Bookmarked Reviews</h4>
      <div className="savedReviewCardContainer">
        {savedReviewPosts.map((savedReview) => {
          return <MySavedPost key={savedReview.id} savedReview={savedReview} />;
        })}
      </div>
    </>
  );
};

export default MySavedPostList;
