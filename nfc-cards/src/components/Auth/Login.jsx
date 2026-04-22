import React, { useState } from 'react';
import { auth } from '../../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import logo from '../../assets/logo (2).png';

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

            // IDENTITY VALIDATION: Ensure user exists in Firestore registry
            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('../../firebase.config');
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                // If Auth exists but Firestore does not, it's a "Ghost Identity"
                await auth.signOut();
                throw new Error("User identity is not defined in the network registry.");
            }

            // SUCCESS HANDSHAKE: Redirect to the core dashboard fallback
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

    return (
        <Layout hideSidebar={true} hideTopNav={true}>
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 min-h-screen">
                <div className="w-full max-w-lg">
                    <div className="glass-card p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
                        {/* Decorative Top Accent */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <div className="text-center mb-10">
                            <img src={logo} alt="Cardyn Logo" className="h-10 object-contain mx-auto mb-6" />
                            <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-gradient">
                                Welcome Back
                            </h1>
                            <p className="text-muted-foreground font-medium">
                                Sign in to your premium NFC dashboard
                            </p>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-start gap-3 animate-shake">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-muted-foreground ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-indigo-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-5 py-4 rounded-2xl bg-secondary/30 border border-border text-foreground placeholder-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="block text-sm font-semibold text-muted-foreground">Password</label>
                                    <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-indigo-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-12 pr-12 py-4 rounded-2xl bg-secondary/30 border border-border text-foreground placeholder-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L13.89 13.89m-3.13-3.132L10 10m0 0l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-5px_rgba(79,70,229,0.5)] active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                disabled={loading}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : 'Sign In'}
                                    {!loading && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </form>

                        <div className="mt-10 flex flex-col items-center gap-4">
                            <p className="text-sm font-medium text-muted-foreground">
                                New to the system? <Link to="/signup" className="text-indigo-400 font-bold hover:text-pink-400 transition-colors">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
