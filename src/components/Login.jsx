import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
// import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            sessionStorage.setItem('user', auth.currentUser.uid);
            setError('');
            navigate('/');
        } catch (error) {
            setError(getErrorMessage(error.code));
        } finally {
            setLoading(false);
        }
    };

    // const handleGoogleLogin = async () => {
    //     setLoading(true);
    //     try {
    //         await signInWithPopup(auth, provider);
    //         sessionStorage.setItem('user', auth.currentUser.uid);
    //         setError('');
    //         navigate('/');
    //     } catch (error) {
    //         setError(getErrorMessage(error.code));
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/user-disabled':
                return 'Your account has been disabled.';
            case 'auth/user-not-found':
                return 'User not found. Please check your credentials.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/invalid-credential':
                return 'User not found. Please check your credentials.';
            default:
                return 'An error occurred. Please try again later.';
        }
    };

    return (
        <div className="min-h-screen bg-[#080710] flex justify-center items-center relative overflow-hidden">
            <div className="absolute w-64 h-64 bg-gradient-to-r from-[#1845ad] to-[#23a2f6] rounded-full -top-20 -left-20 lg:w-80 lg:h-80"></div>
            <div className="absolute w-64 h-64 bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-full -bottom-20 -right-10 lg:w-80 lg:h-80"></div>
            <form onSubmit={handleLogin} className="relative w-11/12 max-w-md bg-white bg-opacity-10 rounded-lg backdrop-blur-md border border-white border-opacity-10 shadow-lg p-8">
                <h3 className="text-3xl font-semibold text-center text-white">Welcome Back!</h3>
                <h3 className="text-2xl font-semibold text-center text-white">Login</h3>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <label htmlFor="email" className="block mt-8 text-lg font-medium text-white">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full h-12 mt-2 bg-white bg-opacity-10 rounded-md px-3 text-base font-light text-white placeholder-gray-300 outline-none"
                />
                <label htmlFor="password" className="block mt-6 text-lg font-medium text-white">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-12 mt-2 bg-white bg-opacity-10 rounded-md px-3 text-base font-light text-white placeholder-gray-300 outline-none"
                />
                <button
                    type="submit"
                    className="w-full mt-10 bg-white text-[#080710] py-3 text-lg font-semibold rounded-md cursor-pointer flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : 'Log In'}
                </button>
                {/* <div className="flex justify-between mt-8">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-[150px] bg-white bg-opacity-30 text-center py-2 rounded-md text-white cursor-pointer hover:bg-opacity-50 transition flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" /> Google
                    </button>
                    <div className="w-[150px] bg-white bg-opacity-30 text-center py-2 rounded-md text-white cursor-pointer hover:bg-opacity-50 transition ml-4 flex items-center justify-center">
                        <FaGithub className="mr-2" /> Github
                    </div>
                </div> */}
                <h3 className="block mt-6 text-base font-medium text-white">
                    Don't have an account?
                    <span className="ml-2 font-semibold">
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </h3>
            </form>
        </div>
    );
};

export default Login;
