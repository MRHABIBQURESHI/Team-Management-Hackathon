import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebaseConfig'; 
import { Link } from 'react-router-dom';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{team.teamName}</h2>
              <p className="text-gray-600 mb-4">Type: {team.teamType}</p>
              {/* <p className="text-gray-600 mb-4">Type: {team.questions.question1}</p> */}
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                <Link to = "/jointeam">Join Team</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No teams available</p>
        )}
      </div>
    </div>
  );
};

export default TeamsList;
