import { useEffect, useState } from 'react';
import { normalizeArray } from './api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(leaderboardEndpoint)
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
