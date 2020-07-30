import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { GameContext } from "../../providers/GameProvider";

export const MyGame = ({ game }) => {

    const { removeGameFromUser, skillLevels, getAllSkillLevels, updateUserGame, } = useContext(GameContext)
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const skillLevel = useRef()
    const [formState, setformState] = useState();

    useEffect(() => {
        getAllSkillLevels();
    }, []);

    // const [modal, setModal] = useState(false)
    // const toggle = () => setModal(!modal)

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
        }).then(toggleEdit)
    }

    // const catDelete = () => {
    //     updateCategory({
    //         id: category.id,
    //         name: category.name,
    //         active: !category.active
    //     }).then(toggle)
    // }

    if (!!game.userGames.find(ug => ug.userProfileId === userProfileId)) {
        return (
            <Card className="gameCard">
                <CardBody>
                    <div className="gameCardBody">
                        <h6>{game.title}</h6>
                        <div className={game.userGames.find(ug => ug.userProfileId === userProfileId).skillLevel.name}>
                            <p >{game.userGames.find(ug => ug.userProfileId === userProfileId).skillLevel.name}</p>
                        </div>
                    </div>
                    <Button color="primary" onClick={toggleEdit}>Edit</Button>

                    <Modal isOpen={editModal} toggle={toggleEdit}>
                        <ModalHeader toggle={toggleEdit}>
                            Edit {game.title}
                        </ModalHeader>
                        <ModalBody >
                            <div className="form-group">
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
                                                toggleEdit()
                                            }
                                        }
                                        className="btn btn-secondary">
                                        Cancel
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


