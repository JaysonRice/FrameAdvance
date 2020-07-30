import React, { useContext, useEffect, useState, useRef } from "react";
import { GameContext } from "../../providers/GameProvider"
import { MyGame } from "./MyGame";
import { AddGameForm } from "./AddGameForm";
import { Modal, Button, ModalHeader, ModalBody } from "reactstrap";

export const MyGameList = () => {

    const { gamesIPlay, getAllGamesIPlay, getAllSkillLevels } = useContext(GameContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)


    useEffect(() => {
        getAllGamesIPlay();
    }, []);

    useEffect(() => {
        getAllSkillLevels();
    }, []);

    if (!gamesIPlay) {
        return null
    }

    return (
        <section>
            <div className="myGamesHeader">
                <h4>My Games</h4>
                <Button color="primary" outline onClick={toggle}>+</Button>
            </div>
            <div className="gamesContainer">
                {gamesIPlay.map(g =>
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