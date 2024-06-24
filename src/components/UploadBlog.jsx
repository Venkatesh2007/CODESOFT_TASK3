import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';


const UploadBlog = ({ isOpen, onClose, onSubmit, editBlogData, setEditBlogData }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editBlogData) {
            setEditBlogData(editBlogData);
        }
    }, [editBlogData, setEditBlogData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        onSubmit(editBlogData);
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4 text-white">{editBlogData ? 'Edit Blog' : 'Upload Blog'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white">Title</label>
                        <input
                            type="text"
                            value={editBlogData.title}
                            onChange={(e) => setEditBlogData({ ...editBlogData, title: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300"
                            placeholder="Enter blog title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Content</label>
                        <textarea
                            value={editBlogData.content}
                            onChange={(e) => setEditBlogData({ ...editBlogData, content: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 resize-none"
                            style={{ minHeight: '100px' }}
                            placeholder="Enter blog content"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Author</label>
                        <input
                            type="text"
                            value={editBlogData.author}
                            onChange={(e) => setEditBlogData({ ...editBlogData, author: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300"
                            // readOnly={!!editBlogData.author}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? <FaSpinner className="animate-spin inline-block" /> : 'Submit'}
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500">Cancel</button>
            </div>
        </div>
    );
};

export default UploadBlog;
