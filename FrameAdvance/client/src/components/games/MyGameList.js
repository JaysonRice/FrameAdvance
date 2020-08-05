import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../providers/GameProvider"
import { MyGame } from "./MyGame";
import { AddGameForm } from "./AddGameForm";
import { Modal, Button, ModalHeader, ModalBody } from "reactstrap";
import { ReviewPostContext } from "../../providers/ReviewPostProvider";

export const MyGameList = () => {

    const { userGames, getAllUserGames, getAllSkillLevels, } = useContext(GameContext)
    const { reviewPosts } = useContext(ReviewPostContext);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    useEffect(() => {
        getAllUserGames(userProfileId);
    }, [reviewPosts]);

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