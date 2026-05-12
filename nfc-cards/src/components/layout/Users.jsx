import {
    FiRefreshCw,
    FiShield,
    FiUser,
    FiActivity,
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiChevronRight,
    FiLink,
    FiCopy,
    FiEye
} from 'react-icons/fi';

import PreviewModal from './PreviewModal';

import { API_BASE_URL, APP_URL } from "../../config/api";
import Layout from "./layout";
import { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal';
import axios from 'axios';

const Users = ({ userData }) => {

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [systemStatus, setSystemStatus] = useState('OFFLINE');
    const [editingUser, setEditingUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);



    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        role: 'User'
    });

    const [searchQuery, setSearchQuery] = useState('');

    const showToast = (message, type = 'success') => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const fetchUsersFromBackend = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/users`);

            setUsersList(data);
            setSystemStatus('SYNCED');
        } catch (error) {
            console.error(error);
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
            await axios.put(
                `${API_BASE_URL}/api/users/${editingUser.uid}`,
                formData
            );

            setEditingUser(null);

            showToast(
                "Identity credentials successfully re-architected."
            );

            fetchUsersFromBackend();

        } catch (error) {

            console.error(error);

            showToast(
                "Cloud Synchronisation Error. Check Backend Connection.",
                "error"
            );

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

            await axios.delete(
                `${API_BASE_URL}/api/users/${userToDelete.uid}`
            );

            setUsersList(prev =>
                prev.filter(user => user.uid !== userToDelete.uid)
            );

            showToast("Identity purged successfully.");

            setIsDeleteModalOpen(false);
            setUserToDelete(null);

        } catch (error) {

            console.error(error);

            showToast(
                "Purge failure. Sync check required.",
                "error"
            );

        } finally {
            setIsDeleting(false);
        }
    };

    const handleRoleUpdate = async (uid, newRole) => {
        try {
            await axios.patch(`${API_BASE_URL}/api/users/${uid}/role`, { role: newRole });
            showToast(`Clearance updated to ${newRole}`);
            // Optimistic update
            setUsersList(prev => prev.map(u => u.uid === uid ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error(error);
            showToast("Failed to update access clearance.", "error");
        }
    };



    const filteredUsers = usersList.filter(user =>
        user.role !== 'Template' &&
        (
            user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.uid?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <Layout
            userData={userData}
            title="User Registry"
            showTopNavActions={false}
        >

            <div className="px-1.5 sm:px-4 md:px-8 lg:px-16">

                {/* TOAST */}

                {toast && (
                    <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-3 transition-all duration-300
                    ${toast.type === 'error'
                            ? 'bg-red-500/10 border-red-500/20 text-red-500'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                        }
                `}>

                        <div className={`w-2 h-2 rounded-full ${toast.type === 'error'
                            ? 'bg-red-500'
                            : 'bg-emerald-500'
                            }`}
                        />

                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                            {toast.message}
                        </span>

                    </div>
                )}

                {/* EDIT MODAL */}

                {editingUser && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-5">

                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
                            onClick={() => setEditingUser(null)}
                        />

                        <div className="relative z-10 w-full max-w-2xl rounded-[2.5rem] bg-white dark:bg-[#0F0F10] border border-black/5 dark:border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.25)] overflow-hidden">

                            <div className="p-8 border-b border-black/5 dark:border-white/10 flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                                        <FiShield size={24} />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight text-foreground">
                                            Edit Identity
                                        </h2>

                                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground mt-1">
                                            UID : {editingUser.uid.substring(0, 12)}
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() => setEditingUser(null)}
                                    className="w-11 h-11 rounded-2xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                >
                                    ✕
                                </button>

                            </div>

                            <form
                                onSubmit={handleFullUpdate}
                                className="p-8 space-y-6"
                            >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-3 block">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.displayName}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    displayName: e.target.value
                                                })
                                            }
                                            className="w-full h-14 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 px-5 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-3 block">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value
                                                })
                                            }
                                            className="w-full h-14 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 px-5 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/10"
                                        />
                                    </div>

                                </div>

                                <div>

                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-3 block">
                                        User Role
                                    </label>

                                    <select
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value
                                            })
                                        }
                                        className="w-full h-14 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 px-5 text-sm font-black uppercase tracking-[0.15em] outline-none focus:ring-4 focus:ring-primary/10"
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>

                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">

                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="h-14 rounded-2xl bg-black text-white font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.01] active:scale-95 transition-all"
                                    >
                                        {isSaving
                                            ? 'Updating...'
                                            : 'Save Changes'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}

                {/* HEADER */}

                <div className="mb-10">

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                        <div>

                            <div className="flex items-center gap-2 mb-3">
                            </div>

                            <h1 className="text-5xl font-black tracking-tight text-foreground">
                                Users
                            </h1>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className={`h-12 px-5 rounded-2xl border flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em]
                            ${systemStatus === 'SYNCED'
                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10'
                                    : 'bg-orange-500/10 text-orange-500 border-orange-500/10'
                                }
                        `}>

                                <div className={`w-2 h-2 rounded-full ${systemStatus === 'SYNCED'
                                    ? 'bg-emerald-500'
                                    : 'bg-orange-500 animate-pulse'
                                    }`}
                                />

                                {systemStatus}

                            </div>

                            <button
                                onClick={fetchUsersFromBackend}
                                className="w-12 h-12 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                            >
                                <FiRefreshCw
                                    className={`w-5 h-5 ${loading ? 'animate-spin' : ''
                                        }`}
                                />
                            </button>

                        </div>

                    </div>

                    {/* SEARCH */}

                    <div className="mt-8 relative border-2 rounded-3xl bg-white/80 max-w-xl">

                        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />

                        <input
                            type="text"
                            placeholder="Search users by name, email or UID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-13 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 pl-12 pr-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/10"
                        />

                    </div>

                </div>

                {/* MAIN TABLE */}

                <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/50 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

                    {/* TOP BAR */}

                    <div className="h-20 px-8 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-zinc-50/70 dark:bg-white/[0.02]">

                        <div className="hidden md:flex items-center gap-3">

                            <div className="px-4 h-11 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 flex items-center text-[11px] font-black uppercase tracking-[0.2em]">
                                {filteredUsers.length} Records
                            </div>

                        </div>

                    </div>

                    {/* LOADING */}

                    {loading ? (

                        <div className="h-[500px] flex flex-col items-center justify-center">

                            <div className="w-12 h-12 rounded-full border-4 border-primary/10 border-t-primary animate-spin mb-6" />

                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                                Synchronising Registry
                            </p>

                        </div>

                    ) : filteredUsers.length > 0 ? (

                        <div className="overflow-x-auto">
                            <hr className='border border-2' />
                            <table className="w-full">

                                <thead>

                                    <tr className="border-b border-black/5 dark:border-white/10">

                                        <th className="px-4 py-4 md:px-8 md:py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                                            User
                                        </th>

                                        <th className="hidden xl:table-cell px-3 py-4 md:px-6 md:py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                                            Organization
                                        </th>

                                        <th className="hidden lg:table-cell px-3 py-4 md:px-6 md:py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                                            Designation
                                        </th>

                                        <th className="hidden md:table-cell px-3 py-4 md:px-6 md:py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                                            Template
                                        </th>

                                        <th className="px-3 py-4 md:px-6 md:py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                                            Access
                                        </th>
                                        <th className="px-4 py-4 md:px-8 md:py-5 text-right text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredUsers.map((user, index) => (

                                        <tr
                                            key={user.uid}
                                            className="border-b border-black/5 dark:border-white/5 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] transition-all group"
                                        >

                                            {/* USER */}

                                            <td className="px-2 py-4 md:px-8 md:py-6">

                                                <div className="flex items-center gap-2 md:gap-4">

                                                    <div className="relative flex-shrink-0">

                                                        <div className="w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden bg-zinc-100 dark:bg-white/[0.05] border border-black/5 dark:border-white/10 flex items-center justify-center">

                                                            {(user.profileImage || user.logo) ? (
                                                                <img
                                                                    src={user.profileImage || user.logo}
                                                                    alt=""
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-sm md:text-lg font-black opacity-50">
                                                                    {(user.displayName || user.email || 'U').charAt(0)}
                                                                </span>
                                                            )}

                                                        </div>

                                                        <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white dark:border-[#0F0F10] bg-emerald-500" />

                                                    </div>

                                                    <div className="min-w-0 max-w-[120px] sm:max-w-none">

                                                        <h4 className="text-sm md:text-base font-black tracking-tight text-foreground truncate">
                                                            {user.displayName || 'Unknown User'}
                                                        </h4>

                                                        <p className="text-[10px] md:text-[12px] font-medium text-muted-foreground truncate">
                                                            {user.email}
                                                        </p>

                                                        <div className="mt-1 md:mt-2 flex items-center gap-2">

                                                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-muted-foreground">
                                                                ID :
                                                            </span>

                                                            <span className="text-[9px] md:text-[10px] font-black tracking-[0.1em] md:tracking-[0.15em] text-foreground/70">
                                                                {user.uid.substring(0, 8)}
                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* ORG */}

                                            <td className="hidden xl:table-cell px-3 py-4 md:px-6 md:py-6">

                                                <div>

                                                    <p className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-foreground truncate max-w-[150px] md:max-w-none">
                                                        {user.company || user.companyName || user.businessName || user.organization || 'PERSONAL'}
                                                    </p>

                                                    <p className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-2">
                                                        Identity Origin
                                                    </p>

                                                </div>

                                            </td>

                                            {/* ROLE */}

                                            <td className="hidden lg:table-cell px-3 py-4 md:px-6 md:py-6">

                                                <div>

                                                    <p className="text-[11px] md:text-sm font-black text-foreground truncate max-w-[120px] md:max-w-none">
                                                        {user.businessRole || user.job || user.jobTitle || user.designation || 'N/A'}
                                                    </p>

                                                    <p className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-2">
                                                        Designation
                                                    </p>

                                                </div>

                                            </td>

                                            {/* TEMPLATE / DEPLOYMENT NODE */}
                                            <td className="hidden md:table-cell px-3 py-4 md:px-6 md:py-6">
                                                <div className="min-w-[220px]">
                                                    {user.templateId ? (
                                                        <div className="bg-zinc-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-2xl p-4 group/node hover:border-primary/20 transition-all">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                                                                        {user.templateId}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center gap-1 opacity-0 group-hover/node:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={() => {
                                                                            const link = `${APP_URL}/url/${user.templateId}?u=${user.uid}`;
                                                                            navigator.clipboard.writeText(link);
                                                                            showToast("Deployment URL copied.");
                                                                        }}
                                                                        className="w-7 h-7 rounded-lg bg-white dark:bg-white/10 hover:bg-black hover:text-white transition-all flex items-center justify-center text-muted-foreground shadow-sm"
                                                                        title="Copy Link"
                                                                    >
                                                                        <FiCopy size={12} />
                                                                    </button>

                                                                    <button
                                                                        onClick={() => {
                                                                            const link = `${APP_URL}/url/${user.templateId}?u=${user.uid}`;
                                                                            window.open(link, '_blank');
                                                                        }}
                                                                        className="w-7 h-7 rounded-lg bg-white dark:bg-white/10 hover:bg-black hover:text-white transition-all flex items-center justify-center text-muted-foreground shadow-sm"
                                                                        title="Open in New Tab"
                                                                    >
                                                                        <FiLink size={12} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col gap-1">
                                                                <p className="text-[9px] font-mono text-muted-foreground/60 truncate">
                                                                    {`${APP_URL.replace('https://', '').replace('http://', '')}/url/${user.templateId}?u=${user.uid.substring(0, 8)}...`}
                                                                </p>
                                                                <p className="text-[8px] font-black uppercase tracking-widest text-primary/40">
                                                                    Active Deployment Node
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="px-4 py-3 rounded-xl border border-dashed border-black/5 dark:border-white/10 flex items-center justify-center">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">
                                                                No Node Active
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* ACCESS */}

                                            <td className="px-1 py-4 md:px-6 md:py-6">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={user.role || 'User'}
                                                        onChange={(e) => handleRoleUpdate(user.uid, e.target.value)}
                                                        className={`appearance-none pl-8 pr-7 md:pl-10 md:pr-10 py-1.5 md:py-2 rounded-full border text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] outline-none cursor-pointer transition-all
                                                        ${user.role === 'Admin'
                                                                ? 'hover:brightness-0'
                                                                : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/10 hover:bg-black/[0.06] dark:hover:bg-white/[0.06]'
                                                            }
                                                    `}
                                                    >
                                                        <option value="User">User</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-70">
                                                        {user.role === 'Admin' ? <FiShield size={12} /> : <FiUser size={12} />}
                                                    </div>
                                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                                        <FiChevronRight size={10} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ACTIONS */}

                                            <td className="px-2 py-4 md:px-4">

                                                <div className="flex items-center justify-end gap-2">

                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
                                                        title="Edit Identity"
                                                    >
                                                        <FiEdit2 size={14} />
                                                    </button>

                                                    <button
                                                        onClick={() => confirmDelete(user)}
                                                        className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm"
                                                        title="Purge Identity"
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="h-[500px] flex flex-col items-center justify-center">

                            <div className="w-24 h-24 rounded-[2rem] bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center mb-8">
                                <FiActivity size={40} className="opacity-40" />
                            </div>

                            <h3 className="text-2xl font-black tracking-tight">
                                No Users Found
                            </h3>

                            <p className="mt-3 text-sm text-muted-foreground font-medium">
                                No operational identities matched your search.
                            </p>

                        </div>

                    )}

                    {/* OVERLAY */}

                    {isDeleting && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-50 flex flex-col items-center justify-center">

                            <div className="w-14 h-14 rounded-full border-4 border-red-500/10 border-t-red-500 animate-spin mb-6" />

                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500">
                                Purging Identity
                            </p>

                        </div>
                    )}

                </div>

                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setUserToDelete(null);
                    }}
                    onConfirm={handleDeleteUser}
                    title="Purge Participant Identity"
                    message={`Are you sure you want to permanently de-authorize ${userToDelete?.displayName || 'this participant'}?`}
                    confirmText="Purge Identity Node"
                    isLoading={isDeleting}
                />



            </div>

        </Layout>
    );
};

export default Users;