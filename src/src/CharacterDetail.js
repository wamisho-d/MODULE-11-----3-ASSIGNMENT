import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PUBLIC_KEY = '<YOUR_PUBLIC_KEY>';
const HASH = '<YOUR_HASH>';

function CharacterDetail({ characterId }) {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`
                );
                setCharacter(response.data.data.results[0]);
            } catch (error) {
                console.error('Error fetching character details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacterDetail();
    }, [characterId]);

    if (loading) return <p>Loading character details...</p>;
    if (!character) return <p>No character details found.</p>;

    return (
        <div className="character-detail">
            <h2>{character.name}</h2>
            <p>{character.description || 'No description available.'}</p>
            <h3>Comics:</h3>
            <ul>
                {character.comics.items.map((comic) => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CharacterDetail;
