import React, { useContext, useRef, useEffect } from "react";
import { GameContext } from "../../providers/GameProvider";

export const AddGameForm = ({ toggler }) => {
    const { games, skillLevels, getAllSkillLevels, addGameToUser, gamesIPlay } = useContext(GameContext)
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const game = useRef()
    const skillLevel = useRef()

    useEffect(() => {
        getAllSkillLevels();
    }, []);

    // Why don't this work?
    // const gamesIDontPlay = games.filter(oneGame => oneGame.id !== gamesIPlay.forEach(singleGame => {
    //     return singleGame.game.id
    // }))

    const constructNewGame = () => {
        if (game.current.value !== "0" && skillLevel.current.value !== "0") {
            addGameToUser({
                userProfileId: +userProfileId,
                gameId: +game.current.value,
                skillLevelId: +skillLevel.current.value
            }).then(toggler)
        }
        else (toggler())
    }


    if (!games) {
        return null
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
}