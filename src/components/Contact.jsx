import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Popup from './Popup'; // Adjust the path as necessary

const ContactPage = () => {
    const [result, setResult] = useState("");
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "490cbc1a-67af-49e1-9642-2fa47c61bb4c");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Submitted Successfully");
            setPopupIsOpen(true);
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
            setPopupIsOpen(true);
        }
    };

    const closePopup = () => {
        setPopupIsOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-10 px-4">
            <div className="container mx-auto">
                <h1 className="text-4xl text-white font-bold mb-8 name">Contact Me</h1>
                <div className="max-w-xl mx-auto p-8 bg-white bg-opacity-20 backdrop-blur-md border border-opacity-20 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-white title">GET IN TOUCH</h2>
                        <form onSubmit={onSubmit}>
                            <label className="block mb-4">
                                <span className="block text-xl font-semibold mb-2 text-white title">Name:</span>
                                <input type="text" name="name" className="w-full p-2 border border-gray-300 bg-transparent rounded" required />
                            </label>
                            <label className="block mb-4">
                                <span className="block text-xl font-semibold mb-2 text-white title">Email:</span>
                                <input type="email" name="email" className="w-full p-2 border border-gray-300 bg-transparent rounded" required />
                            </label>
                            <label className="block mb-4">
                                <span className="block text-xl font-semibold mb-2 text-white title">Message:</span>
                                <textarea name="message" className="w-full p-2 border border-gray-300 bg-transparent rounded" required></textarea>
                            </label>
                            <button type="submit" className="w-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:to-[#164357] text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-200">Submit</button>
                        </form>
                        <span className="text-white">{result}</span>
                    </div>
                    <div className="p-4 rounded-lg flex flex-col justify-start">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold mb-2 text-white title">CONTACT INFO</h2>
                            <div className="flex items-center">
                                <div className="neumorphic-circle border-2 border-white rounded-full bg-gradient-to-br from-black via-blue-800 to-purple-900 w-12 h-12 flex items-center justify-center p-1 mr-2">
                                    <a href="mailto:badamvenkatesh2007@gmail.com">
                                        <FaEnvelope className="text-white text-lg" />
                                    </a>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1 text-white title">Email</h3>
                                    <p className="text-xs text-white description">badamvenkatesh2007@gmail.com</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2 text-white title">Visit my social profile and get connected:</p>
                                <div className="flex items-center">
                                    <div className="neumorphic-circle border-2 border-white rounded-full bg-gradient-to-br from-black via-blue-800 to-purple-900 w-12 h-12 flex items-center justify-center mr-4">
                                        <a href="https://github.com/Venkatesh2007" target="_blank" rel="noopener noreferrer">
                                            <FaGithub className="text-white text-lg" />
                                        </a>
                                    </div>
                                    <div className="neumorphic-circle border-2 border-white rounded-full bg-gradient-to-br from-black via-blue-800 to-purple-900 w-12 h-12 flex items-center justify-center">
                                        <a href="https://linkedin.com/in/badamvenkatesh" target="_blank" rel="noopener noreferrer">
                                            <FaLinkedinIn className="text-white text-lg" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {popupIsOpen && <Popup message={result} closePopup={closePopup} />}
        </div>
    );
};

export default ContactPage;
