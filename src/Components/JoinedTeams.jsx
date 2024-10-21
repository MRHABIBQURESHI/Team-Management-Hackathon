import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the path as necessary
import { getAuth } from 'firebase/auth';

const JoinedTeams = () => {
  const [joinedTeams, setJoinedTeams] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser; // Get the current logged-in user

  // Fetch joined teams from Firestore for the logged-in user
  const fetchJoinedTeams = async () => {
    if (!user) return; // Return if there's no logged-in user

    try {
      const joinedTeamsCollection = collection(db, 'join');
      const q = query(joinedTeamsCollection, where("userId", "==", user.uid)); // Filter by user ID
      const joinedTeamsSnapshot = await getDocs(q);
      const teamsList = joinedTeamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJoinedTeams(teamsList);
    } catch (error) {
      console.error('Error fetching joined teams: ', error);
    }
  };

  useEffect(() => {
    fetchJoinedTeams();
  }, [user]); // Run the effect when the user changes

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-blue-100 p-8 shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Joined Teams</h1>
      {joinedTeams.length > 0 ? (
        joinedTeams.map((team) => (
          <div key={team.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold">{team.teamName}</h3>
            <p className="text-gray-600">Department: {team.teamType}</p>
            <p className="text-gray-600">Phone: {team.phone}</p>
            {/* Display questions if needed */}
          </div>
        ))
      ) : (
        <p>No teams joined yet.</p>
      )}
    </div>
  );
};

export default JoinedTeams;
