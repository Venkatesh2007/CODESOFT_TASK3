import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const querySnapshot = await getDocs(collection(db, 'blogs'));
            const blogData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBlogs(blogData);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-10 px-4">
            <div className="container mx-auto">
                <h3 className="text-2xl text-white font-bold mb-8">The blogs in this website are short and as sweet as Badam</h3>
                <div className="grid gap-8 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl text-white font-bold mb-2">{blog.title}</h2>
                            <p className="text-white mb-2">
                                {blog.content.substring(0, 200)}...
                            </p>
                            <div className="flex justify-between items-center text-white mt-4">
                                <span>By {blog.author}</span>
                                <span>{format(blog.updatedAt.toDate(), 'MMM dd, yyyy')}</span>
                            </div>
                            <Link to={`/blog/${blog.id}`} className="glass-btn mt-4 block text-center text-white">Read More</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
