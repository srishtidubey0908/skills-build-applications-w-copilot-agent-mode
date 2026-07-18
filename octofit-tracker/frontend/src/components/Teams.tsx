import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

interface Team {
  _id: string;
  name: string;
  description: string;
  members?: { name: string; email: string }[];
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/teams/`)
      .then((res) => res.json())
      .then((json) => setTeams(normalizeArray<Team>(json, 'teams')))
      .catch(() => setError('Unable to load teams.'));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <strong>{team.name}</strong> – {team.description}
              {team.members?.length ? (
                <ul>
                  {team.members.map((member) => (
                    <li key={member.email}>{member.name} ({member.email})</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
