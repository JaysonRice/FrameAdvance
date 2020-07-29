import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const GameContext = React.createContext();

export const GameProvider = (props) => {

    const apiUrl = "/api/game";

    const { getToken } = useContext(UserProfileContext);
    const [games, setGames] = useState([]);

    const getAllGames = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setGames));

    const addGame = (game) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(game)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(getAllGames);
                }
                throw new Error("Unauthorized");
            }));

    const updateGame = (game) =>
        getToken().then((token) =>
            fetch(`api/game/${game.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(game)
            }).then(getAllGames));

    const deleteGame = (id) => {
        return getToken().then((token) =>
            fetch(`/api/game/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete Game.")
            })
        ).then(getAllGames);;
    };

    const getGameById = (id) => {
        getToken().then((token) =>
            fetch(`/api/game/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }

    return (
        <GameContext.Provider value={{ games, getAllGames, addGame, updateGame, deleteGame, getGameById }}>
            {props.children}
        </GameContext.Provider>
    );
};