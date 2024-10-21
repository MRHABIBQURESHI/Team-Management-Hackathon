import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/authContext'; 
import PrivateRoute from './Auth/PrivateRoute'; 
import Login from './Auth/Login'; 
import Signup from './Auth/Signup'; 
import Home from './Pages/Home'; 
import TeamForm from './Components/TeamForm';
import TeamsList from './Components/TeamsList';
import JoinTeam from './Components/JoinTeam';
import JoinedTeams from './Components/JoinedTeams';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/teamform" element={<TeamForm />} />
          <Route path="/teamlist" element={<TeamsList />} />
          <Route path="/joinedteams" element={<JoinedTeams />} />
          <Route path="/jointeam" element={<JoinTeam />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
