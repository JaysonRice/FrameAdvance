import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../providers/GameProvider"
import { MyGame } from "./MyGame";
import { AddGameForm } from "./AddGameForm";
import { Modal, Button, ModalHeader, ModalBody } from "reactstrap";

export const MyGameList = () => {

    const { userGames, getAllUserGames, getAllSkillLevels, getAllGames, } = useContext(GameContext)
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    useEffect(() => {
        getAllGames();
    }, []);

    useEffect(() => {
        getAllUserGames(userProfileId);
    }, []);

    useEffect(() => {
        getAllSkillLevels();
    }, []);

    if (!userGames) {
        return null
    }

    return (
        <section>
            <div className="myGamesHeader">
                <h4>My Games</h4>
                <Button color="primary" outline onClick={toggle}>+</Button>
            </div>
            <div className="gamesContainer">
                {userGames.map(g =>
                    <MyGame key={g.id} myGame={g} />)}
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add Game
    </ModalHeader>
                <ModalBody>
                    <AddGameForm toggler={toggle} />
                </ModalBody>
            </Modal>

        </section>
    );
}