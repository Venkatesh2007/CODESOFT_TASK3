import React from 'react';

const Popup = ({ message, closePopup }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-sm mx-auto z-10">
                <h2 className="text-2xl font-semibold mb-4 text-white">{message}</h2>
                <button
                    onClick={closePopup}
                    className="w-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:to-[#2c5364]  text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
