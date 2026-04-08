import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { FiRefreshCw, FiUserPlus, FiEdit2, FiTrash2, FiShield, FiUser, FiActivity } from 'react-icons/fi';

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
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredUsers = usersList.filter(user => 
        (user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.uid?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Layout userData={userData} title="User Registry" showTopNavActions={false}>
            {/* --- IDENTITY TOAST SYSTEM --- */}
            {toast && (
                <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-6 duration-300 backdrop-blur-xl ${toast.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-primary/10 border-primary/20 text-primary'
                    }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'error' ? 'bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}></div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{toast.message}</span>
                </div>
            )}

            {/* --- FULL IDENTITY MODAL POPUP --- */}
            {editingUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-card border border-border w-full max-w-xl rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-600"></div>

                        <div className="flex items-center gap-3 mb-8">
                           <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center border border-border shadow-inner">
                               <FiShield size={20} />
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight font-['Outfit']">Identity Hub Audit</h3>
                              <p className="text-foreground/80 text-[10px] font-black uppercase tracking-widest">Participant: {editingUser.uid.substring(0, 16)}</p>
                           </div>
                        </div>

                        <form onSubmit={handleFullUpdate} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80 ml-1">Architect Designation</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-bold shadow-inner"
                                    placeholder="DESIGNATED NAME"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Network Access Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium shadow-inner"
                                    placeholder="EMAIL ADDRESS"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Clearance Protocol</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-black uppercase tracking-widest text-[10px] appearance-none cursor-pointer shadow-inner"
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
                                    className="flex-1 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50"
                                >{isSaving ? 'Synchronizing...' : 'Commit Credentials'}</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-8 py-4 rounded-2xl bg-secondary border border-border text-foreground font-black uppercase tracking-[0.2em] text-[10px] hover:bg-muted transition-all"
                                >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FiActivity className="text-foreground w-4 h-4 opacity-70" />
                    <span className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] opacity-70">Operational Registry</span>
                  </div>
                    <h2 className="text-4xl font-bold text-foreground tracking-tight uppercase">Users</h2>
                    
                    <div className="mt-8 relative max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-all">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search identities by name, email or UID..."
                            className="w-full bg-secondary/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all font-medium placeholder:text-muted-foreground/50 tracking-tight"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2.5 rounded-xl border border-border font-black text-[10px] uppercase tracking-widest flex items-center gap-2 ${systemStatus === 'SYNCED' ? 'text-emerald-500 bg-emerald-500/5' : 'text-amber-500 bg-amber-500/5'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${systemStatus === 'SYNCED' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                    {systemStatus}
                  </div>
                  <button
                      onClick={fetchUsersFromBackend}
                      className="p-3.5 rounded-xl bg-secondary border border-border text-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95"
                  >
                      <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
            </header>

            <div className="bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden transition-all relative">
                {isDeleting && (
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-50 flex items-center justify-center font-black text-destructive uppercase tracking-[0.5em] animate-pulse">
                      Identity Purge in Progress
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted border-b border-border">
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70">Operational Node</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70">Clearance Status</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70">Network Pulse</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-10 py-32 text-center text-muted-foreground font-black tracking-[0.25em] uppercase animate-pulse opacity-30">Scanning Cloud Decentralized Identity Registry...</td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.uid} className="hover:bg-muted/20 transition-all group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center text-foreground font-black uppercase shadow-inner">
                                                    {(user.displayName || user.email || 'U').charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-foreground font-bold tracking-tight text-base">{user.displayName || 'Anonymous Architect'}</span>
                                                    <span className="text-[11px] text-muted-foreground font-medium opacity-50">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border transition-all ${user.role === 'Admin'
                                                ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                                : 'bg-muted border-border text-muted-foreground'
                                                }`}>
                                                {user.role || 'User Participant'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${user.status !== 'Standby' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${user.status !== 'Standby' ? 'text-foreground' : 'text-amber-500'}`}>
                                                    {user.status || 'ACTIVE_NODE'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-3 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                                                    title="Modify Node"
                                                >
                                                    <FiEdit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.uid)}
                                                    className="p-3 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all shadow-sm"
                                                    title="Purge Node"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-10 py-32 text-center">
                                        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs opacity-50">Network Synchronization Interrupted or No Nodes Found.</p>
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
