// App.jsx
import React, { useState } from 'react';
import Setup from './components/Setup';
import Game from './components/Game';

function App() {
  const [settings, setSettings] = useState(null);

  return (
    <div>
      {!settings ? (
        <Setup onStart={(n, m) => setSettings({ n, m })} />
      ) : (
        <Game boardSize={settings.n} winLength={settings.m} />
      )}
    </div>
  );
}

export default App;
