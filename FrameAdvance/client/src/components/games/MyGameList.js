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
            <div className="myGamesHeader">
                <h4>My Games</h4>
                <Button color="primary" outline onClick={toggle}>+</Button>
            </div>
            <div className="gamesContainer">
                {games.map(g =>
                    <MyGame key={g.id} game={g} />)}
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