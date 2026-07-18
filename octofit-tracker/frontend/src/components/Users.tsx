import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  team?: { name: string };
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/users/`)
      .then((res) => res.json())
      .then((json) => setUsers(normalizeArray<User>(json, 'users')))
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
