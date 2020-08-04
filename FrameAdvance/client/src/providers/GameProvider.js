import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const GameContext = React.createContext();

export const GameProvider = (props) => {

    const apiUrl = "/api/game";

    const { getToken } = useContext(UserProfileContext);
    const [games, setGames] = useState([]);
    const [userGames, setUserGames] = useState([]);
    const [skillLevels, setSkillLevels] = useState([]);

    const getAllGames = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setGames));

    const getAllUserGames = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/usergames/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setUserGames));


    const getAllSkillLevels = () =>
        getToken().then((token) =>
            fetch(`${apiUrl}/skills`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setSkillLevels));

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

    const addGameToUser = (userGame) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/addgame`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userGame),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else { throw new Error("Unauthorized"); }
            }).then(getAllUserGames)
        );

    const updateUserGame = (userGame) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/editusergame/${userGame.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userGame)
            }).then(getAllUserGames));

    const removeGameFromUser = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/removegame/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                else { throw new Error("Failed to delete post.") }
            })
        );
    };

    return (
        <GameContext.Provider value={{
            games, skillLevels, userGames, getAllGames, getAllUserGames,
            getAllSkillLevels, addGame, updateGame, deleteGame,
            getGameById, addGameToUser, updateUserGame, removeGameFromUser
        }}>
            {props.children}
        </GameContext.Provider>
    );
};