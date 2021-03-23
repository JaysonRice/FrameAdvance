import React from "react";
import UserPostList from "./UserPostList";
import "../css/ReviewPost.css";
import "../css/MyGames.css";
import { UserGameList } from "../games/UserGameList";
import { MyGameList } from "../games/MyGameList";
import { useParams } from "react-router";
import MySavedPostList from "../savedPosts/MySavedPostList";

const UserPage = () => {
  const { id } = useParams();
  const determineGameList = () => {
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    if (userProfileId == id) {
      return (
        <div className="myGamesContainer">
          <MyGameList />
          <MySavedPostList />
        </div>
      );
    } else
      return (
        <div className="myGamesContainer">
          <UserGameList />
        </div>
      );
  };

  return (
    <div className="homeContainer">
      <div className="reviewPostContainer">
        <UserPostList />
      </div>
      {determineGameList()}
    </div>
  );
};

export default UserPage;
