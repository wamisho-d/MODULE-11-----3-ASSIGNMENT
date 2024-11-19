import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PUBLIC_KEY = '<YOUR_PUBLIC_KEY>';
const HASH = '<YOUR_HASH>';
const API_URL = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

function CharacterList({ onSelectCharacter }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(API_URL);
                setCharacters(response.data.data.results);
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) return <p>Loading characters...</p>;

    return (
        <div className="character-list">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="character-item"
                    onClick={() => onSelectCharacter(character.id)}
                >
                    <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                    />
                    <p>{character.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CharacterList;
