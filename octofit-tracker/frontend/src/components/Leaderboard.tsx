import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

interface LeaderboardEntry {
  _id: string;
  score: number;
  rank: number;
  period: string;
  user?: { name: string };
  team?: { name: string };
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/leaderboard/`)
      .then((res) => res.json())
      .then((json) => setLeaderboard(normalizeArray<LeaderboardEntry>(json, 'leaderboard')))
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
