import React from 'react';
import { Link } from 'react-router-dom';

const TeamOptions = ({ onCreateTeam, onJoinTeam }) => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <button
        onClick={onCreateTeam}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
      >
        <Link to = "/teamform">Create Team</Link>
      </button>
      <button
        onClick={onJoinTeam}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
      >
        <Link to = "/teamlist">Join Team</Link>
      </button>
    </div>
  );
};

export default TeamOptions;
