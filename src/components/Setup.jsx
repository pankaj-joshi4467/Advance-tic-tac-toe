
import React, { useState } from 'react';

const Setup = ({ onStart }) => {
  const [n, setN] = useState(3);
  const [m, setM] = useState(3);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (n < 3 || m < 3) {
      setError('N and M must be at least 3');
    } else if (m > n) {
      setError('M cannot be greater than N');
    } else {
      setError('');
      onStart(n, m);
    }
  };

  return (
    <div className="game-container">
      <h2>Set Up Your Game</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Board Size (N × N):&nbsp;
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            min={3}
          />
        </label>
        <br /><br />
        <label>
          Marks to Win (M):&nbsp;
          <input
            type="number"
            value={m}
            onChange={(e) => setM(parseInt(e.target.value))}
            min={3}
          />
        </label>
        <br /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="reset-btn">Start Game</button>
      </form>
    </div>
  );
};

export default Setup;
