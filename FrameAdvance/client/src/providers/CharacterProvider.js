import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CharacterContext = React.createContext();

export const CharacterProvider = (props) => {
  const apiUrl = "/api/character";

  const { getToken } = useContext(UserProfileContext);
  const [characters, setCharacters] = useState([]);
  const [postCharacters, setPostCharacters] = useState([]);

  const getAllCharacters = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setCharacters)
    );

  const getAllCharactersByGame = (gameId) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${gameId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setCharacters)
    );

  const getAllPostCharactersByPostId = (postId) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/postcharacters/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setPostCharacters)
    );

  const addCharacterToPost = (postCharacter) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/addcharacter`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postCharacter),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const deleteCharacterFromPost = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/removecharacter/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Failed to remove character.");
      })
    );
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        postCharacters,
        getAllCharacters,
        getAllCharactersByGame,
        getAllPostCharactersByPostId,
        addCharacterToPost,
        deleteCharacterFromPost,
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
};
