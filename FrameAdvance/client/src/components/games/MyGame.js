import React, { useState, useContext, useRef } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { GameContext } from "../../providers/GameProvider";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";

export const MyGame = ({ myGame }) => {
  const { removeGameFromUser, skillLevels, updateUserGame } = useContext(
    GameContext
  );
  const { getAllPostList } = useContext(ReviewPostContext);
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const skillLevel = useRef();

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const skillUpdate = () => {
    updateUserGame({
      id: myGame.id,
      userProfileId: +userProfileId,
      skillLevelId: +skillLevel.current.value,
      gameId: +myGame.game.id,
    })
      .then(getAllPostList)
      .then(toggleEdit);
  };

  return (
    <Card className="gameCard">
      <CardBody onClick={toggleEdit}>
        <div className="gameCardBody">
          <h6>{myGame.game.title}</h6>
          <div className={myGame.skillLevel.name}>
            <p>{myGame.skillLevel.name}</p>
          </div>
        </div>

        <Modal isOpen={editModal} toggle={toggleEdit}>
          <ModalHeader toggle={toggleEdit}>Edit {myGame.title}</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <Label>Skill Level: </Label>
              <select
                id="userGameId"
                ref={skillLevel}
                defaultValue={myGame.skillLevel.id}
              >
                {skillLevels.map((s) => {
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                })}
              </select>

              <div className="categoryModalBody">
                <button
                  type="submit"
                  onClick={(evt) => {
                    evt.preventDefault(); // Prevent browser from submitting the form
                    removeGameFromUser(myGame.id)
                      .then(getAllPostList)
                      .then(toggleEdit);
                  }}
                  className="btn btn-danger"
                >
                  Delete Game
                </button>
                <button
                  type="submit"
                  onClick={(evt) => {
                    evt.preventDefault(); // Prevent browser from submitting the form
                    skillUpdate();
                  }}
                  className="btn btn-info"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
};
