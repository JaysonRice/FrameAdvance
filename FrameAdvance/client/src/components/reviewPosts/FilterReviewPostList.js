import React, { useContext, useEffect } from 'react'
import { GameContext } from '../../providers/GameProvider'

export const FilterReviewPosts = ({ filteredGameId, setFilteredGameId }) => {

    const { games, getAllGames } = useContext(GameContext)

    useEffect(() => {
        getAllGames();
    }, []);

    // useEffect(() => {
    //     if (!!reviewPost) {
    //         getAllCharactersByGame(reviewPost.gameId)
    //     }
    // }, [reviewPost]);

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

            {/* {
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
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    : ""
            } */}
        </div>



    )
}