import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure the function name matches your export
import { FaHome, FaUserCircle, FaEnvelope, FaSignOutAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { signOut } from '../firebase';

const Navbar = () => {
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-4 px-8 flex   md:justify-between justify-center  items-center backdrop-blur-md shadow-lg">
            <h1 className="text-white text-lg font-bold hidden md:block">Badam Blog</h1>
            <div className="flex items-center space-x-4 flex-wrap justify-center">
                <Link to="/" className="nav-link flex items-center space-x-1 text-white">
                    <FaHome className="hidden md:block"/>
                    <span>Home</span>
                </Link>
                {currentUser ? (
                    <>
                        <Link to="/profile" className="nav-link flex items-center space-x-1 text-white">
                            <FaUserCircle className="hidden md:block"/>
                            <span>Profile</span>
                        </Link>
                        <Link to="/contact" className="nav-link flex items-center space-x-1 text-white">
                            <FaEnvelope className="hidden md:block"/>
                            <span>Contact</span>
                        </Link>
                        <button onClick={handleLogout} className="glass-btn flex items-center space-x-1 text-white">
                            <FaSignOutAlt className="hidden md:block"/>
                            <span>Logout</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="glass-btn flex items-center space-x-2 text-white">
                            <FaUserPlus />
                            <span>Sign Up</span>
                        </Link>
                        <Link to="/login" className="glass-btn flex items-center space-x-2 text-white">
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
