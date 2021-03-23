import React from "react";

export const CharactersOnPost = ({ postCharacter }) => {
  return (
    <div className="individualCharacterContainer">
      <div className="individualCharacter">{postCharacter.character.name}</div>
    </div>
  );
};
