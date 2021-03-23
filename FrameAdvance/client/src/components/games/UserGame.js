import React from "react";
import { Card, CardBody } from "reactstrap";

export const UserGame = ({ userGame }) => {
  return (
    <Card className="userGameCard">
      <CardBody>
        <div className="gameCardBody">
          <h6>{userGame.game.title}</h6>
          <div className={userGame.skillLevel.name}>
            <p>{userGame.skillLevel.name}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
