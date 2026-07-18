import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/leaderboard/`)
      .then((res) => res.json())
      .then((json) => setLeaderboard(normalizeArray(json, 'leaderboard')))
      .catch(() => setError('Unable to load leaderboard.'));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ol>
          {leaderboard.map((entry) => (
            <li key={entry._id}>
              {entry.rank}. {entry.user?.name || 'Unknown'} ({entry.team?.name || 'No team'}) – {entry.score} pts
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
