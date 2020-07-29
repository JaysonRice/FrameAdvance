import React, { useState, useContext, useRef, useEffect } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { GameContext } from "../../providers/GameProvider";


export const AddGameForm = ({ toggler }) => {
    const { games, skillLevels, getAllSkillLevels, getAllGames, addGameToUser, removeGameFromUser } = useContext(GameContext)
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const game = useRef()
    const skillLevel = useRef()

    useEffect(() => {
        getAllGames();
    }, []);

    useEffect(() => {
        getAllSkillLevels();
    }, []);

    const constructNewGame = () => {
        if (game.current.value !== "" && skillLevel.current.value !== "") {

            addGameToUser({
                userProfileId: +userProfileId,
                gameId: +game.current.value,
                skillLevelId: +skillLevel.current.value
            }).then(toggler)
        }
    }

    return (
        <form className="addMyGameForm">

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select
                        defaultValue=""
                        name="game"
                        ref={game}
                        id="game"
                        className="form-control"
                    >
                        <option value="0">Select a game</option>
                        {games.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill level: </label>
                    <select
                        defaultValue=""
                        name="skillLevel"
                        ref={skillLevel}
                        id="skillLevel"
                        className="form-control"
                    >
                        <option value="0">Select a skill level</option>
                        {skillLevels.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewGame()
                    }
                }
                className="btn btn-primary">
                Save Game
            </button>
        </form>
    )


    //     return (
    //         <div className="gameHeader">

    //             <button type="submit"
    //                 onClick={
    //                     evt => {
    //                         evt.preventDefault() // Prevent browser from submitting the form
    //                         setGameInput(true)
    //                     }
    //                 }
    //                 className="btn btn-primary">
    //                 Add a Game
    // </button>
    //         </div>
    // )
}