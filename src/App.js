import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

function App() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    return (
        <div className="App">
            <h1>Marvel Comics Characters</h1>
            <CharacterList onSelectCharacter={setSelectedCharacter} />
            {selectedCharacter && <CharacterDetail characterId={selectedCharacter} />}
        </div>
    );
}

export default App;
