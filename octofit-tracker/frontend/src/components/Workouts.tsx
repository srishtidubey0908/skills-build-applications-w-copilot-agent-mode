import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

interface Workout {
  _id: string;
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
  scheduledFor: string;
  completed: boolean;
  user?: { name: string };
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/workouts/`)
      .then((res) => res.json())
      .then((json) => setWorkouts(normalizeArray<Workout>(json, 'workouts')))
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
