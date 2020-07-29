import React, { useState, useContext, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { GameContext } from "../../providers/GameProvider";

export const MyGame = ({ game }) => {

    const { AddGame, UpdateGame } = useContext(GameContext)
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    // const [modal, setModal] = useState(false)
    // const toggle = () => setModal(!modal)

    // const [editModal, setEditModal] = useState(false)
    // const toggleEdit = () => setEditModal(!editModal)

    // const catUpdate = () => {
    //     updateCategory({
    //         id: category.id,
    //         name: name.current.value,
    //         active: true
    //     }).then(toggleEdit)
    // }

    // const catDelete = () => {
    //     updateCategory({
    //         id: category.id,
    //         name: category.name,
    //         active: !category.active
    //     }).then(toggle)
    // }

    if (!!game.userGames.find(ug => ug.userProfileId === userProfileId)) {
        return (
            <Card className="categoryCard">
                <CardBody>
                    <div className="categoryCardBody">
                        <h6>{game.title}</h6>
                        <div className="duh">
                            <p>{game.userGames.find(ug => ug.userProfileId === userProfileId).skillLevel.name}</p>
                        </div>
                    </div>
                </CardBody>
            </Card >

        )

    } else {
        return null
    }

}


