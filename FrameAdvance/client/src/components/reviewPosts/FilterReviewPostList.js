import React, { useContext, useEffect } from 'react'
import { GameContext } from '../../providers/GameProvider'
import { CharacterContext } from '../../providers/CharacterProvider'

export const FilterReviewPosts = ({ filteredGameId, setFilteredGameId, setFilteredCharacterId }) => {

    const { games, getAllGames, } = useContext(GameContext)
    const { characters, getAllCharactersByGame } = useContext(CharacterContext);

    useEffect(() => {
        getAllGames();
    }, []);

    useEffect(() => {
        if (filteredGameId !== "0") {
            getAllCharactersByGame(+filteredGameId)
        }
    }, [filteredGameId]);

    return (
        <div className="mainFeedTopItem">
            <label className="selectItself" htmlFor="game"></label>
            <select onChange={e => setFilteredGameId(e.target.value)}
                defaultValue=""
                id="game"
                className="form-control"
                required
            >
                <option value="0">All Games</option>
                {games.map(g => (
                    <option key={g.id} value={g.id}>
                        {g.title}
                    </option>
                ))}
            </select>

            {
                filteredGameId !== "0"
                    ? <div>
                        <label className="selectItself" htmlFor="character"></label>
                        <select onChange={e => setFilteredCharacterId(e.target.value)}
                            defaultValue=""
                            id="character"
                            className="form-control"
                            required
                        >
                            <option value="0">All Characters</option>
                            {characters.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    : ""
            }
        </div>



    )
}