import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout';

const Users = ({ userData }) => {
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [systemStatus, setSystemStatus] = useState('OFFLINE');
    const [editingUser, setEditingUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);

    // Form State for Modal
    const [formData, setFormData] = useState({ displayName: '', email: '', role: 'User' });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchUsersFromBackend = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsersList(data);
                setSystemStatus('SYNCED');
            } else {
                setSystemStatus('GATEWAY_ERROR');
            }
        } catch (error) {
            console.error("Backend Handshake Failure:", error);
            setSystemStatus('OFFLINE');
            setUsersList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersFromBackend();
    }, []);

    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData({
            displayName: user.displayName || '',
            email: user.email || '',
            role: user.role || 'User'
        });
    };

    const handleFullUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: editingUser.uid,
                    ...formData
                })
            });

            if (response.ok) {
                setEditingUser(null);
                showToast("Identity credentials successfully re-architected.");
                fetchUsersFromBackend();
            } else {
                const err = await response.json();
                showToast(err.error || "Update Failure", "error");
            }
        } catch (error) {
            console.error("Identity Update Failure:", error);
            showToast("Cloud Synchronisation Error", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteUser = async (uid) => {
        if (!window.confirm("CRITICAL: De-authorizing this identity will permanently purge it from the network. Proceed?")) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:4000/api/users/${uid}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showToast("Identity purged successfully.", "error");
                fetchUsersFromBackend();
            }
        } catch (error) {
            console.error("De-authorization Failure:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Layout userData={userData}>
            {/* --- IDENTITY TOAST SYSTEM --- */}
            {toast && (
                <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-cyan-400'} animate-pulse`}></div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{toast.message}</span>
                </div>
            )}

            {/* --- FULL IDENTITY MODAL POPUP --- */}
            {editingUser && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-card border border-border w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative overflow-hidden ring-1 ring-white/10">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

                        <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">Identity Hub Audit</h3>
                        <p className="text-muted-foreground text-[11px] font-black uppercase tracking-widest mb-8 opacity-60">Re-architecting participant: {editingUser.uid.substring(0, 12)}</p>

                        <form onSubmit={handleFullUpdate} className="space-y-7">
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Architect Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-bold shadow-inner"
                                    placeholder="ALEXANDER STERLING"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Network Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-sans font-medium shadow-inner"
                                    placeholder="alex@cardyn.hub"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">System Clearance</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-6 py-4 rounded-2xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-black uppercase tracking-widest text-[10px] appearance-none cursor-pointer shadow-inner"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="User">Standard Participant</option>
                                        <option value="Admin">System Administrator</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-muted-foreground">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 py-4 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-cyan-500/20 disabled:opacity-50"
                                >{isSaving ? 'Syncing...' : 'Save Credentials'}</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-8 py-4 rounded-2xl bg-muted border border-border text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px] hover:bg-foreground hover:text-background transition-all"
                                >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-foreground mb-3 tracking-tight uppercase">Network Participant Registry</h2>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">Auditing and re-architecting unique identities within the Firevy.co ecosystem.</p>
                </div>
                <button
                    onClick={fetchUsersFromBackend}
                    className="p-4 rounded-xl bg-muted border border-border text-foreground hover:text-cyan-400 transition-all shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
            </header>

            <div className="bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden transition-all relative">
                {isDeleting && <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center font-bold text-cyan-400 uppercase tracking-widest">De-Authorizing...</div>}

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">identity HUB</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Clearance</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-muted-foreground font-bold tracking-widest uppercase animate-pulse">Scanning Cloud Identity Registry...</td>
                                </tr>
                            ) : usersList.length > 0 ? (
                                usersList.map((user) => (
                                    <tr key={user.uid} className="hover:bg-muted transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold uppercase transition-transform group-hover:scale-110">
                                                    {(user.displayName || user.email || 'U').charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-foreground font-bold tracking-tight">{user.displayName || 'Architect'}</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium font-sans">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${user.role === 'Admin'
                                                ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                                                : 'bg-muted border-border text-muted-foreground'
                                                }`}>
                                                {user.role || 'User'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${user.status !== 'Standby' ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${user.status !== 'Standby' ? 'text-foreground/70' : 'text-amber-500'}`}>
                                                    {user.status || 'ACTIVE'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-2.5 rounded-xl bg-muted border border-border text-muted-foreground hover:text-cyan-400 transition-all hover:border-cyan-400/20"
                                                    title="Modify Identity"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.uid)}
                                                    className="p-2.5 rounded-xl bg-muted border border-border text-muted-foreground hover:text-red-500 transition-all hover:border-red-500/20"
                                                    title="De-Authorize"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-24 text-center">
                                        <p className="text-muted-foreground font-medium text-sm">Registry Disconnected or Empty.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
