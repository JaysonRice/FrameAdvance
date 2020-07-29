import React, { useContext, useEffect, useState, useRef } from "react";
import { GameContext } from "../../providers/GameProvider"
import { MyGame } from "./MyGame";

export const MyGameList = () => {

    const { games, getAllGames, addGame } = useContext(GameContext)
    const [gameInput, setGameInput] = useState(false)


    // const [myGames, setMyGames] = useState()
    const name = useRef()

    useEffect(() => {
        getAllGames();
    }, []);



    if (!games) {
        return null
    }

    const constructNewGame = () => {
        if (name.current.value !== "") {
            addGame({
                name: name.current.value,
                active: true
            })
        }
        else {
            return
        }
    }

    const displayGameInput = () => {
        if (gameInput === true) {
            return (
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        ref={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="New Game"
                    />
                    <button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                constructNewGame()
                                setGameInput(false)
                            }
                        }
                        className="btn btn-primary">
                        Save Game
            </button>
                </div>)
        }
    }

    return (
        <section>
            <div className="gameHeader">
                <h2>My Games</h2>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            setGameInput(true)
                        }
                    }
                    className="btn btn-primary">
                    Add a Game
            </button>
            </div>

            <div>{displayGameInput()}</div>

            <div className="gamesContainer">
                {games.map(g =>
                    <MyGame key={g.id} game={g} />)}
            </div>

        </section>
    );
}