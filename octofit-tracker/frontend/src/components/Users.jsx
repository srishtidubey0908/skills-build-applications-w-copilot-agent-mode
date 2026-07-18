import { useEffect, useState } from 'react';
import { normalizeArray } from './api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(usersEndpoint)
      .then((res) => res.json())
      .then((json) => setUsers(normalizeArray(json, 'users')))
      .catch(() => setError('Unable to load users.'));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p>
        API base: <code>{apiBase}</code>
      </p>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} ({user.email}) · {user.role}
              {user.team ? ` – ${user.team.name}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
