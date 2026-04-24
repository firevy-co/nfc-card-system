import React, { useState } from 'react';
import { auth, googleProvider } from '@/firebase.config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import logo from '../../assets/logo (2).png';
import * as Fi from "react-icons/fi";
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('@/firebase.config');
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                await auth.signOut();
                throw new Error("User identity is not defined in the network registry.");
            }

            navigate('/');
        } catch (err) {
            let message = "Authentication failed.";
            if (err.message.includes('auth/invalid-credential')) {
                message = "Invalid email or password.";
            } else if (err.message.includes("not defined")) {
                message = err.message;
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
            const { db } = await import('@/firebase.config');
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    role: 'User',
                    createdAt: serverTimestamp(),
                    status: 'Active'
                });
                navigate('/user/complete-profile');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-['Mulish']">
            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col p-8 sm:p-16 lg:p-24 justify-between max-w-2xl">
                <div>
                    <Link to="/" className="mb-12 block">
                        <img src={logo} alt="Logo" className="h-10 object-contain" />
                    </Link>

                    <div className="max-w-md">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-500 font-medium mb-10">Log in to your premium NFC dashboard</p>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3">
                                <Fi.FiAlertCircle className="flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <Fi.FiMail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-300"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                    <a href="#" className="text-xs font-bold text-[#7c3aed] hover:text-[#db2777] transition-colors">Forgot password?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <Fi.FiLock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-300"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <Fi.FiEyeOff size={18} /> : <Fi.FiEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                disabled={loading}
                            >
                                {loading ? "Authenticating..." : "Sign In"}
                            </button>

                            <div className="relative py-4 flex items-center">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">OR</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>
                        </form>

                        <p className="mt-12 text-sm font-bold text-gray-400">
                            Don't have an account? <Link to="/signup" className="text-[#7c3aed] hover:text-[#db2777] transition-colors">Create Account</Link>
                        </p>
                    </div>
                </div>

                <div className="flex gap-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
                </div>
            </div>

            {/* Right Side: Visual Showcase */}
            <div className="hidden lg:flex flex-1 relative bg-[#0a0a0b] items-center justify-center overflow-hidden">
                {/* Abstract Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none delay-700"></div>

                {/* NFC Tap Experience Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center scale-110">

                    {/* iPhone Frame */}
                    <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-[6px] border-gray-800">
                        {/* Dynamic Island */}
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-blue-500/50 mr-12"></div>
                            <div className="w-2 h-2 rounded-full bg-white/5"></div>
                        </div>

                        {/* Screen Content */}
                        <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-[#1c1c1e]">

                            {/* Home Screen (Initial) */}
                            <motion.div
                                className="absolute inset-0 p-6 flex flex-col pt-16"
                                animate={{ opacity: [1, 1, 0, 0, 1], filter: ["blur(0px)", "blur(0px)", "blur(20px)", "blur(20px)", "blur(0px)"] }}
                                transition={{ duration: 8, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1] }}
                            >
                                <div className="grid grid-cols-4 gap-4">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-white/10"></div>
                                    ))}
                                </div>
                                <div className="mt-auto flex justify-center gap-4 mb-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-12 h-12 rounded-xl bg-white/20"></div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Digital Card (After Tap) */}
                            <motion.div
                                className="absolute inset-0 bg-gray-50 flex flex-col"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0, 1, 1, 0] }}
                                transition={{ duration: 8, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1] }}
                            >
                                <div className="h-40 bg-[#1c1c1e] relative">
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center shadow-lg">
                                        <Fi.FiUser size={40} className="text-gray-200" />
                                    </div>
                                </div>
                                <div className="mt-14 text-center px-6">
                                    <h3 className="text-2xl font-black text-gray-900">Yash</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">CEO / FOUNDER</p>

                                    <div className="mt-8 flex gap-2">
                                        <button className="flex-1 bg-[#1c1c1e] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                            <Fi.FiDownload size={14} /> Save Contact
                                        </button>
                                        <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                                            <Fi.FiShare2 size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        {[
                                            { icon: <Fi.FiPhone />, label: "Call Mobile", value: "+91 70693 70623" },
                                            { icon: <Fi.FiMail />, label: "Email", value: "getcardyn@gmail.com" },
                                            { icon: <Fi.FiGlobe />, label: "Website", value: "cardyn.shop" },
                                            { icon: <Fi.FiMapPin />, label: "Office Address", value: "Surat, Gujarat" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 text-left">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                                    <p className="text-xs font-bold text-gray-900">{item.value}</p>
                                                </div>
                                                <Fi.FiChevronRight size={16} className="text-gray-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* NFC Waves Animation */}
                        <motion.div
                            className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0, 1, 0, 0],
                                scale: [0.5, 0.5, 1.5, 2, 2]
                            }}
                            transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.42, 0.55, 1] }}
                        >
                            <div className="absolute inset-0 border-2 border-orange-500 rounded-full animate-ping"></div>
                            <div className="absolute inset-4 border-2 border-orange-400 rounded-full animate-ping delay-100"></div>
                            <div className="absolute inset-8 border-2 border-orange-300 rounded-full animate-ping delay-200"></div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="absolute z-40 w-80 aspect-[1.58/1] bg-gradient-to-br from-[#2c2c2e] to-[#000000] rounded-2xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] p-8 border border-white/10 flex items-center justify-center"
                        initial={{ x: 400, y: 100, rotate: 15 }}
                        animate={{
                            x: [400, 400, 0, 0, 400],
                            y: [100, 100, -250, -250, 100],
                            rotate: [15, 15, -15, -15, 15]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            times: [0, 0.1, 0.4, 0.6, 0.9],
                            ease: "easeInOut"
                        }}
                    >
                        <img src={logo} alt="Logo" className="w-40 h-16 object-contain invert brightness-0" style={{ filter: 'brightness(0) invert(1)' }} />
                        <div className="absolute bottom-6 right-8 w-12 h-8 rounded bg-white/5 border border-white/10"></div>
                    </motion.div>

                    {/* Static Text Overlay */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full">
                        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Tap the Future</h2>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Experience cardless connection</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

