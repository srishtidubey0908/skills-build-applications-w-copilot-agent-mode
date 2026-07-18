import { useEffect, useState } from 'react';
import { normalizeArray } from './api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(teamsEndpoint)
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
