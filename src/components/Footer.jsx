import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-4">
            <div className="container mx-auto text-center text-white">
                <p className="mb-2">&copy; {new Date().getFullYear()} Badam Blog. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
