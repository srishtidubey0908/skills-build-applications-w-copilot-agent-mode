import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/teams/`)
      .then((res) => res.json())
      .then((json) => setTeams(normalizeArray(json, 'teams')))
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
