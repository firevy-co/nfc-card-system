import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import toast from 'react-hot-toast';

const InquiryForm = ({ targetUid, vector = 'General', themeColor = '#0F172A', buttonClassName = "" }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        brief: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.brief) {
            toast.error("Please architect all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${API_BASE_URL}/api/inquiries`, {
                ...formData,
                vector,
                targetUid
            });
            toast.success("Inquiry successfully dispatched to the network.");
            setFormData({ name: '', email: '', brief: '' });
        } catch (error) {
            console.error("Inquiry Transmission Error:", error);
            toast.error("Handshake failure. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-black transition-all"
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-black transition-all"
                    required
                />
                <textarea
                    placeholder="Nature of Inquiry..."
                    rows="3"
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-black transition-all resize-none"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={buttonClassName || `w-full bg-[#0F172A] text-white py-3.5 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2`}
                style={!buttonClassName ? { backgroundColor: themeColor } : {}}
            >
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Syncing...
                    </>
                ) : "Submit Inquiry"}
            </button>
        </form>
    );
};

export default InquiryForm;
