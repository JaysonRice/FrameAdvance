import React from 'react';
import ReviewPostList from './ReviewPostList';
import "../css/ReviewPost.css"
import { MyGameList } from '../games/MyGameList';

function HomePage() {
    return (
        <div className="homeContainer">
            <div className="reviewPostContainer">
                <ReviewPostList />
            </div>
            <div className="myGamesContainer">
                <MyGameList />
            </div>
        </div>
    );
}

export default HomePage;