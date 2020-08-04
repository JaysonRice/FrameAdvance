import React from 'react';
import ReviewPostList from './ReviewPostList';
import "../css/ReviewPost.css"
import "../css/MyGames.css"
import { MyGameList } from '../games/MyGameList';
import MySavedPostList from '../savedPosts/MySavedPostList';

function HomePage() {
    return (
        <div className="homeContainer">
            <div className="reviewPostContainer">
                <ReviewPostList />
            </div>
            <div className="myGamesContainer">
                <MyGameList />
                <MySavedPostList />
            </div>
        </div>
    );
}

export default HomePage;