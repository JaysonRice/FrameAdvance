import React from 'react';
import UserPostList from './UserPostList';
import "../css/ReviewPost.css"
import "../css/MyGames.css"
import { UserGameList } from '../games/UserGameList';

function UserPage() {
    return (
        <div className="homeContainer">
            <div className="reviewPostContainer">
                <UserPostList />
            </div>
            <div className="myGamesContainer">
                <UserGameList />
            </div>
        </div>
    );
}

export default UserPage;