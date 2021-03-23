import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../providers/GameProvider";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserGame } from "./UserGame";

export const UserGameList = () => {
  const { userGames, getAllUserGames } = useContext(GameContext);
  const { getUserProfileById } = useContext(UserProfileContext);
  const [userProfile, setUserProfile] = useState();
  const { id } = useParams();

  useEffect(() => {
    getAllUserGames(id);
  }, []);

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
  }, []);

  if (!userGames) {
    return null;
  }

  if (!userProfile) {
    return null;
  }

  return (
    <section>
      <div className="myGamesHeader">
        <h4>{userProfile.username}'s Games</h4>
      </div>
      <div className="gamesContainer">
        {userGames.map((g) => (
          <UserGame key={g.id} userGame={g} />
        ))}
      </div>
    </section>
  );
};
