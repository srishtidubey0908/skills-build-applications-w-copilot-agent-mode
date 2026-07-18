import { useEffect, useState } from 'react';
import { apiBase, normalizeArray } from './api';

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm: number;
  date: string;
  user?: { name: string };
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/activities/`)
      .then((res) => res.json())
      .then((json) => setActivities(normalizeArray<Activity>(json, 'activities')))
      .catch(() => setError('Unable to load activities.'));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              {activity.user?.name ? `${activity.user.name}: ` : ''}
              {activity.type} · {activity.durationMinutes} min · {activity.caloriesBurned} kcal · {activity.distanceKm} km ·{' '}
              {new Date(activity.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
