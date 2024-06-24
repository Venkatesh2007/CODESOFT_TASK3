import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import UploadBlog from '../components/UploadBlog';

const Profile = () => {
    const [blogs, setBlogs] = useState([]);
    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);
    const [editBlogData, setEditBlogData] = useState({ title: '', content: '', author: auth.currentUser?.email || 'user@gmail.com' });
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'blogs'));
                const blogData = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(blog => blog.userId === userId);
                setBlogs(blogData);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            }
        };
        fetchBlogs();
    }, [userId]);

    const handleOpenUploadPopup = () => {
        setIsUploadPopupOpen(true);
    };

    const handleCloseUploadPopup = () => {
        setIsUploadPopupOpen(false);
        setEditBlogId(null);
        setEditBlogData({ title: '', content: '', author: auth.currentUser?.email || 'user@gmail.com' });
    };

    const handleNewBlogSubmit = async (newBlog) => {
        try {
            const blogWithUser = { ...newBlog, userId, author: auth.currentUser?.email, updatedAt: new Date() };
            const docRef = await addDoc(collection(db, 'blogs'), blogWithUser);
            setBlogs([...blogs, { id: docRef.id, ...blogWithUser }]);
            handleCloseUploadPopup();
        } catch (error) {
            console.error("Error adding blog: ", error);
        }
    };

    const handleEditBlogSubmit = async () => {
        try {
            const blogRef = doc(db, 'blogs', editBlogId);
            await updateDoc(blogRef, { ...editBlogData, updatedAt: new Date() });
            setBlogs(blogs.map(blog => blog.id === editBlogId ? { ...blog, ...editBlogData } : blog));
            handleCloseUploadPopup();
        } catch (error) {
            console.error("Error updating blog: ", error);
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            const blogRef = doc(db, 'blogs', id);
            await deleteDoc(blogRef);
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };

    const handleEditButtonClick = (blog) => {
        setEditBlogId(blog.id);
        setEditBlogData({ title: blog.title, content: blog.content, author: blog.author });
        setIsUploadPopupOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-10 px-4">
            <div className="container mx-auto">
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg mb-8">
                    <h2 className="text-2xl text-white font-bold mb-2">Email: {auth.currentUser?.email || 'user@gmail.com'}</h2>
                    <p className="text-white mb-2">Number of Blogs: {blogs.length}</p>
                    <button onClick={handleOpenUploadPopup} className="glass-btn mt-4 block text-center text-white">Upload Blog</button>
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg relative">
                            <h2 className="text-2xl text-white font-bold mb-2">{blog.title}</h2>
                            <p className="text-white mb-2">{blog.content.substring(0, 200)}...</p>
                            <div className="flex justify-between items-center text-white mt-4">
                                <span>By {blog.author}</span>
                                <span>{blog.updatedAt instanceof Date ? format(blog.updatedAt, 'MMM dd, yyyy') : format(blog.updatedAt.toDate(), 'MMM dd, yyyy')}</span>
                            </div>
                            <Link to={`/blog/${blog.id}`} className="glass-btn mt-4 block text-center text-white">Read More</Link>
                            <button onClick={() => handleEditButtonClick(blog)} className="absolute top-2 right-8 text-white">✏️</button>
                            <button onClick={() => handleDeleteBlog(blog.id)} className="absolute top-2 right-2 text-white">🗑️</button>
                        </div>
                    ))}
                </div>
                {isUploadPopupOpen && (
                    <UploadBlog
                        isOpen={isUploadPopupOpen}
                        onClose={handleCloseUploadPopup}
                        onSubmit={editBlogId ? handleEditBlogSubmit : handleNewBlogSubmit}
                        editBlogData={editBlogData}
                        setEditBlogData={setEditBlogData}
                    />
                )}
            </div>
        </div>
    );
};

export default Profile;
