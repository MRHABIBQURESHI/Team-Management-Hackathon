// src/pages/Home.js
import { useAuth } from '../Context/authContext'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import TeamOptions from '../Components/TeamOptions';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">Habib Qureshi</h1>
        <div className="flex-grow flex justify-center space-x-8">
          <button
            onClick={() => handleNavigation('/joinedteams')}
            className="text-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none hover:text-yellow-400"
          >
            Joined Teams
          </button>
          {/* <button
            onClick={() => handleNavigation('/questions')}
            className="text-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none hover:text-yellow-400"
          >
            Questions
          </button> */}
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <CiMenuBurger className="w-8 h-8 text-white hover:text-yellow-400 transition-all" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="px-4 py-2 text-gray-800">
                <p>{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-5xl font-extrabold mb-6 transition-transform transform hover:scale-110">
          Welcome, {user?.email}
        </h1>
        <p className="text-xl font-light mb-8">Let's explore the platform and make an impact!</p>
        <TeamOptions />
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-indigo-600 py-4 text-center">
        <p className="text-sm">© 2024 Habib Qureshi. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
