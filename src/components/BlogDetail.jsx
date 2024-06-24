import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { doc, getDoc, updateDoc, collection, addDoc, query, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ReactMarkdown from 'react-markdown';
import { FaTrash } from 'react-icons/fa';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userEmail, setUserEmail] = useState(auth.currentUser?.email || '');

    useEffect(() => {
        const fetchBlog = async () => {
            const docRef = doc(db, 'blogs', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const blogData = { id: docSnap.id, ...docSnap.data() };
                const likesArray = Array.isArray(blogData.likes) ? blogData.likes : [];
                setBlog(blogData);
                setLikes(likesArray);
                setHasLiked(likesArray.includes(auth.currentUser?.uid));
            } else {
                console.log('No such document!');
            }
        };

        const fetchComments = () => {
            const commentsRef = collection(db, 'blogs', id, 'comments');
            const q = query(commentsRef, orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const updatedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setComments(updatedComments);
            });
            return unsubscribe;
        };

        const unsubscribeComments = fetchComments();
        fetchBlog();

        return () => unsubscribeComments();
    }, [id]);

    const handleLike = async () => {
        const blogRef = doc(db, 'blogs', id);
        let updatedLikes;

        if (hasLiked) {
            updatedLikes = likes.filter(userId => userId !== auth.currentUser?.uid);
        } else {
            updatedLikes = [...likes, auth.currentUser?.uid];
        }

        setLikes(updatedLikes);
        setHasLiked(!hasLiked);
        await updateDoc(blogRef, { likes: updatedLikes });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const commentData = {
            content: newComment,
            userEmail,
            userId: auth.currentUser?.uid,
            timestamp: new Date(),
        };

        const commentsRef = collection(db, 'blogs', id, 'comments');
        await addDoc(commentsRef, commentData);
        setNewComment('');
    };

    const handleDeleteComment = async (commentId) => {
        const commentRef = doc(db, 'blogs', id, 'comments', commentId);
        await deleteDoc(commentRef);
    };

    const handleShare = async () => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                text: blog.content,
                url: window.location.href,
            });
        } else {
            // Handle sharing for browsers that do not support Web Share API
            console.log('Web Share API not supported.');
        }
    };

    if (!blog) {
        return <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-10 px-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-10 px-4">
            <div className="container mx-auto">
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 shadow-lg flex">
                    <div className="w-full">
                        <h1 className="text-4xl text-white font-bold mb-4">{blog.title}</h1>
                        <div className="flex justify-between items-center text-white mb-4">
                            <span>By {blog.author}</span>
                            <span>{format(blog.updatedAt.toDate(), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="text-white prose prose-invert max-w-none">
                            <ReactMarkdown>{blog.content}</ReactMarkdown>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button onClick={handleLike} className={`glass-btn text-center text-white ${hasLiked ? 'opacity-50 cursor-not-allowed' : ''}`}>Like ({likes.length})</button>
                            <button onClick={handleShare} className="glass-btn text-center text-white">Share</button>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl text-white font-bold mb-4">Comments</h2>
                            <form onSubmit={handleCommentSubmit} className="mb-4">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1 bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 resize-none"
                                    style={{ minHeight: '100px' }}
                                    placeholder="Add your comment..."
                                ></textarea>
                                <button type="submit" className="glass-btn text-white mt-2">Post Comment</button>
                            </form>
                            <div className="space-y-4">
                                {comments.map(comment => (
                                    <div key={comment.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4">
                                        <p className="text-white">{comment.content}</p>
                                        <span className="text-gray-400">By {comment.userEmail}</span>
                                        {comment.userId === auth.currentUser?.uid && (
                                            <button onClick={() => handleDeleteComment(comment.id)} className="text-red-700 font-extrabold "><FaTrash/></button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
