import React from 'react';
import UserPostList from './UserPostList';
import "../css/ReviewPost.css"
import "../css/MyGames.css"
import { MyGameList } from '../games/MyGameList';

function UserPage() {
    return (
        <div className="homeContainer">
            <div className="reviewPostContainer">
                <UserPostList />
            </div>
            <div className="myGamesContainer">
                <MyGameList />
            </div>
        </div>
    );
}

export default UserPage;