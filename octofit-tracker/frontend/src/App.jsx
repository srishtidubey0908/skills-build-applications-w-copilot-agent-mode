import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiBase, codespaceName } from './components/api.js';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>OctoFit Tracker</h1>
          <nav>
            <Link to="/users">Users</Link> | <Link to="/teams">Teams</Link> | <Link to="/activities">Activities</Link> | <Link to="/leaderboard">Leaderboard</Link> | <Link to="/workouts">Workouts</Link>
          </nav>
          <p>
            API base: <code>{apiBase}</code>
          </p>
          <p>
            {codespaceName
              ? `Codespaces API support enabled for ${codespaceName}`
              : 'VITE_CODESPACE_NAME is not set. Using localhost fallback.'}
          </p>
          <p>
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces API routing.
          </p>
        </header>

        <main>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Users />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
