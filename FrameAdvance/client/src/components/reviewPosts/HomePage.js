import React from 'react';
import ReviewPostList from './ReviewPostList';
import "../css/ReviewPost.css"

function HomePage() {
    return (
        <div className="homeContainer">
            <div className="reviewPostContainer">
                <ReviewPostList />
            </div>
            <div className="myGamesContainer">
                {/* <MyGames /> */}
            </div>
        </div>
    );
}

export default HomePage;