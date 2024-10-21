import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db }  from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [teamType, setTeamType] = useState('');
  const navigate = useNavigate()
  const [questions, setQuestions] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestions((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "teams"), {
        teamName,
        teamType,
        questions
      });
      alert("Team created successfully!");
      navigate('/')
      
    } catch (error) {
      console.error("Error creating team: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-blue-100 p-8 shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Create a Team</h1>
      <form onSubmit={handleSubmit}>
        {/* Grid for fields */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Team Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Team Name</label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">Team Type</label>
            <select
              value={teamType}
              onChange={(e) => setTeamType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a Team Type</option>
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

        {/* Questions in Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Question 1</label>
            <input
              type="text"
              name="question1"
              value={questions.question1}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Question 2</label>
            <input
              type="text"
              name="question2"
              value={questions.question2}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Question 3</label>
            <input
              type="text"
              name="question3"
              value={questions.question3}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Question 4</label>
            <input
              type="text"
              name="question4"
              value={questions.question4}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Question 5</label>
            <input
              type="text"
              name="question5"
              value={questions.question5}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

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

export default TeamForm;
