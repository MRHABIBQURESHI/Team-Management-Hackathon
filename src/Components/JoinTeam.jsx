import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const JoinTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamType, setTeamType] = useState('');
  const [phone, setPhone] = useState('');
  const [questions, setQuestions] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // State to track the selected team

  const navigate = useNavigate();

  // Fetch the teams and their questions from Firebase
  const fetchTeams = async () => {
    const teamsCollection = collection(db, 'teams');
    const teamSnapshot = await getDocs(teamsCollection);
    const teamsList = teamSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTeams(teamsList);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Handle form input changes for questions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestions((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission to add data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'join'), {
        teamName,
        teamType,
        phone,
        questions
      });
      alert('Team Joined successfully!');
      navigate('/'); // Redirect after submission
    } catch (error) {
      console.error('Error joining team: ', error);
    }
  };

  // Handle team selection
  const handleTeamClick = (team) => {
    setTeamName(team.teamName);
    setTeamType(team.teamType);
    setSelectedTeam(team); // Set the selected team
    setQuestions({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: ''
    }); // Clear previous answers
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-blue-100 p-8 shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Join a Team</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Team Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Team Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
            <select
              value={teamType}
              onChange={(e) => setTeamType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a Department</option>
              <option value="Development">Development</option>
              <option value="Production">Production</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT Support">IT Support</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Operations">Operations</option>
              <option value="Research">Research</option>
            </select>
          </div>
        </div>

        {/* Phone Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Available Teams */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Available Teams:</h2>
          {teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team.id}
                className="mb-4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50"
                onClick={() => handleTeamClick(team)} // Handle team click
              >
                <h3 className="text-xl font-semibold">{team.teamName}</h3>
                <p className="text-gray-600">Type: {team.teamType}</p>
              </div>
            ))
          ) : (
            <p>No teams available</p>
          )}
        </div>

        {/* Display Questions of Selected Team */}
        {selectedTeam && (
          <div className="mb-6">
            <h4 className="font-semibold">Questions for {selectedTeam.teamName}:</h4>
            <div>
              {selectedTeam.questions && (
                <>
                  {Object.entries(selectedTeam.questions).map(([key, question], index) => (
                    <div key={index} className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{question}</label>
                      <input
                        type="text"
                        name={key}
                        value={questions[key]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JoinTeam;
