import React, { useState } from 'react';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import Layout from '../layout/layout';

const Profile = ({ userData }) => {
    const user = auth.currentUser;
    const userRole = userData?.role === 'Admin' ? 'Senior Architect (Admin)' : 'Field Architect (User)';

    const handleLogout = () => signOut(auth);

    return (
        <Layout userData={userData}>
            <header className="mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-3 tracking-tight capitalize">User Identity</h2>
                <p className="text-muted-foreground font-medium tracking-tight text-lg">Manage your architectural credentials and secure access.</p>
            </header>

            <div className="max-w-4xl space-y-10">
                {/* Core Identity Card */}
                <div className="bg-card border border-border rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user?.displayName || 'U'}&background=06b6d4&color=fff`} 
                            className="w-24 h-24 rounded-3xl object-cover border-4 border-muted shadow-2xl" 
                            alt="Identity" 
                        />
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold text-foreground leading-tight capitalize tracking-wide">{user?.displayName || 'Authorized User'}</h3>
                            <div className="flex items-center gap-3 mt-2 justify-center md:justify-start">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black capitalize tracking-[0.2em] border ${
                                    userData?.role === 'Admin' 
                                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
                                        : 'bg-slate-500/10 border-slate-500/20 text-slate-500'
                                }`}>
                                    {userData?.role === 'Admin' ? 'Senior Architect (Admin)' : 'Field Architect (User)'}
                                </span>
                            </div>
                        </div>
                        <button className="md:ml-auto px-6 py-3 rounded-xl bg-background border border-border text-foreground font-bold text-[10px] capitalize tracking-widest hover:border-cyan-500/30 transition-all">
                            Edit Identity
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1">PRIMARY EMAIL REFERENCE</label>
                             <div className="px-6 py-4 bg-background border border-border rounded-2xl text-foreground font-medium font-sans">
                                {user?.email}
                             </div>
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1">SYSTEM UID</label>
                             <div className="px-6 py-4 bg-background border border-border rounded-2xl text-muted-foreground font-medium text-xs font-mono truncate">
                                {user?.uid}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-card border border-border p-10 rounded-[1.5rem] shadow-2xl">
                        <h3 className="text-xl font-bold text-foreground tracking-tight mb-8">Access Control</h3>
                        <div className="space-y-6">
                            <button className="w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-background border border-border text-foreground hover:border-cyan-500/30 transition-all group">
                                <span className="text-xs font-bold capitalize tracking-widest">Update Master Key</span>
                                <svg className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-background border border-border text-foreground hover:border-cyan-500/30 transition-all group">
                                <span className="text-xs font-bold capitalize tracking-widest">2-Factor Security</span>
                                <span className="text-[10px] font-black bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full">ACTIVE</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-10 rounded-[1.5rem] shadow-2xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-foreground tracking-tight mb-4">Identity Session</h3>
                            <p className="text-muted-foreground text-xs leading-relaxed">Disconnect current architectural session and clear identity cache from this terminal.</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="w-full py-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 font-bold text-xs capitalize tracking-widest hover:bg-red-500 hover:text-white transition-all mt-8"
                        >
                            Deauthorize Session
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
