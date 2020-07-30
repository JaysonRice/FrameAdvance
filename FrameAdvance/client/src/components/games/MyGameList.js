import React, { useContext, useEffect, useState, useRef } from "react";
import { GameContext } from "../../providers/GameProvider"
import { MyGame } from "./MyGame";
import { AddGameForm } from "./AddGameForm";
import { Modal, Button, ModalHeader, ModalBody } from "reactstrap";

export const MyGameList = () => {

    const { games, getAllGames, getAllSkillLevels } = useContext(GameContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)


    useEffect(() => {
        getAllGames();
    }, []);

    useEffect(() => {
        getAllSkillLevels();
    }, []);

    if (!games) {
        return null
    }

    return (
        <section>
            <h2>My Games</h2>
            <div className="gamesContainer">
                {games.map(g =>
                    <MyGame key={g.id} game={g} />)}
            </div>

            <Button color="primary" onClick={toggle}>Add Game</Button>

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