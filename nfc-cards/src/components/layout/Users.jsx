import { FiRefreshCw, FiUserPlus, FiEdit2, FiTrash2, FiShield, FiUser, FiActivity } from 'react-icons/fi';
import { API_BASE_URL } from "../../config/api";
import Layout from "./layout";
import { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal';

const Users = ({ userData }) => {
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [systemStatus, setSystemStatus] = useState('OFFLINE');
    const [editingUser, setEditingUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);
    
    // Modal states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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
            const response = await fetch(`${API_BASE_URL}/api/users`);
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
            const response = await fetch(`${API_BASE_URL}/api/users/${editingUser.uid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
            showToast("Cloud Synchronisation Error. Check Backend Connection.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/${userToDelete.uid}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showToast("Identity purged successfully.", "success");
                // OPTIMISTIC UI: Remove from local state immediately
                setUsersList(prev => prev.filter(user => user.uid !== userToDelete.uid));
                
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
            }
        } catch (error) {
            console.error("De-authorization Failure:", error);
            showToast("Purge failure. Sync check required.", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredUsers = usersList.filter(user =>
        user.role !== 'Template' && (
            (user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.uid?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    );

    return (
        <Layout userData={userData} title="User Registry" showTopNavActions={false}>
            {/* --- IDENTITY TOAST SYSTEM --- */}
            {toast && (
                <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-6 duration-300 backdrop-blur-xl ${toast.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-primary/10 border-primary/20 text-primary'
                    }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'error' ? 'bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}></div>
                    <span className="text-[11px] font-bold capitalize tracking-[0.2em]">{toast.message}</span>
                </div>
            )}

            {/* --- FULL IDENTITY MODAL POPUP --- */}
            {editingUser && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-3xl" onClick={() => setEditingUser(null)}></div>
                    <div className="bg-white border border-black/5 w-full max-w-2xl rounded-[3rem] p-8 sm:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative z-10 animate-in zoom-in-95 duration-500 overflow-hidden font-['Mulish']">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-primary/20"></div>

                        <button
                            onClick={() => setEditingUser(null)}
                            className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-zinc-400 hover:text-black transition-all active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="flex items-center gap-6 mb-12">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-black text-white flex items-center justify-center shadow-2xl">
                                <FiShield size={28} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-black tracking-tighter">Identity Audit</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-1">Audit Trail: {editingUser.uid.substring(0, 12)}</p>
                            </div>
                        </div>

                        <form onSubmit={handleFullUpdate} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Architect Designation</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-6 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 text-black focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all font-bold text-sm"
                                        placeholder="Name of record"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Access Protocol</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-6 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 text-black focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all font-bold text-sm"
                                        placeholder="email@node.co"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Security Clearance</label>
                                <div className="relative group">
                                    <select
                                        className="w-full px-6 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 text-black focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all font-black uppercase tracking-[0.2em] text-[11px] appearance-none cursor-pointer"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="User">Standard Participant</option>
                                        <option value="Admin">System Administrator</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-zinc-400 group-hover:text-black transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-6 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="col-span-3 py-5 rounded-[1.5rem] bg-black text-white font-black uppercase tracking-[0.25em] text-[11px] hover:brightness-125 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? 'Synchronizing Node...' : 'Commit Protocol'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="col-span-2 py-5 rounded-[1.5rem] bg-zinc-100 text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-all active:scale-95"
                                >
                                    Abort
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <header className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 p-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <FiActivity className="text-foreground w-4 h-4 opacity-70" />
                        <span className="text-[10px] font-bold text-foreground capitalize tracking-[0.3em] opacity-70">Operational Registry</span>
                    </div>
                    <h2 className="text-4xl font-black text-foreground tracking-tight capitalize">Users</h2>

                    <div className="mt-8 relative max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-foreground transition-all">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search identities by name, email or UID..."
                            className="w-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all font-medium placeholder:text-muted-foreground/50 tracking-tight text-foreground"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/10 font-black text-[10px] capitalize tracking-widest flex items-center gap-2 ${systemStatus === 'SYNCED' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${systemStatus === 'SYNCED' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                        {systemStatus}
                    </div>
                    <button
                        onClick={fetchUsersFromBackend}
                        className="p-3.5 rounded-xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95"
                    >
                        <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </header>

            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden transition-all relative">
                {isDeleting && (
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-50 flex items-center justify-center font-black text-destructive capitalize tracking-[0.5em] animate-pulse">
                        Identity Purge in Progress
                    </div>
                )}

                {/* MOBILE CARD LIST (< md) */}
                <div className="md:hidden divide-y divide-black/5 dark:divide-white/5">
                    {loading ? (
                        <div className="p-10 flex flex-col items-center gap-4 opacity-40">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="font-black uppercase tracking-[0.3em] text-[10px]">Accessing Registry...</p>
                        </div>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user.uid} className="p-5 hover:bg-black/[0.02] transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center text-base font-black capitalize shadow-lg">
                                            {(user.displayName || user.email || 'U').charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black tracking-tighter text-sm text-foreground">{user.displayName || 'Architect'}</p>
                                            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-wider opacity-40">UID: {user.uid.substring(0, 8)}</p>
                                        </div>
                                    </div>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${user.role === 'Admin'
                                        ? 'bg-foreground text-background border-foreground'
                                        : 'bg-black/[0.03] text-muted-foreground border-black/5'}`}>
                                        {user.role === 'Admin' ? <FiShield size={9} className="mr-1" /> : <FiUser size={9} className="mr-1" />}
                                        {user.role || 'User'}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-foreground/80">{user.email || 'N/A'}</p>
                                        <p className="text-[9px] text-muted-foreground font-bold opacity-40">{user.businessName || 'Personal Node'}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => openEditModal(user)}
                                            className="px-4 py-1.5 rounded-lg bg-foreground text-background font-black uppercase tracking-wider text-[9px] active:scale-95 transition-all">
                                            Edit
                                        </button>
                                        <button onClick={() => confirmDelete(user)}
                                            className="px-4 py-1.5 rounded-lg bg-red-500/10 text-red-500 font-black uppercase tracking-wider text-[9px] hover:bg-red-500 hover:text-white active:scale-95 transition-all">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-16 flex flex-col items-center gap-4 opacity-30">
                            <FiActivity size={36} className="text-muted-foreground animate-pulse" />
                            <p className="text-muted-foreground font-black capitalize tracking-[0.3em] text-[10px] text-center">No identities found</p>
                        </div>
                    )}
                </div>

                {/* DESKTOP TABLE (≥ md) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/10">
                                <th className="px-10 py-6 text-[10px] font-black capitalize tracking-[0.3em] text-foreground/50">Operational Node</th>
                                <th className="px-10 py-6 text-[10px] font-black capitalize tracking-[0.3em] text-foreground/50">Organization</th>
                                <th className="px-10 py-6 text-[10px] font-black capitalize tracking-[0.3em] text-foreground/50">Contact Details</th>
                                <th className="px-10 py-6 text-[10px] font-black capitalize tracking-[0.3em] text-foreground/50">Clearance Status</th>
                                <th className="px-10 py-6 text-[10px] font-black capitalize tracking-[0.3em] text-foreground/50">Network Pulse</th>
                                <th className="px-10 py-6 text-[10px] font-black capitalize tracking-[0.3em] text-foreground/50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-10 py-32 text-center">
                                        <div className="flex flex-col items-center gap-6 opacity-40">
                                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                            <p className="font-black uppercase tracking-[0.3em] text-[10px]">Accessing Registry...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.uid} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all border-b border-black/5 dark:border-white/5 last:border-0">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-foreground text-background flex items-center justify-center text-xl font-black capitalize shadow-2xl relative overflow-hidden ring-4 ring-foreground/5 transition-transform hover:scale-105">
                                                    {(user.displayName || user.email || 'U').charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-foreground font-black tracking-tighter text-lg">{user.displayName || 'Architect'}</span>
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40 mt-1">UID: {user.uid.substring(0, 8)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-foreground/80 font-black text-xs uppercase tracking-widest">{user.businessName || 'Personal Node'}</span>
                                                <span className="text-[9px] text-muted-foreground font-bold opacity-40 uppercase tracking-[0.1em] mt-1">Identity Origin</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                                                    <span className="text-foreground font-bold text-xs">{user.email || 'N/A'}</span>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground font-bold opacity-40 pl-3.5 whitespace-nowrap">Last Auth: {user.lastSignIn ? new Date(user.lastSignIn).toLocaleDateString() : 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${user.role === 'Admin'
                                                ? 'bg-foreground text-background border-foreground shadow-lg'
                                                : 'bg-black/[0.03] dark:bg-white/5 text-muted-foreground border-black/5 dark:border-white/10'
                                                }`}>
                                                {user.role === 'Admin' ? <FiShield size={10} className="mr-2" /> : <FiUser size={10} className="mr-2" />}
                                                {user.role || 'User'}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_12px] ${user.status === 'Active' ? 'bg-emerald-500 shadow-emerald-500/60' : 'bg-amber-500 shadow-amber-500/60'}`}></div>
                                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${user.status === 'Active' ? 'text-emerald-500/80' : 'text-amber-500/80'}`}>
                                                    {user.status || 'Standby'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="px-6 py-2.5 rounded-xl bg-foreground text-background border border-foreground font-black uppercase tracking-[0.2em] text-[9px] hover:brightness-125 transition-all shadow-lg shadow-foreground/10 cursor-pointer active:scale-95"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(user)}
                                                    className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-black uppercase tracking-[0.2em] text-[9px] hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10 cursor-pointer active:scale-95"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-10 py-48 text-center">
                                        <div className="flex flex-col items-center gap-6 opacity-30">
                                            <FiActivity size={48} className="text-muted-foreground animate-pulse" />
                                            <p className="text-muted-foreground font-black capitalize tracking-[0.4em] text-xs">Identity Network Synchronisation Pending</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false); setUserToDelete(null); }}
                onConfirm={handleDeleteUser}
                title="Purge Participant Identity"
                message={`Are you sure you want to permanently de-authorize ${userToDelete?.displayName || 'this participant'}? This will wipe their entire identity, company data, and card configurations from the network.`}
                confirmText="Purge Identity Node"
                isLoading={isDeleting}
            />
        </Layout>
    );
};

export default Users;
