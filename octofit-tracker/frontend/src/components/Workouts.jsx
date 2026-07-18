import { useEffect, useState } from 'react';
import { normalizeArray } from './api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(workoutsEndpoint)
      .then((res) => res.json())
      .then((json) => setWorkouts(normalizeArray(json, 'workouts')))
      .catch(() => setError('Unable to load workouts.'));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              {workout.user?.name ? `${workout.user.name}: ` : ''}
              {workout.title} ({workout.category}) · {workout.durationMinutes} min · {workout.difficulty}
              <br />
              Scheduled for {new Date(workout.scheduledFor).toLocaleString()} · {workout.completed ? 'Completed' : 'Pending'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
