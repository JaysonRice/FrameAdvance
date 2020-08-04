import React, { useState, useContext, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { CharacterContext } from "../../providers/CharacterProvider";


export const Character = ({ character, reviewPost }) => {

    const { postCharacters, addCharacterToPost, deleteCharacterFromPost } = useContext(CharacterContext)

    const addCharacter = (e) => {
        e.preventDefault();
        const chosenCharacter =
        {
            characterId: character.id,
            reviewPostId: reviewPost.id,
        }
        addCharacterToPost(chosenCharacter)
    };

    const removeCharacter = () => {
        debugger
        const characterToRemove = postCharacters.find(char => char.characterId === character.id)
        deleteCharacterFromPost(characterToRemove)
    };


    return (
        <Card className="CharacterCard">
            <CardBody>
                <div className="CharacterCardBody">
                    <h4>{character.name}</h4>
                    <div className="CharacterButtonContainer">
                        {/* <Button color="primary" >Add</Button> */}
                        {!reviewPost.reviewPostCharacters.find(char => char.characterId === character.id)

                            ? <Button color="primary" onClick={addCharacter} >Add</Button>
                            : <Button color="danger" onClick={removeCharacter} >X</Button>
                        }
                    </div>
                </div>
            </CardBody>
        </Card>

    )

}
