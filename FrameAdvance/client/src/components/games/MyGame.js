import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { GameContext } from "../../providers/GameProvider";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";

export const MyGame = ({ game }) => {

    const { removeGameFromUser, skillLevels, updateUserGame, } = useContext(GameContext)
    const { getAllReviewPosts } = useContext(ReviewPostContext);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const skillLevel = useRef()

    const [formState, setformState] = useState();
    const handleUserInput = (e) => {
        const updatedState = { ...formState };
        updatedState[e.target.id] = e.target.value;
        setformState(updatedState);
    };

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const skillUpdate = () => {
        updateUserGame({
            id: +game.userGames.find(ug => ug.userProfileId === userProfileId).id,
            userProfileId: +userProfileId,
            skillLevelId: +skillLevel.current.value,
            gameId: +game.id
        }).then(getAllReviewPosts()).then(toggleEdit)
    }

    if (!!game.userGames.find(ug => ug.userProfileId === userProfileId)) {
        return (
            <Card className="gameCard">
                <CardBody onClick={toggleEdit}>
                    <div className="gameCardBody">
                        <h6>{game.title}</h6>
                        <div className={game.userGames.find(ug => ug.userProfileId === userProfileId).skillLevel.name}>
                            <p >{game.userGames.find(ug => ug.userProfileId === userProfileId).skillLevel.name}</p>
                        </div>
                    </div>

                    <Modal isOpen={editModal} toggle={toggleEdit}>
                        <ModalHeader toggle={toggleEdit}>
                            Edit {game.title}
                        </ModalHeader>
                        <ModalBody >
                            <div className="form-group">
                                <Label>Skill Level: </Label>
                                <select
                                    id="userGameId"
                                    ref={skillLevel}
                                    defaultValue="1"
                                    onChange={handleUserInput}
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
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault() // Prevent browser from submitting the form
                                                removeGameFromUser(+game.userGames.find(ug => ug.userProfileId === userProfileId).id).then(toggleEdit)
                                            }
                                        }
                                        className="btn btn-danger">
                                        Delete Game
            </button>
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault() // Prevent browser from submitting the form
                                                skillUpdate()
                                            }
                                        }
                                        className="btn btn-primary">
                                        Save Changes
            </button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card >

        )

    } else {
        return null
    }

}


